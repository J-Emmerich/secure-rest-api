const createUser = require("../app/controller/user-data-controller");

describe("Crud operations", () => {
  test("Returns an user", async () => {
    const db = {
      create(user) {
        return `${user.name} was created:::: ${user}`;
      }
    };

    const user = await createUser(db);
    expect(user).toBeDefined();
  });
});
