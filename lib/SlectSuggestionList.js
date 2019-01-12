"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SlectSuggestionListItem_1 = require("./SlectSuggestionListItem");
var HTMLElementUtils_1 = require("./services/HTMLElementUtils");
var GeneralUtils_1 = require("./services/GeneralUtils");
var SlectSuggestionList = /** @class */ (function () {
    function SlectSuggestionList(options) {
        var _this = this;
        this.opts = [];
        this.listItems = [];
        this.selectedItems = [];
        this.onClickListItem = function (item) {
            if (_this.selectedItems.length > 0) {
                _this.selectedItems[0].select(false);
            }
            item.select(true);
            _this.selectedItems = [item];
            if (typeof _this.onSelect === 'function') {
                _this.onSelect(_this.selectedItems.map(function (item) { return item.option; }));
            }
        };
        this.opts = options;
        this.domElement = document.createElement('div');
        this.init();
    }
    Object.defineProperty(SlectSuggestionList.prototype, "options", {
        get: function () {
            return this.opts;
        },
        set: function (options) {
            if (!GeneralUtils_1.default.areEqualArrays(this.opts, options)) {
                this.opts = options;
                this.updateListItems();
                this.render();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlectSuggestionList.prototype, "selectedOptions", {
        get: function () {
            return this.selectedItems.map(function (item) { return item.option; });
        },
        set: function (options) {
            this.selectedItems = this.listItems.reduce(function (items, item) {
                if (options.indexOf(item.option) !== -1) {
                    item.select(true);
                    items.push(item);
                }
                else {
                    item.select(false);
                }
                return items;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    SlectSuggestionList.prototype.init = function () {
        HTMLElementUtils_1.default.addClass(this.domElement, 'slect-suggestion-list');
        this.updateListItems();
    };
    SlectSuggestionList.prototype.updateListItems = function () {
        var _this = this;
        this.listItems = this.options.map(function (option) {
            var item = new SlectSuggestionListItem_1.default(option);
            item.onClick = _this.onClickListItem;
            return item;
        });
    };
    SlectSuggestionList.prototype.render = function () {
        var _this = this;
        return Promise.all(this.listItems.map(function (item) { return item.render(); })).then(function (els) {
            HTMLElementUtils_1.default.clearDOM(_this.domElement);
            if (els.length > 0) {
                els.forEach(function (el) { return _this.domElement.append(el); });
                HTMLElementUtils_1.default.removeClass(_this.domElement, 'empty-list');
            }
            else {
                HTMLElementUtils_1.default.addClass(_this.domElement, 'empty-list');
            }
            _this.domElement.scrollTo(0, 0);
            return _this.domElement;
        });
    };
    return SlectSuggestionList;
}());
exports.default = SlectSuggestionList;
