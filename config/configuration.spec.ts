import { configuration } from './configuration';

describe('Configuration', () => {
  const config = configuration();

  describe('Check Application variable Configuration', () => {
    it('should return Port', () => {
      expect(config.app.port).toBe(3000);
    });

    it('should return NODE_ENV', () => {
      expect(config.app.node_env).toBe('test');
    });
  });
});
