export class Uuid {
  static generate () {
    const RANGE = 20
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < RANGE; i++) {
      result += characters
        .charAt(
          Math.floor(Math.random() * characters.length)
        )
    }

    return result
  }
}
