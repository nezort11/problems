function maxScore(cardPoints: number[], k: number) {
  const scores: number[] = [];
  for (let i = 0; i <= k; i++) {
    let leftScore = 0;
    for (let j = 0; j < i; j++) {
      leftScore += cardPoints[j];
    }
    let rightScore = 0;
    for (let j = 0; j < k - i; j++) {
      rightScore += cardPoints[cardPoints.length - 1 - j];
    }

    scores.push(leftScore + rightScore);
  }

  return Math.max(...scores);
}

console.log(maxScore([100, 40, 17, 9, 73, 75], 3));
