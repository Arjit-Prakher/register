var express = require('express');
const getToken = require('./tokenGenerator');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.get('/landing', function (req, res, next) {
  res.render('landing');
});
router.get('/login', function (req, res) {
  res.render('login');
});

// Register logic

router.post('/register', async function (req, res) {
  const base_url = "https://0917669a-e8cf-4c9d-a783-99b208116af3-bluemix.cloudantnosqldb.appdomain.cloud";


  const token = await getToken();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions_add_doc = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name": req.body.username,
      "email": req.body.email
    })
  };

  const requestOptions_find = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "fields": ["name"],
      "selector": {
        "name": {
          "$eq": req.body.username
        }
      }
    })
  };

  try {
    const response = await fetch(`${base_url}/users/_find`, requestOptions_find);
    const result = await response.json();

    if (result.docs[0] === undefined) {

      console.log("Creating new user");
      const newResponse = await fetch(`${base_url}/users`, requestOptions_add_doc);
      const newResult = await newResponse.json();
      console.log("Docuemnt added: ", newResult);


      res.redirect("/landing");

    }
    else {
      console.log("User exists");
      res.send("User already exists..");
    }

  } catch (error) {
    console.log(error);
  }

});


// Login logic

router.post('/login', async function (req, res) {
  const base_url = "https://0917669a-e8cf-4c9d-a783-99b208116af3-bluemix.cloudantnosqldb.appdomain.cloud";
  const token = await getToken();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions_find = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "fields": ["name"],
      "selector": {
        "name": {
          "$eq": req.body.username
        }
      }
    })
  };

  try {
    const response = await fetch(`${base_url}/users/_find`, requestOptions_find);
    const result = await response.json();
    if (result.docs[0] === undefined) {

      // res.send("User does not exists");
      // res.redirect("/register");
      res.render('register', { message: 'User does not exisit' });

    }
    else {
      const username = result.docs[0].name;
      // console.log(username);
      res.render('landing', { name: `${username}` });
    }

  } catch (error) {
    console.log("Something went wrong", error);
  }

});

module.exports = router;
