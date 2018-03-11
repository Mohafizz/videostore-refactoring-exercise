class Customer {
  constructor({ name }) {
    this.name = name;
    this.frequentRenterPoints = 0;
  }

  addRentalPoints() {
    this.frequentRenterPoints++;
  }
}

module.exports = Customer;
