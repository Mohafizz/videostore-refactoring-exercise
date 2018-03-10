class Rental {
  constructor({ movie, days }) {
    this.movie = movie;
    this.days = days;
  }

  getCost() {
    let thisAmount = 0;

    // determine amount for each movie
    switch (this.movie.code) {
      case "regular":
        thisAmount = 2;
        if (this.days > 2) {
          thisAmount += (this.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = this.days * 3;
        break;
      case "children":
        thisAmount = 1.5;
        if (this.days > 3) {
          thisAmount += (this.days - 3) * 1.5;
        }
        break;
      default:
        throw new Error("Invalid move type:" + this.movie.code);
    }
    return thisAmount;
  }

  isEligibleForBonusRenterPoint() {
    return this.movie.code === "new" && this.days > 2;
  }
}

module.exports = Rental;
