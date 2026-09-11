const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('ptp tracker.xlsx');

// Get all sheet names
console.log('Sheet names:', workbook.SheetNames);

// Try each sheet
workbook.SheetNames.forEach(sheetName => {
    console.log('\n=== Sheet:', sheetName, '===');
    const sheet = workbook.Sheets[sheetName];
    
    // Get range
    console.log('Range:', sheet['!ref']);
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log('Data:');
    data.forEach((row, index) => {
        console.log(`Row ${index}:`, row);
    });
});
