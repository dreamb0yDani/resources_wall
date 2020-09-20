/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });


  // register route for the user
  router.get("/resources", (req, res) => {
    // all the resrouces form the database regardless of the user.
    res.send("testing")
  });


  router.post("/resources", (req, res) => {
    // postig the resource to the database.
  });

  router.get("/users/:id/resource", (req, res) => {
    // user's resources
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
