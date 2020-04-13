'use strict';

const bent = require('bent');

const getJSON = bent('json');

getJSON('https://coronavirus-tracker-api.herokuapp.com/v2/latest?source=jhu').then((result) => {
    console.log(`There are currently ${result.latest.confirmed} cases of COVID-19 worldwide`);
}).catch((error) => {
    console.error(error);
});