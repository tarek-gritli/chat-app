import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken";
import User from "../models/User";

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmedPassword,
      gender,
      profilePicture,
    } = req.body;

    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User with this username already exists" });
    }
    let pfp = profilePicture;
    if (!pfp) {
      pfp = `https://avatar.iran.liara.run/public/${
        gender === "male" ? "boy" : "girl"
      }?username=${username}`;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: pfp,
    });
    const token = generateToken(newUser._id.toString());
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        _id: newUser._id,
        username,
        fullName,
        profilePicture: pfp,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });

    if (!userExists) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateToken(userExists._id.toString());

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        _id: userExists._id,
        username: userExists.username,
        fullName: userExists.fullName,
        profilePicture: userExists.profilePicture,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
