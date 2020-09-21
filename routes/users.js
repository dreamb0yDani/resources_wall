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
  // router.get("/", (req, res) => {

  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       console.log(users)
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     })
  // });

  /**
   * --Queries --
   * const addUser = function(name, email, password) {
   *  return db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, password]).then(res => res.rows);
   * }
   *
   * const getUserByID = function(id) {
   *  return db.query(`SELECT * FROM users WHERE id = $1`, [id]).then(res => res.rows);
   * }
   *
   * const getUserByEmail = function(email) {
   *  return db.query(`SELECT * FROM users WHERE email = $1`, [email]).then(res => res.rows);
   * }
   *
   * const updateUserName = function(email, name) {
   *  return db.query(`UPDATE users SET name = $2 WHERE email = $1 RETURNING *`, [email, name]).then(res => res.rows);
   * }
   *
   * const updateUserEmail = function(id, email) {
   *  return db.query(`UPDATE users SET email = $2 WHERE id = $1 RETURNING *`, [id, email]).then(res => res.rows);
   * }
   *
   * const updateUserPassword = function(email, password) {
   *  return db.query(`UPDATE users SET password = $2 WHERE email = $1 RETURNING *`, [email, password]).then(res => res.rows);
   * }
   *
   * getAllResources
   * getUserResource
   * addResource
   *
   * addReview
   * getUserReview
   *
   * -- Function--
   * login
   * register
   *
   */

  // register route for the user
  router.get("/api/users", (req, res) => {
    // db.query(`SELECT resources.title FROM users JOIN resources ON resources.user_id = users.id WHERE users.name = 'Sandy';`)
    //   .then(data => {
    //     const users = data.rows;
    //     console.log(users)
    //     // res.json({ users });
    //     const templateVars = { obj: users }
    //     res.render("index", templateVars)
    //     for (let user in users) {
    //       console.log(users[user].name)
    //     }
    //   })
    // res.render("registration_page")
  });

  router.get("/register", (req, res) => {
    res.render("registration_page")
  })


  router.post("/register", (req, res) => {
    res.redirect("/resources")
  });

  router.get("/login", (req, res) => {
    res.render("login_form")
  });

  router.post("/login", (req, res) => {
    res.redirect("main_page")
  });

  router.post("/logout", (req, res) => {
    res.redirect("main_page")
  });

  router.get("/users/:id", (res, req) => {
    // take you to the user profile
    res.render("user_profile");
  });

  router.post("/users/:id", (res, req) => {
    // take you to the user profile to update the infromation
    res.redirect(user_profile)
  });


  return router;
};
