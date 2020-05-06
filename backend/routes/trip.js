const express = require("express");
const {
  createTrip,
  tripById,
  tripsByUserId,
  isCreator,
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
router.get("/trips/by/:userId", tripsByUserId);
router.delete("/trip/:tripId", requireSignIn, isCreator, deleteTrip);
router.put("/trip/:tripId", requireSignIn, isCreator, updateTrip);

router.param("userId", userById);
router.param("tripId", tripById);

module.exports = router;
