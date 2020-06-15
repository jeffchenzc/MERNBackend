const express = require("express");
const router = express.Router();
const {
  userList,
  insertBatch,
  userUpdate,
  userDelete,
  userCreate,
} = require("../controller/index.controller");
const cors = require("cors");

/**
 * CORS setting for front-end communication
 */
router.use(
  cors({
    origin: process.env.CORS_ADDRESS,
  })
);
/**
 * GET method endpoint to insert a jsonl file into MongoDB (used initially for initial insertion)
 * There should be no practical usage in a production environment
 */
router.get("/insertBatch", insertBatch);

/**
 * POST method endpoint for creating user
 */
router.post("/createUser", userCreate);

/**
 * GET method endpoint for getting all users in the database
 */
router.get("/listUser", userList);

/**
 * PUT method endpoint to update user information
 */
router.put("/updateUser/:id", userUpdate);

/**
 * DELETE method endpoint for deleting user
 */
router.delete("/deleteUser/:id", userDelete);

module.exports = router;
