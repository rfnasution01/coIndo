export const generateUniqueCode = (length: number): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const code = []

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    code.push(charset.charAt(randomIndex))
  }

  return code.join('')
}
