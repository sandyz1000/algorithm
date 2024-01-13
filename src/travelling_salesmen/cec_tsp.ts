import * as fs from 'fs';


function hillclimb(
  initFunction: () => number[],
  moveOperator: (best: number[]) => number[][],
  objectiveFunction: (tour: number[]) => number,
  maxEvaluations: number
): [number, number, number[]] {
  let best = initFunction();
  let bestScore = objectiveFunction(best);

  let numEvaluations = 1;

  while (numEvaluations < maxEvaluations) {
    // examine moves around our current position
    let moveMade = false;
    for (const next of moveOperator(best)) {
      if (numEvaluations >= maxEvaluations) {
        break;
      }

      // see if this move is better than the current
      const nextScore = objectiveFunction(next);
      numEvaluations += 1;
      if (nextScore > bestScore) {
        best = next;
        bestScore = nextScore;
        moveMade = true;
        break; // depth-first search
      }
    }

    if (!moveMade) {
      break; // we couldn't find a better move (must be at a local maximum)
    }
  }

  return [numEvaluations, bestScore, best];
}

function hillclimbAndRestart(
  initFunction: () => number[],
  moveOperator: (best: number[]) => number[][],
  objectiveFunction: (tour: number[]) => number,
  maxEvaluations: number
): [number, number, number[]] {
  let best: number[] | null = null;
  let bestScore = 0;

  let numEvaluations = 0;

  while (numEvaluations < maxEvaluations) {
    const remainingEvaluations = maxEvaluations - numEvaluations;

    const [evaluated, score, found] = hillclimb(
      initFunction,
      moveOperator,
      objectiveFunction,
      remainingEvaluations
    );

    numEvaluations += evaluated;
    if (score > bestScore || best === null) {
      bestScore = score;
      best = found;
    }
  }

  return [numEvaluations, bestScore, best];
}

function reversedSections(tour: number[]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < tour.length; i++) {
    for (let j = i + 1; j < tour.length; j++) {
      if (i !== j) {
        const copy = [...tour];
        if (i < j) {
          copy.splice(i, j - i + 1, ...tour.slice(i, j + 1).reverse());
        } else {
          copy.splice(i + 1, tour.length - i - 1, ...tour.slice(i + 1).reverse());
          copy.splice(0, j, ...tour.slice(0, j).reverse());
        }
        if (copy.join('') !== tour.join('')) {
          if (copy[0] === 0) {
            result.push(copy);
          } else if (copy[copy.length - 1] === 0) {
            result.push(copy.reverse());
          }
        }
      }
    }
  }
  return result;
}

function swappedLocations(tour: number[]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < tour.length; i++) {
    for (let j = i + 1; j < tour.length; j++) {
      if (i < j && i !== 0) {
        const copy = [...tour];
        [copy[i], copy[j]] = [tour[j], tour[i]];
        result.push(copy);
      }
    }
  }
  return result;
}

function allPairs(size: number, shuffle?: (arr: number[]) => void): [number, number][] {
  const r1 = Array.from({ length: size }, (_, i) => i);
  const r2 = Array.from({ length: size }, (_, i) => i);
  if (shuffle) {
    shuffle(r1);
    shuffle(r2);
  }
  const result: [number, number][] = [];
  for (const i of r1) {
    for (const j of r2) {
      if (j !== 0) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

function distanceMatrix(coords: [number, number][]): Record<string, number> {
  const matrix: Record<string, number> = {};
  const url = 'http://maps.googleapis.com/maps/api/distancematrix/json?';
  let origins = 'origins=';
  let destinations = '&destinations=';
  let locations = '';

  coords.forEach((loc, index) => {
    locations += `${loc[0]},${loc[1]}`;
    if (index !== coords.length - 1) {
      locations += '|';
    }
  });

  origins += locations;
  destinations += locations;

  // Assuming you have a way to make HTTP requests in TypeScript
  // This example uses a placeholder, you may need to replace it with a suitable HTTP client
  // const dmData = await makeHttpRequest(url + origins + destinations + '&sensor=false');
  // const dmData = JSON.parse(fs.readFileSync('gmaps-response.json', 'utf8'));

  // For simplicity, assuming that the API response structure is similar to the Python code
  const dmData = {
    rows: coords.map(() => ({
      elements: coords.map(() => ({
        distance: { value: Math.floor(Math.random() * 1000) }, // Placeholder for distance value
      })),
    })),
  };

  for (let i = 0; i < dmData.rows.length; i++) {
    for (let j = 0; j < dmData.rows[i].elements.length; j++) {
      matrix[`${i},${j}`] = dmData.rows[i].elements[j].distance.value;
    }
  }

  return matrix;
}

function cartesianMatrix(coords: [number, number][]): Record<string, number> {
  const matrix: Record<string, number> = {};
  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length; j++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[j];
      const dx = x1 - x2;
      const dy = y1 - y2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      matrix[`${i},${j}`] = dist;
    }
  }
  return matrix;
}

function tourLength(matrix: Record<string, number>, tour: number[]): number {
  let total = 0;
  const numLocations = tour.length;
  for (let i = 0; i < numLocations; i++) {
    const j = (i + 1) % numLocations;
    const locI = tour[i];
    const locJ = tour[j];
    if (j !== 0) {
      total += matrix[`${locI},${locJ}`];
    }
  }
  return total;
}

