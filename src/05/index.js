import { readFile } from '_utils/file'

const parseStacksAndMoves = (data) => {
  const stacks = Array(20)
    .fill(0)
    .map(() => new Array())
  const moves = []

  const lines = data.split('\n').slice(0, -1)

  let isMove = false
  for (let line of lines) {
    if (!line) {
      isMove = true
      continue
    }

    if (!isMove) {
      const crates = line.match(/(\w{1}|\s{4})/g)

      crates.forEach((crate, index) => {
        if (/[A-Z]/.test(crate)) {
          stacks[index].push(crate)
        }
      })
    } else {
      const [quantity, from, to] = line.match(/\d{1,10}/g)
      moves.push({ quantity, from, to })
    }
  }

  return { stacks, moves }
}

const rearrangeStacks = ({ stacks, moves }) => {
  const rearrangedStacks = stacks.map((stack) => Array.from(stack))

  for (let move of moves) {
    const { quantity, from, to } = move

    let moved = 0
    while (moved < quantity) {
      rearrangedStacks[to - 1].unshift(rearrangedStacks[from - 1].shift())
      moved += 1
    }
  }

  return rearrangedStacks
}

const filterTopCrates = (stacks) =>
  stacks.reduce(
    (crates, stack) =>
      `${crates}${stack.length > 0 ? stack[0] : ''}`,
    ''
  )

const rearrangeStacksAtOnce = ({ stacks, moves }) => {
  const rearrangedStacks = stacks.map((stack) => Array.from(stack))

  for (let move of moves) {
    const { quantity, from, to } = move

    const cratesToBeMoved = []

    let moved = 0
    while (moved < quantity) {
      cratesToBeMoved.push(rearrangedStacks[from - 1].shift())
      moved += 1
    }
    rearrangedStacks[to - 1] = [...cratesToBeMoved, ...rearrangedStacks[to - 1]]
  }

  return rearrangedStacks
}

const solve = (data) => {
  const { stacks, moves } = parseStacksAndMoves(data)

  const rearrangedStacks = rearrangeStacks({ stacks, moves })

  let topCrates = filterTopCrates(rearrangedStacks)

  console.log('> result 1:', topCrates)

  const rearrangedStacksAtOnce = rearrangeStacksAtOnce({ stacks, moves })

  topCrates = filterTopCrates(rearrangedStacksAtOnce)

  console.log('> result 2:', topCrates)
}

export default async function () {
  console.log('--- Day 05: Supply Stacks ---')

  let data

  try {
    data = await readFile('05/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
