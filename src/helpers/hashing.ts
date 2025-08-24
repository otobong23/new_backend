import bcrypt from 'bcryptjs'

const doHash = (value: string | Buffer, saltRounds: string | number) => {
  // bcryptjs only works with string, not Buffer
  const valueStr = typeof value === 'string' ? value : value.toString()
  return bcrypt.hash(valueStr, Number(saltRounds))
}

export const validateHash = (value: string | Buffer, hashed: string) => {
  const valueStr = typeof value === 'string' ? value : value.toString()
  return bcrypt.compare(valueStr, hashed)
}


const hash = {doHash, validateHash}
export default hash
