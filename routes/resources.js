/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // register route for the user
  router.get("/resources", (req, res) => {
    // all the resrouces form the database regardless of the user.
    res.render("main_page")
  });


  router.post("/resources", (req, res) => {
    // postig the resource to the database.
    res.redirect("main_page")
  });

  router.get("/users/:id/resources", (req, res) => {
    // user's resources
    res.render("user_resrouces")
  });

  router.get("/resources/:id", (req, res) => {
    // accessa speicific resources
  });

  router.post("/resources/:id/reviews", (res, req) => {
    // posting the reviews for a specific resource
    // form with textarea, button and rating.

  });

  return router;
};
