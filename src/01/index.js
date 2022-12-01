import { readFile } from '_utils/file'

const sortElvesByCarriedCalories = (allElves) => {
  const carriedCalories = allElves.split('\n')

  const elves = []
  let actualCaloriesElf = 0

  for (let carried of carriedCalories) {
    if (carried !== '') {
      actualCaloriesElf += Number(carried)
    } else {
      elves.push(actualCaloriesElf)
      actualCaloriesElf = 0
    }
  }

  return elves.sort((a, b) => b - a)
}

const sum = (values) => values.reduce((acc, value) => value + acc, 0)

const solve = (allElves) => {
  const sortedElves = sortElvesByCarriedCalories(allElves)

  const mostCaloriesElf = sortedElves[0]

  console.log('> result 1:', mostCaloriesElf)

  const topThreeMostCaloriesElves = sortedElves.slice(0, 3)
  const sumOfCalories = sum(topThreeMostCaloriesElves)

  console.log('> result 2:', sumOfCalories)
}

export default async function () {
  console.log('--- Day 01: Calorie Counting ---')

  let data

  try {
    data = await readFile('01/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
