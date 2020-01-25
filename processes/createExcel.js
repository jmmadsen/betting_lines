const ExcelJS = require('exceljs');


const createExcel = async (scrapedSites) => {

  // escapes if no sites given
  if (!scrapedSites) {
    return;
  }

  // initializes workbook
  let workbook = new ExcelJS.Workbook();
  workbook.creator = 'Jacob Madsen';
  workbook.created = new Date();

  // creates a new excel tab for each website
  for (const site of scrapedSites) {
    let sheet = workbook.addWorksheet(site.name);
    sheet.columns = site.columns;
    for (let row of site.data) {
      sheet.addRow(row);
    }
  }

  // write xlsx to server
  await workbook.xlsx.writeFile('analytics.xlsx');

}

exports.createExcel = createExcel;