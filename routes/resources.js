/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = ({ getAllResources, addResource, myResources, getResourceByID, addResourceReview }) => {

  // router.get("/api/resources", (req, res) => {
  //   let query = `SELECT * FROM resources`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const resources = data.rows;
  //       res.json({ resources });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });



  // go to main page
  router.get("/resources", (req, res) => {
    // all the resrouces form the database regardless of the user.
    getAllResources()
      .then(data => {
        const resources = data;
        const templateVars = {
          resourceList: resources
        };
        res.render("main_page", templateVars)
      })
      .catch(e => res.send(e));
  });


  router.post("/resources", (req, res) => {

    const resource = req.body;
    const currentUser = req.session.user_id;

    addResource(resource, currentUser)
      .then(res => {
        res.redirect("/resources")
      })
      .catch(e => res.send(e));
  });


  router.get("/users/:id/resources", (req, res) => {
  //   // myResource page!
  // I don't think we need the id here (/users/:id/resources)? /users/resources should just return the result of the resource query that is performed using the user_id cookie?

    // const currentUser = req.session.user_id;
    const currentUser = req.params.id;

    myResources(currentUser)
      .then(data => {
        const resources = data;
        const templateVars = {
          resourceList: resources,
          // user: currentUser
        };
        res.render("user_resources", templateVars);
      })
      .catch(e => res.send(e));
  });



  router.get("/resources/:id", (req, res) => {
    // accessa specific resources
    const resourceID = req.params.id;

    getResourceByID(resourceID)
      .then(data => {
        const resource = data[0];
        const templateVars = {
          aResource: resource
        }
        res.render('resource', templateVars);
      })
      .catch(e => res.send(e));
  });

  router.post("/resources/:id/reviews", (res, req) => {
    // posting the reviews for a specific resource
    // form with textarea, button and rating.

    const review = req.body; // .comment, .liked, .rating
    const currentUser = req.session.user_id;
    const resourceID = req.params.id;

    addResourceReview(review, currentUser, resourceID)
      .then(res => {
        res.redirect("/resources/:id")
      })
      .catch(e => res.send(e));

  });

  return router;
};
