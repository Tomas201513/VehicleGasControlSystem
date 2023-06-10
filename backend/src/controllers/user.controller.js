import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
export const getUsers = async (req, res) => {
  console.log('controller');
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: '$roles',
          count: { $sum: 1 },
        },
      },
    ]);

    const userCountsPromises = users.map(async (user) => {
      const userData = await User.findOne({ roles: user._id }).lean();
      return {
        roleName: userData.roles[0],
        count: user.count,
      };
    });

    const userCounts = await Promise.all(userCountsPromises);


    const usersdata = await User.find();
    res.status(200).json({ usersdata, userCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  console.log('controller');

  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  console.log('controller');

  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log('controller');

  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body, password: hashPassword }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  console.log('deleteUser controller');

  try {
    const user = await User.findById(req.params.id);

    // if (user.roles == 'admin') {
    //   return res.status(403).json({ message: `Admin can't be deleted!` });

    // }
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  console.log('controller');

    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

    