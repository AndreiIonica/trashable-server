// This file loads data froma a csv file with all the counties,cities and
// other data for Romania and saves only the county and the county automobile code in a json file
const csv = require('csv-parser');
const fs = require('fs');

const judete = [];
fs.createReadStream('src/data_cleaning/judete_localitati.csv')
  .pipe(csv())
  .on('data', (row) => {
    // county object for pushing into array
    const judet = {
      code: row['JUDET AUTO'],
      name: row.JUDET
    };
    // dont push the same county twice
    if (!judete.some((jud) => jud.code === judet.code)) judete.push(judet);
  })
  .on('end', () => {
    // dump array into a json file
    fs.writeFileSync(
      'src/constants/counties.json',
      JSON.stringify(judete, null, 2)
    );
  });
