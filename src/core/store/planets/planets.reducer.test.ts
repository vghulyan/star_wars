import "@testing-library/jest-dom";
import { selectIdentifer } from "./planets.reducer";

describe("planets reducer check", () => {
  test("should return uid of planet", async () => {
    const test = selectIdentifer({
      uid: "uid",
      name: "name",
      url: "url",
    });
    expect(test).toBe("uid");
  });
});
