const user = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")

const registerController = async (req, res) => {
    const {name, email, password} = req.body;
    try {        
        // Validation
        if(!name || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }

        // check if the user already exists
        const existing = await user.findOne({ email })
        if(existing){
            return res.status(400).send({
                success: false,
                message: 'Email already registered, please Login'
            })
        }

        // hashing password
        const salt = bcrypt.genSaltSync(10); // always before creation
        const hashedPassword = await bcrypt.hash(password, salt);



        // create new user
        const newUser = await user.create({name, email, password: hashedPassword})
        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            newUser
        })
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
};

const loginController = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Validation
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // checking the user

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User Not Found'
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        // token creation
        const token = JWT.sign({id: existingUser._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        const userData = { ...existingUser._doc };
        delete userData.password; // password undefine kar diya

        res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            userData
        });

    } catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in Login API',
            error
        });
    }
};

module.exports = { registerController, loginController };