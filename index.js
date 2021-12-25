const express = require("express");
const app = express();
const transactionService = require("./services/transactionService");
const towingService = require("./services/towingVanService");
const defaultsService = require("./services/defaultsService");
const customerService = require("./services/customerService");
const storeService = require("./services/storeService");
const garageService = require("./services/garageService");
const staffService = require("./services/staffService");
const productService = require("./services/productService");
const portNumber = 3000;

app.use(express.json()); // req.body

// ROUTES

//#region TRANSACTIONS
app.get("/transactions", async (req, res) => {
  try {
    res.json(await transactionService.getTransactions());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await transactionService.getTransaction(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/transactions", async (req, res) => {
  try {
    res.json(await transactionService.createTransaction(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await transactionService.updateTransaction(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await transactionService.deleteTransaction(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region DEFAULTS
app.get("/defaults", async (req, res) => {
  try {
    res.json(await defaultsService.getDefaults());
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region TOWING VANS
app.get("/towingVans", async (req, res) => {
  try {
    res.json(await towingService.getTowingVans());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/towingVans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await towingService.getTowingVan(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/towingVans", async (req, res) => {
  try {
    res.json(await towingService.createTowingVan(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/towingVans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await towingService.updateTowingVan(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/towingVans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await towingService.deleteTowingVan(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region CUSTOMERS
app.get("/customers", async (req, res) => {
  try {
    res.json(await customerService.getCustomers());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await customerService.getCustomer(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/customers", async (req, res) => {
  try {
    res.json(await customerService.createCustomer(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await customerService.updateCustomer(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await customerService.deleteCustomer(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region STORES
app.get("/stores", async (req, res) => {
  try {
    res.json(await storeService.getStores());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await storeService.getStore(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/stores", async (req, res) => {
  try {
    res.json(await storeService.createStore(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await storeService.updateStore(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await storeService.deleteStore(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region GARAGE
app.get("/garages", async (req, res) => {
  try {
    res.json(await garageService.getGarages());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/garages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await garageService.getGarage(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/garages", async (req, res) => {
  try {
    res.json(await garageService.createGarage(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/garages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await garageService.updateGarage(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/garages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await garageService.deleteGarage(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region STAFF
app.get("/staffs", async (req, res) => {
  try {
    res.json(await staffService.getStaffs());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/staffs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await staffService.getStaff(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/staffs", async (req, res) => {
  try {
    res.json(await staffService.createStaff(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/staffs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await staffService.updateStaff(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/staffs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await staffService.deleteStaff(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

//#region PRODUCT
app.get("/products", async (req, res) => {
  try {
    res.json(await productService.getProducts());
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await productService.getProduct(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    res.json(await productService.createProduct(req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await productService.updateProduct(id, req.body));
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await productService.deleteProduct(id));
  } catch (err) {
    res.json({ error: err.message });
  }
});
//#endregion

app.listen(portNumber, () => {
  console.log(`Server is listening on port ${portNumber}`);
});
