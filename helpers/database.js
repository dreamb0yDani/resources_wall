module.exports = db => {
  //------------------------------------------------------------------------------
  //  User Queries
  //------------------------------------------------------------------------------
  const addUser = function ({ name, email, password }) {
    const queryStr = {
      text: `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      values: [name, email, password]
    }
    return db
      .query(queryStr)
      .then(res => {
        return res.rows[0]
      })
      .catch(err => err.message)
  }

  const getUserByID = function (id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id])
      .then(res => {
        //console.log('in getUserByID; result is: ', res.rows[0])
        return res.rows[0];
      })
      .catch(err => err.message)
  }

  const getUserByEmail = function (email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(res => res.rows[0]);
  }

  const updateUserName = function (id, name) {
    return db.query(`UPDATE users SET name = $2 WHERE id = $1 RETURNING *`, [id, name])
      .then(res => {
        //console.log(res.rows[0]);
        return res.rows[0]
      });
  }

  const updateUserEmail = function (id, email) {
    return db.query(`UPDATE users SET email = $2 WHERE id = $1 RETURNING *`, [id, email])
      .then(res => {
        //console.log(res.rows[0]);
        return res.rows[0]
      });
  }

  const updateUserPassword = function (id, password) {
    return db.query(`UPDATE users SET password = $2 WHERE id = $1 RETURNING *`, [id, password])
      .then(res => {
        //console.log(res.rows[0]);
        return res.rows[0]
      });
  }

  //------------------------------------------------------------------------------
  //  Resource Queries
  //------------------------------------------------------------------------------

  const getAllResources = function () {
    return db.query(`SELECT * FROM resources;`)
      .then(res => res.rows);
  }

  const myResources = function (currentUser) {
    const queryStr = {
      text: `SELECT resources.* FROM resources JOIN users ON resources.user_id = users.id WHERE users.id = $1;`,
      values: [currentUser]
    }

    return db
      .query(queryStr)
      .then(res => {
        return res.rows
      })
  }

  const myLikedResources = function (currentUser) {
    const queryStr = {
      text: `SELECT * FROM reviews JOIN resources ON reviews.resource_id = resources.id WHERE reviews.user_id = $1 AND liked = true`,
      values: [currentUser]
    }

    return db
      .query(queryStr)
      .then(res => {
        return res.rows
      })
  }

  const getResourceByID = function (id) {
    const queryStr = {
      text: `SELECT * FROM resources JOIN topics ON resources.id = topics.resource_id JOIN categories ON resources.category_id = categories.id WHERE resources.id = $1`,
      values: [id]
    }

    return db
      .query(queryStr)
      .then(res => {
        //console.log(res.rows[0]);
        return res.rows[0];
      })
  }

  const addResource = function (resource, currentUser) {
    const queryStr = {
      text: `INSERT INTO resources (title, url, description, image_url, user_id, category_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
      values: [resource.title, resource.url, resource.description, resource.image, currentUser, resource.category]
    }

    return db
      .query(queryStr)
      .then(res => {
        return res.rows
      })
  }

  const addResourceReview = function (review, currentUser, resourceID) {
    const queryStr = {
      text: `INSERT INTO reviews (comment, liked, rating, user_id, resource_id)
      VALUES($1, $2, $3, $4, $5)`,
      values: [review.comment, review.liked, review.rating, currentUser, resourceID]
    }

    return db
      .query(queryStr)
      .then(res => {
        return res.rows[0]
      })
  }

  const addResourceTopic = function (topic, resourceID) {
    const queryStr = {
      text: `INSERT INTO topics (tag, resource_id)
      VALUES($1, $2)`,
      values: [topic, resourceID]
    }

    return db
      .query(queryStr)
      .then(res => {
        return res.rows[0]
      })
  }

  const getQueryResource = function (query) {
    const queryStr = {
      text: `SELECT resources.* FROM resources WHERE LOWER(title) LIKE $1;`,
      values: [`%${query}%`]
    }

    return db
      .query(queryStr)
      .then(res => {
        return res.rows
      })
      .catch(err => err.message)
  }

  const getAllReviews = function (resourceID) {
    //console.log('BBBBBBB');
    //console.log('inside getAllReiviews function; resourceID is ---', resourceID);
    const queryStr = {
      text: `SELECT reviews.* FROM reviews WHERE reviews.resource_id = $1;`,
      values: [resourceID]
    }
    return db
      .query(queryStr)
      .then(res => {
        //console.log(res.rows);
        return res.rows
      })
      .catch(err => err.message);
  }

  const getResourceIDReviewID = function (reviewID, resourceID) {
    const queryStr = {
      text: `SELECT reviews.* FROM reviews JOIN resources ON reviews.resource_id = resources.id WHERE reviews.id = $1 AND  reviews.resource_id = $2;`,
      values: [reviewID, resourceID]
    }
    return db
      .query(queryStr)
      .then(res => {
        // console.log(res.rows);
        return res.rows
      })
      .catch(err => err.message);
  }

  const getLike = function (reviewID, resourceID) {
    const queryStr = {
      text: `SELECT reviews.liked FROM reviews JOIN resources ON reviews.resource_id = resources.id WHERE reviews.id = $1 AND  reviews.resource_id = $2;`,
      values: [reviewID, resourceID]
    }
    return db
      .query(queryStr)
      .then(res => {
        // console.log(res.rows);
        return res.rows[0]
      })
      .catch(err => err.message);
  }

  return {
    addUser,
    getUserByID,
    getUserByEmail,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    getAllResources,
    addResource,
    myResources,
    getResourceByID,
    addResourceReview,
    getQueryResource,
    addResourceTopic,
    getAllReviews,
    getResourceIDReviewID,
    getLike,
    myLikedResources
  }
}
