/**  
 * Minimum number of edits(insert, delete, substitute, or swap two adjacent chars) to turn a into b.
*/

export function damerauLevenshtein(a: string, b: string): number {
    const rows = a.length + 1;
    const cols = b.length + 1;
    const d: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

    /*
    * Distance from an empty string is the other string's length
    */

    for (let i = 0; i < rows; i++) d[i][0] = i;
    for (let j = 0; j < cols; j++) d[0][j] = j;

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1; // Cost is 0 if characters match

            /*
            * Selects the cheapest operation based on edits
            */

            d[i][j] = Math.min(
                d[i - 1][j] + 1, // deletion
                d[i][j - 1] + 1, // insertion
                d[i - 1][j - 1] + cost // substitution
            );

            /* 
            * Last two chars are a swapped pair. Tries counting that as a single edit
            */

            const swapped = i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1];
            if (swapped) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
            }
        }
    }

    return d[rows - 1][cols - 1];
}