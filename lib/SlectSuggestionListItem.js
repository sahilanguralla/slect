"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTMLElementUtils_1 = require("./services/HTMLElementUtils");
var tickIcon_1 = require("./assets/icons/tickIcon");
var SlectSuggestionListItem = /** @class */ (function () {
    function SlectSuggestionListItem(option) {
        this.selected = false;
        this.option = option;
        this.domElement = document.createElement('div');
        this.init();
    }
    SlectSuggestionListItem.prototype.init = function () {
        var _this = this;
        HTMLElementUtils_1.default.addClass(this.domElement, 'slect-suggestion-list-item');
        this.domElement.addEventListener('click', function () {
            if (typeof _this.onClick !== 'undefined') {
                _this.onClick(_this);
            }
        });
    };
    SlectSuggestionListItem.prototype.select = function (selected) {
        this.selected = selected;
        if (selected) {
            HTMLElementUtils_1.default.addClass(this.domElement, 'selected');
        }
        else {
            HTMLElementUtils_1.default.removeClass(this.domElement, 'selected');
        }
    };
    SlectSuggestionListItem.prototype.render = function () {
        var _this = this;
        return new Promise(function (resolve) {
            HTMLElementUtils_1.default.clearDOM(_this.domElement);
            _this.domElement.appendChild(document.createTextNode(_this.option.label));
            _this.domElement.dataset.optionValue = _this.option.value;
            var tickContainerEl = document.createElement('div');
            HTMLElementUtils_1.default.addClass(tickContainerEl, 'slect-checkmark-container');
            tickContainerEl.innerHTML = tickIcon_1.default;
            _this.domElement.appendChild(tickContainerEl);
            _this.select(_this.selected);
            resolve(_this.domElement);
        });
    };
    return SlectSuggestionListItem;
}());
exports.default = SlectSuggestionListItem;
