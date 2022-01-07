import { styled } from "@material-ui/core/styles"
import { GridToolbarExport } from "@mui/x-data-grid"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

export const StyledGridToolbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    backgroundColor: theme.palette.common.white,
    color: "#25213B",
    fontWeight: 600,
    padding: `0 ${theme.spacing(2)} !important`
}))

export const StyledGridToolbarExport = styled(GridToolbarExport)(({ theme }) => ({
    color: "#25213B"
}))


/* Below styles for Filters popover */
export const StyledPopoverContent = styled(Box)(({theme}) => ({
    display: "grid",
    gap: theme.spacing(2),
    gridAutoFlow: "column",
    gridTemplateRows: "repeat(3, auto)",
    paddingTop: "24px",
    paddingBottom: "24px",
    paddingLeft: "20px",
    paddingRight: "20px"
}))

export const StyledFilterFormControl = styled(FormControl)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "256px"
}))

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
    fontWeight: 500
}))

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    justifyContent: "space-between !important",
    marginLeft: "1px !important",
    marginRight: "0 !important"
}))

export const StyledSelect = styled(Select)(({ theme }) => ({
    height: "40px",
}))

// Below styles for filter count indicator
export const StyledFiltersCount = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    paddingBottom: theme.spacing(0.25),
    paddingTop: theme.spacing(0.25),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    color: theme.palette.common.white,
    fontWeight: 600,
    borderRadius: theme.spacing(0.5),
    marginLeft: theme.spacing(1.5),
    fontSize: "12px"
}))