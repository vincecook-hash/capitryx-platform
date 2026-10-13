export const paymentConfig = {
  provider: process.env.PAYMENT_PROVIDER ?? null,
  cryptoPaymentsEnabled: process.env.ENABLE_CRYPTO_PAYMENTS === "true",
} as const;
