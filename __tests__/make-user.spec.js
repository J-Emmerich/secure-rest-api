const { describe, expect, test } = require("@jest/globals");
const { v4: uuidv4 } = require("uuid");
const makeUser = require("../app/data/user-fabric");
const { RequireParamError, InvalidTypeError } = require("../app/helpers/error");

expect.extend({
  // Testing if it is an frozen object
  isObject(expected) {
    if (
      typeof expected === "object" &&
      expected !== null &&
      !Array.isArray(expected)
    ) {
      // typeof is not safe. Must explicitidly check null values and arrays too.
      return {
        pass: true,
      };
    }
    return {
      message: () => `This is not an object, it's::::${typeof expect}`,
      pass: false,
    };
  },
});

expect.extend({
  isFrozen(expected) {
    const result = Object.isFrozen(expected); // IsFrozen is not safe as it returns true if the argument is not of type object
    if (result) {
      return {
        pass: true,
      };
    }
    return {
      message: () => "This is not an object.",
      pass: false,
    };
  },
});

describe("Return an object, frozed, with corrected properties.", () => {

  test("Returns a frozen object", async () => {
    try {
      const mockUser = {
        id: "12",
        name: ["Jay", true],
        dateOfRegister: "13/23/34",
      };
      const user = await makeUser(mockUser);
      expect(user).isObject();
      expect(user).isFrozen();
      throw new Error("Not object");
    } catch (err) {
      expect(err.message).toBe("Not object");
    }
  });

  test("Has correct properties", async () => {
    try {
      const mockUser = {
        id: 12,
        name: ["Jay", true],
        dateOfRegister: "13/23/34",
      };
      const user = await makeUser(mockUser);
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("dateOfRegister");
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidTypeError);
    }
  });
});

test("Return an error with correct instance", async () => {
  try {
    await makeUser();
  } catch (e) {
    expect(e).toBeInstanceOf(RequireParamError);
  }
});

// JEST tests don't wait asynchronous code by default.
// Using Jest with callbacks like this:
// With a 'done' parameter and as callback. Wrap the code in a try catch block to get a expressive error message
// Otherwise you will see just a timeout error.

// test('the data is peanut butter', done => {
//   function callback(data) {
//     try {
//       expect(data).toBe('peanut butter');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   }

//   fetchData(callback);
// });

// You can return a promise to, or just use Async / Await.
