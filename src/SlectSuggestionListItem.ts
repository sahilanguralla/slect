import SlectOption from './SlectOption';
import HTMLElementUtils from './services/HTMLElementUtils';

class SlectSuggestionListItem {
    option: SlectOption;

    domElement: HTMLElement;

    constructor(option: SlectOption) {
        this.option = option;
        this.domElement = document.createElement('div');
    }

    render() {
        HTMLElementUtils.clearDOM(this.domElement);
        return new Promise<HTMLElement>(resolve => {
            this.domElement.appendChild(
                document.createTextNode(this.option.label)
            );
            this.domElement.dataset.optionValue = this.option.value;
            resolve(this.domElement);
        });
    }
}

export default SlectSuggestionListItem;
