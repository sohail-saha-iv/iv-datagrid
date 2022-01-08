/*
These types are ONLY for displaying all the filter options
*/

interface CommonKeys {
    fieldName: string
    displayFieldName?: string
    currentValue: any | any[]
    displayCurrentValue?: any
}

export interface CustomValuesFilter extends CommonKeys {
    type: "text"
}

export interface PrefilledSelectableFilter extends CommonKeys {
    type: "radio" | "checkbox" | "dropdown" | "dropdown-autocomplete"
    options: readonly {
        value: any
        displayValue?: any
    }[]
}