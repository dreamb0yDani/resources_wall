module.exports = db => {

  const addUser = function ({ name, email, password }) {
    console.log(name, email, password)
    const queryStr = {
      text: `INSERT INTO users (name, email, password) VALUES ( $1, $2, $3) RETURNING *;`,
      values: [name, email, password]
    }

    return db
      .query(queryStr)
      .then(res => {
        res.rows[0]
      })
  }

  return {
    addUser
  }
}
