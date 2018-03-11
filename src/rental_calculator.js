import Customer from "./customer";
import Rental from "./rental";
import { createMovie } from "./movie";

function getTotalBill(rentals) {
  const sum = (a, b) => a + b;
  return rentals.map(r => r.getBill()).reduce(sum, 0);
}

function incrementRenterPointsForCustomer(rentals, c) {
  for (let r of rentals) {
    c.incrementRentalPoints();
    if (r.qualifiedForBonusRenterPoints()) c.incrementRentalPoints();
  }
}

function statement(customer, movies) {
  const c = new Customer({ name: customer.name });
  const rentals = customer.rentals.map(rental => {
    const movieDetails = movies[rental.movieID];
    const movie = createMovie({
      id: rental.movieID,
      title: movieDetails.title,
      code: movieDetails.code
    });
    return new Rental({ movie: movie, days: rental.days });
  });
  let result = `Rental Record for ${c.name}\n`;

  for (let r of rentals) {
    let bill = r.getBill();
    result += `\t${r.movie.title}\t${bill}\n`;
  }

  // add footer lines
  const totalBill = getTotalBill(rentals);
  result += `Amount owed is ${totalBill}\n`;

  incrementRenterPointsForCustomer(rentals, c);
  result += `You earned ${c.frequentRenterPoints} frequent renter points\n`;

  return result;
}

export { statement };
