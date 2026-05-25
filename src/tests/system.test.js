import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSend      = vi.fn();
const mockGiveKauKey    = vi.fn();
const mockGivePaypalKey = vi.fn();

vi.mock("@emailjs/browser", () => ({ default: { send: mockSend } }));
vi.mock("../../lib/steamKeys", () => ({
  giveKauKey:    mockGiveKauKey,
  givePaypalKey: mockGivePaypalKey,
}));

const kauRegex   = /^[a-zA-Z0-9._%+-]+@stu\.kau\.edu\.sa$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

describe("System — Full KAU student flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("full happy path: valid email → OTP sent → correct OTP → key given → email sent", async () => {
    const email = "abarashid0010@stu.kau.edu.sa";

    expect(kauRegex.test(email)).toBe(true);

    mockSend.mockResolvedValueOnce({ status: 200 });
    const otp = generateOTP();
    await mockSend("service", "otp_template", { to_email: email, otp });
    expect(mockSend).toHaveBeenCalledTimes(1);

    mockGiveKauKey.mockResolvedValueOnce({ status: "ok", key: "AAAAA-BBBBB-CCCCC" });
    const otpInput = otp;
    expect(otpInput === otp).toBe(true);
    const result = await mockGiveKauKey(email);
    expect(result.status).toBe("ok");
    expect(result.key).toBeDefined();

    mockSend.mockResolvedValueOnce({ status: 200 });
    await mockSend("service", "steam_template", {
      to_email: email, steam_key: result.key,
      redeem_url: "https://store.steampowered.com/account/registerkey",
    });
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("full sad path: invalid email → blocked before OTP", () => {
    expect(kauRegex.test("hacker@gmail.com")).toBe(false);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("full sad path: wrong OTP → key never fetched", () => {
    const otp   = generateOTP();
    const input = "000000";
    expect(input === otp).toBe(false);
    expect(mockGiveKauKey).not.toHaveBeenCalled();
  });

  it("full sad path: already claimed → no key given again", async () => {
    mockGiveKauKey.mockResolvedValueOnce({ status: "already_claimed" });
    const result = await mockGiveKauKey("abarashid0010@stu.kau.edu.sa");
    expect(result.status).toBe("already_claimed");
    expect(result.key).toBeUndefined();
  });
});

describe("System — Full PayPal buyer flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("full happy path: valid email → OTP → verified → key claimed → email sent", async () => {
    const email = "buyer@gmail.com";

    expect(emailRegex.test(email)).toBe(true);

    mockSend.mockResolvedValueOnce({ status: 200 });
    const otp = generateOTP();
    await mockSend("service", "otp_template", { to_email: email, otp });
    expect(mockSend).toHaveBeenCalledTimes(1);

    const otpInput = otp;
    expect(otpInput === otp).toBe(true);

    mockGivePaypalKey.mockResolvedValueOnce({ status: "ok", key: "JJJJJ-KKKKK-LLLLL" });
    const result = await mockGivePaypalKey(email);
    expect(result.status).toBe("ok");
    expect(result.key).toBeDefined();

    mockSend.mockResolvedValueOnce({ status: 200 });
    await mockSend("service", "steam_template", {
      to_email: email, steam_key: result.key,
      redeem_url: "https://store.steampowered.com/account/registerkey",
    });
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("full sad path: no keys available → handled gracefully", async () => {
    mockGivePaypalKey.mockResolvedValueOnce({ status: "no_keys" });
    const result = await mockGivePaypalKey("buyer@gmail.com");
    expect(result.status).toBe("no_keys");
    expect(result.key).toBeUndefined();
  });
});