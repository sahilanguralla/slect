import SlectOption from './SlectOption';
import SlectConfig from './SlectConfig';
import GeneralUtils from './services/GeneralUtils';
import SlectSuggestionList from './SlectSuggestionList';
import HTMLElementUtils from './services/HTMLElementUtils';

class Slect {
    options: SlectOption[];

    private config: SlectConfig;

    private readonly inputEl: HTMLInputElement;
    private readonly suggestionListEl: HTMLElement;

    private element: HTMLElement;

    constructor(selector: string, options: SlectOption[], config: SlectConfig) {
        const el = document.body.querySelector(selector);
        if (el instanceof HTMLElement) this.element = el;
        else throw new Error(`No element with given selector found in DOM.`);

        this.options = options;
        this.config = config;

        this.inputEl = document.createElement('input');

        this.inputEl.addEventListener('change', this.onInputChange);
        this.inputEl.addEventListener('focus', this.onInputTap);
        this.inputEl.addEventListener('blur', this.onInputTap);

        this.element.appendChild(this.inputEl);

        this.suggestionListEl = document.createElement('div');
        this.element.appendChild(this.suggestionListEl);
    }

    onInputChange = () => {
        this.updateSuggestionList();
    };

    onInputTap = () => {
        this.updateSuggestionList();
    };

    updateSuggestionList() {
        const text = this.inputEl.value;
        let validOptions: SlectOption[] = [];
        if (text.length >= this.config.minTextLengthForSuggestions) {
            validOptions = this.options.filter(
                option => GeneralUtils.similarity(text, option.value) >= 0.5
            );
        }

        HTMLElementUtils.clearDOM(this.suggestionListEl);
        const list = new SlectSuggestionList(validOptions);
        list.render().then(el => {
            this.suggestionListEl.appendChild(el);
        });
    }
}

export default Slect;
