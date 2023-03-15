const Joi = require('joi')

const validateAlumnusProfile = async (req, res, next) => {
  const alumnusProfileSchema = Joi.object({
    id: Joi.number()
      .min(4)
      .max(4)
      .integer()
      .required(),
    password: Joi.string()
      .max(20)
      .required(),
    first_name: Joi.string()
      .max(20)
      .required(),
    last_name: Joi.string()
      .max(20)
      .required(),
    sex: Joi.string()
      .min(1)
      .max(1)
      .required(),
    degree: Joi.string()
      .min(3)
      .max(10)
      .required(),
    major: Joi.string()
      .max(20)
      .required(),
    graduation: Joi.number()
      .min(4)
      .max(4)
      .integer()
      .required()
  });

  const { error } = alumnusProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateStudentProfile = async (req, res, next) => {
  const studentProfileSchema = Joi.object({
    id: Joi.number()
      .min(4)
      .max(4)
      .integer()
      .required(),
    password: Joi.string()
      .max(20)
      .required(),
    first_name: Joi.string()
      .max(20)
      .required(),
    last_name: Joi.string()
      .max(20)
      .required(),
    sex: Joi.string()
      .min(1)
      .max(1)
      .required(),
    degree: Joi.string()
      .min(3)
      .max(10)
      .required(),
  });

  const { error } = studentProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateJobDesc = async (req,res,next)=>{
  const jobDescSchema = Joi.object({
    employer: Joi.string()
      .max(20)
      .required(),
    role: Joi.string()
      .max(20)
      .required(),
    date_start: Joi.date()
      .required(),
  })

  const { error } = jobDescSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateAdvices = async(req,res,next)=>{
  const advicesSchema = Joi.object({
    category: Joi.string()
      .required(),
    title: Joi.string()
      .required(),
    content: Joi.string()
      .required()    
  })

  const { error } = advicesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateStories = async(req,res,next)=>{
  const storiesSchema = Joi.object({
    title: Joi.string()
      .required(),
    content: Joi.string()
      .required()    
  })

  const { error } = storiesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

module.exports = {
  validateAlumnusProfile,
  validateStudentProfile,
  validateJobDesc,
  validateAdvices,
  validateStories
}
