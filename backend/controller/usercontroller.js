import UserPortfolio from "../models/portfoliomodel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
    try {
        const { username, password, fullName, title, bio, profileImage, email, linkedin, github, website, skills } = req.body;

        if (!username || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: "Username, password, and full name are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        if (email && !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (linkedin && !validator.isURL(linkedin)) {
            return res.status(400).json({
                success: false,
                message: "Invalid LinkedIn URL"
            });
        }

        if (github && !validator.isURL(github)) {
            return res.status(400).json({
                success: false,
                message: "Invalid GitHub URL"
            });
        }

        if (website && !validator.isURL(website)) {
            return res.status(400).json({
                success: false,
                message: "Invalid website URL"
            });
        }

        const exist = await UserPortfolio.findOne({ username: username.toLowerCase() });
        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPortfolio = new UserPortfolio({
            username: username.toLowerCase(),
            password: hashedPassword,
            fullName,
            title,
            bio,
            profileImage,
            contact: {
                email,
                linkedin,
                github,
                website,
            },
            skills,
        });

        await newPortfolio.save();

        // Dual save: Create minimal User record in 'users' collection
        const newAuthUser = new User({
            name: fullName,
            email: email || `${username}@example.com`,
            username: username.toLowerCase(),
            password: hashedPassword
        });
        await newAuthUser.save();

        const token = jwt.sign({ userId: newPortfolio._id }, JWT_SECRET || "fallbacksecret", { expiresIn: TOKEN_EXPIRES_IN });

        return res.status(201).json({
            success: true,
            message: "User registered successfully (dual save: portfolio + auth)",
            token,
            portfolio: {
                id: newPortfolio._id,
                username: newPortfolio.username,
                fullName: newPortfolio.fullName,
                title: newPortfolio.title,
            },
            authUser: {
                id: newAuthUser._id,
                name: newAuthUser.name,
                username: newAuthUser.username
            }
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const user = await UserPortfolio.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET || "fallbacksecret", { expiresIn: TOKEN_EXPIRES_IN });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                fullName: user.fullName,
                title: user.title,
                bio: user.bio,
                profileImage: user.profileImage,
                contact: user.contact,
                skills: user.skills,
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
}

