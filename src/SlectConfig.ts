import SlectOption from './SlectOption';

interface SlectConfig<T extends SlectOption> {
    allowViewAllOptions: boolean;
    maxSuggestions: number;
    minTextLengthForSuggestions: number;
    onSelect: (options: T[]) => void;
}
export default SlectConfig;
