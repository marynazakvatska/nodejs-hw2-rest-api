/* const contactsOperations = require('../../model') */
const { Contact } = require("../../models");
const { contactSchema } = require("../../models/contact");


const add = async (req, res, next) => {
  try { 
    const result = await Contact.create(req.body)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}


module.exports = add