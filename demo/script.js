window.addEventListener('load', () => {
    let options = [
        {
            label: 'Apple',
            value: 'apple'
        },
        {
            label: 'Mango',
            value: 'mango'
        },
        {
            label: 'Litchi',
            value: 'litchi'
        },
        {
            label: 'Banana',
            value: 'banana'
        },
        {
            label: 'Dragon Fruit',
            value: 'dragon fruit'
        },
        {
            label: 'Avocado',
            value: 'avocado'
        },
        {
            label: 'Orange',
            value: 'orange'
        },
        {
            label: 'Pineapple',
            value: 'pineapple'
        }
    ];

    /**
     * @type {Slect}
     */
    const slect = new Slect('#select-list-1', options, {
        // allowViewAllOptions: false
    });
    slect.selectedOptions = [options[0]];
});
