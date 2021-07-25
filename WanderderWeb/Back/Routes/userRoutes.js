const express= require('express')
const router = express.Router();
const actions =require('../Methods/userActions');


router.get('/loadProfile/:email',actions.loadProfile)
router.post('/updateProfile',actions.updateProfile)
router.post('/uploadProfilePicture',actions.uploadPicture)
router.post('/getReservationsByUser',actions.getReservationsByUser)
router.post('/getUserSuggestions',actions.getUserSuggestions)
router.post('/getReservationsHistoryCenter',actions.getReservationsHistoryCenter)
router.post('/getReservationsHistoryEvent',actions.getReservationsHistoryEvent)

module.exports = router