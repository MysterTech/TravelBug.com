const express = require("express");
const {
  createUser,
  userById,
  allUsers,
  allUsersWPg,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");
const { userSignupValidator } = require("../validators/");

const router = express.Router();

router.post("/user/new/", requireSignIn, createUser, userSignupValidator);
router.get("/users", requireSignIn, allUsersWPg);
router.get("/users/params", requireSignIn, allUsers);
router.get("/user/:userId", requireSignIn, getUser);
router.put("/user/:userId", requireSignIn, updateUser);
router.delete("/user/:userId", requireSignIn, deleteUser);

router.param("userId", userById);

module.exports = router;
