import { LapTime, Time } from './app/LapTime'
import { TrackList, getNearestBeatableTime } from './app/TrackUtils'
import './styles/index.css'

let selectedTrack = 'Bahrain'

const onSubmit = (event: Event) => {
    event.preventDefault()
    const myFormData = new FormData(<HTMLFormElement>event.target)
    const formDataObj = Object.fromEntries(myFormData.entries())
    const inputLapTime = formDataObj as unknown as Time
    const lapTime = new LapTime(inputLapTime)
    const timeSerial = lapTime.getTimeSerial()
    const closestTimeObj = getNearestBeatableTime(timeSerial, selectedTrack)
    if (closestTimeObj === undefined) {
        throw `Could not get closest time`
    }
    const lapTimeDisplay = document.getElementById('closestLapTime')
    const difficultyDisplay = document.getElementById('difficulty')
    const resultDisplay = document.getElementById('results')
    if (
        lapTimeDisplay === null ||
        difficultyDisplay === null ||
        resultDisplay === null
    ) {
        throw `Could not get the display elements`
    }
    lapTimeDisplay.textContent = new LapTime(closestTimeObj.time).getFormatted()
    difficultyDisplay.textContent = closestTimeObj.diff
    resultDisplay.hidden = false
}

const onChange = (event: Event) => {
    selectedTrack = (<HTMLSelectElement>event.target).value
    const title = document.getElementById('trackTitle')
    if (title !== null) {
        title.textContent =
            TrackList[selectedTrack]?.friendlyName ?? selectedTrack
    }
}

const lapTimeForm = document.getElementById('lapTime')

if (lapTimeForm === null) {
    console.error('No Element with ID lapTime found')
} else {
    lapTimeForm.addEventListener('submit', onSubmit)
}

const selectTrackBox = document.getElementById('trackSelect')

if (selectTrackBox === null) {
    console.error('No element with ID trackSelect found')
} else {
    selectTrackBox.addEventListener('change', onChange)
}
