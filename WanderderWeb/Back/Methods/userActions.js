const Auth= require('../Models/AuthModel')
const User = require('../Models/UserModel')
const ReservationCenter = require('../Models/ReservationCenterModel');
const ReservationEvent = require('../Models/ReservationEventModel');

const createError = require('http-errors');
var _ = require('lodash');

const cloudinaryConfig = require('../config/CloudinaryConfig').config;
const cloudinary = require('cloudinary');
cloudinary.config(cloudinaryConfig);

module.exports = {
    loadProfile: async (req, res, next) => {
        try {
            const email = (req.params.email != '0') ? req.params.email : req.session.email;
            const user = await Auth.findOne({email:email});
            let mine = false;
            if (user){
                if ( email == req.session.email) 
                mine = true;
                profile = await User.findOne({userId: user._id}).lean();
                if (profile){
                    profile.email = email;
                    res.send({'profile': profile, 'mine': mine});

                } else {
                    const error =createError(404,'Profile not found');
                    next(error);
                }
            } else {
                const error =createError(404,'User not found');
                next(error);
            }
                 
        } catch (error) {
            console.log('loadProfile error: ', error);
            next(error);
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            if(!req.session.user){
                const error =createError(401,'Unauthorized');
                next(error);
            }
            const email = req.session.email;
            const user = await Auth.findOne({email:email});
            if (user){
                profile = await User.findOne({userId: user._id});
                if (profile) {
                    await User.findOneAndUpdate({userId: user._id}, req.body,{
                        new: true
                    });
                    res.send({'status': true})
                } else {
                    const error =createError(404,'Profile not found');
                    next(error);
                }
            } else {
                const error =createError(404,'User not found');
                next(error);
            }
        }catch (error) {
            console.log('updateProfile error: ', error);
            next(error);
        }
    },
    uploadPicture: async (req, res, next) => {
        try {
            const formidable = require('formidable');
            const form = new formidable.IncomingForm();
            form.parse(req, async function(err, fields, files) {
               
                if (err) {
                    next(err);
                }
                if(!req.session.user){
                    const error =createError(401,'Unauthorized');
                    next(error);
                }
                const user = await Auth.findOne({_id:req.session.user});               
                if (user){
                    cloudinary.v2.uploader.upload(files.image.path, async function (err, result) {
           
                    const profile = await User.findOne({userId: user._id});
                    const update = {
                        'img': result.public_id
                    }
                    if (profile) {
                        let updated = await User.findOneAndUpdate({userId: user._id}, update, {
                            new: true
                        });
                        res.send({'img': updated.img})
                    }else {
                        const error =createError(404,'Profile not found');
                        next(error);
                    }
                });         
            } else {
                const error =createError(404,'User not found');
                next(error);
            }
        });         
        } catch (error) {
            console.log('uploadPicture error: ', error);
            next(error);
        }
    },
    getUserSuggestions: async (req, res, next) => {
        var pattern = req.body.pattern;
        Auth.aggregate([{ $match: { $and: [{ role: 0 }, { $or: [{ fullname: new RegExp(pattern, 'i') }, { email: new RegExp(pattern, 'i') }] }] } }
        ,{
            $lookup:
            {
                //TODO: index for performance or whatever
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profile'
            }
        }
            , { $unwind: '$profile' },{$limit:3}, { $project: { 'fullname': 1, 'email': 1, 'picture': '$profile.img', 'profileId': '$profile._id' } }],
            function (err, result) {
                if (result) {
                    console.log(result);
                    res.send(result)
                } else {
                    console.log('loadProfile error: ', err);
                    next(err);
                }
            })
    },
    getReservationsByUser: async (req,res,next)=>{
        if(!req.session.user){
            const error =createError(401,'Unauthorized');
            next(error);
        }
        const currDate = new Date();
        let result;
            result =  await ReservationCenter.find({ status: req.body.filterKey, enddateOfReservation: {$gte: currDate.toISOString()}}).populate({
              path: 'userId',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
                }
            }
).populate({
              path: 'group',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
              }
          }).populate({
            path: 'centerId',
            model: 'center',
            select:{'_id':0,'userId':1,'orgName':'$name', 'picture':1},
            match:{
                $or: [ { name: new RegExp(req.body.searchKey, 'i') } ]
              },
        });
        const finalresultCenter = _.reject(result,{centerId: null});

        let result2;
            result2 =  await ReservationEvent.find({status: req.body.filterKey}).populate({
              path: 'userId',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
              }}
            ).populate({
              path: 'group',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
              }
          }).populate({
            path: 'eventId',
            model: 'organizedEvent',
            select:{'_id':1,'orgId':1,'eventName':'$name', 'date':'$date', 'nbdays' : '$numbdays'},
            match:{
                $and: [ { name: new RegExp(req.body.searchKey, 'i') } ,{date: {$gte: currDate.toISOString()}}]
              },
              populate:{
                path: 'orgId',
                select: {'_id': 0,'userId': 1,'picture': '$img'},
                model: 'organization',
                populate:{
                    path: 'userId',
                    select: {'orgName': '$fullname', 'email':1},
                    model: 'user'
                }
            }
        });
      const finalresultEvent = _.reject(result2,{eventId: null});
      res.send({'events':finalresultEvent,'centers':finalresultCenter});
      },
      getReservationsHistoryCenter: async (req,res,next)=>{
        if(!req.session.user){
            const error =createError(401,'Unauthorized');
            next(error);
        }
        const currDate = new Date();
        const page = req.body.page ? req.body.page : 1;
        const limit = 3;
        const skip = (page - 1 ) * limit;
        let result;
           result =  await ReservationCenter.find({enddateOfReservation: {$lt: currDate.toISOString()}}).populate({
              path: 'userId',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
                }
            }
).populate({
              path: 'group',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
              }
          }).populate({
            path: 'centerId',
            model: 'center',
            select:{'_id':0,'userId':1,'orgName':'$name', 'picture':1},
            match:{
                $or: [ { name: new RegExp(req.body.searchKey, 'i') } ]
              },
        }).limit(limit).skip(skip);
        const finalresultCenter = _.reject(result,{centerId: null});
        res.send({'centers':finalresultCenter});
      },
      getReservationsHistoryEvent: async (req,res,next)=>{
        if(!req.session.user){
            const error =createError(401,'Unauthorized');
            next(error);
        }
        const currDate = new Date();
        const page = req.body.page ? req.body.page : 1;
        const limit = 3;
        const skip = (page - 1 ) * limit;
        let result2;
            result2 =  await ReservationEvent.find({}).populate({
              path: 'userId',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
              }}
            ).populate({
              path: 'group',
              model: 'profile',
              select:{'_id':0,'userId':1,'picture':'$img'},
              populate:{
                  path: 'userId',
                  select: {'fullname': 1, 'email':1},
                  model: 'user',
                  match:{
                    $and: [ { userId: req.body.session } ]
                  },
              }
          }).populate({
            path: 'eventId',
            model: 'organizedEvent',
            select:{'_id':0,'orgId':1,'eventName':'$name', 'date':'$date', 'nbdays' : '$numbdays'},
            match:{
                $and: [ { name: new RegExp(req.body.searchKey, 'i') } ,{date: {$lt: currDate.toISOString()}}]
              },
              populate:{
                path: 'orgId',
                select: {'_id': 0,'userId': 1,'picture': '$img'},
                model: 'organization',
                populate:{
                    path: 'userId',
                    select: {'orgName': '$fullname', 'email':1},
                    model: 'user'
                }
            }
        }).limit(limit).skip(skip);
      const finalresult = _.reject(result2,{eventId: null});
        res.send({'events':finalresult});
      },
};