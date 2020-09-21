module.exports = db => {
  const addUser = function (user) {
    const queryStr = {
      text: `INSERT INTO users (name, email, password) VALUES ( ($1, $2, $3) RETURNING *;`,
      values: [{ name, email, password } = user]
    }

    return db
      .query(queryStr)
      .then(res => res.rows[0])
  }

  return {
    addUser
  }
}
