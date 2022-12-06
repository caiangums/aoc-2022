import { readFile } from '_utils/file'

const findProcessedCharsUntilMarker = ({ datastream, size }) => {
  let processedChars = size - 1
  let packetHeader = datastream.slice(0, processedChars)
  const packet = Array.from(datastream.slice(processedChars))

  for (let letter of packet) {
    processedChars += 1
    packetHeader += letter
    const uniqueChars = new Set(Array.from(packetHeader))

    if (packetHeader.length === uniqueChars.size) {
      break
    }

    packetHeader = packetHeader.slice(1)
  }

  return processedChars
}

const solve = (datastream) => {
  let processedChars = findProcessedCharsUntilMarker({ datastream, size: 4 })

  console.log('> result 1:', processedChars)

  processedChars = findProcessedCharsUntilMarker({ datastream, size: 14 })

  console.log('> result 2:', processedChars)
}

export default async function () {
  console.log('--- Day 06: Tuning Trouble ---')

  let data

  try {
    data = await readFile('06/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
