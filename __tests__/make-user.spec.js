const { expect, test } = require("@jest/globals");
const makeUser = require("../app/data/user-fabric");
const RequireParamError = require("../app/helpers/error");

test("Return an object", async () => {
 try{
  await makeUser();
 } catch (e) {
   expect(e).toBeInstanceOf(RequireParamError)
 }
});