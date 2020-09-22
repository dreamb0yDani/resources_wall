module.exports = db => {

  const addUser = function ({ name, email, password }) {
    const queryStr = {
      text: `INSERT INTO users (name, email, password) VALUES ( $1, $2, $3) RETURNING *;`,
      values: [name, email, password]
    }

    return db
    .query(queryStr)
    .then(res => {
      return res.rows[0]
    })
  }

  const getAllResources = function() {
    let queryStr = {
      text: `SELECT * FROM resources;`
    }

    return db
    .query(queryStr)
    .then(res => {
      return res.rows
    })
  }

  const addResource = function (resource, currentUser) {
    const queryStr = {
      text: `INSERT INTO resources (title, url, description, user_id, category_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;`,
      values: [resource.title, resource.url, resource.description, currentUser, resource.category]
    }

    return db
    .query(queryStr)
    .then (res => {
      return res.rows[0]
    })
  }

  const myResources = function (currentUser) {
    const queryStr = {
      text: `SELECT resources.* FROM resources JOIN users ON resources.user_id = users.id WHERE users.id = $1;`,
      values: [currentUser]
    }

    return db
    .query(queryStr)
    .then (res => {
      return res.rows
    })
  }

  return {
    addUser,
    getAllResources,
    addResource,
    myResources
  }
}
