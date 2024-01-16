const { MarkovMachine } = require('./markov');  // Update the path if necessary

describe('MarkovMachine', () => {
    test('makeText should return a string', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const result = mm.makeText();
        expect(typeof result).toBe('string');
    });

    test('should return less than input param', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const result = mm.makeText(4);
        const generatedWords = result.split(' ');
        expect(generatedWords.length).toBeLessThanOrEqual(4);
    })
});