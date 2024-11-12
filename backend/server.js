import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/new-authentication";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000",  // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
  credentials: true  // Enable if using cookies or sessions
};



// Add middlewares to enable cors and json body parsing
app.use(cors(corsOptions));
app.use(express.json());

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  accessToken: {type: String, default: ()=> crypto.randomBytes(128).toString("hex")}
})

const User = mongoose.model('user', UserSchema)

// Sign up (create new user) POST
app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try{
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
    }
  }catch (error){
    res.status(400).json({
      success: false,
      response: error
    });
  }
});

//Log in (find user and validate the password) POST
app.post('/login', async (req, res) =>{
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});

//Middleware that checks accessTokens that are created when a user is registered
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}

//This is the endpoint that only can be reached if you have a valid accesstoken
app.get('/main', authenticateUser);
app.get("/main", (req, res) => {
  const secret = "Congratulations, you are in!"
  try{
    res.status(200).json({
      success: true,
      secret,
    });
  } catch(error){
    res.status(401).json({
      success: false,
      response: "Access denied",
    });
  }
})

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello!");
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
