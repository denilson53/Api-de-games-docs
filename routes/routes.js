var express = require("express")
var router = express.Router();
const GamesController = require("../controllers/GamesController")
const Auth = require("../middleware/adminAuth")


//Post
router.post("/game/create",Auth,GamesController.create)

//Get
router.get("/games",Auth,GamesController.index)

//Get Id
router.get("/game/:id",Auth,GamesController.findGame)

//Delete
router.delete("/game/:id",Auth,GamesController.remove)

//Edição
router.put("/game/:id",Auth,GamesController.edit)

//Auth
router.post("/auth",GamesController.auth)


module.exports = router