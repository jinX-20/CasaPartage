User = require("../models/user.cjs");
bcrypt = require("bcrypt");
JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
    const data = req.body.data;
    const name = data.name;
    const email = data.email;
    const password = data.password;
    try {        
        // Validation
        if(!name || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }

        // check if the user already exists
        const existing = await User.findOne({ email })
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
        const newUser = await User.create({name, email, password: hashedPassword})
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
    const data = req.body.data;
    const email = data.email;
    const password = data.password;
    try {
        // Validation
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // checking the user
        const existingUser = await User.findOne({ email });
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
            expiresIn: "1d"
        })

        const userData = { ...existingUser._doc };
        delete userData.password; 

        // set the cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path:"/",
        });
        

        res.status(200).send({
            success: true,
            message: 'Login successfully',
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

const getMe = async (req, res) => {
    console.log("HERE IN GETME");
    try {
        console.log(req.headers.cookie);
        console.log(req.cookies);
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ user: null });
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        res.json({ user });
    } catch {
        res.status(401).json({ user: null });
    }
};

module.exports = { registerController, loginController, getMe };