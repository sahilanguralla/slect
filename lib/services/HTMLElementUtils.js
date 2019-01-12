"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTMLElementUtils = /** @class */ (function () {
    function HTMLElementUtils() {
    }
    HTMLElementUtils.hasClass = function (el, className) {
        if (el.classList)
            return el.classList.contains(className);
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };
    HTMLElementUtils.addClass = function (el, className) {
        if (el.classList)
            el.classList.add(className);
        else if (!this.hasClass(el, className))
            el.className += ' ' + className;
    };
    HTMLElementUtils.removeClass = function (el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };
    HTMLElementUtils.clearDOM = function (el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    };
    return HTMLElementUtils;
}());
exports.default = HTMLElementUtils;
