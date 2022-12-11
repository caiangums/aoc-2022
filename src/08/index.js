import { readFile } from '_utils/file'

const isVisible = ({ tree, forest }) => {
  const [a, b] = tree
  const actualTree = forest[a][b]

  let isHorizontalBeforeVisible = true
  let isHorizontalAfterVisible = true
  let isVerticalBeforeVisible = true
  let isVerticalAfterVisible = true

  for (let i = 0; i < forest.length; i += 1) {
    if (i < a) isHorizontalBeforeVisible &= forest[i][b] < actualTree
    if (i > a) isHorizontalAfterVisible &= forest[i][b] < actualTree
    if (i < b) isVerticalBeforeVisible &= forest[a][i] < actualTree
    if (i > b) isVerticalAfterVisible &= forest[a][i] < actualTree
  }

  return (
    isHorizontalBeforeVisible ||
    isHorizontalAfterVisible ||
    isVerticalBeforeVisible ||
    isVerticalAfterVisible
  )
}

const getTreeScenicScore = ({ tree, forest }) => {
  const [a, b] = tree

  let horizontalBeforeScore = 0
  let horizontalAfterScore = 0
  let verticalBeforeScore = 0
  let verticalAfterScore = 0

  const actualTree = forest[a][b]

  for (let i = a - 1; i >= 0; i -= 1) {
    horizontalBeforeScore += 1
    if (forest[i][b] >= actualTree) {
      break
    }
  }

  for (let i = a + 1; i < forest.length; i += 1) {
    horizontalAfterScore += 1
    if (forest[i][b] >= actualTree) {
      break
    }
  }

  for (let i = b - 1; i >= 0; i -= 1) {
    verticalBeforeScore += 1
    if (forest[a][i] >= actualTree) {
      break
    }
  }

  for (let i = b + 1; i < forest.length; i += 1) {
    verticalAfterScore += 1
    if (forest[a][i] >= actualTree) {
      break
    }
  }

  return (
    horizontalBeforeScore *
    horizontalAfterScore *
    verticalBeforeScore *
    verticalAfterScore
  )
}

const solve = (forest) => {
  const treeLines = forest
    .split('\n')
    .slice(0, -1)
    .map((line) => line.split(''))

  let visibleTrees = treeLines.length * 2 + treeLines[0].length * 2 - 4

  for (let i = 1; i < treeLines.length - 1; i += 1) {
    for (let j = 1; j < treeLines[i].length - 1; j += 1) {
      const tree = treeLines[i][j]
      if (tree === 0) {
        continue
      }

      if (isVisible({ tree: [i, j], forest: treeLines })) {
        visibleTrees += 1
      }
    }
  }

  console.log('> result 1:', visibleTrees)

  let scenicScore = 0

  for (let i = 0; i < treeLines.length; i += 1) {
    for (let j = 0; j < treeLines[i].length; j += 1) {
      const treeScenicScore = getTreeScenicScore({
        tree: [i, j],
        forest: treeLines,
      })

      if (treeScenicScore > scenicScore) {
        scenicScore = treeScenicScore
      }
    }
  }

  console.log('> result 2:', scenicScore)
}

export default async function () {
  console.log('--- Day 08: Treetop Tree House ---')

  let data

  try {
    data = await readFile('08/input.in')
  } catch (err) {
    console.error('Error:', err)
  }

  return solve(data)
}
