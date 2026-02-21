import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes)
      .forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => {
                   const option = document.createElement('option');
                   option.value = name;
                   option.textContent = name;

                   return option;
                })
        )
    })

    return (data, state, action) => {
        if (action && action.name === "clear") {
            const button = document.querySelector('button[name="clear"]');
            if (button) {
                const parent = button?.parentElement;
                const input = parent?.querySelector('input');

                if (input) {
                    input.value = '';
                }

                const fieldName = button?.dataset.field;
                if (fieldName) {
                    state[fieldName] = '';
                }
            }
        }
        state.total = [
            state.totalFrom ? Number(state.totalFrom.replace(/\s/g, "")) : undefined,
            state.totalTo ? Number(state.totalTo.replace(/\s/g, "")) : undefined
        ];

        return data.filter(row => compare(row, state));
    }
}