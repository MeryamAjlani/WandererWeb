const Auth = require('../Models/AuthModel')
const User = require('../Models/UserModel');
const Organizaztion = require('../Models/OrganizationModel')
const Center = require('../Models/CampingCenterModel')

const bcrypt = require('bcrypt');
const createError = require('http-errors');
var nodemailer = require('nodemailer');
const Code = require('../Models/CodeModel');

module.exports = {
    register: async (req, res, next) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let messageEmail = "";
        let messagePass = "";
        let messageName = "";

        try {

            if (req.body.password === "") {
                messagePass = "This field cannot be empty !"
            }
            if (req.body.fullname === "") {
                messageName = "This field cannot be empty !"
            }

            if (req.body.email === "") {
                messageEmail = "This field cannot be empty !";
            }
            else if (!re.test(String(req.body.email).toLowerCase())) {
                messageEmail = "Invalid email !";
            }
            else {
                const doesExist = await Auth.findOne({ email: req.body.email });

                if (doesExist) {
                    messageEmail = "Email already registered !"
                }
            }

            const u = {
                'email': req.body.email,
                'password': req.body.password,
                'role': 0
            }

            if (messageEmail === "" && messageName === "" && messagePass === "") {
                const user = new Auth(u);
                const savedUser = await user.save();
                const profile = new User({ 'userId': savedUser.id ,'name': req.body.fullname});
                const savedProfile = await profile.save();
                req.session.user = savedUser._id;
                req.session.email = savedUser.email;
                req.session.role = savedUser.role;
                req.session.save();

                const userS = {
                    id: savedUser._id,
                    email: savedUser.email,
                    role: savedUser.role,
                    name: savedUser.fullname,
                    img: 'profileImagePlaceholder'
                }

                res.send({ 'user': userS})
                return
            }
            else {
                res.status(412).send({ "email": messageEmail, "pass": messagePass, "name": messageName});
            }

        }
        catch (error) {
            next(error);
        }

    },

    login: async (req, res, next) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let messageEmail = "";
        let messagePass = "";
        try {
            if (req.body.password === "") {
                messagePass = "This field cannot be empty !"
            }
            if (req.body.email === "") {
                messageEmail = "This field cannot be empty !";
            }
            else if (!re.test(String(req.body.email).toLowerCase())) {
                messageEmail = "Invalid email !";
            }
            else {
                const user = await Auth.findOne({ email: req.body.email });
                if (!user) {
                    res.status(404).send('email not registred');
                }
            }
            if (messageEmail === "" && messagePass === "") {
                const user = await Auth.findOne({ email: req.body.email });
                const isMatch = await user.isValidPassword(req.body.password);
                if (!isMatch) {
                    messagePass = "Invalid combination!"
                    res.status(406).send();

                }
                else {
                    let profile;
                    let userS;
                    switch (user.role) {
                        case 0:
                            profile = await User.findOne({ userId: user._id });
                            userS = {
                                id: user._id,
                                email: user.email,
                                name: profile.name,
                                role: user.role,
                                img: profile.img
                            }
                            break;
                        case 1:
                            profile = await Organizaztion.findOne({ userId: user._id });
                            userS = {
                                id: user._id,
                                email: user.email,
                                name: profile.name,
                                role: user.role,
                                img: profile.img
                            }
                            break;
                        case 2:
                            profile = await Center.findOne({ userId: user._id });
                            userS = {
                                id: user._id,
                                email: user.email,
                                name: profile.name,
                                role: user.role,
                                img: profile.picture
                            }
                            break;
                    }
                   
                    req.session.user = user._id;
                    req.session.email = user.email;
                    req.session.role = user.role;
                    req.session.save();
                    res.send({ 'user': userS});
                    return;
                }
            } else {
                res.status(412).send({ "email": messageEmail, "pass": messagePass});

            }
        } catch (error) {
            next(error);
        }
    },


    resetPassword: async (req, res, next) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let messageEmail = "";
        try {
            if (req.body.email === "") {
                messageEmail = "This field cannot be empty !";
            }
            else if (!re.test(String(req.body.email).toLowerCase())) {
                messageEmail = "Invalid email !";
            }
            else {
                const user = await Auth.findOne({ email: req.body.email });
                if (!user) {
                    res.status(404).send('email not registred');
                }
            }
            if (messageEmail === "") {
                const user = await Auth.findOne({ email: req.body.email });
                await Code.findOneAndRemove({ email: user.email })

                const code = Math.floor(Math.random() * 1000000);
                const newCode = new Code({ code: code, email: req.body.email });

                const savedCode = await newCode.save();
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'WandererContactTeam@gmail.com',
                        pass: 'WanderingTogether'
                    }
                });

                var mailOptions = {
                    from: 'WandererContactTeam@gmail.com',
                    to: user.email,
                    subject: 'Reset Password',
                    text: 'Your confirmation Code is : ' + code
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    res.send()
                })

            } else {
                res.status(412).send({ "email": messageEmail});
            }

        }
        catch (error) {
            next(error);
        }
    },

    confirmCode: async (req, res, next) => {
        try {
            const result = req.body
            console.log(result);
            const user = await Auth.findOne({ email: result.email });
            if (!user) {
                res.status(404).send('email not registred');

            }

            //retreive the code from database
            const codeDatabase = await Code.findOne({ code: result.code });
            if (!codeDatabase) {
                const error = createError(404, 'CODE NON EXISTING');
                next(error);
            }
            else
                res.send({ message: 'pass', email: result.email })
        }
        catch (error) {
            next(error);
        }
    },

    autoLogin: async (req, res, next) => {
        try {
            if (req.session.user) {
                const user = await Auth.findOne({ email: req.session.email });
                let profile;
                let userS;
                switch (user.role) {
                    case 0:
                        profile = await User.findOne({ userId: user._id });
                        userS = {
                            id: user._id,
                            email: user.email,
                            name: profile.name,
                            role: user.role,
                            img: profile.img
                        }
                        break;
                    case 1:
                        profile = await Organizaztion.findOne({ userId: user._id });
                        userS = {
                            id: user._id,
                            email: user.email,
                            name: profile.name,
                            role: user.role,
                            img: profile.img
                        }
                        break;
                    case 2:
                        profile = await Center.findOne({ userId: user._id });
                        userS = {
                            id: user._id,
                            email: user.email,
                            name: profile.name,
                            role: user.role,
                            img: profile.picture
                        }
                        break;
                }
               
                res.send({user: userS })
            }
            else
                res.status(401).send()
        }
        catch (error) {
            next(error);
        }
    },

    logout: async (req, res, next) => {
        try {
            req.session.destroy();
            res.send({ status: 'logged out' })
        }
        catch (error) {
            next(error);
        }
    },

    changePassword: async (req, res, next) => {
        const result = req.body
        let confirmation = ""
        let messagePass = ""
        try {
            const user = await Auth.findOne({ email: result.email })
            if (result.pass === "") {
                messagePass = "This field cannot be empty !"
            }
            if (result.email === "") {
                confirmation = "This field cannot be empty !"
            }

            if (confirmation === "" && messagePass === "") {
                const user = await Auth.findOne({ email: result.email })
                if (user) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(result.pass, salt);
                    await User.updateOne({ email: user.email }, { password: hashedPassword })
                    res.send()
                }
                else {
                    const error = createError(404, 'USER NOT FOUND');
                    next(error)
                }
            }
            else {
                res.status(412).send({ 'password': messagePass, "confirmation ": confirmation})
            }

        }
        catch (error) {
            next(error);
        }
    },


}