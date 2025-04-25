const Payment = require('./Payment');

class CardPayment extends Payment {
  #cardNumber;

  constructor(amount, cardNumber) {
    super(amount);
    this.#cardNumber = cardNumber;
  }

  pay() {
    return `\uD83D\uDCB3 გადახდა ბარათით: ${this.amount} ₾ (ბარათი: ****${this.#cardNumber.slice(
      -4
    )})`;
  }
}

module.exports = CardPayment;
