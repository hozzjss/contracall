// eslint-disable-next-line no-control-regex
export const asciiRegex = /^[\x00-\x7F]*$/
export function isAscii(str: string): boolean {
  return asciiRegex.test(str) // Regular expression to check for ASCII characters
}
