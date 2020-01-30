class GeneralUtils {
    static similarity(s1: string, s2: string, exactMatch = true) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        const longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        let matchScore =
            (longerLength - this.editDistance(longer, shorter)) / longerLength;

        if (!exactMatch) {
            const slicedLonger = longer.slice(0, shorter.length);
            const slicedLongerLength = slicedLonger.length;

            let newMatchScore =
                ((slicedLongerLength -
                    this.editDistance(slicedLonger, shorter)) /
                    slicedLongerLength) *
                (shorter.length / slicedLonger.length);
            if (newMatchScore > matchScore) {
                if (newMatchScore === 1) matchScore = newMatchScore;
                else {
                    newMatchScore *= slicedLongerLength / longerLength;
                    matchScore =
                        matchScore > newMatchScore ? matchScore : newMatchScore;
                }
            }
        }

        return matchScore;
    }

    static editDistance(str1: string, str2: string) {
        const s1 = str1.toLowerCase();
        const s2 = str2.toLowerCase();

        const costs = [];
        for (let i = 0; i <= s1.length; i += 1) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j += 1) {
                if (i === 0) costs[j] = j;
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue =
                            Math.min(Math.min(newValue, lastValue), costs[j]) +
                            1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    static areEqualArrays<T>(array1: T[], array2: T[]): boolean {
        return (
            array1.length === array2.length &&
            typeof array1.find((item, index) => item !== array2[index]) ===
                'undefined'
        );
    }
}

export default GeneralUtils;
