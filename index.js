const express = require("express");
const app = express();
var cors = require("cors");
const multer = require("multer");
const fileUpload = multer();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "mh47bikepoint",
  api_key: "235334794225731",
  api_secret: "nn4LkyPqj5mMlIRXN5PT2UKTAcI",
});
const streamifier = require("streamifier");

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
app.use(cors()); // CORS

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

app.get("/staffs/defaults", async (req, res) => {
  try {
    const stores = (await storeService.getStores()).map((s) => {
      return { store_id: s.store_id, store_name: s.store_name };
    });
    const managers = (await staffService.getStaffs())
      .filter((s) => s.designation === "Manager")
      .map((s) => {
        return {
          manager_id: s.staff_id,
          manager_name: `${s.first_name} ${s.last_name}`,
        };
      });
    res.json({ stores, managers });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/products/defaults", async (req, res) => {
  try {
    const { bikeCategories, brands } = await defaultsService.getDefaults();
    const customers = (await customerService.getCustomers()).map((s) => {
      return {
        customer_id: s.customer_id,
        customer_name: `${s.first_name} ${s.last_name}`,
      };
    });
    res.json({ bikeCategories, brands, customers });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.post("/upload", fileUpload.single("image"), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    res.json(result);
  }

  upload(req);
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
    const stores = await storeService.getStores();
    const staffs = await staffService.getStaffs();

    // store_name
    res.json(
      staffs.map((s) => {
        const store = stores.find((st) => st.store_id === s.store_id);
        const manager = staffs.find((st) => st.staff_id === s.manager_id);
        return {
          ...s,
          store_name: store ? store.store_name : "",
          manager_name: manager
            ? `${manager.first_name} ${manager.last_name}`
            : "",
        };
      })
    );
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
    const { bikeCategories, brands } = await defaultsService.getDefaults();
    const customers = await customerService.getCustomers();
    const products = await productService.getProducts();

    res.json(
      products.map((p) => {
        const category = bikeCategories.find(
          (b) => b.category_id === p.category_id
        );
        const brand = brands.find((b) => b.brand_id === p.brand_id);
        const customer = customers.find((c) => p.owner_id === c.customer_id);

        return {
          ...p,
          brand_name: brand ? brand.brand_name : "",
          category_name: category ? category.category_name : "",
          owner_name: customer
            ? `${customer.first_name} ${customer.last_name}`
            : "",
        };
      })
    );
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
