import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import IVDataGrid from "./components/iv-datagrid"
import { useCallback, useMemo, useState } from "react"

// Columns data
const columns = [
  { field: "name", flex: 1 },
  { field: "gender", flex: 1 },
  { field: "occupation", flex: 1 },
  { field: "institute", flex: 1 },
  { field: "subject", flex: 1 }
]

// Rows data
const rows = [
  { id: 1, name: "Jason", gender: "male", occupation: "student", institute: "ABC School", subject: "Physics" },
  { id: 2, name: "Naina", gender: "female", occupation: "teacher", institute: "XYZ School", subject: "History" },
  { id: 3, name: "Shekhar", gender: "male", occupation: "student", institute: "ABC School", subject: "Geography" },
  { id: 4, name: "Sohail", gender: "male", occupation: "principal", institute: "XYZ School", subject: "History" },
  { id: 5, name: "Taniya", gender: "female", occupation: "student", institute: "ABC School", subject: "Physics" },
  { id: 6, name: "Alia", gender: "female", occupation: "teacher", institute: "XYZ School", subject: "Geography" },
  { id: 7, name: "Suresh", gender: "male", occupation: "student", institute: "ABC School", subject: "Physics" },
  { id: 8, name: "Ramesh", gender: "male", occupation: "student", institute: "ABC School", subject: "History" },
  { id: 9, name: "Tom", gender: "male", occupation: "teacher", institute: "XYZ School", subject: "Physics" },
  { id: 10, name: "Baker", gender: "male", occupation: "teacher", institute: "XYZ School", subject: "Geography" },
  { id: 11, name: "Isiah", gender: "female", occupation: "student", institute: "XYZ School", subject: "History" },
  { id: 12, name: "Jasmine", gender: "female", occupation: "teacher", institute: "ABC School", subject: "Physics" },
  { id: 13, name: "Khooshboo", gender: "female", occupation: "teacher", institute: "XYZ School", subject: "Geography" }
]


export default function App() {
  // Filter states
  const [filterName, setFilterName] = useState("")
  const [filterGender, setFilterGender] = useState("")
  const [filterOccupation, setFilterOccupation] = useState([])
  const [filterInstitute, setFilterInstitute] = useState("")
  const [filterSubject, setFilterSubject] = useState("")

  // Filters data
  const filtersData = useMemo(() => ({
    name: {
      fieldName: "name",
      displayFieldName: "Name",
      currentValue: filterName,
      type: "text"
    },
    gender: {
      fieldName: "gender",
      displayFieldName: "Gender",
      currentValue: filterGender,
      type: "radio",
      options: [
        { value: "m", displayValue: "Male" },
        { value: "f", displayValue: "Female" }
      ]
    },
    occupation: {
      fieldName: "occupation",
      displayFieldName: "Occupation",
      currentValue: filterOccupation,
      type: "checkbox",
      options: [
        { value: "student", displayValue: "Student" },
        { value: "teacher", displayValue: "Teacher" },
        { value: "principal", displayValue: "Principal" },
      ]
    },
    institute: {
      fieldName: "institute",
      displayFieldName: "Institute",
      currentValue: filterInstitute,
      type: "dropdown",
      options: [
        { value: 0, displayValue: "ABC School" },
        { value: 1, displayValue: "XYZ School" }
      ]
    },
    subject: {
      fieldName: "subject",
      displayFieldName: "Subject",
      currentValue: filterSubject,
      type: "dropdown-autocomplete",
      options: [
        { value: 0, displayValue: "Physics" },
        { value: 1, displayValue: "History" },
        { value: 2, displayValue: "Geography" }
      ]
    }
  }), [filterName, filterGender, filterOccupation, filterInstitute, filterSubject])

  // Handles filter values changes
  const stateSetterFuncs = {
    "name": setFilterName,
    "gender": setFilterGender,
    "occupation": setFilterOccupation,
    "institute": setFilterInstitute,
    "subject": setFilterSubject
  }
  const onFiltersChange = useCallback((fieldNameAndValue) => {
    console.log("New filter set", fieldNameAndValue) // {fieldName: { value, displayValue }}
    const fieldName = Object.keys(fieldNameAndValue)[0]
    stateSetterFuncs[fieldName](fieldNameAndValue[fieldName].value)
  }, [])

  return (
    <>
      <CssBaseline />
      <Box width="100%" height="400px" position="relative">
        <Container>
          <Box marginBottom="56px"/>
          <IVDataGrid filtersData={filtersData} columns={columns} rows={rows} pagination
            pageSize={4} onFiltersChange={onFiltersChange} height="400px" disableColumnMenu />
        </Container>
      </Box>
    </>
  )
}