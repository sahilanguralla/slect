declare class HTMLElementUtils {
    static hasClass(el: HTMLElement, className: string): boolean;
    static addClass(el: HTMLElement, className: string): void;
    static removeClass(el: HTMLElement, className: string): void;
    static clearDOM(el: HTMLElement): void;
}
export default HTMLElementUtils;
