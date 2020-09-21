/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  /*
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
  */


  // go to main page
  router.get("/resources", (req, res) => {
    // all the resrouces form the database regardless of the user.

    //insert the result of the resources query into template
    let query = `SELECT * FROM resources`;
    //console.log(query);

    db.query(query)
      .then(data => {
        const resources = data.rows;
        console.log(resources);
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
    let query = `
      INSERT INTO resources (title, url, description, user_id, category_id)
      VALUES(${resourceTitle}, ${resourceUrl}, ${resourceDescription}, ${currentUser}, ${resourceCategory})
      RETURNING *
    `;

    db.query(query)
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

    //const currentUserID = req.session.user_id;
    let query = `SELECT resources.* FROM resources JOIN users ON resources.user_id = users.id WHERE users.id = 2`;
    //console.log(query);
    db.query(query)
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

    let query = `SELECT * FROM resources WHERE resources.id = ${resourcesId}`;
    console.log(query);

    db.query(query)
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
    const resourcesId = req.params.id;

    //modularize into addResource function later (->tweeter 'saveTweet' )
    let query = `
      INSERT INTO resources (title, url, description, user_id, category_id)
      VALUES(${reviewComment}, ${reviewLiked}, ${reviewRating}, ${currentUser}, ${resourcesId})
      RETURNING *
    `;

    db.query(query)
      .then(data => {
        const review = data.rows[0]
        //console.log(res.rows[0]);
        res.status(201).send(review); //?
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
