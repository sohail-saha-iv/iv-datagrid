import { CustomValuesFilter, PrefilledSelectableFilter } from "./filter";

export interface Filters {
    [fieldName: string]: CustomValuesFilter | PrefilledSelectableFilter
}