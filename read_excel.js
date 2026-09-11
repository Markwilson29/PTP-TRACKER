const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('ptp tracker.xlsx');

// Get the first sheet name
const sheetName = workbook.SheetNames[0];
console.log('Sheet name:', sheetName);

// Get the sheet data
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(sheet);

console.log('\nHeaders:', Object.keys(data[0] || {}));
console.log('\nFirst few rows:');
data.slice(0, 5).forEach((row, index) => {
    console.log(`\nRow ${index + 1}:`, row);
});

console.log('\nTotal rows:', data.length);
