import { readFile } from '_utils/file'

const ASCII_CODE_BREAK = 64
const ALPHABET_SIZE = 26
const ASCII_CODE_LOWERCASE = 6

const getPriorityFromItem = (item) => {
  // A - Z
  let charValue = item.charCodeAt(0) - ASCII_CODE_BREAK

  // a - z
  return charValue > ALPHABET_SIZE
    ? charValue - (ALPHABET_SIZE + ASCII_CODE_LOWERCASE)
    : charValue + ALPHABET_SIZE
}

const getRepeatingItemBetweenCompartments = ({ left, right }) => {
  let repeatingChar
  Array.from(left).some((char) => {
    if (right.indexOf(char) > -1) {
      repeatingChar = char
      return true
    }

    return false
  })

  return repeatingChar
}

const getCommonItemBetweenSacks = (groupSacks) => {
  const [firstElf, secondElf, thirdElf] = groupSacks

  let repeatingChar

  Array.from(firstElf).some((char) => {
    if (secondElf.indexOf(char) > -1) {
      if (thirdElf.indexOf(char) > -1) {
        repeatingChar = char
        return true
      }
    }

    return false
  })

  return repeatingChar
}

const solve = (allSacks) => {
  const sacks = allSacks.split('\n').slice(0, -1)

  let prioritiesSum = 0

  for (let sack of sacks) {
    const middle = sack.length / 2
    const [left, right] = [sack.slice(0, middle), sack.slice(middle)]

    const item = getRepeatingItemBetweenCompartments({ left, right })

    const itemPriority = getPriorityFromItem(item)

    prioritiesSum += itemPriority
  }

  console.log('> result 1:', prioritiesSum)

  prioritiesSum = 0

  let groupSacks = []

  for (let sack of sacks) {
    groupSacks.push(sack)

    if (groupSacks.length > 2) {
      const item = getCommonItemBetweenSacks(groupSacks)

      const itemPriority = getPriorityFromItem(item)

      prioritiesSum += itemPriority

      groupSacks = []
    }
  }

  console.log('> result 2:', prioritiesSum)
}

export default async function () {
  console.log('--- Day 03: Rucksack Reorganization ---')

  let data

  try {
    data = await readFile('03/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
