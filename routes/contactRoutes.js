const express = require('express');
const router = express.Router();
const {getContacts, createNewContact, getContact, deleteContact, updateContact} = require('../controller/contactController.js');
const validateToken = require('../middleware/validateTokenHandler.js')


router.use(validateToken);
router.route("/")
    .get(getContacts)
    .post(createNewContact)

router.route("/:id") 
    .get(getContact)
    .delete(deleteContact)
    .put(updateContact)    

module.exports = router;