export enum SERVICES {
  PRISMA = 'Prisma',
  REDIS = 'Redis',
}

export const RETRYABLE_ERROR_CODES = {
  [SERVICES.PRISMA]: ['P1001', 'P1017'],
  [SERVICES.REDIS]: ['ECONNREFUSED'],
};
