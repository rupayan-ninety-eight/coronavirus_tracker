'use strict';

const bent = require('bent');

const getJSON = bent('json');
const list = [{ "numeric": 250, "alpha-3": "FRA", "name": "France", "alpha-2": "FR" }];
const country = list[0];

console.log(country["alpha-2"].toLowerCase());

getJSON(`https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=${list[0]["alpha-2"].toLowerCase()}`).then((result) => {
    console.log(`There are currently ${result.latest.confirmed} cases of COVID-19 worldwide`);
}).catch((error) => {
    console.error(error);
});

const countryListInitial = [{ "name": "France", "alpha-2": "FR", "numeric": 250, "alpha-3": "FRA" }, { "name": "Italy", "alpha-2": "IT", "numeric": 380, "alpha-3": "ITA" }];
const countryList = [];
const countryName = [];
const countryCode = [];

for (var cnt = 0; cnt < countryListInitial.length; cnt++) {
    countryList.push(countryListInitial[cnt]);
    countryName.push(countryList[cnt].name);
    countryCode.push(countryList[cnt]["alpha-2"].toLowerCase());
}

type = ["deaths", "recovered"]

for (var j = 0; j < countryCode.length; j++) {
    return getJSON(`https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=${countryCode[j]}`).then((result) => {

        if (j >= 1) {
            agent.add("Now, for the next country");
        }

        agent.add("According to my latest data");

        if (type.length >= 3) {
            agent.add(`There are currently ${result.latest.confirmed} positive cases, ${result.latest.deaths} deaths and ${result.latest.recovered} recoveries. This is not good for ${countryName[j]}.`);
            return;
        }

        for (var i = 0; i < type.length; i++) {
            if (i == 1) {
                agent.add('In addition,');
            }
            switch (type[i]) {
                case 'confirmed':
                    agent.add(`There are currently ${result.latest.confirmed} cases of COVID-19 in ${countryName[j]}`);
                    break;
                case 'deaths':
                    agent.add(`There are currently ${result.latest.deaths} deaths due to COVID-19 in ${countryName[j]}`);
                    break;
                case 'recovered':
                    agent.add(`There are currently ${result.latest.recovered} people who have recovered from COVID-19 in ${countryName[j]}. I hope this number rises quickly.`);
                    break;
                default: //All condition
                    agent.add(`There are currently ${result.latest.confirmed} positive cases, ${result.latest.deaths} deaths and ${result.latest.recovered} recoveries. This is not good for the ${countryName[j]}.`);
            }
        }
    }).catch((error) => {
        console.error(error);
    });

}

console.log(countryCode);
