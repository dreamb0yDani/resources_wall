/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/api/resources", (req, res) => {
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



  // go to main page
  router.get("/resources", (req, res) => {
    // all the resrouces form the database regardless of the user.

    //insert the result of the resources query into template
    let query = `SELECT * FROM resources`;
    //console.log(query);

    db.query(query)
      .then(data => {
        const resources = data.rows;
        //console.log(resources);
        const templateVars = {
          resourceList: resources
        }
        res.render("main_page", templateVars);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  router.post("/resources", (req, res) => {

    const currentUser = req.session.user_id;
    const resourceTitle = req.body.title;
    const resourceUrl = req.body.url;
    const resourceDescription = req.body.description;
    const resourceCategory = req.body.category;

    //modularize into addResource function later
    const queryText = `
      INSERT INTO resources (title, url, description, user_id, category_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const queryValues = [resourceTitle, resourceUrl, resourceDescription, currentUser, resourceCategory];

    db.query(queryText, queryValues)
      .then(res => {
        //console.log(res.rows[0]);
        res.redirect("main_page")   //should we redirect to /resources/:id instead?
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/users/:id/resources", (req, res) => {
    // myResource page!

    const currentUserId = req.session.user_id;
    const queryText = `SELECT resources.* FROM resources JOIN users ON resources.user_id = users.id WHERE users.id = $1`;
    //console.log(query);
    db.query(queryText, [currentUserId])
      .then(data => {
        const resources = data.rows;
        //console.log(resources);
        const templateVars = {
          resourceList: resources
        }
        res.render("user_resources", templateVars);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  router.get("/resources/:id", (req, res) => {
    // accessa speicific resources
    const resourcesId = req.params.id;

    let queryText = `SELECT * FROM resources WHERE resources.id = $1`;
    const queryValues = [resourcesId];
    //console.log(query);

    db.query(queryText, queryValues)
      .then(data => {
        const specificResource = data.rows[0];

        const templateVars = {
          aResource: specificResource
        }
        res.render('resource', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/resources/:id/reviews", (res, req) => {
    // posting the reviews for a specific resource
    // form with textarea, button and rating.

    const currentUser = req.session.user_id;
    const reviewComment = req.body.comment;
    const reviewLiked = req.body.liked; //=> event handler later
    const reviewRating = req.body.rating;
    const resourceId = req.params.id;

    //modularize into addResource function later (->tweeter 'saveTweet' )
    const queryText = `
      INSERT INTO resources (title, url, description, user_id, category_id)
      VALUES($1, $2, $3, $4, $5)
    `;
    const queryValues = [reviewComment, reviewLiked, reviewRating, currentUser, resourceId]

    //authentication logic - may want to do it in AJAX instead of redirecting to
    //prompt login page?
    //if user is not logged-in- PROMOPT login ->

    db.query(queryText, queryValues)
      .then(data => {
        //const review = data.rows[0]
        //console.log(res.rows[0]);
        res.status(201).send(); //?
      })
      //review to be appended to resource page -->to be appended by event handler
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
