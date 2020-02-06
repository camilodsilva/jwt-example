import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const jwtConfig = {
  secret: "mySecret",
  config: {
    issuer: "Camilo",
    subject: "JWT simple exemple",
    expiresIn: "7d"
  }
};

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const token = await jwt.sign(
    { email, password },
    jwtConfig.secret,
    jwtConfig.config
  );

  return res.json({ token });
});

/**
 * authentication layer (also known as authentication middleware)
 */
app.use(async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined)
    return res.status(400).json({ message: "Authorization header not found!" });

  const token = authorization.split(" ")[1];

  if (token === undefined)
    return res.status(400).json({ message: "Token not found!" });

  const decodedToken = await jwt.decode(token);

  if (decodedToken === null)
    return res.status(400).json({ message: "Invalid token!" });

  req.loggedUser = decodedToken;

  return next();
});

app.get("/protected", (req, res) => {
  return res.json({ protected: true, user: req.loggedUser });
});

app.listen(3333);
