import express from 'express';
import bcrypt from 'bcrypt';
import User from '../modules/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
     const { email, password } = req.body;

     try {

          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(400).json({ message: 'Email already registered' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ email, password: hashedPassword });
          await newUser.save();
          res.status(201).json({ message: 'User registered successfully' });
     } catch (error) {
          res.status(500).json({ message: 'Error registering user' });
     }
});

router.post('/login', async (req, res) => {
     const { email, password } = req.body;
     try {
          const user = await User.findOne({ email });

          if (!user) {
               return res.status(401).json({ message: 'Authentication failed' });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
               return res.status(401).json({ message: 'Authentication failed' });
          }
          res.status(200).json({ message: 'Authentication successful' , user});
     } catch (error) {
          console.log(error)
          res.status(500).json({ message: 'Error logging in' });
     }
});

export default router;
