import { describe, it, expect } from "vitest";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const kauRegex = /^[a-zA-Z0-9._%+-]+@stu\.kau\.edu\.sa$/;

// TEST 1 — OTP Generator
describe("generateOTP", () => {
  it("returns exactly 6 digits", () => {
    expect(generateOTP()).toHaveLength(6);
  });

  it("contains only numeric characters", () => {
    expect(/^\d{6}$/.test(generateOTP())).toBe(true);
  });

  it("is always between 100000 and 999999", () => {
    const num = parseInt(generateOTP());
    expect(num).toBeGreaterThanOrEqual(100000);
    expect(num).toBeLessThanOrEqual(999999);
  });

  it("generates unique codes on repeated calls", () => {
    const codes = new Set(Array.from({ length: 20 }, generateOTP));
    expect(codes.size).toBeGreaterThan(1);
  });

  it("returns a string type", () => {
    expect(typeof generateOTP()).toBe("string");
  });
});

// TEST 2 — KAU Email Validation
describe("KAU email validation", () => {
  // ── Valid emails ──
  it("accepts standard KAU student email", () => {
    expect(kauRegex.test("abarashid0010@stu.kau.edu.sa")).toBe(true);
  });

  it("accepts KAU email with numbers in username", () => {
    expect(kauRegex.test("s1234567890@stu.kau.edu.sa")).toBe(true);
  });

  it("accepts KAU email with uppercase letters", () => {
    expect(kauRegex.test("AbdulRahman@stu.kau.edu.sa")).toBe(true);
  });

  // ── Invalid emails ──
  it("rejects non-KAU domain (gmail)", () => {
    expect(kauRegex.test("student@gmail.com")).toBe(false);
  });

  it("rejects missing username before @", () => {
    expect(kauRegex.test("@stu.kau.edu.sa")).toBe(false);
  });

  it("rejects wrong university domain", () => {
    expect(kauRegex.test("student@kau.edu.sa")).toBe(false);
  });

  it("rejects fake domain appended after", () => {
    expect(kauRegex.test("student@stu.kau.edu.sa.evil.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(kauRegex.test("")).toBe(false);
  });
});