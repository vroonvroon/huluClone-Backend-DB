const Users = require('../models/signup-model');
const bcrypt = require('bcrypt');

// POSTING USER INFO //
const SignUp = async (req,res) => {
    console.log(req.body);
    try {
      const { email, password, name, birthdate, zipcode, gender } = req.body;

      // CHECK IF USER ALREADY EXISTS //
      const userExists = await Users.findOne({email});
        if(userExists) {
          return res.status(400).json("User Exists");
        } else {

       // HASH PASSWORD // (this is commented because we want this logic to be clean. So now we will add this to controllers)
      //  const salt = await bcrypt.genSalt(10);
      //  const hashedPassword = await bcrypt.hash(password, salt);

      // CREATING USER (IF USER DOESNT EXIST)//
      const createUser = await Users.create({
         email,
        //  password: hashedPassword,
         password,
         name,
         birthdate: {
           month: birthdate.month,
           day: birthdate.day,
           year: birthdate.year
         },
         zipcode,
         gender
       });
       console.log(createUser);
        res.status(201).json({createUser, token: await createUser.generateToken(), userId: createUser._id.toString() });
      }
     } catch (err) {
       console.log("Error while creating your account", err);
     }
}

// LOGIN //
const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid email or password");
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json("Invalid email or password");
    }
    const userData = {
      token: await user.generateToken(),
      name: user.name,
      email: user.email,
    };
    res.status(200).json({
      userData
    });
  } catch (err) {
    console.log("Error while logging in", err);
    res.status(500).json("Internal Server Error");
  }
};


//GET USER LOGIC //
const User = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
  }
}


// UPDATE USER INFO //
const updateUser = async (req, res) => {
  console.log('params.id:', req.params.id);
    try {
      const id = req.params.id;
      const updatedUserData = req.body;

      const updatedData = await Users.updateOne({_id: id}, {$set: updatedUserData});
      res.status(200).json(updatedData);
  } catch (err) {
    console.log(err);
  }
}


// DELETE USER //
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Users.deleteOne({_id: id});
    console.log(response);
    res.status(200).json({message: 'User Deleted'});
  } catch (err) {
    console.log(err);
  }
}


module.exports = {SignUp, LogIn, User, deleteUser, updateUser};