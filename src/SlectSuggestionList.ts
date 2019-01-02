import SlectOption from './SlectOption';
import SlectSuggestionListItem from './SlectSuggestionListItem';
import HTMLElementUtils from './services/HTMLElementUtils';

class SlectSuggestionList {
    private opts: SlectOption[] = [];

    get options(): SlectOption[] {
        return this.opts;
    }
    set options(options: SlectOption[]) {
        if (
            this.opts.length !== options.length ||
            options.find((option, index) => this.opts[index] !== option)
        ) {
            this.opts = options;
            this.updateListItems();
            this.render();
        }
    }

    private listItems: SlectSuggestionListItem[] = [];

    private selectedItems: SlectSuggestionListItem[] = [];
    get selectedOptions() {
        return this.selectedItems.map(item => item.option);
    }
    set selectedOptions(options: SlectOption[]) {
        this.selectedItems = this.listItems.reduce(
            (
                items: SlectSuggestionListItem[],
                item: SlectSuggestionListItem
            ) => {
                if (options.indexOf(item.option) !== -1)  {
                    item.select(true);
                    items.push(item);
                }
                return items;
            },
            []
        );
    }

    onSelect?: (options: SlectOption[]) => void;

    domElement: HTMLElement;

    constructor(options: SlectOption[]) {
        this.opts = options;
        this.domElement = document.createElement('div');
        this.init();
    }

    init() {
        HTMLElementUtils.addClass(this.domElement, 'slect-suggestion-list');
        this.updateListItems();
    }

    updateListItems() {
        this.listItems = this.options.map(option => {
            const item = new SlectSuggestionListItem(option);
            item.onClick = this.onClickListItem;
            return item;
        });
    }

    onClickListItem = (item: SlectSuggestionListItem) => {
        if (this.selectedItems.length > 0) {
            this.selectedItems[0].select(false);
        }
        item.select(true);
        this.selectedItems = [item];
        if (typeof this.onSelect === 'function') {
            this.onSelect(this.selectedItems.map(item => item.option));
        }
    };

    render(): Promise<HTMLElement> {
        HTMLElementUtils.clearDOM(this.domElement);
        return Promise.all(this.listItems.map(item => item.render())).then(
            els => {
                els.forEach(el => this.domElement.append(el));
                return this.domElement;
            }
        );
    }
}

export default SlectSuggestionList;
