class HTMLElementUtils {
    static hasClass(el:HTMLElement, className:string) {
        if (el.classList) return el.classList.contains(className);
        return !!el.className.match(
            new RegExp('(\\s|^)' + className + '(\\s|$)')
        );
    }

    static addClass(el:HTMLElement, className:string) {
        if (el.classList) el.classList.add(className);
        else if (!this.hasClass(el, className)) el.className += ' ' + className;
    }

    static removeClass(el:HTMLElement, className:string) {
        if (el.classList) el.classList.remove(className);
        else if (this.hasClass(el, className)) {
            let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }

    static clearDOM(el: HTMLElement) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
}

export default HTMLElementUtils;
