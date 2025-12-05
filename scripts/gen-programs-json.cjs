/* eslint-disable no-console */
const csv = require('csvtojson');
const fs  = require('fs');
const path= require('path');

csv()
  .fromFile(path.join(__dirname,'../src/data/programs_names.csv'))
  .then(rows => {
    const list = rows
      .filter(r => r.title && r.title.trim().length)
      .map(r => ({ title: r.title.trim() }));
    fs.writeFileSync(
      path.join(__dirname,'../src/data/programs.json'),
      JSON.stringify(list,null,2)
    );
    console.log('programs.json generated:', list.length, 'rows');
  });
