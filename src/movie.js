class Movie {
  constructor({ id, title, code }) {
    this.id = id;
    this.title = title;
    this.code = code;
  }
}

export class ChildrenMovie extends Movie {
  constructor({ id, title }) {
    super({ id, title, code: "children" });
  }

  getBillForRental(days) {
    let bill = 1.5;
    if (days > 3) {
      bill += (days - 3) * 1.5;
    }
    return bill;
  }
}

export class NewMovie extends Movie {
  constructor({ id, title }) {
    super({ id, title, code: "new" });
  }

  getBillForRental(days) {
    return days * 3;
  }
}

export class RegularMovie extends Movie {
  constructor({ id, title }) {
    super({ id, title, code: "regular" });
  }

  getBillForRental(days) {
    let bill = 2;
    if (days > 2) {
      bill += (days - 2) * 1.5;
    }
    return bill;
  }
}

export function createMovie({ id, title, code }) {
  if (code == "new") return new NewMovie({ id, title });
  if (code == "regular") return new RegularMovie({ id, title });
  if (code == "children") return new ChildrenMovie({ id, title });
  throw new Error("Unknown movie code " + code);
}

export default Movie;
