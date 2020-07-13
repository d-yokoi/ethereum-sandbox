import { accounts, contract } from "@openzeppelin/test-environment";

const SandboxToken = contract.fromArtifact("SandboxToken");

describe("sandbox-token", () => {
  const [sender, recipient] = accounts;

  let sandboxToken: any;
  beforeEach(async () => {
    sandboxToken = await SandboxToken.new(210000, { from: sender });
  });

  it("should transfer token", async () => {
    const beforeBalance = await sandboxToken.balanceOf(recipient);

    expect(beforeBalance.toString()).toBe("0");

    await sandboxToken.transfer(recipient, 1, { from: sender });

    const afterBalance = await sandboxToken.balanceOf(recipient);

    expect(afterBalance.toString()).toBe("1");
  });
});
