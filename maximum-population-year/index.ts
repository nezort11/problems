function maximumPopulation(logs: number[][]) {
  // Sort by birth year ascending
  logs.sort(([birthYear1], [birthYear2]) => birthYear1 - birthYear2);

  // Count population for every birth year
  const populations = logs.map(([birthYear, deathYear], i) => {
    let population = birthYear === deathYear ? 0 : 1;

    for (let j = 0; j < i; j++) {
      const [birthYear2, deathYear2] = logs[j];
      if (birthYear2 <= birthYear && birthYear <= deathYear2 - 1) {
        population += 1;
      }
    }

    return population;
  });

  const maxPopulation = Math.max(...populations);
  const maxPopulationIndex = populations.indexOf(maxPopulation);

  return logs[maxPopulationIndex][0];
}

