import { DataGrid } from "@mui/x-data-grid"
import Box from "@material-ui/core/Box"
import GridToolbar from "./gridToolbar"
import "./styles.css"

/*
Props:
1) DataGridProp props
2) onFiltersChange: ({fieldName: currentVal}) => any // Must be defined by the component that uses IVDataGrid
3) filtersData: {fieldName: CustomValuesFilter | PrefilledSelectableFilter}
4) customExportHandler: Custom export handler
5) showExportButton: Shows export button if true (default: true)
*/

export default function IVDataGrid(props) {
    const { onFiltersChange, filtersData, customExportHandler, showExportButton } = props

    return (
        <Box height={props.height || "360px"} width="100%">
            <DataGrid pagination paginationMode="server" {...props} components={{
                Toolbar: GridToolbar
            }} componentsProps={{
                toolbar: { onFiltersChange, filtersData, customExportHandler, showExportButton }
            }} />
        </Box>
    )
}