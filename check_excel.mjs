import XLSX from 'xlsx';

// Check PTP tracker
console.log('=== PTP TRACKER ===');
const ptpWorkbook = XLSX.readFile('ptp tracker.xlsx');
console.log('Sheet names:', ptpWorkbook.SheetNames);

ptpWorkbook.SheetNames.forEach(sheetName => {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const sheet = ptpWorkbook.Sheets[sheetName];
    console.log('Range:', sheet['!ref']);
    
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log('First 10 rows:');
    data.slice(0, 10).forEach((row, index) => {
        console.log(`Row ${index}:`, row);
    });
    console.log('Total rows:', data.length);
});

// Check Confirmed tracker
console.log('\n\n=== CONFIRMED TRACKER ===');
const confirmedWorkbook = XLSX.readFile('CONFIRMED tracker.xlsx');
console.log('Sheet names:', confirmedWorkbook.SheetNames);

confirmedWorkbook.SheetNames.forEach(sheetName => {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const sheet = confirmedWorkbook.Sheets[sheetName];
    console.log('Range:', sheet['!ref']);
    
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log('First 10 rows:');
    data.slice(0, 10).forEach((row, index) => {
        console.log(`Row ${index}:`, row);
    });
    console.log('Total rows:', data.length);
});
