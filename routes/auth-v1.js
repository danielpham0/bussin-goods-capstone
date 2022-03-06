import express from 'express';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import 'dotenv/config'

var router = express.Router();

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL,
  ClientId: process.env.COGNITO_CLIENT
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

router.post('/signup', function(req, res, next) {
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirm_password

  if (password !== confirmPassword) {
    res.type("json")
    res.status(500)
    res.send({status: 'error', error: 'Passwords are not the same.'})
    return
  }

  const emailAttr = new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: 'email',
    Value: email
  })

  userPool.signUp(email, password, [emailAttr], null, (err, data) => {
    if (err) {
      res.type("json")
      res.status(500)
      res.send({status: 'error', error: err})
      return
    }
    res.type("json")
    res.send(data.user)
  })
});

router.post('/login', function(req,res) {
  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username:  req.body.email,
    Password: req.body.password
  })
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: req.body.email,
    Pool: userPool
  })

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: data => {
      res.cookie("accessToken", data.getIdToken().getJwtToken(), {httpOnly: true});
      res.type("json")
      res.send({status: "success"});
    },
    onFailure: err => {
      res.type("json")
      res.status(500)
      res.send({status: 'error', error: err})
    }
  })
})

router.get('/logout', async function(req,res) {
  if(req.userId){
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: req.userId,
      Pool: userPool
    })

    await cognitoUser.signOut()
    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly:true,
    });
  }
  res.type("json")
  res.send({status: "success"})
})

export default router;
