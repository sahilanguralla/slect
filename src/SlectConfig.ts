import SlectOption from './SlectOption';

interface SlectConfig {
    allowViewAllOptions: boolean;
    maxSuggestions: number;
    minTextLengthForSuggestions: number;
    onSelect: (options: SlectOption[]) => void;
}
export default SlectConfig;
