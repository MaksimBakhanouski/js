function getUserResponse(param1, param2) {
    while (true) {
        var nameCountry = prompt(param1, param2);
        if (nameCountry !== null) {
            return nameCountry;
        }
    }
}

function enterInfoCountry() {
    var nameCountry = getUserResponse("Введите наименование страны","РБ");
    var nameCapital = getUserResponse("Введите наименование столицы", "Минск");
    addСountry(nameCountry, nameCapital);
}

function checkCountry() {
    var nameCountry = getUserResponse("Введите наименование страны для получения информации","РБ");
    console.log(getcountryInfo(nameCountry));
}

function showInfoCountries() {
    console.log(listСountries());
}

function delInfoCountry() {
    var nameCountry = getUserResponse("Введите наименование страны для удаления","РБ");
    if (nameCountry in countries) {
        deleteСountry(nameCountry);
        return;
    }
    alert(`Страны ${nameCountry} нет в списке!`);
}