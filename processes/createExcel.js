const ExcelJS = require('exceljs');


const createExcel = async (scrapedSites) => {

  // escapes if no sites given
  if (!scrapedSites) {
    return;
  }

  // ncaam names for tab color
  const ncaamTabs = ['KenPom Ratings', 'Sonny Power Ratings']
  const nbaTabs = ['ESPN NBA Stats'];

  // initializes workbook
  let workbook = new ExcelJS.Workbook();
  workbook.creator = 'Jacob Madsen';
  workbook.created = new Date();

  // creates a new excel tab for each website
  for (const site of scrapedSites) {
    // choose colors based on tab arrays above
    let color;
    if (ncaamTabs.includes(site.name)) {
      color = '01d50c';
    } else if (nbaTabs.includes(site.name)) {
      color = '0180d5';
    }
    // adds new sheet to xlsx for each site
    let sheet = workbook.addWorksheet(site.name, { properties: { tabColor: { argb: color } } });
    sheet.columns = site.columns;
    for (let row of site.data) {
      sheet.addRow(row);
    }
  }

  // create filename, can't use "/" to name excel file
  let date = new Date().toLocaleDateString().split('/').join('-');
  const fileName = `${date} Analytics.xlsx`;

  // write xlsx to server
  await workbook.xlsx.writeFile(fileName);

}

exports.createExcel = createExcel;