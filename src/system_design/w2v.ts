import * as fs from 'fs';
import * as natural from 'natural';
const word2vec = require('word2vec');

const { WordTokenizer, SentimentAnalyzer, PorterStemmer, Stopwords } = natural;

const textReview = fs.readFileSync('Wikipedia_Text.txt', 'utf-8');

// Function to convert a document to a sequence of words
function textToWordlist(text: string, removeStopwords: boolean = false): string[] {
  const reviewText = text.replace(/[^a-zA-Z]/g, ' ');
  const words = reviewText.toLowerCase().split(/\s+/);
  return words;
}

const tokenizer = new WordTokenizer();

// Define a function to split a text into parsed sentences
function textToSentences(text: string, tokenizer: any, removeStopwords: boolean = false): string[][] {
  const rawSentences = tokenizer.tokenize(text.trim());
  const sentences: string[][] = [];

  for (const sentence of rawSentences) {
    if (sentence.length > 0) {
      sentences.push(textToWordlist(sentence, removeStopwords));
    }
  }

  return sentences;
}

const sentences: string[][] = [];

// Parsing sentences from training set
sentences.push(...textToSentences(textReview, tokenizer, false));

const numFeatures = 100;
const model = word2vec.word2vec(sentences, {
  size: numFeatures,
  window: 5,
  min_count: 0,
});

const modelFileName = 'w2v';
model.saveModelSync(modelFileName);
const loadedModel = word2vec.loadModelSync(modelFileName);

console.log(typeof loadedModel.syn0);
console.log(loadedModel.syn0.shape);

// It gives the vector representation of a word
console.log(loadedModel.getVector('and'));

// You can replace these with your own words for similarity comparison
const word1 = 'word_1';
const word2 = 'word_2';
console.log(loadedModel.similarity(word1, word2));
