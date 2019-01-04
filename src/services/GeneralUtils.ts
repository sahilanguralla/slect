class GeneralUtils {
    static similarity(s1: string, s2: string, exactMatch = true) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        if (!exactMatch) {
            longer = longer.slice(0, shorter.length);
        }
        let longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (
            (longerLength - this.editDistance(longer, shorter)) / longerLength
        );
    }

    static editDistance(s1: string, s2: string) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        let costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0) costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue =
                                Math.min(
                                    Math.min(newValue, lastValue),
                                    costs[j]
                                ) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
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
