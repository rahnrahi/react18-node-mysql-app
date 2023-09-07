const Joi = require('joi'); 
const ExpressJoiSwagger = require('express-joi-swagger');
// Instantiate ExpressJoiSwagger
const joiSwagger = new ExpressJoiSwagger({
    swaggerDefinition: {
      info: {
        title: 'Session Service',
        description: 'RESTful public service for retrieving and setting User Sessions.',
        version: 'v1.0.2'
      },
      host: 'http://localhost:7003',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      defaultResponses: [200, 500]
    },
    onValidateError: (errors, req, res, next) => { // global handler for validation errors
      res.status(400).send({ errors });
    }
});

module.exports = joiSwagger;