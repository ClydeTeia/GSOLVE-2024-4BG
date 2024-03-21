export function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(require('crypto').randomBytes(1)[0] / 255 * characters.length);
      randomString += characters.charAt(randomIndex);
  }
  console.log(randomString)
  return randomString;
}