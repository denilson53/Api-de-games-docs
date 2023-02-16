const Game = require("../models/games")

const cors = require("cors")
const jwt = require("jsonwebtoken")

const JWTSecret = "fdgdsgdsgdsgdsg"

 class GamesController{

//Post
  async create(req,res){
        var {title,year,price} = req.body
        if(title == undefined || title == ""){
            res.status(400)
            res.json({err:"O nome é invalido !"})
            return;
        }

        if(year == undefined ||year == ""){
            res.status(400)
            res.json({err:"O ano é invalido !"})
            return;
        }

        if(price == undefined ||price == ""){
            res.status(400)
            res.json({err:"O valor do preço é invalido !"})
            return;
        }

 
        await Game.new(title,year,price)
        res.sendStatus(200)
  }

//Get
async index(req,res){
   var DB = {
        games: [
            {
                id: 55,
                title: "Minecraft",
                price: "50,55",
                year: 2015
            },
            {
                id: 75,
                title: "Sea Of Thieves",
                price: "80,55",
                year: 2020
            }
        ],
        users: [
            {
                id:1,
                name:"RoldFear",
                email:"RoldFear@gmail.com",
                password:"12345678"
            },
            {
                id:2,
                name:"LordFect",
                email:"LordFect@gmail.com",
                password:"12345678"
            }
        ]
   }

   var game = await Game.findAll()

   if(game == undefined || game == ""){
     res.json(DB.games)
     res.statusCode = 200;
    }else{
      res.json(game)
      res.statusCode = 200;
    }
   
}

//Get:id
async findGame(req, res){

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
    var id = parseInt(req.params.id)

    var game = await Game.findById(id);
    if(game == undefined){
        res.sendStatus(404)
    }else{
        res.status(200)
        res.json(game);
    }
  }
 }

//Delete
async remove(req, res){

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
    var id = req.params.id;

   var result = await Game.delete(id);

   if(result.status){
    res.status(200);
    res.send("Game Deletado !")
   }else{
    res.sendStatus(404)
   }
  }   
 }

//Edição
async edit(req, res){
    
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{

    var {id, title, price, year} = req.body

    var result = await Game.update(id,title,price,year)

    var id = parseInt(req.params.id)
    var game = await Game.findById(id);
    if(game == undefined){
        res.sendStatus(404)
    }else{ 
    
    if(result != undefined){
        if(result.status){
            res.sendStatus(200)
        }else{
            res.status(406)
            res.json(result.err)
        }
    }else{
        res.status(406);
        res.send("Ocoreu um erro no servidor!")
    }
   }
  } 
 }

//Auth
    async auth(req,res){
       var {email,password} = req.body 

       var AT = {
        users: [
            {
                id:1,
                name:"RoldFear",
                email:"RoldFear@gmail.com",
                password:"12345678"
            },
            {
                id:2,
                name:"LordFect",
                email:"LordFect@gmail.com",
                password:"12345678"
            }
        ]
   }
        
       if(email != undefined){

       var user = await AT.users.find(u => u.email)

       console.log(user) 

       if(user.email == email){  

            if(user.password == password){

                jwt.sign({id: user.id, email:user.email},JWTSecret,{expiresIn:"100h"},(err,token) =>{
                    if(err){
                        res.status(400)
                        res.json({err:"Falha interna"})
                    }else{
                        res.status(200)
                        res.json({token: token})
                    }
                })

            }else{
                res.status(401)
                res.json({err: "Credencias inválidas"})
            }

       
    }else{
        res.status(404)
        res.json({err: "O E-mail enviado não existe na base de dados!"})
       }

       }else{
        res.status(400)
        res.json({err: "O E-mail enviado é invalido"})
       }

    }

}

 module.exports = new GamesController()
