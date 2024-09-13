import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

let container: StartedPostgreSqlContainer | null;

export async function createTestContainer() {
  if (container) return container;

  const prismaBinary = './node_modules/.bin/prisma';
  container = await new PostgreSqlContainer()
    .withDatabase('josys_employee_portal')
    .withPassword('josys_employee_portal')
    .withUsername('testuser')
    .withExposedPorts({ container: 5432, host: 5432 })
    .start();

  await execAsync(
    `${prismaBinary} migrate deploy --schema ./src/adapters/persistence/prisma/models/postgresql`,
  );

  return container;
}

export async function stopTestContainer() {
  if (container) {
    await container.stop();
  }
}
