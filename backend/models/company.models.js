const mongoose = require("mongoose");
const { shortUserSchema } = require("./users.models");
const Joi = require("joi");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  admin: {
    type: shortUserSchema,
  },
  member: {
    type: [shortUserSchema],
  },
});

const Company = mongoose.model("Company", companySchema);

function validateCompany(comany) {
  const schema = Joi.object({
    name: Joi.string().max(5).max(50).required(),
    admin: Joi.object(),
    member: Joi.array(),
  });
  return schema.validate(comany);
}

exports.Company = Company;
exports.validate = validateCompany;
exports.companySchema = companySchema;
