import { resolveCorrelationId } from './correlation-id.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('resolveCorrelationId', () => {
  it('reuses a well-formed incoming id', () => {
    expect(resolveCorrelationId('order-123_abc.1')).toBe('order-123_abc.1');
  });

  it('uses the first value when the header is repeated', () => {
    expect(resolveCorrelationId(['first', 'second'])).toBe('first');
  });

  it('generates a UUID when the header is missing', () => {
    expect(resolveCorrelationId(undefined)).toMatch(UUID);
  });

  it.each([
    ['newline injection', 'abc\nfake log line'],
    ['spaces', 'a b'],
    ['too long', 'a'.repeat(129)],
    ['empty', ''],
  ])('replaces an unsafe id (%s) with a UUID', (_label, value) => {
    expect(resolveCorrelationId(value)).toMatch(UUID);
  });
});
