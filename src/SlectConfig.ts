import SlectOption from './SlectOption';

interface SlectConfig<T extends SlectOption> {
    allowViewAllOptions: boolean;
    maxSuggestions: number;
    minTextLengthForSuggestions: number;
    placeholder: string;
    allowCustomOption: boolean;
}
export default SlectConfig;
