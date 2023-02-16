const knex = require("../database/connection")

class Games {
    //Create
    async new(title,year,price){
        try{
            await knex.insert({title,year,price}).table("game")
          
        }catch(err){
            console.log(err)
        }
    }

    //Get
    async findAll(){
        try{
            var result = await knex.select(["id","title","year","price"]).table("game")
            return result;
        }catch(err){
            console.log(err)
            return[]
        }
    }

    //Get/Id
    async findById(id){
        try{
            var result = await knex.select(["id","title","year","price"]).where({id:id}).table("game")
           
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
           
            
         }catch(err){
             console.log(err);
             return undefined;
       } 
    }

    //Delete
    async delete(id){
        var game = await this.findById(id);
        if(game != undefined){
         try{
             await knex.delete().where({id: id}).table("game")
             return {status: true}
         }catch(err){
             return {status: false,err: err}
         }
 
        }else{
         return {status: false,err: "O usuário não existe, portanto não pode ser deletado."} 
        }
    }

    //Edição
    async update(id,title,price,year){

        var game = await this.findById(id);
        var editGame = {};

        if(game != undefined){

            if(title != undefined){
                editGame.title = title
            }

            if(price != undefined){
                editGame.price = price
            }

            if(year != undefined){
                editGame.year = year
            }

            try{
                await knex.update(editGame).where({id: id}).table("game")
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }

        }else{
            return {status: false,err: "O game não existe!"}
        }
    }

}

 module.exports = new Games()