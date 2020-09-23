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
          resourceList: resources,
          user: req.session.user_id
        };
        res.render("main_page", templateVars)
      })
      .catch(e => res.send(e));
  });


  router.post("/resources", (req, res) => {

    const resource = req.body;
    const currentUser = req.session.user_id;
    // had issues getting page to redirect inside of promise. Removed promise and everything seems to function just fine?
    // fyi the weird error we were getting when testing the user review form from earlier is a PG error related to an improperly structured query.
    // I encountered it in this scenario, and it was a result of attempting to push a text value to a table field that requires integers.
    // Realized that Resource Wall is literally only supposed to be for learning and educational purposes. Need to redo categories? Tutorial/video/article/etc?
    addResource(resource, currentUser);
      // .then(res => {
      //   res.redirect("/resources")
      // })
      // .catch(e => res.send(e));
    res.redirect("/resources");
  });


  router.get("/users/:id/resources", (req, res) => {
    //   // myResource page!
    const currentUser = req.params.id;

    myResources(currentUser)
      .then(data => {
        const resources = data;
        const templateVars = {
          resourceList: resources,
          user: req.session.user_id
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
          aResource: resource,
          user: req.session.user_id,
          id: req.params.id
        }
        res.render('resource', templateVars);
      })
      .catch(e => res.send(e));
  });

  router.post("/resources/:id/reviews", (req, res) => {
    // posting the reviews for a specific resource
    // form with textarea, button and rating.

    const review = req.body; // .comment, .liked, .rating
    console.log(review)
    const currentUser = req.session.user_id;
    const resourceID = req.params.id;

    addResourceReview(review, currentUser, resourceID)
      .then(res => {
        console.log(res)
        res.redirect("/resources/:id")
      })
      .catch(e => res.send(e));

  });

  return router;
};
