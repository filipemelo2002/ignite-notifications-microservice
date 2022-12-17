import { Content } from './content';

describe('Notification Content', () => {
  it('creates a notification content', () => {
    const content = new Content('você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('does not create a notification content with less than 5 characters', () => {
    expect(() => new Content('')).toThrow();
  });

  it('does not create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(249))).toThrow();
  });
});
