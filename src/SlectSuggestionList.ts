import SlectOption from './SlectOption';
import SlectSuggestionListItem from './SlectSuggestionListItem';
import HTMLElementUtils from './services/HTMLElementUtils';

class SlectSuggestionList {
    options: SlectOption[];

    domElement: HTMLElement;
    constructor(options: SlectOption[]) {
        this.options = options;
        this.domElement = document.createElement('div');
    }

    generateSuggestionListItems(): SlectSuggestionListItem[] {
        return this.options.map(option => {
            return new SlectSuggestionListItem(option);
        });
    }

    render(): Promise<HTMLElement> {
        HTMLElementUtils.clearDOM(this.domElement);
        return Promise.all(
            this.generateSuggestionListItems().map(item => item.render())
        ).then(els => {
            els.forEach(el => this.domElement.append(el));
            return this.domElement;
        });
    }
}

export default SlectSuggestionList;
