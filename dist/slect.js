(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Slect", [], factory);
	else if(typeof exports === 'object')
		exports["Slect"] = factory();
	else
		root["Slect"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Slect_1 = __webpack_require__(3);
exports.default = Slect_1.default;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GeneralUtils_1 = __webpack_require__(1);
var SlectSuggestionList_1 = __webpack_require__(4);
var HTMLElementUtils_1 = __webpack_require__(0);
__webpack_require__(7);
var Slect = /** @class */ (function () {
    function Slect(element, options, config) {
        var _this = this;
        this.selectedOpts = [];
        this.focused = false;
        this.onOptionSelect = function (options) {
            if (!GeneralUtils_1.default.areEqualArrays(_this.selectedOpts, options)) {
                _this.selectedOpts = options;
                _this.onSelect && _this.onSelect(_this, options);
                _this.updateSelectionInView();
            }
        };
        this.onClickBody = function (event) {
            var target = event.target || event.srcElement || event.currentTarget;
            if (target instanceof Node && _this.element.contains(target)) {
            }
            else {
                _this.onBlur();
            }
        };
        this.onInputKeyUp = function () {
            var newValue = _this.inputEl.value;
            var selectedOption = _this.options.find(function (option) { return option.label.toLowerCase() === newValue.toLowerCase(); });
            if (selectedOption) {
                _this.onOptionSelect([selectedOption]);
                _this.updateInput();
            }
            else if (_this.inputEl.value.length > 0) {
                var selectedOpts = [];
                if (_this.config.allowCustomOption) {
                    selectedOpts = [
                        {
                            label: newValue,
                            value: newValue.toLowerCase(),
                            custom: true
                        }
                    ];
                }
                _this.onOptionSelect(selectedOpts);
                _this.updateInput();
            }
            else if (_this.inputEl.value.length < 1) {
                _this.clearSelectedOptions();
            }
            _this.updateSuggestionList(newValue);
        };
        this.onInputKeyDown = function (event) {
            if (event.keyCode === 9 || event.keyCode === 27) {
                if (event.keyCode === 27) {
                    _this.inputEl.blur();
                }
                _this.onBlur();
            }
        };
        this.onInputChange = function () {
            _this.updateSuggestionList(_this.inputEl.value);
        };
        this.onFocus = function () {
            _this.element.scrollIntoView({ behavior: 'smooth' });
            _this.focused = true;
            HTMLElementUtils_1.default.addClass(_this.element, 'focused');
        };
        this.onBlur = function () {
            if (_this.focused) {
                _this.focused = false;
                if (_this.selectedOptions.length < 1) {
                    _this.clearSelectedOptions();
                }
                _this.closeSuggestionList();
            }
        };
        this.onClickValueElement = function () {
            _this.focus(true);
        };
        this.onClickClearButton = function () {
            HTMLElementUtils_1.default.removeClass(_this.element, 'slect-selected');
            _this.clearSelectedOptions();
            _this.closeSuggestionList();
        };
        this.onClickExpandListButton = function () {
            _this.focus(!_this.focused);
        };
        if (element instanceof HTMLElement)
            this.element = element;
        else if (typeof element === 'string') {
            var el = document.body.querySelector(element);
            if (el instanceof HTMLElement)
                this.element = el;
            else
                throw new Error("No element with given selector found in DOM.");
        }
        else {
            throw new Error('Invalid selector.');
        }
        this.opts = options;
        this.config = Slect.defaultConfig;
        if (config) {
            this.config = Object.assign(Slect.defaultConfig, config);
        }
        this.valueElement = document.createElement('div');
        this.inputContainerEl = document.createElement('div');
        this.inputEl = document.createElement('input');
        this.suggestionList = new SlectSuggestionList_1.default([]);
        this.init();
    }
    Object.defineProperty(Slect.prototype, "options", {
        get: function () {
            return this.opts;
        },
        set: function (options) {
            this.opts = options;
            this.updateSuggestionList();
            this.validateSelection();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slect.prototype, "selectedOptions", {
        get: function () {
            return this.selectedOpts;
        },
        set: function (options) {
            this.selectedOpts = options;
            this.updateInput();
            this.updateSelectionInView();
        },
        enumerable: true,
        configurable: true
    });
    Slect.prototype.init = function () {
        var _this = this;
        HTMLElementUtils_1.default.clearDOM(this.element);
        HTMLElementUtils_1.default.addClass(this.element, 'slect');
        HTMLElementUtils_1.default.addClass(this.valueElement, 'slect-value');
        var valueContainerEl = document.createElement('div');
        HTMLElementUtils_1.default.addClass(valueContainerEl, 'slect-value-container');
        this.element.appendChild(valueContainerEl);
        this.valueElement.innerText = this.config.placeholder;
        this.valueElement.addEventListener('click', this.onClickValueElement);
        valueContainerEl.appendChild(this.valueElement);
        HTMLElementUtils_1.default.addClass(this.inputContainerEl, 'slect-input-container');
        this.element.appendChild(this.inputContainerEl);
        HTMLElementUtils_1.default.addClass(this.inputEl, 'slect-input');
        this.inputContainerEl.appendChild(this.inputEl);
        this.inputEl.placeholder = this.config.placeholder;
        this.inputEl.addEventListener('change', this.onInputChange);
        this.inputEl.addEventListener('keyup', this.onInputKeyUp);
        this.inputEl.addEventListener('keydown', this.onInputKeyDown);
        this.inputEl.addEventListener('focus', this.onFocus);
        var separator = document.createElement('div');
        HTMLElementUtils_1.default.addClass(separator, 'slect-input-separator');
        this.inputContainerEl.appendChild(separator);
        this.suggestionList
            .render()
            .then(function (el) { return _this.inputContainerEl.appendChild(el); });
        // slect actions start here
        var slectActionsContainer = document.createElement('div');
        HTMLElementUtils_1.default.addClass(slectActionsContainer, 'slect-actions-container');
        var clearContainerEl = document.createElement('div');
        HTMLElementUtils_1.default.addClass(clearContainerEl, 'slect-clear-container');
        clearContainerEl.innerHTML = __webpack_require__(8);
        clearContainerEl.addEventListener('click', this.onClickClearButton);
        slectActionsContainer.appendChild(clearContainerEl);
        if (this.config.allowViewAllOptions) {
            var separatorEl = document.createElement('span');
            HTMLElementUtils_1.default.addClass(separatorEl, 'slect-actions-separator');
            slectActionsContainer.appendChild(separatorEl);
            var chevContainerEl = document.createElement('div');
            chevContainerEl.addEventListener('click', this.onClickExpandListButton);
            HTMLElementUtils_1.default.addClass(chevContainerEl, 'slect-chevron-container');
            chevContainerEl.innerHTML = __webpack_require__(9);
            slectActionsContainer.appendChild(chevContainerEl);
            HTMLElementUtils_1.default.addClass(this.element, 'slect-expandable');
            this.suggestionList.options = this.options;
        }
        this.element.appendChild(slectActionsContainer);
        // slect actions ends here
        window.addEventListener('click', this.onClickBody);
        // adding mutation observer if available to remove event listener after element is removed
        if (typeof MutationObserver === 'function' && this.element.parentNode) {
            var observer = new MutationObserver(function (mutations) {
                var removed = false;
                mutations.forEach(function (mutation) {
                    mutation.removedNodes.forEach(function (node) {
                        if (node === _this.element)
                            removed = true;
                    });
                });
                if (removed) {
                    window.removeEventListener('click', _this.onClickBody);
                }
            });
            observer.observe(this.element.parentNode, {
                childList: true
            });
        }
        this.suggestionList.onSelect = function (options) {
            _this.onOptionSelect(options);
            _this.updateInput();
            _this.updateSelectionInView();
            _this.closeSuggestionList();
        };
    };
    Slect.prototype.validateSelection = function () {
        var _this = this;
        this.selectedOpts = this.selectedOpts.filter(function (option) {
            return (option.custom && _this.config.allowCustomOption) ||
                _this.options.indexOf(option) !== -1;
        });
        this.updateSelectionInView();
        this.updateInput();
    };
    Slect.prototype.updateSelectionInView = function () {
        if (this.selectedOptions.length > 0) {
            HTMLElementUtils_1.default.addClass(this.element, 'slect-selected');
        }
        else {
            HTMLElementUtils_1.default.removeClass(this.element, 'slect-selected');
        }
        this.suggestionList.selectedOptions = this.selectedOptions;
    };
    Slect.prototype.focus = function (focused) {
        var _this = this;
        if (focused) {
            this.onFocus();
            setTimeout(function () {
                _this.inputEl.focus();
            });
        }
        else {
            this.inputEl.blur();
            this.onBlur();
        }
        this.focused = focused;
    };
    Slect.prototype.clearSelectedOptions = function () {
        this.selectedOptions = [];
        this.onSelect && this.onSelect(this, []);
        this.updateSuggestionList();
    };
    Slect.prototype.closeSuggestionList = function () {
        HTMLElementUtils_1.default.removeClass(this.element, 'focused');
    };
    Slect.prototype.updateInput = function () {
        var value = this.selectedOptions
            .map(function (option) { return option.label; })
            .join(', ');
        this.inputEl.value = value;
        this.valueElement.innerText = value ? value : this.config.placeholder;
    };
    Slect.prototype.updateSuggestionList = function (text) {
        if (text === void 0) { text = ''; }
        var validOptions = [];
        if (this.config.allowViewAllOptions ||
            text.length >= this.config.minTextLengthForSuggestions) {
            var exactMatch_1 = true;
            if (this.config.allowViewAllOptions) {
                exactMatch_1 = false;
            }
            validOptions = this.options;
            if (text.length > 0) {
                validOptions = validOptions
                    .reduce(function (prevValue, option) {
                    var similarity = GeneralUtils_1.default.similarity(text, option.label, exactMatch_1);
                    if (similarity > 0.5) {
                        prevValue.push({
                            similarity: similarity,
                            option: option
                        });
                    }
                    return prevValue;
                }, [])
                    .sort(function (optionA, optionB) {
                    return optionB.similarity - optionA.similarity;
                })
                    .map(function (optionSim) {
                    return optionSim.option;
                });
            }
        }
        this.suggestionList.options = validOptions;
        this.suggestionList.selectedOptions = this.selectedOptions;
    };
    Object.defineProperty(Slect, "version", {
        get: function () {
            return "v0.0.18-1-gf38bf6c";
        },
        enumerable: true,
        configurable: true
    });
    Slect.defaultConfig = {
        minTextLengthForSuggestions: 3,
        maxSuggestions: 0,
        allowViewAllOptions: true,
        get placeholder() {
            return this.allowViewAllOptions
                ? 'Type or select an option'
                : 'Please type';
        },
        allowCustomOption: false
    };
    return Slect;
}());
exports.default = Slect;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SlectSuggestionListItem_1 = __webpack_require__(5);
var HTMLElementUtils_1 = __webpack_require__(0);
var GeneralUtils_1 = __webpack_require__(1);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTMLElementUtils_1 = __webpack_require__(0);
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
            tickContainerEl.innerHTML = __webpack_require__(6);
            _this.domElement.appendChild(tickContainerEl);
            _this.select(_this.selected);
            resolve(_this.domElement);
        });
    };
    return SlectSuggestionListItem;
}());
exports.default = SlectSuggestionListItem;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\"><g><g><path d=\"M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z\" fill=\"#006DF0\"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>"

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 20 20\" aria-hidden=\"true\" focusable=\"false\" class=\"css-19bqh2r\"><path d=\"M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z\"></path></svg>"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 292.362 292.362\" style=\"enable-background:new 0 0 292.362 292.362;\" xml:space=\"preserve\"><g><path d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>"

/***/ })
/******/ ])["default"];
});