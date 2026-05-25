import { describe, it, expect } from "vitest";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const kauRegex = /^[a-zA-Z0-9._%+-]+@stu\.kau\.edu\.sa$/;

describe("Performance — OTP generation speed", () => {
  it("generates 1000 OTPs in under 100ms", () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) generateOTP();
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });

  it("generates 10000 OTPs in under 500ms", () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) generateOTP();
    const end = performance.now();
    expect(end - start).toBeLessThan(500);
  });
});

describe("Load — email validation under load", () => {
  it("validates 5000 emails in under 200ms", () => {
    const emails = Array.from({ length: 5000 }, (_, i) =>
      i % 2 === 0
        ? `student${i}@stu.kau.edu.sa`
        : `fake${i}@gmail.com`
    );
    const start = performance.now();
    emails.forEach((e) => kauRegex.test(e));
    const end = performance.now();
    expect(end - start).toBeLessThan(200);
  });

  it("all valid KAU emails pass under load", () => {
    const emails = Array.from({ length: 1000 }, (_, i) =>
      `s${i}@stu.kau.edu.sa`
    );
    const results = emails.map((e) => kauRegex.test(e));
    expect(results.every(Boolean)).toBe(true);
  });
});

describe("Stress — OTP collision resistance", () => {
  it("generates 10000 OTPs with less than 1% collision rate", () => {
    const otps = new Set(Array.from({ length: 10000 }, generateOTP));
    const collisionRate = (10000 - otps.size) / 10000;
    expect(collisionRate).toBeLessThan(0.01);
  });

  it("no OTP is outside the valid 6-digit range under stress", () => {
    const invalid = Array.from({ length: 5000 }, generateOTP)
      .filter((otp) => parseInt(otp) < 100000 || parseInt(otp) > 999999);
    expect(invalid.length).toBe(0);
  });
});