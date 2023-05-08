const Joi = require('joi')

const validateAlumnusProfile = (req, res, next) => {
  const alumnusProfileSchema = Joi.object({
    id: Joi.number()
      .min(10000)
      .max(99999)
      .integer()
      .required(),
    password: Joi.string()
      .trim()
      .min(8)
      .max(20)
      .required(),
    first_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    last_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    sex: Joi.string()
      .trim()
      .min(1)
      .max(1)
      .required(),
    degree: Joi.string()
      .trim()
      .min(3)
      .max(10)
      .required(),
    major: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .required(),
    graduation: Joi.number()
      .min(1990)
      .max(2022)
      .integer()
      .required()
  });

  const { error } = alumnusProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateUpdatedAlumnusProfile = (req, res, next) => {
  const alumnusProfileSchema = Joi.object({
    id: Joi.number()
      .min(10000)
      .max(99999)
      .integer()
      .required(),
    first_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    last_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    sex: Joi.string()
      .trim()
      .min(1)
      .max(1)
      .required(),
    degree: Joi.string()
      .trim()
      .min(3)
      .max(10)
      .required(),
    major: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .required(),
    graduation: Joi.number()
      .min(1990)
      .max(2022)
      .integer()
      .required()
  });

  const { error } = alumnusProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateStudentProfile = (req, res, next) => {
  const studentProfileSchema = Joi.object({
    id: Joi.number()
      .min(10000)
      .max(99999)
      .integer()
      .required(),
    password: Joi.string()
      .trim()
      .min(8)
      .max(20)
      .required(),
    first_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    last_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    sex: Joi.string()
      .trim()
      .min(1)
      .max(1)
      .required(),
    degree: Joi.string()
      .trim()
      .min(3)
      .max(10)
      .required(),
  });

  const { error } = studentProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  return next();
}

const validateUpdatedStudentProfile = (req, res, next) => {
  const studentProfileSchema = Joi.object({
    id: Joi.number()
      .min(10000)
      .max(99999)
      .integer()
      .required(),
    first_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    last_name: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    sex: Joi.string()
      .trim()
      .min(1)
      .max(1)
      .required(),
    degree: Joi.string()
      .trim()
      .min(3)
      .max(10)
      .required(),
  });

  const { error } = studentProfileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  return next();
}

const validateJobDesc = (req, res, next) => {
  const jobDescSchema = Joi.object({
    employer: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    role: Joi.string()
      .trim()
      .min(1)
      .max(20)
      .required(),
    date_start: Joi.date()
      .required(),
    date_end: Joi.date()
      .optional()
  })

  const { error } = jobDescSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateAdvices = (req, res, next) => {
  const advicesSchema = Joi.object({
    category: Joi.valid('BSCS', 'BSS', 'BSAF', 'BBA', 'General')
      .required(),
    title: Joi.string()
      .trim()
      .min(1)
      .required(),
    content: Joi.string()
      .trim()
      .min(1)
      .required()
  })

  const { error } = advicesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateStories = (req, res, next) => {
  const storiesSchema = Joi.object({
    title: Joi.string()
      .trim()
      .min(1)
      .required(),
    content: Joi.string()
      .trim()
      .min(1)
      .required()
  })

  const { error } = storiesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const validateLogin = (req, res, next) => {
  const loginSchema = Joi.object({
    id: Joi.number()
      .min(1000)
      .max(99999)
      .integer()
      .required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
  })

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

module.exports = {
  validateAlumnusProfile,
  validateUpdatedAlumnusProfile,
  validateStudentProfile,
  validateUpdatedStudentProfile,
  validateJobDesc,
  validateAdvices,
  validateStories,
  validateLogin
}
