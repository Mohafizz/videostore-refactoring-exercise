import { NewMovie } from "./movie";

class Rental {
  constructor({ movie, days }) {
    this.movie = movie;
    this.days = days;
  }

  getBill() {
    return this.movie.getBillForRental(this.days);
  }

  qualifiedForBonusRenterPoints() {
    return this.movie instanceof NewMovie && this.days > 2;
  }
}

export default Rental;
