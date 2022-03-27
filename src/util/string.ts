import { isNullOrUndefined } from './validation';

export const camelToSentenceCase = (string: string) => {
  if (isNullOrUndefined(string) || string.trim().length === 0) return string;
  const tokens = string
    .replace(/([A-Z]+|[0-9]+)/g, ' $1')
    .trim()
    .split(' ');
  return tokens
    .filter((t) => t && t.length)
    .map((token) => {
      const trimmed = token.trim();
      return trimmed[0].toUpperCase() + trimmed.substring(1);
    })
    .join(' ');
};
