import SlectOption from './SlectOption';
import SlectConfig from './SlectConfig';
import GeneralUtils from './services/GeneralUtils';
import SlectSuggestionList from './SlectSuggestionList';
import HTMLElementUtils from './services/HTMLElementUtils';

import './assets/less/slect.less';
import cancelIcon from './icons/cancelIcon';
import arrowDownIcon from './icons/arrowDownIcon';

class Slect<T extends SlectOption> {
    private opts: (T | SlectOption)[];

    get options(): (T | SlectOption)[] {
        return this.opts;
    }
    set options(options: (T | SlectOption)[]) {
        this.opts = options.filter(option => option && typeof option.label === 'string');
        this.updateSuggestionList();
        this.validateSelection();
    }

    private selectedOpts: (T | SlectOption)[] = [];
    get selectedOptions(): (T | SlectOption)[] {
        return this.selectedOpts;
    }
    set selectedOptions(options: (T | SlectOption)[]) {
        this.selectedOpts = options;
        this.updateInput();
        this.updateSelectionInView();
    }

    private config: SlectConfig<T>;

    private readonly valueElement: HTMLElement;
    private readonly inputContainerEl: HTMLElement;
    private readonly inputEl: HTMLInputElement;
    private readonly suggestionList: SlectSuggestionList<T>;

    private readonly element: HTMLElement;

    static readonly defaultConfig: SlectConfig<SlectOption> = {
        minTextLengthForSuggestions: 3,
        maxSuggestions: 0,
        allowViewAllOptions: true,
        get placeholder(): string {
            return this.allowViewAllOptions
                ? 'Type or select an option'
                : 'Please type';
        },
        allowCustomOption: false
    };

    onSelect:
        | ((instance: Slect<T>, options: (SlectOption | T)[]) => void)
        | undefined;
    private focused: boolean = false;

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
        this.opts = options.filter(option => option && typeof option.label === 'string');

        this.config = Slect.defaultConfig;
        if (config) {
            this.config = Object.assign(Slect.defaultConfig, config);
        }

        this.valueElement = document.createElement('div');

        this.inputContainerEl = document.createElement('div');

        this.inputEl = document.createElement('input');

        this.suggestionList = new SlectSuggestionList<T>([]);

        this.init();
    }

    init() {
        HTMLElementUtils.clearDOM(this.element);
        HTMLElementUtils.addClass(this.element, 'slect');
        HTMLElementUtils.addClass(this.valueElement, 'slect-value');

        const valueContainerEl = document.createElement('div');
        HTMLElementUtils.addClass(valueContainerEl, 'slect-value-container');
        this.element.appendChild(valueContainerEl);

        this.valueElement.innerText = this.config.placeholder;
        this.valueElement.addEventListener('click', this.onClickValueElement);
        valueContainerEl.appendChild(this.valueElement);

        HTMLElementUtils.addClass(
            this.inputContainerEl,
            'slect-input-container'
        );
        this.element.appendChild(this.inputContainerEl);

        HTMLElementUtils.addClass(this.inputEl, 'slect-input');
        this.inputContainerEl.appendChild(this.inputEl);

        this.inputEl.placeholder = this.config.placeholder;
        this.inputEl.addEventListener('change', this.onInputChange);
        this.inputEl.addEventListener('keyup', this.onInputKeyUp);
        this.inputEl.addEventListener('keydown', this.onInputKeyDown);
        this.inputEl.addEventListener('focus', this.onFocus);

        const separator = document.createElement('div');
        HTMLElementUtils.addClass(separator, 'slect-input-separator');
        this.inputContainerEl.appendChild(separator);

        this.suggestionList
            .render()
            .then(el => this.inputContainerEl.appendChild(el));

        // slect actions start here
        const slectActionsContainer = document.createElement('div');
        HTMLElementUtils.addClass(
            slectActionsContainer,
            'slect-actions-container'
        );

        const clearContainerEl = document.createElement('div');
        HTMLElementUtils.addClass(clearContainerEl, 'slect-clear-container');
        clearContainerEl.innerHTML = cancelIcon;
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

            chevContainerEl.innerHTML = arrowDownIcon;
            slectActionsContainer.appendChild(chevContainerEl);

            HTMLElementUtils.addClass(this.element, 'slect-expandable');
            this.suggestionList.options = this.options as T[];
        }

        this.element.appendChild(slectActionsContainer);
        // slect actions ends here

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

        this.suggestionList.onSelect = options => {
            this.onOptionSelect(options);
            this.updateInput();
            this.updateSelectionInView();
            this.closeSuggestionList();
        };
    }

    onOptionSelect = (options: (T | SlectOption)[]) => {
        if (!GeneralUtils.areEqualArrays(this.selectedOpts, options)) {
            this.selectedOpts = options;
            this.onSelect && this.onSelect(this, options);
            this.updateSelectionInView();
        }
    };

    validateSelection() {
        this.selectedOpts = this.selectedOpts.filter(
            option =>
                (option.custom && this.config.allowCustomOption) ||
                this.options.indexOf(option) !== -1
        );
        this.updateSelectionInView();
        this.updateInput();
    }

    updateSelectionInView() {
        if (this.selectedOptions.length > 0) {
            HTMLElementUtils.addClass(this.element, 'slect-selected');
        } else {
            HTMLElementUtils.removeClass(this.element, 'slect-selected');
        }
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
        const newValue = this.inputEl.value;
        const selectedOption = this.options.find(
            option => option.label.toLowerCase() === newValue.toLowerCase()
        );
        if (selectedOption) {
            this.onOptionSelect([selectedOption]);
            this.updateInput();
        } else if (this.inputEl.value.length > 0) {
            let selectedOpts: SlectOption[] = [];
            if (this.config.allowCustomOption) {
                selectedOpts = [
                    {
                        label: newValue,
                        value: newValue.toLowerCase(),
                        custom: true
                    }
                ];
            }
            this.onOptionSelect(selectedOpts);
            this.updateInput();
        } else if (this.inputEl.value.length < 1) {
            this.clearSelectedOptions();
        }

        this.updateSuggestionList(newValue);
    };

    onInputKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 9 || event.keyCode === 27) {
            if (event.keyCode === 27) {
                this.inputEl.blur();
            }
            this.onBlur();
        }
    };

    onInputChange = () => {
        this.updateSuggestionList(this.inputEl.value);
    };

    onFocus = () => {
        this.element.scrollIntoView({ behavior: 'smooth' });
        this.focused = true;
        HTMLElementUtils.addClass(this.element, 'focused');
    };

    onBlur = () => {
        if (this.focused) {
            this.focused = false;
            if (this.selectedOptions.length < 1) {
                this.clearSelectedOptions();
            }

            this.closeSuggestionList();
        }
    };

    onClickValueElement = () => {
        this.focus(true);
    };

    onClickClearButton = () => {
        HTMLElementUtils.removeClass(this.element, 'slect-selected');

        this.clearSelectedOptions();
        this.closeSuggestionList();
    };

    onClickExpandListButton = () => {
        this.focus(!this.focused);
    };

    focus(focused: boolean) {
        if (focused) {
            this.onFocus();
            setTimeout(() => {
                this.inputEl.focus();
            });
        } else {
            this.inputEl.blur();
            this.onBlur();
        }
        this.focused = focused;
    }

    clearSelectedOptions() {
        this.selectedOptions = [];
        this.onSelect && this.onSelect(this, []);
        this.updateSuggestionList();
    }

    closeSuggestionList() {
        HTMLElementUtils.removeClass(this.element, 'focused');
    }

    updateInput() {
        const value = this.selectedOptions
            .map(option => option.label)
            .join(', ');
        this.inputEl.value = value;
        this.valueElement.innerText = value ? value : this.config.placeholder;
    }

    updateSuggestionList(text: string = '') {
        let validOptions: T[] = [];
        if (
            this.config.allowViewAllOptions ||
            text.length >= this.config.minTextLengthForSuggestions
        ) {
            let exactMatch = true;
            if (this.config.allowViewAllOptions) {
                exactMatch = false;
            }
            validOptions = this.options as T[];
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
