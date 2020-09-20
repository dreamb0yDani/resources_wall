/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        console.log(users)
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  // register route for the user
  router.get("/register", (req, res) => {
    res.render("registration_page")
  });


  router.post("/register", (req, res) => {
    res.render("registration_page")
  });

  router.get("/login", (req, res) => {
    res.render("login_form")
  });

  router.post("/login", (req, res) => {
    res.render("login_form")
  });

  router.post("/logout", (req, res) => {
  });

  router.get("/users/:id", (res, req) => {
    // take you to the user profile
  });

  router.post("/users", (res, req) => {
    // take you to the user profile to update the infromation
  });


  return router;
};
