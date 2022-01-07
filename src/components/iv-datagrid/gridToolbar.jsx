import { StyledGridToolbarContainer, StyledGridToolbarExport, StyledFiltersCount } from "./styled"
import FilterListIcon from '@material-ui/icons/FilterList'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import { useMemo, useRef, useState } from "react"
import FiltersPopover from "./filtersPopover"
import Button from "@material-ui/core/Button"

export default function GridToolbar({ onFiltersChange, filtersData, customExportHandler, showExportButton = true }) {
    // Reference to Filter button
    const filterButtonRef = useRef(null)

    // State to track Filters popver open/close state
    const [filtersPopoverOpen, setFiltersPopverOpen] = useState(false)

    // Keeps track of number of filters applied
    const numberOfFiltersApplied = useMemo(() => {
        let count = 0
        for (let fieldName in filtersData) {
            const filterData = filtersData[fieldName]
            if (filterData.type === "checkbox") {
                if (filterData.currentValue.length !== 0) count += 1
            } else {
                if (!!filterData.currentValue && filterData.currentValue !== "") count += 1
            }
        }
        return count
    }, [filtersData])

    return (
        <StyledGridToolbarContainer>
            {!!filtersData &&
                <>
                    {/* Filter button and Filters count*/}
                    <Button startIcon={<FilterListIcon />} ref={filterButtonRef} onClick={() => { setFiltersPopverOpen(true) }}>
                        Filters {numberOfFiltersApplied !== 0 && <StyledFiltersCount>{numberOfFiltersApplied}</StyledFiltersCount>}
                    </Button>

                    {/* Filters menu (pop-over) */}
                    <FiltersPopover getFilterButtonRef={() => (filterButtonRef)} setFiltersPopverOpen={setFiltersPopverOpen} filtersPopoverOpen={filtersPopoverOpen} filtersData={filtersData} onFiltersChange={onFiltersChange} />
                </>
            }

            {/* Export button */}
            {showExportButton && (
                !customExportHandler
                    ? <StyledGridToolbarExport />
                    : <Button startIcon={<SaveAltIcon />} onClick={customExportHandler}>
                        Export Data
                    </Button>
            )}
        </StyledGridToolbarContainer>
    )
}