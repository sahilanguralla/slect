import SlectOption from './SlectOption';
declare class SlectSuggestionListItem<T extends SlectOption> {
    option: T;
    domElement: HTMLElement;
    onClick?: (item: SlectSuggestionListItem<T>) => void;
    private selected;
    constructor(option: T);
    init(): void;
    select(selected: boolean): void;
    render(): Promise<HTMLElement>;
}
export default SlectSuggestionListItem;
