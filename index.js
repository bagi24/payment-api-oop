require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const CardPayment = require('./classes/CardPayment');
const PaypalPayment = require('./classes/PaypalPayment');
const PaymentModel = require('./models/PaymentModel');

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.post('/pay', async (req, res) => {
  const { type, amount, cardNumber, email } = req.body;

  try {
    let paymentInstance;

    if (type === 'card') {
      paymentInstance = new CardPayment(amount, cardNumber);
    } else if (type === 'paypal') {
      paymentInstance = new PaypalPayment(amount, email);
    } else {
      return res.status(400).json({ error: 'გადახდის ტიპი არასწორია.' });
    }

    const message = paymentInstance.pay();

    const newPayment = new PaymentModel({
      type,
      amount,
      details: message,
    });

    await newPayment.save();
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: 'შიდა სერვერის შეცდომა.' });
  }
});

app.get('/payments', async (req, res) => {
  const payments = await PaymentModel.find().sort({ createdAt: -1 });
  res.json(payments);
});

app.listen(3000, () => {
  console.log('🚀 სერვერი გაშვებულია http://localhost:3000');
});
