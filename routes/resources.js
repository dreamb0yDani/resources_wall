/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = ({ getAllResources, addResource, myResources, getResourceByID, addResourceReview, getQueryResource, getAllReviews, addResourceTopic, getResourceIDReviewID, getLike }) => {

  router.get("/api/resources/", (req, res) => {

    const { search } = req.query;

    if (!search) {
      getAllResources()
        .then(data => {
          res.json({ data });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      getQueryResource(search)
        .then(result => {
          res.json(result)
        })
        .catch(err => err.message)
    }
  });

  router.get("/api/resources/:id", (req, res) => {

    const resourceID = req.params.id;
    console.log(resourceID, "check")

    getResourceByID(resourceID)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })

  router.get("/api/resources/:id/reviews", (req, res) => {

    const resourceID = req.params.id;
    console.log(resourceID, "check")

    getAllReviews(resourceID)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })

  router.get("/api/resources/:id/reviews/:r_Id", (req, res) => {

    const { id, r_Id } = req.params;
    console.log(req.params)

    getResourceIDReviewID(r_Id, id)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })

  router.get("/api/resources/:id/reviews/:r_Id/liked", (req, res) => {

    const { id, r_Id } = req.params;

    getLike(r_Id, id)
      .then(reviewsList => {
        res.json(reviewsList)
      })
      .catch(err => err.message)
  })



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
    addResource(resource, currentUser)
      .then(data => {
        const addedResource = data[0];
        if (resource.topic) {
          addResourceTopic(resource.topic, addedResource.id);
        }
      })
    res.redirect("/resources");
  });


  router.get("/users/:id/resources", (req, res) => {
    //   // myResource page!
    const currentUser = req.session.user_id;
    myResources(currentUser)
      .then(data => {
        const resources = data;
        const templateVars = {
          resourceList: resources,
          user: currentUser
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
        const resource = data;
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

    //   const review = req.body; // .comment, .liked, .rating
    //   console.log(review)
    const currentUser = req.session.user_id;
    const resourceID = req.params.id;

    console.log(req.body)
    addResourceReview(review, currentUser, resourceID)
      .then(res => {
        res.redirect("/resources/:id")
      })
      .catch(e => res.send(e));

  });

  return router;
};
