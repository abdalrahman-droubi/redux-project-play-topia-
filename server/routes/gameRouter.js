const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/api/games", gameController.newGame);
router.get("/api/games" , gameController.allGames);
router.get("/api/favoriteGames/:id" , gameController.favoriteGames);
router.put("/api/games/:id" , gameController.updateGame);
router.put("/api/updateGameFav/:id" , gameController.updateGameFav);

module.exports = router;
