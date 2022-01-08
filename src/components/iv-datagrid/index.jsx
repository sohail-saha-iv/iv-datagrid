import { DataGrid } from "@mui/x-data-grid"
import Box from "@material-ui/core/Box"
import GridToolbar from "./gridToolbar"
import "./styles.css"

export default function IVDataGrid(props) {
    const { onFiltersChange, filtersData, customExportHandler, showExportButton } = props

    return (
        <Box height={props.height || "360px"} width="100%">
            <DataGrid disableColumnMenu pagination paginationMode="server" {...props} components={{
                Toolbar: GridToolbar
            }} componentsProps={{
                toolbar: { onFiltersChange, filtersData, customExportHandler, showExportButton }
            }} />
        </Box>
    )
}