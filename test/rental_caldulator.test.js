const statement = require("../src/rental_calculator");

const regularMovie = {
  movieID: "F001",
  details: { title: "Ran", code: "regular" }
};

const childrenMovie = {
  movieID: "F002",
  details: { title: "Harry Potter", code: "children" }
};

const newMovie = {
  movieID: "F003",
  details: { title: "Star Wars", code: "new" }
};

let movies = {
  [newMovie.movieID]: newMovie.details,
  [regularMovie.movieID]: regularMovie.details,
  [childrenMovie.movieID]: childrenMovie.details
};

describe("Movie Rental Application", () => {
  it("should display customer name in the rental bill", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: regularMovie.movieID, days: 1 }]
    };

    expect(statement(customer, movies)).toMatch(/Rental Record for martin/);
  });

  it("should calculate rental bill for a regular movie when it's rented for less than two days", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: regularMovie.movieID, days: 1 }]
    };

    expect(statement(customer, movies)).toMatch(/Ran\s+2\n/);
  });

  it("should calculate rental bill for a regular movie when it's rented for more than two days", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: regularMovie.movieID, days: 3 }]
    };

    expect(statement(customer, movies)).toMatch(/Ran\s+3.5\n/);
  });

  it("should calculate rental bill for a new movie ", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: newMovie.movieID, days: 3 }]
    };

    expect(statement(customer, movies)).toMatch(/Star Wars\s+9\n/);
  });

  it("should calculate rental bill for a children movie when it's rented for less than or equal to three days", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: childrenMovie.movieID, days: 3 }]
    };

    expect(statement(customer, movies)).toMatch(/Harry Potter\s+1.5\n/);
  });

  it("should calculate rental bill for a children movie when it's rented for more than three days", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: childrenMovie.movieID, days: 4 }]
    };

    expect(statement(customer, movies)).toMatch(/Harry Potter\s+3\n/);
  });

  it("should add a new frequent renter point for each new rent by default", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: regularMovie.movieID, days: 3 }]
    };

    expect(statement(customer, movies)).toMatch(/1 frequent renter points\n/);
  });

  it("should add bonus frequent renter point for each rent on new movie with more than 2 days", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: newMovie.movieID, days: 3 }]
    };

    expect(statement(customer, movies)).toMatch(/2 frequent renter points\n/);
  });

  it("should calculate the total rental amount when there is only one movie", () => {
    let customer = {
      name: "martin",
      rentals: [{ movieID: newMovie.movieID, days: 3 }]
    };

    expect(statement(customer, movies)).toMatch(/Amount owed is 9\n/);
  });

  it("should calculate the total rental amount when there are multiple movies", () => {
    let customer = {
      name: "martin",
      rentals: [
        { movieID: newMovie.movieID, days: 3 },
        { movieID: regularMovie.movieID, days: 1 }
      ]
    };

    expect(statement(customer, movies)).toMatch(/Amount owed is 11\n/);
  });
});
