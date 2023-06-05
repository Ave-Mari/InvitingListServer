const express = require("express")
const router = express.Router();

const listsController = require('./../controller/lists.controller');

router.get('/', listsController.testRoute)
router.get('/friendslist', listsController.getAllFromFriendsList)
router.post('/create-new-inviting-list', listsController.createAnEvent)
router.put('/move-to-inviting-list/:person_id', listsController.fromFriendslistToInvitinglist)
router.put('/move-to-friends-list/:person_id', listsController.deleteFromInvitingList)


