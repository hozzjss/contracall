import { trueCV, uintCV } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/clarinet/feature-guides/test-contract-with-clarinet-sdk
*/

describe("example tests", () => {
  it("ensures simnet is well initalised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("ensures that mint completes", () => {
    expect(
      simnet.callPublicFn("shit-coin", "mint", [uintCV(4)], address1).result
    ).toBeErr(uintCV(1006));

    expect(
      simnet.callPublicFn("shit-coin", "mint", [uintCV(3)], address1).result
    ).toBeOk(trueCV());
  });
  // it("shows an example", () => {
  //   const { result } = simnet.callReadOnlyFn("counter", "get-counter", [], address1);
  //   expect(result).toBeUint(0);
  // });
});
