const router = require("express").Router();
const { authenticateUser } = require("../middlewares/authentication");

router.post("/", authenticateUser, async (req, res) => {
  const { token } = req;
  const { username } = req.body;
  const result = {
    username,
    token,
  };
  res.status(200).json(result);
});

module.exports = router;
