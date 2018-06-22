const express = require("express");
const router = express.Router();
const {list,show,create,remove} = require( "../controllers/FavoriteController");


router.get("/favorites", list);
router.get("/favorite/:id", show);
router.post("/favorite", create);
// router.put("/favorite/:id", update);
router.delete("/favorite/:id", remove);

module.exports = router;