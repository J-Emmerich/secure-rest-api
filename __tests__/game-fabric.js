const { describe, expect, test } = require("@jest/globals");
const { play, gameResult } = require("../app/entities/game-fabric");

describe("The game is played with two dices", () => {
  test("A random number is called", async () => {
    const game = await play();
    expect(game.dice).toBeWithinRange(1, 7);
  });
  test("the result is returned correctly", async () => {
    const result = await gameResult(6, 1);
    const result2 = await gameResult("c", null);
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });
});

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      };
    }
  }
});
