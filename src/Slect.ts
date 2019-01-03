import SlectOption from './SlectOption';
import SlectConfig from './SlectConfig';
import GeneralUtils from './services/GeneralUtils';
import SlectSuggestionList from './SlectSuggestionList';
import HTMLElementUtils from './services/HTMLElementUtils';

import './assets/less/slect.less';

class Slect<T extends SlectOption> {
    options: T[];

    private selectedOpts: (T | SlectOption)[] = [];
    get selectedOptions(): (T | SlectOption)[] {
        return this.selectedOpts;
    }
    set selectedOptions(options: (T | SlectOption)[]) {
        this.selectedOpts = options;
        this.updateSelection();
    }

    private config: SlectConfig<T>;

    private readonly inputEl: HTMLInputElement;
    private readonly suggestionList: SlectSuggestionList<T>;

    private readonly element: HTMLElement;

    static readonly defaultConfig: SlectConfig<SlectOption> = {
        minTextLengthForSuggestions: 3,
        maxSuggestions: 0,
        allowViewAllOptions: true,
        onSelect: (options: SlectOption[]) => {
            console &&
                console.info &&
                console.info(
                    'onSelect is not handled. You can do the same by passing via config',
                    options
                );
        },
        get placeholder(): string {
            return this.allowCustomOption
                ? 'Please enter...'
                : 'Please choose...';
        },
        allowCustomOption: false
    };

    constructor(
        element: HTMLElement | string,
        options: T[],
        config?: Partial<SlectConfig<T>>
    ) {
        if (element instanceof HTMLElement) this.element = element;
        else if (typeof element === 'string') {
            const el = document.body.querySelector(element);
            if (el instanceof HTMLElement) this.element = el;
            else
                throw new Error(`No element with given selector found in DOM.`);
        } else {
            throw new Error('Invalid selector.');
        }
        this.options = options;

        this.config = Slect.defaultConfig;
        if (config) {
            this.config = Object.assign(Slect.defaultConfig, config);
        }

        this.inputEl = document.createElement('input');
        this.element.appendChild(this.inputEl);

        this.suggestionList = new SlectSuggestionList<T>([]);

        this.init();
    }

    init() {
        HTMLElementUtils.addClass(this.element, 'slect');
        HTMLElementUtils.addClass(this.inputEl, 'slect-input');

        this.inputEl.placeholder = this.config.placeholder;
        this.inputEl.addEventListener('change', this.onInputChange);
        this.inputEl.addEventListener('keyup', this.onInputKeyUp);
        this.inputEl.addEventListener('keydown', this.onInputKeyDown);
        this.inputEl.addEventListener('focus', this.onFocus);

        this.suggestionList.render().then(el => this.element.appendChild(el));

        const slectActionsContainer = document.createElement('div');
        HTMLElementUtils.addClass(
            slectActionsContainer,
            'slect-actions-container'
        );

        const clearContainerEl = document.createElement('div');
        HTMLElementUtils.addClass(clearContainerEl, 'slect-clear-container');
        clearContainerEl.innerHTML = require('./assets/icons/cancel.svg');
        clearContainerEl.addEventListener('click', this.onClickClearButton);
        slectActionsContainer.appendChild(clearContainerEl);

        if (this.config.allowViewAllOptions) {
            const separatorEl = document.createElement('span');
            HTMLElementUtils.addClass(separatorEl, 'slect-actions-separator');
            slectActionsContainer.appendChild(separatorEl);

            const chevContainerEl = document.createElement('div');
            chevContainerEl.addEventListener(
                'click',
                this.onClickExpandListButton
            );
            HTMLElementUtils.addClass(
                chevContainerEl,
                'slect-chevron-container'
            );

            chevContainerEl.innerHTML = require('./assets/icons/chevron-down.svg');
            slectActionsContainer.appendChild(chevContainerEl);

            HTMLElementUtils.addClass(this.element, 'slect-expandable');
            this.suggestionList.options = this.options;
        }

        this.element.appendChild(slectActionsContainer);

        window.addEventListener('click', this.onClickBody);

        // adding mutation observer if available to remove event listener after element is removed
        if (typeof MutationObserver === 'function' && this.element.parentNode) {
            const observer = new MutationObserver(mutations => {
                let removed = false;
                mutations.forEach(mutation => {
                    mutation.removedNodes.forEach((node: Node) => {
                        if (node === this.element) removed = true;
                    });
                });
                if (removed) {
                    window.removeEventListener('click', this.onClickBody);
                }
            });
            observer.observe(this.element.parentNode, {
                childList: true
            });
        }

        this.suggestionList.onSelect = this.onSelect;
    }

    onSelect = (options: (T | SlectOption)[]) => {
        this.selectedOpts = options;
        this.config.onSelect(options);
        this.updateSelection();
        this.closeSuggestionList();
    };

    updateSelection() {
        if (this.selectedOptions.length > 0) {
            HTMLElementUtils.addClass(this.element, 'slect-selected');
        } else {
            HTMLElementUtils.removeClass(this.element, 'slect-selected');
        }

        this.updateInput();

        this.suggestionList.selectedOptions = this.selectedOptions;
    }

    onClickBody = (event: Event) => {
        const target = event.target || event.srcElement || event.currentTarget;
        if (target instanceof Node && this.element.contains(target)) {
        } else {
            this.onBlur();
        }
    };

    onInputKeyUp = () => {
        this.updateSuggestionList();
    };

    onInputKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 9) {
            this.onBlur();
        }
    };

    onInputChange = () => {
        this.updateSuggestionList();
    };

    onClickClearButton = () => {
        HTMLElementUtils.removeClass(this.element, 'slect-selected');

        this.clearSelectedOptions();
        this.closeSuggestionList();
    };

    onClickExpandListButton = () => {
        this.inputEl.focus();
        this.onFocus();
    };

    onBlur = () => {
        const newValue = this.inputEl.value;
        const selectedOption = this.options.find(
            option => option.label.toLowerCase() === newValue.toLowerCase()
        );
        if (selectedOption) {
            this.selectedOptions = [selectedOption];
            this.inputEl.value = selectedOption.label;
        } else if (
            this.config.allowCustomOption &&
            this.inputEl.value.length > 0
        ) {
            this.selectedOptions = [
                {
                    label: newValue,
                    value: newValue.toLowerCase(),
                    custom: true
                }
            ];
            this.config.onSelect(this.selectedOptions);
        } else {
            this.clearSelectedOptions();
        }
        this.closeSuggestionList();
    };

    clearSelectedOptions() {
        this.inputEl.value = '';
        this.selectedOptions = [];
        this.updateSuggestionList();
    }

    closeSuggestionList() {
        HTMLElementUtils.removeClass(this.element, 'focused');
    }

    onFocus = () => {
        HTMLElementUtils.addClass(this.element, 'focused');
    };

    updateInput() {
        this.inputEl.value = this.selectedOptions
            .map(option => option.label)
            .join(', ');
    }

    updateSuggestionList() {
        const text = this.inputEl.value;
        let validOptions: T[] = [];
        if (
            this.config.allowViewAllOptions ||
            text.length >= this.config.minTextLengthForSuggestions
        ) {
            let exactMatch = true;
            if (this.config.allowViewAllOptions) {
                exactMatch = false;
            }
            validOptions = this.options;
            if (text.length > 0) {
                validOptions = validOptions
                    .reduce(
                        (
                            prevValue: {
                                similarity: number;
                                option: T;
                            }[],
                            option: T
                        ) => {
                            const similarity = GeneralUtils.similarity(
                                text,
                                option.label,
                                exactMatch
                            );
                            if (similarity > 0.5) {
                                prevValue.push({
                                    similarity,
                                    option
                                });
                            }
                            return prevValue;
                        },
                        []
                    )
                    .sort(
                        (
                            optionA: {
                                similarity: number;
                                option: T;
                            },
                            optionB: { similarity: number; option: SlectOption }
                        ) => {
                            return optionB.similarity - optionA.similarity;
                        }
                    )
                    .map(
                        (optionSim: { similarity: number; option: T }) =>
                            optionSim.option
                    );
            }
        }

        this.suggestionList.options = validOptions;
        this.suggestionList.selectedOptions = this.selectedOptions;
    }

    static get version(): string {
        return process.env.RELEASE;
    }
}

export default Slect;
