import { Hash } from '../../../../../common/hash';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

class SeederService {
  hash = new Hash();
  constructor(private prisma: PrismaClient) {}

  async seedData() {
    await this.seedTempTable();
  }

  async clearData() {
    await this.prisma.temp.deleteMany({});

    await this.resetAutoIncrement('temp');
  }

  async resetAutoIncrement(tableName: string) {
    await this.prisma.$queryRawUnsafe(
      `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`,
    );
  }
  async seedTempTable() {
    await this.prisma.temp.create({
      data: {
        uuid: faker.string.uuid(),
        email: faker.internet.email(),
        password: await this.hash.encryptPassword(faker.internet.password()),
      },
    });
  }
}

async function main() {
  console.log('seeding starting...');
  const seedService = new SeederService(prisma);
  await seedService.seedData();
  console.log('seeding ended...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
