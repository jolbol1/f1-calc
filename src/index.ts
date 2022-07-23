import type { Chart } from 'chart.js'
import { registerlapTimeChart } from './app/ChartConfig'
import { LapTime, Time } from './app/LapTime'
import { TrackList, getNearestBeatableTime } from './app/TrackUtils'
import './styles/index.css'
// import { lapTimeChart } from './app/ChartConfig';

let selectedTrack = TrackList['Bahrain']
let inputs: HTMLCollectionOf<HTMLInputElement>
let lapTimeChart: HTMLElement
let myChart: Chart

window.onload = () => {
  inputs = document.getElementsByTagName('input')
  //Track Select Box
  const selectTrackBox = document.getElementById('trackSelect')
  selectTrackBox!.addEventListener('change', onTrackSelect)
  registerTrackOptions(selectTrackBox!)
  //Inputs and Form
  const lapTimeForm = document.getElementById('lapTime')
  lapTimeForm!.addEventListener('submit', onSubmit)
  lapTimeForm!.addEventListener('input', input)
  //Chart
  lapTimeChart = document.getElementById('lapTimeChart')!
  myChart = registerlapTimeChart(lapTimeChart, selectedTrack!.aiTimes)
}

const setResults = (lapTime: string, difficulty: string) => {
  const lapTimeDisplay = document.getElementById('closestLapTime')
  const difficultyDisplay = document.getElementById('difficulty')
  const resultDisplay = document.getElementById('results')
  lapTimeDisplay!.textContent = lapTime
  difficultyDisplay!.textContent = difficulty
  resultDisplay!.hidden = false
}

const onSubmit = (event: Event) => {
  event.preventDefault()
  const laptimeForm = new FormData(<HTMLFormElement>event.target)
  const formDataObj = Object.fromEntries(laptimeForm.entries())
  const inputLapTime = formDataObj as unknown as Time
  const lapTime = new LapTime(inputLapTime)
  const closestTimeObj = getNearestBeatableTime(
    lapTime.getDateTime().getTime(),
    selectedTrack!,
  )
  setResults(closestTimeObj.lapTime.getFormatted(), closestTimeObj.difficulty)
}

const onTrackSelect = (event: Event) => {
  selectedTrack = TrackList[(<HTMLSelectElement>event.target).value]
  const title = document.getElementById('trackTitle')
  const trackName = document.getElementById('trackName')
  title!.innerText = `${selectedTrack!.flagmoji} ${selectedTrack!.friendlyName}`
  trackName!.innerText = selectedTrack!.trackName
  myChart!.destroy()
  myChart = registerlapTimeChart(lapTimeChart, selectedTrack!.aiTimes)
}

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

const registerTrackOptions = (selectTrackBox: HTMLElement) => {
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
