const { celebrate, Segments, Joi } = require("celebrate");

class OngValidation {
  store = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .regex(/^[0-9]*$/)
        .min(10)
        .max(11)
        .required(),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  });
}

module.exports = new OngValidation();
