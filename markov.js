/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1];
      if (!this.chains[currentWord]) {
        this.chains[currentWord] = [];
      }
      this.chains[currentWord].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let result = [];
    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];

    for (let i = 0; i < numWords; i++) {
      result.push(currentWord);

      if (this.chains[currentWord]) {
        currentWord = this.chains[currentWord][Math.floor(Math.random() * this.chains[currentWord].length)];
      } else {
        break; // Break if the current word has no possible next words
      }
    }

    return result.join(' ');
  }
}

module.exports = { MarkovMachine };

