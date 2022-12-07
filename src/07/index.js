import { readFile } from '_utils/file'

const isCommand = (arg) => arg === '$'

const ROOT = '/'

let workingDir = ROOT

const executeChangeDirCommand = (newDir) => {
  if (newDir === ROOT) {
    workingDir = ROOT
    return
  }

  if (newDir === '..') {
    let newWorkingDir = ''
    if (workingDir !== ROOT) {
      newWorkingDir = workingDir.slice(0, workingDir.lastIndexOf(ROOT))
    }

    workingDir = newWorkingDir.length > 0 ? newWorkingDir : ROOT

    return
  }

  workingDir =
    workingDir === ROOT
      ? `${workingDir}${newDir}`
      : `${workingDir}${ROOT}${newDir}`
}

const addFileSizeToDir = ({ state, size }) => {
  if (!Object.keys(state).includes(workingDir)) {
    state[workingDir] = 0
  }

  let childDirs = workingDir.split('/').filter((d) => d.length > 0)

  let currentDir = ROOT

  state[currentDir] += size

  childDirs.forEach((child) => {
    currentDir = `${currentDir}${currentDir === ROOT ? '' : '/'}${child}`
    if (!Object.keys(state).includes(currentDir)) {
      state[currentDir] = 0
    }

    state[currentDir] += size
  })
}

const solve = (data) => {
  const lines = data.split('\n').slice(0, -1)

  const state = { [ROOT]: 0 }

  for (let line of lines) {
    const [arg1, arg2, arg3] = line.match(/\S{1,}/g)

    if (isCommand(arg1)) {
      if (arg2 === 'cd') {
        executeChangeDirCommand(arg3)
      }
    } else {
      if (arg1 !== 'dir') {
        addFileSizeToDir({ state, size: Number(arg1) })
      }
    }
  }

  let sum = 0
  for (const dir in state) {
    if (state[dir] < 100000) {
      sum += state[dir]
    }
  }

  console.log('> result 1:', sum)

  let totalSpace = 70000000
  let neededSpace = 30000000

  let startingFreeSpace = totalSpace - state[ROOT]
  let minSpaceToBeFreed = neededSpace - startingFreeSpace

  const [smallest] = Object.values(state)
    .filter((size) => size > minSpaceToBeFreed)
    .sort((a, b) => a - b)

  console.log('> result 2:', smallest)
}

export default async function () {
  console.log('--- Day 07: No Space Left On Device ---')

  let data

  try {
    data = await readFile('07/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
