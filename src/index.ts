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
    const track = TrackList[selectedTrack]
    if (track !== undefined) {
      title.textContent = track.flagmoji + ' ' + track.friendlyName
    }
  }
}

const inputs = document.getElementsByTagName('input')

const input = (event: Event) => {
  const target = <HTMLInputElement>event.target
  const maxLength = target.maxLength
  const myLength = target.value.length
  if (myLength === maxLength) {
    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index]
      if (target === element && index !== inputs.length - 1) {
        inputs[index + 1]?.focus()
      }
    }
  }
  if (myLength === 0) {
    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index]
      if (target === element && index !== 0) {
        inputs[index - 1]?.focus()
      }
    }
  }
  if (myLength >= maxLength) {
    target.value = target.value.slice(0, maxLength)
  }
}

const lapTimeForm = document.getElementById('lapTime')

if (lapTimeForm === null) {
  console.error('No Element with ID lapTime found')
} else {
  lapTimeForm.addEventListener('submit', onSubmit)
  lapTimeForm.addEventListener('input', input)
}

const selectTrackBox = document.getElementById('trackSelect')

if (selectTrackBox === null) {
  console.error('No element with ID trackSelect found')
} else {
  selectTrackBox.addEventListener('change', onChange)
  Object.keys(TrackList).forEach((trackName) => {
    const track = TrackList[trackName]
    if (track === undefined) {
      throw 'could not find track'
    } else {
      const option = document.createElement('option')
      option.value = trackName
      option.innerText =
        track.flagmoji + ' ' + track.friendlyName + ' - ' + track.trackName
      selectTrackBox.appendChild(option)
    }
  })
}
