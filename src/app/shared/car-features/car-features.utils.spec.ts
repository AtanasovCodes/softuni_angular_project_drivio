import { capitalizeWords } from './car-features.utils';

describe('capitalizeWords util function', () => {
  it('should capitalize each word in a sentence', () => {
    expect(capitalizeWords('electric autopilot luxury')).toBe(
      'Electric Autopilot Luxury',
    );
  });

  it('should handle empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  it('should handle single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('should handle multiple spaces', () => {
    expect(capitalizeWords('multiple   spaces here')).toBe(
      'Multiple   Spaces Here',
    );
  });
});
