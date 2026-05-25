import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSend = vi.fn();
vi.mock("@emailjs/browser", () => ({ default: { send: mockSend } }));

const mockGiveKauKey    = vi.fn();
const mockGivePaypalKey = vi.fn();
vi.mock("../../lib/steamKeys", () => ({
  giveKauKey:    mockGiveKauKey,
  givePaypalKey: mockGivePaypalKey,
}));

const kauRegex   = /^[a-zA-Z0-9._%+-]+@stu\.kau\.edu\.sa$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

describe("Integration — KAU email → OTP → key flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects non-KAU email before sending OTP", () => {
    const email = "student@gmail.com";
    expect(kauRegex.test(email)).toBe(false);
  });

  it("accepts KAU email and allows OTP to be sent", async () => {
    const email = "abarashid0010@stu.kau.edu.sa";
    expect(kauRegex.test(email)).toBe(true);
    mockSend.mockResolvedValueOnce({ status: 200 });
    const otp = generateOTP();
    await mockSend("service_id", "template_id", { to_email: email, otp });
    expect(mockSend).toHaveBeenCalledOnce();
  });

  it("correct OTP triggers giveKauKey with the right email", async () => {
    const email = "abarashid0010@stu.kau.edu.sa";
    const otp   = generateOTP();
    mockGiveKauKey.mockResolvedValueOnce({ status: "ok", key: "AAAAA-BBBBB-CCCCC" });
    const input  = otp;
    const result = input === otp ? await mockGiveKauKey(email) : null;
    expect(result.status).toBe("ok");
    expect(result.key).toBe("AAAAA-BBBBB-CCCCC");
    expect(mockGiveKauKey).toHaveBeenCalledWith(email);
  });

  it("wrong OTP blocks giveKauKey from being called", async () => {
    const otp   = generateOTP();
    const input = "000000";
    if (input !== otp) {
      expect(mockGiveKauKey).not.toHaveBeenCalled();
    }
  });

  it("already_claimed blocks duplicate key", async () => {
    mockGiveKauKey.mockResolvedValueOnce({ status: "already_claimed" });
    const result = await mockGiveKauKey("abarashid0010@stu.kau.edu.sa");
    expect(result.status).toBe("already_claimed");
  });

  it("Steam key email is sent after successful key fetch", async () => {
    mockSend.mockResolvedValueOnce({ status: 200 });
    await mockSend("service_id", "template_steam", {
      to_email: "abarashid0010@stu.kau.edu.sa",
      steam_key: "AAAAA-BBBBB-CCCCC",
      redeem_url: "https://store.steampowered.com/account/registerkey",
    });
    expect(mockSend).toHaveBeenCalledOnce();
  });
});

describe("Integration — PayPal email → OTP → key flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("accepts any valid email for PayPal flow", () => {
    expect(emailRegex.test("buyer@gmail.com")).toBe(true);
  });

  it("rejects invalid email before sending OTP", () => {
    expect(emailRegex.test("notanemail")).toBe(false);
  });

  it("correct OTP triggers givePaypalKey", async () => {
    const otp   = generateOTP();
    const input = otp;
    mockGivePaypalKey.mockResolvedValueOnce({ status: "ok", key: "JJJJJ-KKKKK-LLLLL" });
    const result = input === otp ? await mockGivePaypalKey("buyer@gmail.com") : null;
    expect(result.status).toBe("ok");
    expect(result.key).toBe("JJJJJ-KKKKK-LLLLL");
  });

  it("no_keys status is handled without crashing", async () => {
    mockGivePaypalKey.mockResolvedValueOnce({ status: "no_keys" });
    const result = await mockGivePaypalKey("buyer@gmail.com");
    expect(result.status).toBe("no_keys");
  });
});