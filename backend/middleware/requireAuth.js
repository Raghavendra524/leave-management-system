const jwt = require("jsonwebtoken");
var connection = require("../connection").databaseConnection;

const requireAuth = async (req, res, next) => {
  // verify authentication
  //   console.log(req.headers);
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: `Authorization token require.` });
  }
  const token = authorization.split(" ")[1];
  console.log(token);

  try {
    let { id } = jwt.verify(token, process.env.SECRETFORJWT);
    const Studentuser = await connection.query(
      "select id from Student where id = ?",
      id,
      async (err, result) => {
        if (err) throw err;
        if (!result) throw Error("Incorrect email");
        return result;
      }
    );
    req.Studentuser = Studentuser[0][0].id;
    next();
  } catch (err) {
    res.status(401).json({ error: `request is not authorized ${err}` });
  }
};

module.exports = requireAuth;
