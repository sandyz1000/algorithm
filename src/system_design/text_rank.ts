import * as natural from 'natural';

function sentenceSimilarity(sent1: string[], sent2: string[], stopWords: string[] | null = null): number {
    if (stopWords === null) {
        stopWords = [];
    }

    const allWords = Array.from(new Set([...sent1, ...sent2].map(w => w.toLowerCase())));
    const vector1 = Array(allWords.length).fill(0);
    const vector2 = Array(allWords.length).fill(0);

    for (const w of sent1) {
        if (!stopWords.includes(w)) {
            vector1[allWords.indexOf(w)] += 1;
        }
    }

    for (const w of sent2) {
        if (!stopWords.includes(w)) {
            vector2[allWords.indexOf(w)] += 1;
        }
    }

    return 1 - natural.JaccardDistance(vector1, vector2);
}

function buildSimilarityMatrix(sentences: string[][], stopWords: string[] | null = null): number[][] {
    const S: number[][] = Array.from({ length: sentences.length }, () => Array(sentences.length).fill(0));

    for (let idx1 = 0; idx1 < sentences.length; idx1++) {
        for (let idx2 = 0; idx2 < sentences.length; idx2++) {
            if (idx1 === idx2) {
                continue;
            }

            S[idx1][idx2] = sentenceSimilarity(sentences[idx1], sentences[idx2], stopWords);
        }
    }

    for (const row of S) {
        const sum = row.reduce((acc, val) => acc + val, 0);
        row.forEach((_, idx) => {
            row[idx] /= sum;
        });
    }

    return S;
}

function pageRank(A: number[][], eps: number = 0.0001, d: number = 0.85): number[] {
    let P: number[] = Array(A.length).fill(1 / A.length);

    while (true) {
        const newP: number[] = Array(A.length).fill((1 - d) / A.length);
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                newP[i] += d * A[j][i] * P[j];
            }
        }

        const delta = newP.reduce((acc, val, idx) => acc + Math.abs(val - P[idx]), 0);
        if (delta <= eps) {
            return newP;
        }

        P = newP;
    }
}

function textRank(sentences: string[][], topN: number = 5, stopWords: string[] | null = null): string[][] {
    const S = buildSimilarityMatrix(sentences, stopWords);
    const sentenceRanks = pageRank(S);

    const rankedSentenceIndexes = sentenceRanks.map((_, idx) => idx)
        .sort((a, b) => sentenceRanks[b] - sentenceRanks[a]);
    
    const selectedSentences = rankedSentenceIndexes.slice(0, topN).sort();
    const summary = selectedSentences.map(idx => sentences[idx]);

    return summary;
}

if (require.main === module) {
    // Example usage
    const sentence1 = "This is a good sentence".split(" ");
    const sentence2 = "This is a bad sentence".split(" ");
    const sentence3 = "This is a good sentence".split(" ");
    const sentence4 = "I want to go to the market".split(" ");
    
    console.log(sentenceSimilarity(sentence1, sentence2));
    console.log(sentenceSimilarity(sentence1, sentence2, natural.stopwords.words));
    console.log(sentenceSimilarity(sentence1, sentence3, natural.stopwords.words));
    console.log(sentenceSimilarity(sentence1, sentence4, natural.stopwords.words));

    const brownCorpus = new natural.BrownCorpus();
    const sentences = brownCorpus.taggedSents('ca01');

    console.log(sentences.length);

    const stopWords = natural.stopwords.words;
    const similarityMatrix = buildSimilarityMatrix(sentences, stopWords);
    console.log(similarityMatrix);

    const sentenceRanks = pageRank(similarityMatrix);
    console.log(sentenceRanks);

    const rankedSentenceIndexes = sentenceRanks.map((_, idx) => idx)
        .sort((a, b) => sentenceRanks[b] - sentenceRanks[a]);
    console.log(rankedSentenceIndexes);

    const SUMMARY_SIZE = 5;
    const SELECTED_SENTENCES = rankedSentenceIndexes.slice(0, SUMMARY_SIZE).sort();
    console.log(SELECTED_SENTENCES);

    const summary = textRank(sentences, SUMMARY_SIZE, stopWords);
    summary.forEach(sentence => console.log(sentence.join(' ')));
}
