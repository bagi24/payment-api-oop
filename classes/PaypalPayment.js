const Payment = require('./Payment');

class PaypalPayment extends Payment {
  #email;

  constructor(amount, email) {
    super(amount);
    this.#email = email;
  }

  pay() {
    return `\uD83D\uDCBB გადახდა PayPal-ით: ${this.amount} ₾ (მომხმარებელი: ${this.#email})`;
  }
}

module.exports = PaypalPayment;
