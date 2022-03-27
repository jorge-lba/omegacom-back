import crypto from 'crypto'
export class Uuid {
  static generate () {
    const buffer = crypto.randomBytes(20)
    return buffer.toString('hex')
  }
}
