const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo'); 

const app= express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const { mongoURI } = require('./config/MongoURI')
var options = {
    mongoUrl: mongoURI
}
var sess = {
    secret: 'keyboard cat',
    cookie: {},
    store: MongoStore.create(options)
    
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

app.use('/', require('./Routes/index'))
app.use('/user',require('./Routes/userRoutes'))

const schedule = require('node-schedule');
const scheduledMethods = require('./Methods/ScheduledMethods.js');
//schedule.scheduleJob('0 0 0 * * *', scheduledMethods.deleteReservations);


const server = http.createServer(app);
const Port=process.env.PORT||3000;
server.listen(Port,console.log(Date.now))
mongoose.connect(mongoURI)
    .catch(err => console.log(err));

mongoose.connection.once('open' , () => {
    console.log('MongoDB connected')
})

    
    
   