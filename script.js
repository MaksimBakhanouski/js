function enterNameCountry() {
    while (true) {
        var nameCountry = prompt("Введите наименование страны", "РБ");
        if (nameCountry !== null) {
            return nameCountry;
        }
    }
}

function enterNameCapital() {
    while (true) {
        var nameCapital = prompt("Введите наименование столицы", "Минск");
        if (nameCapital !== null) {
            return nameCapital;
        }
    }
}

function enterInfoCountry() {
    var nameCountry = enterNameCountry();
    var nameCapital = enterNameCapital();
    addСountry(nameCountry, nameCapital);
}

function checkCountry() {
    var nameCountry = enterNameCountry();
    console.log(getcountryInfo(nameCountry));
}

function showInfoCountries() {
    console.log(listСountries());
}

function delInfoCountry() {
    var nameCountry = enterNameCountry();
    if (nameCountry in countries) {
        deleteСountry(nameCountry);
        return;
    }
    alert(`Страны ${nameCountry} нет в списке!`);
}