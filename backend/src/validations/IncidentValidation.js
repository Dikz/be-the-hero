const { celebrate, Segments, Joi } = require("celebrate");

class IncidentValidation {
  index = celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  });

  destroy = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  });
}

module.exports = new IncidentValidation();
