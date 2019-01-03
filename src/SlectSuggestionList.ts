import SlectOption from './SlectOption';
import SlectSuggestionListItem from './SlectSuggestionListItem';
import HTMLElementUtils from './services/HTMLElementUtils';

class SlectSuggestionList<T extends SlectOption> {
    private opts: T[] = [];

    get options(): T[] {
        return this.opts;
    }
    set options(options: T[]) {
        if (
            this.opts.length !== options.length ||
            options.find((option, index) => this.opts[index] !== option)
        ) {
            this.opts = options;
            this.updateListItems();
            this.render();
        }
    }

    private listItems: SlectSuggestionListItem<T>[] = [];

    private selectedItems: SlectSuggestionListItem<T>[] = [];
    get selectedOptions() {
        return this.selectedItems.map(item => item.option);
    }
    set selectedOptions(options: SlectOption[]) {
        this.selectedItems = this.listItems.reduce(
            (
                items: SlectSuggestionListItem<T>[],
                item: SlectSuggestionListItem<T>
            ) => {
                if (options.indexOf(item.option) !== -1) {
                    item.select(true);
                    items.push(item);
                } else {
                    item.select(false);
                }
                return items;
            },
            []
        );
    }

    onSelect?: (options: T[]) => void;

    domElement: HTMLElement;

    constructor(options: T[]) {
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

    onClickListItem = (item: SlectSuggestionListItem<T>) => {
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
                this.domElement.scrollTo(0, 0);
                return this.domElement;
            }
        );
    }
}

export default SlectSuggestionList;
