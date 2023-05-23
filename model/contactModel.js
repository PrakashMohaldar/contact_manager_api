const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name:{
        type:String,
        required: [
            true,
            "Please add the contact name"
        ]
    },
    email: {
        type: String,
        required: [, "please add the contact email"],
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value);
          },
          message: 'Please provide a valid 10-digit phone number.'
        }
      }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);

