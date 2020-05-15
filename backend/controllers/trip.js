const Trip = require("../models/trip");
const fs = require("fs");
const _ = require("lodash");

// trip middleware
exports.tripById = (req, res, next, id) => {
  Trip.findById(id)
    .populate("createdBy", "_id name")
    .exec((err, trip) => {
      if (err || !trip) {
        return res.status(400).json({
          error: err,
        });
      }
      req.trip = trip;
      next();
    });
};

// validator to check if the trip is created by requestor
exports.isCreator = (req, res, next) => {
  let sameUser = req.trip && req.auth && req.trip.createdBy._id == req.auth._id;
  let adminUser = req.trip && req.auth && req.auth.role === "admin";

  // console.log("req.trip ", req.trip, " req.auth ", req.auth);
  // console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

  let isCreator = sameUser || adminUser;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

// function to create a trip
exports.createTrip = (req, res) => {
  console.log(req.body);
  const trip = new Trip(req.body);
  const profile = req.profile;
  profile.salt = undefined;
  profile.hashed_password = undefined;
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      trip: result,
    });
  });
};

// function to get all trips for all users page wise
exports.getAllTrips = async (req, res) => {
  // get current page from req.query or use default value of 1
  const currentPage = req.query.page || 1;
  // return 10 trips per page
  const perPage = 10;
  let totalItems;
  const trips = await Trip.find()
    // countDocuments() gives you total count of trips
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Trip.find()
        .skip((currentPage - 1) * perPage)
        .populate("createdBy", "_id name")
        .sort({ startDate: -1 })
        .limit(perPage)
        .select("destination comment startDate endDate createdBy");
    })
    .then((trips) => {
      res.status(200).json(trips);
    })
    .catch((err) => console.log(err));
};

// function to get trips for a particular userId pagewise
exports.getTrips = async (req, res) => {
  // get current page from req.query or use default value of 1
  const currentPage = req.query.page || 1;
  // return 10 trips per page
  const perPage = 12;
  let totalItems;
  const trips = await Trip.find({
    createdBy: req.profile._id,
  })
    // countDocuments() gives you total count of trips
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Trip.find({ createdBy: req.profile._id })
        .skip((currentPage - 1) * perPage)
        .populate("createdBy", "_id name")
        .sort({ startDate: -1 })
        .limit(perPage)
        .select("destination comment startDate endDate createdBy");
    })
    .then((trips) => {
      res.status(200).json(trips);
    })
    .catch((err) => console.log(err));
};

// function to get trips filtered on fields pagewise
exports.getFilteredTrips = (req, res) => {
  const trips = Trip.find()
    .populate("createdBy", "_id name")
    .select("_id destination comment startDate endDate")
    .then((trips) =>
      res.json({
        trips: trips,
      })
    )
    .catch((err) => console.log(err));
};

// function to delete trip
exports.deleteTrip = (req, res) => {
  let trip = req.trip;
  trip.remove((err, trip) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Trip deleted successfully",
    });
  });
};

// function to update trip
exports.updateTrip = (req, res) => {
  let trip = req.trip;
  trip = _.extend(trip, req.body);
  trip.save((err, trip) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorised to perform this action",
      });
    }
    res.json({ trip });
  });
};
