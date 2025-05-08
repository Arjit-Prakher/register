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

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name": req.body.username,
      "email": req.body.email
    })
  };

  try {
    const response = await fetch(`${base_url}/users`, requestOptions);
    const result = await response.json();
    // console.log("Docuemnt added: ", result);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});


// Login logic

// router.post('/login', async function (req, res) {
//   
// });

module.exports = router;
