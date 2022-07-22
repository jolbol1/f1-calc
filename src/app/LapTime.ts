export interface Time {
    min: number
    sec: number
    mil: number
}

const GetTimeSerial = (time: Time) => {
    const minSerial = (1 / 1440) * time.min
    const secSerial = (1 / 86400) * time.sec
    const milSerial = (1 / (1000 * 60 * 60 * 24)) * time.mil
    return minSerial + secSerial + milSerial
}

const addLeadingZeros = (num: number, length: number) => {
    return String(num).padStart(length, '0')
}

export class LapTime {
    #lapTime: Time
    #timeSerial: number
    constructor(options: Time | number) {
        if (typeof options === 'number') {
            this.#timeSerial = options
            const timeSerialDate: Date = new Date(
                Math.round((options - 25569) * 86400 * 1000)
            )
            this.#lapTime = {
                min: timeSerialDate.getMinutes() ?? 0,
                sec: timeSerialDate.getSeconds() ?? 0,
                mil: timeSerialDate.getMilliseconds() ?? 0,
            }
        } else {
            this.#lapTime = options
            this.#timeSerial = GetTimeSerial(this.#lapTime)
        }
    }
    getTimeSerial() {
        return this.#timeSerial
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
