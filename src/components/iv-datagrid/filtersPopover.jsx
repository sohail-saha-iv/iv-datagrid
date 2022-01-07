import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledFormLabel, StyledFilterFormControl, StyledFormControlLabel, StyledSelect, StyledPopoverContent } from "./styled"
import TextField from "@material-ui/core/TextField"
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import AutoComplete from "@material-ui/lab/Autocomplete"
import { useMemo } from "react"
import { toTitleCase } from './utils';

// Function to find displayValue of a particular value
const getDisplayValue = (options, valueToFindDisplayValueOf) => {
    const neededOption = options.find((option) => (
        option.value === valueToFindDisplayValueOf
    ))
    return (typeof neededOption !== "undefined" ? neededOption.displayValue : null)
}

// Function to find value of a particular displayValue
const getValue = (options, displayValueToFindValueOf) => {
    const neededOption = options.find((option) => (
        option.displayValue.toLowerCase() === displayValueToFindValueOf.toLowerCase()
    ))
    return (typeof neededOption !== "undefined" ? neededOption.value : null)
}

export default function FiltersPopover({ getFilterButtonRef, filtersPopoverOpen, filtersData, onFiltersChange, setFiltersPopverOpen }) {

    // Reference to filter button
    const filterButtonRef = useMemo(() => getFilterButtonRef(), [])

    return (
        <Popover className="filters-popover" anchorEl={filterButtonRef.current} open={filtersPopoverOpen} onClose={() => { setFiltersPopverOpen(false) }} elevation={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <StyledPopoverContent>
                {Object.entries(filtersData).map(([fieldName, filterData]) => (
                    <StyledFilterFormControl key={fieldName}>
                        {/* Filter display name */}
                        <StyledFormLabel>{filterData.displayFieldName || fieldName}:</   StyledFormLabel>

                        {/* Filters; these would be auto generated based on the type of Filters needed  */}

                        {/* For textbox */}
                        {filterData.type === "text" &&
                            <TextField value={filterData.currentValue || ""} onChange={(e) => {
                                onFiltersChange({
                                    [fieldName]: {
                                        value: e.target.value,
                                        displayValue: e.target.value
                                    }
                                })
                            }} size="small" fullWidth variant="outlined" placeholder={toTitleCase(filterData.displayFieldName || fieldName)} />
                        }

                        {/* For checkboxes */}
                        {filterData.type === "checkbox" &&
                            <FormGroup>
                                {filterData.options.map((option) => (
                                    <StyledFormControlLabel key={option.value} labelPlacement="start"
                                        control={<Checkbox color="primary" key={`${option.value}-checkbox`} checked={filterData.currentValue.includes(option.value)} onChange={(e) => {
                                            let newValue;
                                            if (e.target.checked) {
                                                newValue = [...filterData.currentValue, option.value]
                                            } else {
                                                newValue = filterData.currentValue.filter((value) => (value !== option.value))
                                            }
                                            const newDisplayValue = newValue.map((value) => (
                                                getDisplayValue(filterData.options, value)
                                            ))
                                            onFiltersChange({
                                                [fieldName]: {
                                                    value: newValue,
                                                    displayValue: newDisplayValue
                                                }
                                            })
                                        }} name={option.value} size="small" />}
                                        label={option.displayValue || option.value} />
                                ))}
                            </FormGroup>
                        }

                        {/* For radio buttons */}
                        {filterData.type === "radio" &&
                            <RadioGroup col aria-label={fieldName} name={fieldName} value={filterData.currentValue} onChange={(e) => {
                                onFiltersChange({
                                    [fieldName]: {
                                        value: e.target.value,
                                        displayValue: getDisplayValue(filterData.options, e.target.value)
                                    }
                                })
                            }}>
                                {filterData.options.map((option) => (
                                    <StyledFormControlLabel value={option.value} control={<Radio color="primary" size="small" />} label={option.displayValue || option.value} labelPlacement="start" key={option.value} />
                                ))}
                            </RadioGroup>
                        }

                        {/* For drop-down */}
                        {filterData.type === "dropdown" &&
                            <StyledSelect MenuProps={{ classes: { paper: "filter-dropdown-paper" } }} className="filter-dropdown" value={filterData.currentValue} IconComponent={ExpandMoreIcon} variant="outlined" size="small" onChange={(e) => {
                                onFiltersChange({
                                    [fieldName]: {
                                        value: e.target.value,
                                        displayValue: getDisplayValue(filterData.options, e.target.value)
                                    }
                                })
                            }} placeholder={toTitleCase(filterData.displayFieldName || fieldName)}>
                                {filterData.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.displayValue || option.value}
                                    </MenuItem>
                                ))}
                            </StyledSelect>
                        }

                        {/* For drop down with autocomplete */}
                        {(filterData.type === "dropdown-autocomplete" ||
                            filterData.type === "dropdown-autocomplete-arbitrary") &&
                            <AutoComplete freeSolo={filterData.type === "dropdown-autocomplete-arbitrary"} fullWidth size="small" options={filterData.options} getOptionLabel={(option) => (option.displayValue || option.value)} renderInput={(params) => <TextField {...params} variant="outlined" size="small" />} onInputChange={
                                (e, newValue) => {
                                    onFiltersChange({
                                        [fieldName]: {
                                            value: getValue(filterData.options, newValue),
                                            displayValue: newValue
                                        }
                                    })
                                }
                            } placeholder={toTitleCase(filterData.displayFieldName || fieldName)} />
                        }
                    </StyledFilterFormControl>
                ))}
            </StyledPopoverContent>
        </Popover>
    )
}