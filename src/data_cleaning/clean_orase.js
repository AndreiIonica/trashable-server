// This file loads data froma a csv file with all the counties,cities and
// other data for Romania and saves only the city with the county automobile code in a json file
const csv = require('csv-parser');
const fs = require('fs');

const cities = [];
fs.createReadStream('src/data_cleaning/judete_localitati.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Make a new city object and push it into an array
    cities.push({
      code: row['JUDET AUTO'],
      name: row.NUME
    });
  })
  .on('end', () => {
    // Dump the array into a json file
    fs.writeFileSync(
      'src/constants/cities.json',
      JSON.stringify(cities, null, 2)
    );
  });
