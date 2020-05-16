const express = require("express");
const {
  tripById,
  isCreator,
  createTrip,
  getAllTrips,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const { createTripValidator } = require("../validators/index");
const { requireSignIn } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

router.post(
  "/trip/new/:userId",
  requireSignIn,
  createTrip,
  createTripValidator
);
router.get("/trips", requireSignIn, getAllTrips);
router.get("/trips/:userId", requireSignIn, getTrips);
router.get("/trip/:tripId", requireSignIn, getTrip);
router.delete("/trip/:tripId", requireSignIn, deleteTrip);
router.put("/trip/:tripId", requireSignIn, updateTrip);

router.param("userId", userById);
router.param("tripId", tripById);

module.exports = router;
