const express = require('express');
const bodyParser = require('body-parser') // Middleware for reading JSON files.
const cors = require('cors'); // for working in localhost in safely
const knex = require('knex'); // connecting server to database
const bcrypt = require('bcrypt');
const saltRounds = 10;
const morgan = require('morgan'); // for logging

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req,res) => res.send('its working'))
app.post('/signin', (req,res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})