"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralUtils = /** @class */ (function () {
    function GeneralUtils() {
    }
    GeneralUtils.similarity = function (s1, s2, exactMatch) {
        if (exactMatch === void 0) { exactMatch = true; }
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        var matchScore = (longerLength - this.editDistance(longer, shorter)) / longerLength;
        if (!exactMatch) {
            var slicedLonger = longer.slice(0, shorter.length);
            var slicedLongerLength = slicedLonger.length;
            var newMatchScore = ((slicedLongerLength -
                this.editDistance(slicedLonger, shorter)) /
                slicedLongerLength) *
                (shorter.length / slicedLonger.length);
            if (newMatchScore > matchScore) {
                if (newMatchScore === 1)
                    matchScore = newMatchScore;
                else {
                    newMatchScore =
                        newMatchScore * (slicedLongerLength / longerLength);
                    matchScore =
                        matchScore > newMatchScore ? matchScore : newMatchScore;
                }
            }
        }
        return matchScore;
    };
    GeneralUtils.editDistance = function (s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        var costs = [];
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue =
                                Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };
    GeneralUtils.areEqualArrays = function (array1, array2) {
        return (array1.length === array2.length &&
            typeof array1.find(function (item, index) { return item !== array2[index]; }) ===
                'undefined');
    };
    return GeneralUtils;
}());
exports.default = GeneralUtils;
