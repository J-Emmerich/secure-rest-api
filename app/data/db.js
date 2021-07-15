async function buildMakeUser({ userModel }) {
  return function makeUser({ id, name = "anonymous", dateOfRegister } = {}) {
  
  };
}

/*

    Business logic player : 
    To throw the dices the players must register himself with a unique name. 
    If he doesn't provides a name then he's name will be anonymous
    When we create a player he receives an ID and a data of register
    He can access the results of all his games and a % of victories.
*/ 