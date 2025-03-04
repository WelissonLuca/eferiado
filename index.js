const feriados = require('./src/feriados');
const funcs = require('./src/functions')

const isDateHoliday = (date) => {
    const returnedObject = { 
        nacionais: [],
        regionais: [],
    };

    if (date instanceof Date) {
        date = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0')
    } else {
        [date] = date.match(/(\d\d\/\d\d)+/);
    }

    returnedObject.data = date

    const foundNationalHolidays = feriados.nacionais.filter((feriadoNacional) => {
        if (feriadoNacional.move === undefined) return feriadoNacional.data === date

        const dateObject = {
            day: date.substr(0, 2),
            month: date.substr(3, 4)
        }
        const moveDate = funcs.getMoveDate(feriadoNacional.move)
        return moveDate.day === dateObject.day && moveDate.month === dateObject.month
    });

    const foundRegionalHolidays = feriados.regionais.filter(feriadoRegional => {
        return feriadoRegional.data === date
    });

    if (foundNationalHolidays.length) {
        returnedObject.nacionais = foundNationalHolidays.map(({ nome }) => ({ nome }));
    }

    if (foundRegionalHolidays.length) {
        returnedObject.regionais = foundRegionalHolidays.map(({ nome, estado }) => {
            return { nome,  estado }
        })
    }

    return returnedObject;
}
module.exports = isDateHoliday;
