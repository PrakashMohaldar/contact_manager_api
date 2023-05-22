const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");


const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})
const createNewContact = asyncHandler(async (req, res)=>{
    console.log("The request body is :", req.body)
    
    const {name, email, phone} = req.body;

    if(!name || !email || !phone){
        res.status(404);
        throw newError("All fields are mandatory")
    }
    const contact = await Contact.create({name, email, phone});
    
    res.status(200).json(req.body);
    
})
const getContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    res.status(200).json(contact);
  });
  
const updateContact =  asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);
})

 

module.exports = {getContacts, createNewContact, getContact, deleteContact, updateContact}