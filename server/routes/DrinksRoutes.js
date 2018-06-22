const express = require("express");
const router = express.Router();
const {list, create} = require( "../controllers/DrinksController");


router.get("/getAllData", list);
// router.get("/getAllData/:id", show);
router.post("/postDrink", create);
// router.put("/favorite/:id", update);
// router.delete("/favorite/:id", remove);

module.exports = router;