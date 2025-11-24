import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RAZORPAY_KEY_ID: z.string(),
    RAZORPAY_SECRET: z.string(),

    RESEND_API_KEY: z.string(),

    GOOGLE_SERVICE_ACCOUNT_KEY: z.string().min(1),
    GOOGLE_SHEETS_SPREADSHEET_ID: z.string(),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email({ message: "Invalid email" })),

    GOOGLE_RECAPTCHA_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_TELECRM_API_KEY: z.string().min(1),
    NEXT_PUBLIC_TELECRM_ENTERPRISE_ID: z.string().min(1),
    NEXT_PUBLIC_TELECRM_USE_MOCK: z.string().min(1),

    NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string(),

    NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,

    RESEND_API_KEY: process.env.RESEND_API_KEY,

    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,

    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,

    NEXT_PUBLIC_TELECRM_API_KEY: process.env.NEXT_PUBLIC_TELECRM_API_KEY,
    NEXT_PUBLIC_TELECRM_ENTERPRISE_ID:
      process.env.NEXT_PUBLIC_TELECRM_ENTERPRISE_ID,

    NEXT_PUBLIC_TELECRM_USE_MOCK: process.env.NEXT_PUBLIC_TELECRM_USE_MOCK,

    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

    NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY,
  },
});
