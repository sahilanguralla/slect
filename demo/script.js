window.addEventListener('load', () => {
    var options = [
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

    for (var i = 0; i < 20; i++) {
        var dropdownEl = document.createElement('div');
        dropdownEl.className = 'select-list';
        document.body.appendChild(dropdownEl);
        const slect = new Slect(dropdownEl, options, {
            // allowViewAllOptions: false
        });
        slect.onSelect = (instance, options) => {
            console.log(instance, options);
        };
        slect.selectedOptions = [options[0]];
    }
});
