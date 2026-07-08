import { describe, it, expect } from 'vitest';
import { damerauLevenshtein } from '../search/damerauLevenshtein';

describe('damerauLevenshtein', () => {
    it('returns 0 for identical strings', () => {
        expect(damerauLevenshtein('billy', 'billy')).toBe(0);
    });

    it('counts a single substitution as 1', () => {
        expect(damerauLevenshtein('billy', 'billi')).toBe(1);
    });

    it('counts a single insertion as 1', () => {
        expect(damerauLevenshtein('malm', 'malmo')).toBe(1);
    });

    it('counts a single deletion as 1', () => {
        expect(damerauLevenshtein('kallax', 'kalax')).toBe(1);
    });

    it('counts an adjacent transposition as 1, not 2', () => {
        // "billy" -> "iblly" swaps the first two letters
        expect(damerauLevenshtein('billy', 'iblly')).toBe(1);
    });

    it('a plain Levenshtein would score the same transposition as 2', () => {
        // Sanity check that the Damerau extension is actually doing something:
        // a substitution-only edit distance from 'ab' to 'ba' is 2 (sub, sub or del+ins),
        // but with adjacent transposition support it should be 1.
        expect(damerauLevenshtein('ab', 'ba')).toBe(1);
    });

    it('handles distance from an empty string as the other string\'s length', () => {
        expect(damerauLevenshtein('', 'lack')).toBe(4);
        expect(damerauLevenshtein('lack', '')).toBe(4);
    });

    it('is case-sensitive at the raw function level', () => {
        // Casing normalization is the caller's responsibility (see productStorage.search),
        // not this function's, so 'Billy' vs 'billy' should register a cost.
        expect(damerauLevenshtein('Billy', 'billy')).toBe(1);
    });

    it('handles completely different strings with the full length as an upper bound', () => {
        const dist = damerauLevenshtein('poang', 'ektorp');
        expect(dist).toBeGreaterThan(0);
        expect(dist).toBeLessThanOrEqual(Math.max('poang'.length, 'ektorp'.length));
    });
});
