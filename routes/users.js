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
  router.get("/register", (req, res) => {
    res.render("registration_page")
  });

  router.post("/register", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, password])
      .then(data => {
        const user = data.rows[0];
        req.session.user_id = user[id];
        res.redirect("main_page");
      })
      .catch(err => {
        if (err) {
          res.sendStatus(403);
        }
      });
  });

  router.get("/login", (req, res) => {
    res.render("login_form");
  });

  router.post("/login", (req, res) => {

    const email = req.body.email;
    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(data => {
        const user = res.rows[0];
        req.session.user_id = user[id];
        res.redirect("main_page");
      })
      .catch(err => {
        if (err) {
          res.sendStatus(403);
        }
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("main_page");
  });

  router.get("/users/:id", (res, req) => {
    // take you to the user profile
    db.query(`SELECT * FROM users WHERE id = $1`, [req.session.user_id])
      .then(data => {
        const user = data.rows[0];
        const templateVars = { user: user }
        res.render("user_profile", templateVars);
      })
      .catch(err => {
        if (err) {
          res.sendStatus(403);
        }
      });
  });

  router.post("/users/:id", (res, req) => {
    // submits information to the db to update user info
    const user = req.session.user_id
    if (req.body.name) {
      db.query(`UPDATE users SET name = $2 WHERE id = $1 RETURNING *`, [user, req.body.name])
        .then(data => data.rows);
      res.redirect("user_profile");
    } else if (req.body.email) {
      db.query(`UPDATE users SET email = $2 WHERE id = $1 RETURNING *`, [user, req.body.email])
        .then(data => data.rows);
      res.redirect("user_profile");
    } else if (req.body.password) {
      db.query(`UPDATE users SET password = $2 WHERE id = $1 RETURNING *`, [user, req.body.password])
        .then(data => data.rows);
      res.redirect("user_profile");
    }
  });


  return router;
};
