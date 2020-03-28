const { celebrate, Segments, Joi } = require("celebrate");

class ProfileValidation {
  index = celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  });
}

module.exports = new ProfileValidation();
