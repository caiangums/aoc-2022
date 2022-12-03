import { readFile } from '_utils/file'

const ELF_SHAPES = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
}

const HUMAN_SHAPES = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
}

const SHAPE_SCORE = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const OUTCOME_SCORE = {
  lose: 0,
  draw: 3,
  win: 6,
}

const findRoundOutcome = ([elf, human]) => {
  if (ELF_SHAPES[elf] === HUMAN_SHAPES[human]) {
    return 'draw'
  }

  if (ELF_SHAPES[elf] === 'rock') {
    return HUMAN_SHAPES[human] === 'paper' ? 'win' : 'lose'
  }

  if (ELF_SHAPES[elf] === 'paper') {
    return HUMAN_SHAPES[human] === 'scissors' ? 'win' : 'lose'
  }

  // ELF_SHAPES[elf] is 'scissors'
  return HUMAN_SHAPES[human] === 'rock' ? 'win' : 'lose'
}

const ROUND_NEED = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
}

const ELF_BASED_HUMAN_MOVE = {
  A: { lose: 'Z', draw: 'X', win: 'Y' },
  B: { lose: 'X', draw: 'Y', win: 'Z' },
  C: { lose: 'Y', draw: 'Z', win: 'X' },
}

const solve = (guide) => {
  const rounds = guide.split('\n').slice(0, -1)

  let totalScore = 0

  for (let round of rounds) {
    const [elf, human] = round.split(' ')

    const roundOutcome = findRoundOutcome([elf, human])

    const score = OUTCOME_SCORE[roundOutcome] + SHAPE_SCORE[HUMAN_SHAPES[human]]

    totalScore += score
  }

  console.log('> result 1:', totalScore)

  totalScore = 0

  for (let round of rounds) {
    const [elf, need] = round.split(' ')

    const roundNeed = ROUND_NEED[need]

    const humanMove = ELF_BASED_HUMAN_MOVE[elf][roundNeed]

    const score =
      OUTCOME_SCORE[roundNeed] + SHAPE_SCORE[HUMAN_SHAPES[humanMove]]

    totalScore += score
  }

  console.log('> result 2:', totalScore)
}

export default async function () {
  console.log('--- Day 02: Rock Paper Scissors ---')

  let data

  try {
    data = await readFile('02/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
