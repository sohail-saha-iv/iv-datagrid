// Function to convert string to Title case
export const toTitleCase = (str) => {
    let allExceptFirst = str.slice(1)
    return `${str[0].toUpperCase()}${allExceptFirst.toLowerCase()}`
}