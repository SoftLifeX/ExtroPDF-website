import arcjet, {
  detectBot,
  protectSignup,
  shield,
  slidingWindow,
  validateEmail,
} from "@arcjet/next";

const arcjetKey = process.env.ARCJET_KEY!;

// for signUp
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    //protect sign up form
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        allow: [],
      },
      rateLimit: {
        mode: "LIVE",
        interval: "1m",
        max: 50,
      },
    }),
  ],
});

// for login
export const loginRules = arcjet({
  key: arcjetKey,
  characteristics: ["ip.src"],
  rules: [
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "5m",
      max: 10,
    }),
  ],
});

// for prepayment
export const PrePaymentRules = arcjet({
  key: arcjetKey,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
    shield({ mode: "LIVE" }),
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "10m",
      max: 5,
    }),
  ],
});

export default aj;
