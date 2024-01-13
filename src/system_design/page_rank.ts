class PageRank {
    buildIndex(links: Record<string, Set<string>>): Record<string, number> {
      const websiteList = Object.keys(links);
      return websiteList.reduce((index, website, currentIndex) => {
        index[website] = currentIndex;
        return index;
      }, {} as Record<string, number>);
    }
  
    buildTransitionMatrix(links: Record<string, Set<string>>, index: Record<string, number>): number[][] {
      const matrixSize = Object.keys(index).length;
      const A: number[][] = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
  
      for (const webpage in links) {
        if (!links[webpage].size) {
          // Dangling page
          A[index[webpage]].fill(1 / matrixSize);
        } else {
          for (const destWebpage of links[webpage]) {
            A[index[webpage]][index[destWebpage]] = 1.0 / links[webpage].size;
          }
        }
      }
  
      return A;
    }
  
    pageRank(A: number[][], eps: number = 0.0001, d: number = 0.85): number[] {
      const P: number[] = Array(A.length).fill(1 / A.length);
  
      while (true) {
        const newP = Array(A.length)
          .fill((1 - d) / A.length)
          .map((value, i) => value + d * A[i].reduce((acc, _, j) => acc + A[j][i] * P[j], 0));
  
        const delta = Math.abs(newP.reduce((acc, value, i) => acc + value - P[i], 0));
  
        if (delta <= eps) {
          return newP;
        }
  
        P.splice(0, P.length, ...newP);
      }
    }
  }
  
  if (require.main === module) {
    const pageRank = new PageRank();
  
    const links: Record<string, Set<string>> = {
      'webpage-1': new Set(['webpage-2', 'webpage-4', 'webpage-5', 'webpage-6', 'webpage-8', 'webpage-9', 'webpage-10']),
      'webpage-2': new Set(['webpage-5', 'webpage-6']),
      'webpage-3': new Set(['webpage-10']),
      'webpage-4': new Set(['webpage-9']),
      'webpage-5': new Set(['webpage-2', 'webpage-4']),
      'webpage-6': new Set([]), // Dangling page
      'webpage-7': new Set(['webpage-1', 'webpage-3', 'webpage-4']),
      'webpage-8': new Set(['webpage-1']),
      'webpage-9': new Set(['webpage-1', 'webpage-2', 'webpage-3', 'webpage-8', 'webpage-10']),
      'webpage-10': new Set(['webpage-2', 'webpage-3', 'webpage-8', 'webpage-9']),
    };
  
    const websiteIndex = pageRank.buildIndex(links);
    const A = pageRank.buildTransitionMatrix(links, websiteIndex);
    const results = pageRank.pageRank(A);
  
    console.log("Results:", results);
    console.log("Sum of results:", results.reduce((acc, value) => acc + value, 0));
    console.log(
      "Sorted results indices:",
      results.map((_, i) => i).sort((a, b) => results[b] - results[a])
    );
  }
  