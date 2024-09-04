process.env.NODE_CONFIG_DIR = './config/env';

import * as config from 'config';

export const configuration = () => ({
  ...process.env,
  ...config,
});
