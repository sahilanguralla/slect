import SlectOption from './SlectOption';
import SlectConfig from './SlectConfig';
import GeneralUtils from './services/GeneralUtils';
import SlectSuggestionList from './SlectSuggestionList';
import HTMLElementUtils from './services/HTMLElementUtils';

import './assets/less/slect.less';

class Slect<T extends SlectOption> {
    options: T[];

    private selectedOpts: T[] = [];
    get selectedOptions() {
        return this.selectedOpts;
    }
    set selectedOptions(options: T[]) {
        this.selectedOpts = options;
        this.suggestionList.selectedOptions = options;
        this.updateInput();
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
        }
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

        this.inputEl.addEventListener('change', this.onInputChange);
        this.inputEl.addEventListener('keyup', this.onInputKeyUp);
        this.inputEl.addEventListener('keydown', this.onInputKeyDown);
        this.inputEl.addEventListener('focus', this.onFocus);

        this.suggestionList.render().then(el => this.element.appendChild(el));

        if (this.config.allowViewAllOptions) {
            const chevContainerEl = document.createElement('div');
            chevContainerEl.addEventListener('click', () => {
                this.inputEl.focus();
                this.onFocus();
            });
            HTMLElementUtils.addClass(
                chevContainerEl,
                'slect-chevron-container'
            );

            chevContainerEl.innerHTML = require('./assets/icons/chevron-down.svg');
            this.element.appendChild(chevContainerEl);

            this.suggestionList.options = this.options;
        }

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

    onSelect = (options: T[]) => {
        this.selectedOpts = options;
        this.config.onSelect(options);
        this.updateInput();
        this.onBlur();
    };

    onClickBody = (event: Event) => {
        const target = event.target || event.srcElement || event.currentTarget;
        if (target instanceof Node && this.element.contains(target)) {
        } else {
            this.onBlur();
        }
    };

    onInputKeyUp = () => {
        this.onInputChange();
    };

    onInputKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 9) {
            this.onBlur();
        }
    };

    onInputChange = () => {
        this.updateSuggestionList();
    };

    onBlur = () => {
        HTMLElementUtils.removeClass(this.element, 'focused');
    };

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