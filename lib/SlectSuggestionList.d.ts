import SlectOption from './SlectOption';
import SlectSuggestionListItem from './SlectSuggestionListItem';
declare class SlectSuggestionList<T extends SlectOption> {
    private opts;
    options: T[];
    private listItems;
    private selectedItems;
    selectedOptions: SlectOption[];
    onSelect?: (options: T[]) => void;
    domElement: HTMLElement;
    constructor(options: T[]);
    init(): void;
    updateListItems(): void;
    onClickListItem: (item: SlectSuggestionListItem<T>) => void;
    render(): Promise<HTMLElement>;
}
export default SlectSuggestionList;
