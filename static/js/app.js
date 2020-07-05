// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters in an object-key-value pair array
var filters = {};

// Build new function to filter data when button is clicked
function updateFilters() {

  // Set the filteredData to the tableData ("let" allows to temporarily redeclare the tableData variable within this {block}, but will not redeclare tableData outside the block)
  let filteredData = tableData

  // Save the element, value, and id of each filter once "filter table" button is pressed
  // Create variable to captures all node object properties within all the "input" elements (5x filter options each have input elements)
  var challengeElements = d3.selectAll("input").nodes();
  // Loop through all inputs and record the ID(related column header) and VALUE(what was manually entered)
  for (var i=0; i<challengeElements.length; i++){
    // Declare id and value variables
    let id = challengeElements[i].id;
    let value = challengeElements[i].value;
    // Add id and value pair to filters array
    filters[id]=value;
  }

  // Loop through all of the filters and keep any data that matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    // If a filter value was entered...  
    if (value != "")  
      // ...filter based on id and value
      filteredData = filteredData.filter(row => row[key] === value);
  });

// Finally, rebuild the table using the filtered Data
buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.select("#filter-btn").on('click', updateFilters);

// Build the table when the page loads
buildTable(tableData);
