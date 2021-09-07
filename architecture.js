/*









CHAT 8 de octubre!


Clean architecture principle is: 
        Dependency rule. ---It always moves inward


                middlewares and routes
                adapters/dataAccess - require controllers/dependency injection database     
                    controllers(game rules, require user fabric, dependency injection -adapter)
                        -----userFabric(entity)        


Partidas y resultados
    - Business logic game : 
        The game is made with two dices
        If the result is 7 the game is won otherwise is lost
        It must return the value of each dice and the result of the game
    
    - Business logic player : 
        To throw the dices the players must register himself with a unique name. 
        If he doesn't provides a name then he's name will be anonymous
        When we create a player he receives an ID and a data of register
        He can access the results of all his games and a % of victories.
    
    - Business logic application: 
        It can have more than 1 anonymous player.
        We can erase all the games of a player, but not a especific game
        We can list all the players in the game
        and the success rate of each one

Data layer: has 3 layers
    - Mongoose/Sequelize Models - Implementation Only, no business logic. Nothing on the code should rely on this. It's a dependency that will be injected
    - Controller/Adapter -> Directly deals with the ORM - This will call the models, it's what my code will call, it's methods should be the same always. 
    - Business logic -> Fabric Function that exports a correct object to the controller/Adapter. 
    


URL’s:
POST: /players : crea un jugador
PUT /players : modifica el nom del jugador
POST /players/{id}/games/ : un jugador específic realitza una tirada dels daus.
DELETE /players/{id}/games: elimina les tirades del jugador
GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
GET /players/{id}/games: retorna el llistat de jugades per un jugador.
GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.
GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
GET /players/ranking/winner: retorna el jugador amb pitjor percentatge d’èxit

*/
