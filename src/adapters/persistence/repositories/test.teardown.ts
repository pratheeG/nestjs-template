import { stopTestContainer } from './test.container';

module.exports = async () => {
  await stopTestContainer();
};
