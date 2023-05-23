const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})
const createNewContact = asyncHandler(async (req, res)=>{
    console.log("The request body is :", req.body)
    
    const {name, email, phone} = req.body;

    if(!name || !email || !phone){
        res.status(404);
        throw newError("All fields are mandatory")
    }
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
        res.status(400);
        throw new Error("Contact with the same email already exists");
    }

    const contact = await Contact.create({user_id:req.user.id,name, email, phone});
    
    res.status(200).json(req.body);
    
})

// access Private
const getContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
      // checking whether different user is not trying to delete contact
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not allowed to delete this contact");
    }

    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
  });

const updateContact =  asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    // checking whether different user is not trying to update contact
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not allowed to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);
})

 

module.exports = {getContacts, createNewContact, getContact, deleteContact, updateContact}