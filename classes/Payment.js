class Payment {
  constructor(amount) {
    if (this.constructor === Payment) {
      throw new Error("Payment is abstract and can't be instantiated.");
    }
    this.amount = amount;
  }

  pay() {
    throw new Error("Method 'pay()' must be implemented.");
  }
}

module.exports = Payment;
