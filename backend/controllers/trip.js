const Trip = require("../models/trip");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
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

exports.getTrip = (req, res) => {
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

exports.createTrip = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let trip = new Trip(fields);
    trip.createdBy = req.profile;
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    trip.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.tripsByUserId = (req, res) => {
  Trip.find({
    createdBy: req.profile._id,
  })
    .populate("createdBy", "_id name")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(trips);
    });
};

exports.isCreator = (req, res, next) => {
  let sameUser = req.trip && req.auth && req.trip.createdBy._id == req.auth._id;
  let adminUser = req.post && req.auth && req.auth.role === "admin";

  // console.log("req.post ", req.post, " req.auth ", req.auth);
  // console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

  let isCreator = sameUser || adminUser;

  if (!isCreator) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

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

exports.updateTrip = (req, res, next) => {
  let trip = req.trip;
  trip = _.extend(trip, req.body);
  trip.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorised to perform this action",
      });
    }
    res.json({ trip });
  });
};
