import hello from '../src/main';

describe('hello', () => {
  it('should hello', () => {
    expect(hello('toto')).toBe('toto');
  });
});
