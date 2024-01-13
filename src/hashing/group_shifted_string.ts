
/* Group Shifted String
Given an array of strings (all lowercase letters), the task is to group them in such a way that all
strings in a group are shifted versions of each other.

Two string S and T are called shifted if,
- - - - - - - - - - - - - - - - - - - - - - - +

S.length = T.length
and
S[i] = T[i] + K for 1 <= i <= S.length  for a constant integer K

- - - - - - - - - - - - - - - - - - - - - - - +

==Example:==

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

strings {acd, dfg, wyz, yab, mop} are shifted versions of each other.
Input  : str = ["acd", "dfg", "wyz", "yab", "mop", "bdfh", "a", "x", "moqs"]
Output : a x
         acd dfg wyz yab mop
         bdfh moqs

All shifted strings are grouped together.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

 */

class GroupShiftedStrings {
    ALPHA: number; // Total lowercase letters

    constructor() {
        this.ALPHA = 26;
    }

    getDiffString(mString: string): string {
        let shift = "";
        for (let i = 1; i < mString.length; i++) {
            let diff = mString.charCodeAt(i) - mString.charCodeAt(i - 1);
            if (diff < 0) {
                diff += this.ALPHA;
            }
            shift += String.fromCharCode(diff + "a".charCodeAt(0));
        }
        return shift;
    }

    groupShiftedStrings(mString: string[]): void {
        const groupMap: Map<string, number[]> = new Map();

        for (let i = 0; i < mString.length; i++) {
            const diffStr = this.getDiffString(mString[i]);
            if (!groupMap.has(diffStr)) {
                groupMap.set(diffStr, []);
            }
            groupMap.get(diffStr)!.push(i);
        }

        for (const [key, indices] of groupMap.entries()) {
            for (const index of indices) {
                process.stdout.write(mString[index] + " ");
            }
            console.log();
        }
    }
}

if (require.main === module) {
    const groupShiftedStrings = new GroupShiftedStrings();
    const mString = ["acd", "dfg", "wyz", "yab", "mop", "bdfh", "a", "x", "moqs"];
    groupShiftedStrings.groupShiftedStrings(mString);
}
