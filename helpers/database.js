module.exports = db => {

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
  }

  const getAllResources = function () {
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
      .then(res => {
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
      .then(res => {
        return res.rows
      })
  }

  const getUserByID = function (id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id])
      .then(res => {
        console.log('in getUserByID; result is: ', res.rows[0])
        return res.rows[0];
      });
  }

  const getUserByEmail = function (email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(res => res.rows[0]);
  }

  const updateUserName = function (id, name) {
    return db.query(`UPDATE users SET name = $2 WHERE id = $1 RETURNING *`, [id, name])
      .then(res => res.rows[0]);
  }

  const updateUserEmail = function (id, email) {
    return db.query(`UPDATE users SET email = $2 WHERE id = $1 RETURNING *`, [id, email])
      .then(res => res.rows[0]);
  }

  const updateUserPassword = function (id, password) {
    return db.query(`UPDATE users SET password = $2 WHERE id = $1 RETURNING *`, [id, password])
      .then(res => res.rows)[0];
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
    myResources
  }
}
