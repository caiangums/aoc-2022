import { readFile } from '_utils/file'

const createArrayFromRange = ([from, to]) =>
  Array(to - from + 1)
    .fill(0)
    .map((_, i) => i + from)

const getLast = (array) => array[array.length - 1]

const toNumberArray = (array) => array.map((v) => Number(v))

const hasFullOverlap = (firstSection, secondSection) =>
  (firstSection.includes(secondSection[0]) &&
    firstSection.includes(getLast(secondSection))) ||
  (secondSection.includes(firstSection[0]) &&
    secondSection.includes(getLast(firstSection)))

const hasOverlap = (firstSection, secondSection) =>
  firstSection.includes(secondSection[0]) ||
  firstSection.includes(getLast(secondSection)) ||
  secondSection.includes(firstSection[0]) ||
  secondSection.includes(getLast(firstSection))

const solve = (allAssignments) => {
  const assignments = allAssignments.split('\n').slice(0, -1)

  let overlaps = 0
  let fullOverlaps = 0

  for (let assignment of assignments) {
    const [firstElf, secondElf] = assignment.split(',')

    const [firstStart, firstEnd] = toNumberArray(firstElf.split('-'))
    const [secondStart, secondEnd] = toNumberArray(secondElf.split('-'))

    const firstSection = createArrayFromRange([firstStart, firstEnd])
    const secondSection = createArrayFromRange([secondStart, secondEnd])

    if (hasOverlap(firstSection, secondSection)) {
      if (hasFullOverlap(firstSection, secondSection)) {
        fullOverlaps += 1
      }
      overlaps += 1
    }
  }

  console.log('> result 1:', fullOverlaps)

  console.log('> result 2:', overlaps)
}

export default async function () {
  console.log('--- Day 04: Camp Cleanup ---')

  let data

  try {
    data = await readFile('04/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
