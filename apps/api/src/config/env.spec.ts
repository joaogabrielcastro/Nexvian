import { parseEnv } from './env.js';

const validEnv = {
  DATABASE_URL: 'postgresql://user:s3cret@localhost:5432/nexvian',
  REDIS_URL: 'redis://localhost:6379',
};

describe('parseEnv', () => {
  it('applies defaults and coerces types', () => {
    const env = parseEnv(validEnv);

    expect(env.NODE_ENV).toBe('development');
    expect(env.PORT).toBe(3000);
    expect(env.LOG_LEVEL).toBe('info');
  });

  it('coerces PORT from string', () => {
    expect(parseEnv({ ...validEnv, PORT: '8080' }).PORT).toBe(8080);
  });

  it('rejects missing required variables', () => {
    expect(() => parseEnv({})).toThrow(/DATABASE_URL.*REDIS_URL/);
  });

  it('rejects a database URL with the wrong protocol', () => {
    expect(() => parseEnv({ ...validEnv, DATABASE_URL: 'mysql://user:pw@localhost/db' })).toThrow(
      /DATABASE_URL/,
    );
  });

  it('rejects an out-of-range port', () => {
    expect(() => parseEnv({ ...validEnv, PORT: '70000' })).toThrow(/PORT/);
  });

  it('never includes provided values in the error message', () => {
    const secret = 'super-secret-password';
    try {
      parseEnv({ ...validEnv, REDIS_URL: `ftp://user:${secret}@host`, PORT: secret });
      expect.unreachable();
    } catch (error) {
      expect((error as Error).message).not.toContain(secret);
    }
  });
});
