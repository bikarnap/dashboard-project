const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
  console.log('user', user)
  // const passwordCorrect = (user === null)
  //     ? false
  //     : await bcrypt.compare(password, user.passwordHash)
  // ;
  // console.log(await bcrypt.compare(password, user.passwordHash))
  // console.log(password, user.passwordHash)

  // if (!(user.username === username && passwordCorrect)) {
  //   return res.status(401).json({
  //     error: 'invalid username or password'
  //   });
  // }

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  console.log('userForToken', userForToken)

  // this token expires in 60 * 60 seconds, i.e., 1 hour
  const token = jwt.sign(
    userForToken,
    'mysecret',
    {expiresIn: 60*60}
   );

  res
    .status(200)
    .send({ token })
  ;

});

module.exports = loginRouter