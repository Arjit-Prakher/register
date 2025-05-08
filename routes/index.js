var express = require('express');
const getToken = require('./tokenGenerator');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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
      res.redirect("/login");
      
    }
    else {
      console.log("User exists");
      res.redirect("/login");
    }

  } catch (error) {
    console.log(error);
  }
  // let taken_name = req.body.username;
  // console.log("Taken name: ", taken_name);
  // console.log("From result: ", result.docs[0]);

  // if(taken_name === result.docs[0]) {
  //   console.log("Users exists");
  // }
  // else {
  //   console.log("Creating new user");
  //   const newResponse = await fetch(`${base_url}/users`, requestOptions_add_doc);
  //   const newResult = await newResponse.json();
  //   console.log("Docuemnt added: ", newResult);
  //   res.redirect("/login");
  // }

  // console.log("This ran: ",result.docs[0].name);


});


// Login logic

// router.post('/login', async function (req, res) {
//   
// });

module.exports = router;
