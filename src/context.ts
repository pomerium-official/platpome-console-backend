import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  // console.log('Query: ' + e.query);
  console.log(`Query: ${e.query} ${e.params}`);
  console.log('Duration: ' + e.duration + 'ms');
});

export interface Context {
  prisma: PrismaClient;
  user?: any;
}

export const context: Context = {
  prisma: prisma,
};
