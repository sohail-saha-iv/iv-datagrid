![1](https://user-images.githubusercontent.com/95337562/148641226-5318399e-8b7f-4b8c-9066-e96ed44da509.png)

# IV-DataGrid
An abstraction over MUI's DataGrid for a better DX.

## Live Demo

[https://iv-datagrid.vercel.app/](https://iv-datagrid.vercel.app/)

*NOTE*: Since this component performs server-side functions, the filter and sort operations won't actually work in demo. The demo is just to show the usage and looks. Also, check the console.

## Props

This component is an abstraction over MUI's DataGrid, so **it supports all standard DataGrid props**. However, this component offers some better interfaces for faster development, in the form of some **additional props**:

- **filtersData**: An array of `Filter` data.

  **Filter.d.ts:**
  ```ts
    interface CommonKeys {
      fieldName: string // Name of column over which this filter is to be applied
      displayFieldName?: string
      currentValue: any | any[] // Current value of the filter (must be a React state)
      displayCurrentValue?: any
    }

    export interface CustomValuesFilter extends CommonKeys {
        type: "text" // Renders a search textfield
    }

    export interface PrefilledSelectableFilter extends CommonKeys {
        type: "radio" | "checkbox" | "dropdown" | "dropdown-autocomplete"
        options: readonly { // For these kinds of filters, multiple options are needed
            value: any // Value of option
            displayValue?: any // Display value of option
        }[]
    }
  ```

  This prop is used to **supply an array of data that the component needs to auto-generate filters**. When a change in filter is triggered, the `onFiltersChange` callback is fired.
  
- **onFiltersChange:**

  A callback that gets fired every time a filter is applied/removed. The name of the field over which the filter was changed and the filter value gets passed to the callback.
  ```ts
    onFiltersChange({
      fieldName: {
        value: SOMETHING,
        displayValue: SOMETHING
      }
    }) => any
  ```
  Use this prop **to pass a state setter function that would change the states for filter values**, by making use of the parameter passed into this.
  
- **showExportButton:**
  A `boolean` value; pass `true` **to show the Export button.**

- **customExportHandler:**
  If export button is visible, it uses MUI's export function by default. **Use this prop to provide your custom export function.**
  
