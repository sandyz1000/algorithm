import * as fs from 'fs';
import * as natural from 'natural';
import * as word2vec from 'word2vec';
import * as numeric from 'numeric';

const { PorterStemmer, Stopwords } = natural;

const textReview = fs.readFileSync('Text.txt', 'utf-8');

// Load Word2Vec model
const model = word2vec.loadModelSync('w2v');

// Function to clean and preprocess text
function textToWordlist(text: string, removeStopwords: boolean = true): string[] {
  const reviewText = text.replace(/[^a-zA-Z]/g, ' ').toLowerCase();
  const words = reviewText.split(/\s+/);
  const stops = new Set(Stopwords);
  const meaningfulWords = words.filter((w) => !removeStopwords || !stops.has(w));
  return meaningfulWords;
}

// Function to get feature vector of words
function getFeatureVec(words: string[], model: any): number[][] {
  const index2wordSet = new Set(model.index2word);
  const cleanText: number[][] = [];
  
  for (const word of words) {
    if (index2wordSet.has(word)) {
      cleanText.push(model[word]);
    }
  }

  return cleanText;
}

// Bag of words list without stopwords
const cleanTrainText = textToWordlist(textReview, true);

// Delete words which occur more than once
const cleanTrain = Array.from(new Set(cleanTrainText));

const trainDataVecs = getFeatureVec(cleanTrain, model);
const trainData = trainDataVecs;

// Calculate cosine similarity matrix
const similarity = numeric.dot(trainData, numeric.transpose(trainData));

// Squared magnitude of preference vectors (number of occurrences)
const squareMag = numeric.diag(similarity);

// Inverse squared magnitude
const invSquareMag = numeric.div(1, squareMag);

// If it doesn't occur, set its inverse magnitude to zero
for (let i = 0; i < invSquareMag.length; i++) {
  if (isNaN(invSquareMag[i]) || !isFinite(invSquareMag[i])) {
    invSquareMag[i] = 0;
  }
}

// Inverse of the magnitude
const invMag = numeric.sqrt(invSquareMag);

// Cosine similarity (elementwise multiply by inverse magnitudes)
let cosine = numeric.mul(similarity, invMag);
cosine = numeric.mul(cosine, numeric.transpose(invMag));

// Pagerank power method
function powerMethod(A: number[][], x0: number[], m: number, iter: number): number[] {
  const n = A[0].length;
  const delta = numeric.mul(m, numeric.rep([n], 1 / n));
  
  for (let i = 0; i < iter; i++) {
    x0 = numeric.add(numeric.mul((1 - m), numeric.dot(A, x0)), delta);
  }
  
  return x0;
}

const n = cosine[0].length;
const m = 0.15;
const x0 = numeric.rep([n], 1);

const pagerankValues = powerMethod(cosine, x0, m, 130);

const srt = numeric.argsort(pagerankValues).reverse();
const a = srt.slice(0, 10);

const keywordsList: string[] = [];

for (const wordIndex of a) {
  keywordsList.push(cleanTrainText[wordIndex]);
}

console.log(keywordsList);
