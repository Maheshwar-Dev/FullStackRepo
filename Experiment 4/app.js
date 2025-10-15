const inquirer = require("inquirer");
const express = require("express");

let employees = [];
let cards = [];
let seats = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  booked: false,
  lock: null
}));

function employeeCLI() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["Add", "View", "Delete", "Exit"]
      }
    ])
    .then(a => {
      switch (a.action) {
        case "Add":
          inquirer
            .prompt([
              { name: "name", message: "Enter name:" },
              { name: "role", message: "Enter role:" },
              { name: "salary", message: "Enter salary:" }
            ])
            .then(emp => {
              employees.push(emp);
              employeeCLI();
            });
          break;

        case "View":
          console.table(employees);
          employeeCLI();
          break;

        case "Delete":
          inquirer
            .prompt([{ name: "name", message: "Enter name to delete:" }])
            .then(({ name }) => {
              employees = employees.filter(e => e.name !== name);
              employeeCLI();
            });
          break;

        case "Exit":
          mainMenu();
          break;
      }
    });
}

function startCardAPI() {
  const app = express();
  app.use(express.json());

  app.get("/cards", (req, res) => res.json(cards));

  app.post("/cards", (req, res) => {
    const card = { id: Date.now(), ...req.body };
    cards.push(card);
    res.status(201).json(card);
  });

  app.put("/cards/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const i = cards.findIndex(c => c.id === id);
    if (i === -1) return res.sendStatus(404);
    cards[i] = { ...cards[i], ...req.body };
    res.json(cards[i]);
  });

  app.delete("/cards/:id", (req, res) => {
    const id = parseInt(req.params.id);
    cards = cards.filter(c => c.id !== id);
    res.sendStatus(204);
  });

  app.listen(3000, () => console.log("Card API running on port 3000"));
}

function startTicketSystem() {
  const app = express();
  app.use(express.json());

  app.get("/seats", (req, res) => res.json(seats));

  app.post("/lock/:id", (req, res) => {
    const s = seats.find(x => x.id == req.params.id);
    if (!s || s.booked || s.lock) return res.sendStatus(409);

    s.lock = Date.now();

    setTimeout(() => {
      if (!s.booked) s.lock = null;
    }, 5000);

    res.json({ locked: true });
  });

  app.post("/book/:id", (req, res) => {
    const s = seats.find(x => x.id == req.params.id);
    if (!s || s.booked || !s.lock) return res.sendStatus(409);

    s.booked = true;
    s.lock = null;

    res.json({ booked: true });
  });

  app.listen(3001, () => console.log("Ticket System running on port 3001"));
}

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Select mode:",
        choices: ["Employee CLI", "Card API", "Ticket System", "Exit"]
      }
    ])
    .then(a => {
      switch (a.choice) {
        case "Employee CLI":
          employeeCLI();
          break;
        case "Card API":
          startCardAPI();
          break;
        case "Ticket System":
          startTicketSystem();
          break;
        case "Exit":
          process.exit();
          break;
      }
    });
}

mainMenu();
