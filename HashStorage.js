

function HashStorage() {

    this.storage = {};// хеш, который будет хранить в себе ключи и их значения;
    this.addValue = function (key, value) {// — сохраняет указанное значение под указанным ключом в storage;
        this.storage[key] = value;
        return this;
    }
    this.getValue = function (key) {// — возвращает значение по указанному ключу либо undefined;
        try {
            return this.storage[key];
        }
        catch {
            return undefined;
        }
    }

    this.deleteValue = function (key) {// — удаляет значение с указанным ключом, возвращает true если значение было удалено и false если такого значения не было в хранилище storage;
        console.log(this.storage[key]);

        if (key in this.storage) {
            
            delete this.storage[key];
            return true;
        }
        else {
            return false;
        }
    }

    this.getKeys = function () { //— возвращает массив, состоящий из одних ключей.        
        return Object.keys(this.storage);        
    }

}

function InformationOnTheObject(nameObj = "", compoundObj = [], typeObj = "", wayObj = "") {
    this.name = nameObj;
    this.compound = compoundObj;
    this.type = typeObj;
    this.way = wayObj;

    this.getName = function () {
        return this.name;
    }

    this.getCompound = function () {
        return this.compound;
    }

    this.getType = function () {
        return this.type;
    }

    this.getWay = function () {
        return this.way;
    }

    return this;
} 