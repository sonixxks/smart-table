export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        const filtersContainer = document.querySelector('.filter-row');

        filtersContainer.addEventListener('click', async (event) => {
            const button = event.target.closest('button');
            if (!button) return;
            if (button.name !== 'clear') return;
            
            const label = button.closest('label');
            const input = label.querySelector('input');
            if (input) input.value = '';
            
            const field = button.dataset.field;
            if (field && field in state) {
                state[field] = '';
            }
            
            await render();
        });

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { 
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }

    return {
        updateIndexes,
        applyFiltering
    }
}