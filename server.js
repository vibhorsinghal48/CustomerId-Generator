const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb+srv://admin:password%40123@cluster0.2xisxiz.mongodb.net/randomCustomerId');


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  customerId: { type: String, unique: true, required: true }
});

const User = mongoose.model('User', userSchema);


function generateCustomerId() {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let customerId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    customerId += characters.charAt(randomIndex);
  }

  return customerId;
}


app.post('/register', async (req, res) => {
  const { email, phone } = req.body;

  try {
    // Check if the email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or mobile number already registered' });
    }

    
    const customerId = generateCustomerId();

    
    const newUser = new User({ email, phone, customerId });
    await newUser.save();

    res.status(201).json({ customerId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
