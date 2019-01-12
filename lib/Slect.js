"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralUtils_1 = require("./services/GeneralUtils");
var SlectSuggestionList_1 = require("./SlectSuggestionList");
var HTMLElementUtils_1 = require("./services/HTMLElementUtils");
require("./assets/less/slect.less");
var cancelIcon_1 = require("./icons/cancelIcon");
var arrowDownIcon_1 = require("./icons/arrowDownIcon");
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
        clearContainerEl.innerHTML = cancelIcon_1.default;
        clearContainerEl.addEventListener('click', this.onClickClearButton);
        slectActionsContainer.appendChild(clearContainerEl);
        if (this.config.allowViewAllOptions) {
            var separatorEl = document.createElement('span');
            HTMLElementUtils_1.default.addClass(separatorEl, 'slect-actions-separator');
            slectActionsContainer.appendChild(separatorEl);
            var chevContainerEl = document.createElement('div');
            chevContainerEl.addEventListener('click', this.onClickExpandListButton);
            HTMLElementUtils_1.default.addClass(chevContainerEl, 'slect-chevron-container');
            chevContainerEl.innerHTML = arrowDownIcon_1.default;
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
            return process.env.RELEASE;
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
