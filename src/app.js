const statement = require("./rental_calculator");

let customer = {
  name: "martin",
  rentals: [{ movieID: "F001", days: 3 }, { movieID: "F002", days: 1 }]
};

let movies = {
  F001: { title: "Ran", code: "regular" },
  F002: { title: "Trois Couleurs: Bleu", code: "regular" }
};

/* eslint-disable no-console */
console.log(statement(customer, movies));
