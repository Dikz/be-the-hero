const { Router } = require("express");

// Controllers
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

// Validations
const OngValidation = require("./validations/OngValidation");
const IncidentValidation = require("./validations/IncidentValidation");
const ProfileValidation = require("./validations/ProfileValidation");

const routes = Router();

routes.post("/sessions", SessionController.store);

// Ongs
routes.get("/ongs", OngController.index);
routes.post("/ongs", OngValidation.store, OngController.store);

// Profile
routes.get("/profile", ProfileValidation.index, ProfileController.index);

// Incidents
routes.get("/incidents", IncidentValidation.index, IncidentController.index);
routes.post("/incidents", IncidentController.store);
routes.delete(
  "/incidents/:id",
  IncidentValidation.destroy,
  IncidentController.destroy
);

module.exports = routes;
