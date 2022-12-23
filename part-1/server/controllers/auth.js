let bcrypt = require('bcryptjs');
const users = [];
startingId = 1;

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;
    let userObj;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        userObj = users[i];
      }
    }
    if (!userObj) {
      res.status(200).send({
        success: false,
        message: 'user with that email does not exist',
      });
      return;
    }
    bcrypt.compare(password, userObj.hash).then((isMatching) => {
      if (isMatching) {
        res.send(userObj);
      }
      console.log(userObj.hash);
    });
  },
  register: (req, res) => {
    let { username, email, firstName, lastName, password } = req.body;
    let saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.send({ success: false });
        return;
      }
      users.push({
        username,
        email,
        hash,
        firstName,
        lastName,
        id: startingId++,
      });
    });
    res.status(200).send(req.body);
  },
};
