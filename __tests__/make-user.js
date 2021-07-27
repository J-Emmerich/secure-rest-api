const { describe, expect, test } = require("@jest/globals");
const makeUser = require("../app/entities/user-fabric");
const { RequireParamError, InvalidTypeError } = require("../app/helpers/error");

describe("Create a valid object-user", () => {
  test("That is an object", async () => {
    const mockUser = {
      id: "12",
      name: "Jay",
      dateOfRegister: "13/23/34"
    };
    const user = await makeUser(mockUser);
    expect(user).not.toBeNull();
    expect(user).toBeObject();
  });
  test("that is frozen", async () => {
    const mockUser = {
      id: "12",
      name: "Jay",
      dateOfRegister: "13/23/34"
    };
    const user = await makeUser(mockUser);
    expect(user).toBeFrozen();
  });
  test("with correct properties", async () => {
    const mockUser = {
      id: "1",
      name: "Jay",
      dateOfRegister: "13/23/34"
    };
    const user = await makeUser(mockUser);
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        dateOfRegister: expect.any(String)
      })
    );
  });
});

describe("Returns valid errors", () => {
  test("parameters required", async () => {
    try {
      await makeUser();
    } catch (e) {
      expect(e).toBeInstanceOf(RequireParamError);
    }
  });
  test("invalid parameters", async () => {
    try {
      await makeUser({ id: [1], name: "John" });
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidTypeError);
    }
  });
});

expect.extend({
  // Testing if it is an frozen object
  toBeObject(expected) {
    if (typeof expected === "object" && !Array.isArray(expected)) {
      // typeof is not safe. Must explicitidly check null values and arrays too.
      return {
        message: "Is Object",
        pass: true
      };
    }
    return {
      message: () => `This is not an object, it's::::${typeof expect}`,
      pass: false
    };
  }
});

expect.extend({
  toBeFrozen(expected) {
    const result = Object.isFrozen(expected); // IsFrozen is not safe as it returns true if the argument is not of type object
    if (result) {
      return {
        pass: true
      };
    }
    return {
      message: () => "This object is not frozen.",
      pass: false
    };
  }
});
