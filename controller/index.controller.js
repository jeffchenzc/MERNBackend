const fs = require("fs");
const User = require("../model/Users");
const validator = require("validator");

/**
 * create user
 */
const userCreateHandler = async (req, res) => {
  try {
    if (!req.body.email || !validator.isEmail(req.body.email)) {
      return res.status(422).send("Email format incorrect");
    }
    let createStatus = await User.createUser(req.body);
    res.send(createStatus);
  } catch (e) {
    res.status(406).send(e);
  }
};

/**
 * list user
 */
const userListHandler = async (req, res) => {
  try {
    let users = await User.getAllUser();
    if (!users) return res.status(404).send("Failed to fetch user list");
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 * insert jsonl data into MongoDB
 */
const insertBatchHandler = (req, res) => {
  fs.readFile("accounts.jsonl", "utf-8", async (err, data) => {
    if (err) return res.send(err);
    try {
      let insertStatus = await User.insertBatch(
        data
          .split("\n")
          .filter((line) => line.length)
          .map((line) => JSON.parse(line.replace("\n", "").trim()))
      );
      if (!insertStatus) return res.status(422).send("Insert batch failed");
      res.json({
        status: 1,
        count: insertStatus.length,
      });
    } catch (e) {
      res.status(500).send(e);
    }
  });
};

/**
 * update user
 */
const userUpdateHandler = async (req, res) => {
  try {
    let updateStatus = await User.updateUser(req.params.id, req.body);
    if (!updateStatus) return res.status(422).send("Update user failed");
    res.send({
      status: updateStatus.ok,
      count: updateStatus.nModified,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 * delete user
 */
const userDeleteHandler = async (req, res) => {
  try {
    let deleteStatus = await User.removeUser(req.params.id);
    if (!deleteStatus) return res.status(422).send("Failed to delete user");
    res.json({
      status: deleteStatus.ok,
      count: deleteStatus.deletedCount,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  userCreate: userCreateHandler,
  userList: userListHandler,
  userUpdate: userUpdateHandler,
  userDelete: userDeleteHandler,
  insertBatch: insertBatchHandler,
};
