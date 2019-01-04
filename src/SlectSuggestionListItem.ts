import SlectOption from './SlectOption';
import HTMLElementUtils from './services/HTMLElementUtils';

class SlectSuggestionListItem<T extends SlectOption> {
    option: T;

    domElement: HTMLElement;

    onClick?: (item: SlectSuggestionListItem<T>) => void;

    private selected: boolean = false;

    constructor(option: T) {
        this.option = option;
        this.domElement = document.createElement('div');
        this.init();
    }

    init() {
        HTMLElementUtils.addClass(
            this.domElement,
            'slect-suggestion-list-item'
        );
        this.domElement.addEventListener('click', () => {
            if (typeof this.onClick !== 'undefined') {
                this.onClick(this);
            }
        });
    }

    select(selected: boolean) {
        this.selected = selected;
        if (selected) {
            HTMLElementUtils.addClass(this.domElement, 'selected');
        } else {
            HTMLElementUtils.removeClass(this.domElement, 'selected');
        }
    }

    render() {
        return new Promise<HTMLElement>(resolve => {
            HTMLElementUtils.clearDOM(this.domElement);
            this.domElement.appendChild(
                document.createTextNode(this.option.label)
            );
            this.domElement.dataset.optionValue = this.option.value;

            const tickContainerEl = document.createElement('div');
            HTMLElementUtils.addClass(
                tickContainerEl,
                'slect-checkmark-container'
            );
            tickContainerEl.innerHTML = require('./assets/icons/tick.svg');
            this.domElement.appendChild(tickContainerEl);

            this.select(this.selected);
            resolve(this.domElement);
        });
    }
}

export default SlectSuggestionListItem;
