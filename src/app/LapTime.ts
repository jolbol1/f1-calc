export type Time = {
  min: number
  sec: number
  mil: number
}

const addLeadingZeros = (num: number, length: number) => {
  return String(num).padStart(length, '0')
}

export class LapTime {
  #lapTime: Time
  #dateTime: Date
  constructor(input: Time | number) {
    if (typeof input === 'number') {
      this.#dateTime = new Date(input)
      this.#lapTime = {
        min: this.#dateTime.getMinutes(),
        sec: this.#dateTime.getSeconds(),
        mil: this.#dateTime.getMilliseconds(),
      }
    } else {
      this.#lapTime = input
      const dateZero = new Date(0)
      dateZero.setMinutes(input.min, input.sec, input.mil)
      this.#dateTime = dateZero
    }
  }
  getDateTime() {
    return this.#dateTime
  }
  getFormatted() {
    return (
      addLeadingZeros(this.#lapTime.min, 2) +
      ':' +
      addLeadingZeros(this.#lapTime.sec, 2) +
      '.' +
      addLeadingZeros(this.#lapTime.mil, 3)
    )
  }
}
