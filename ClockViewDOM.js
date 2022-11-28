class ClockViewDOM {
    constructor() {
        this.dialRadius = null;
        this.digitWidth = null;
        this.digitHeight = null;
        this.coordinateX = null;
        this.coordinateY = null;
        this.conteiner = null;
        this.second = null;
        this.minute = null;
        this.hour = null;
        this.width = null;
        this.height = null;
        this.arrCoordinates = null;
        this.arrArrowsDOM = null;
        this.lengthSecondDom1 = null
        this.lengthMinuteDom1 = null;
        this.lengthHourDom1 = null;
        this.lengthSecondDom2 = null;
        this.lengthMinuteDom2 = null;
        this.lengthHourDom2 = null;
    };

    init(conteiner) {
        this.conteiner = conteiner;
    }

    firstStart(modelData) {
        this.dialRadius = modelData.dialRadius;
        this.digitWidth = modelData.digitWidth;
        this.digitHeight = modelData.digitHeight;
        this.width = modelData.width;
        this.height = modelData.height;
        this.coordinateX = modelData.coordinateX;
        this.coordinateY = modelData.coordinateY;
        this.second = modelData.sec;
        this.minute = modelData.minute;
        this.hour = modelData.hour;
        this.city = modelData.city;
        this.arrCoordinates = modelData.arrCoordinates;
        this.arrArrowsDOM = modelData.arrArrowsDOM;
        this.lengthSecondDom1 = modelData.lengthSecondDom1;
        this.lengthMinuteDom1 = modelData.lengthMinuteDom1;
        this.lengthHourDom1 = modelData.lengthHourDom1;
        this.lengthSecondDom2 = modelData.lengthSecondDom2;
        this.lengthMinuteDom2 = modelData.lengthMinuteDom2;
        this.lengthHourDom2 = modelData.lengthHourDom2;

        let divWrapperButtons = document.createElement("div");
        divWrapperButtons.classList.add("wrapper-buttons");

        let btnStart = document.createElement("button");
        btnStart.classList.add("wrapper-buttons__button");
        btnStart.textContent = "Start";
        divWrapperButtons.append(btnStart);
        let btnStop = document.createElement("button");
        btnStop.classList.add("wrapper-buttons__button");
        btnStop.textContent = "Stop";
        divWrapperButtons.append(btnStop);
        let pCity = document.createElement("p");
        pCity.classList.add("wrapper-buttons__text");
        pCity.textContent = this.city;
        divWrapperButtons.append(pCity);
        this.conteiner.append(divWrapperButtons);

        let divClock = document.createElement("div");
        divClock.style.width = this.width + "px";
        divClock.style.height = this.height + "px";
        divClock.className = "wrapper-clock";
        this.conteiner.append(divClock);

        for (let i = 0; i < this.arrCoordinates.length; i++) {
            let divNumber = document.createElement("div");
            divNumber.className = "wrapper-clock__number";
            divNumber.style.width = this.digitWidth + "px";
            divNumber.style.height = this.digitHeight + "px";

            let coordinateX = this.arrCoordinates[i].coordDOMX;
            let coordinateY = this.arrCoordinates[i].coordDOMY;
            let nameNum = this.arrCoordinates[i].name;

            divNumber.style.left = coordinateX + "px";
            divNumber.style.bottom = coordinateY + "px";
            divNumber.textContent = nameNum;
            divClock.append(divNumber);
        }

        this.divSecond = document.createElement("div");
        this.divSecond.className = "arrow-second";
        this.divSecond.style.width = this.lengthSecondDom1 + "px";
        this.divSecond.style.transform = "rotate(" + this.arrArrowsDOM[0] + "deg)";
        this.divSecond.style.transformOrigin = "0px 1.5px";
        this.divSecond.style.left = this.coordinateX + "px";
        this.divSecond.style.top = this.coordinateY + "px";
        divClock.append(this.divSecond);
        this.divSecond2 = document.createElement("div");
        this.divSecond2.className = "arrow-second2";
        this.divSecond2.style.width = this.lengthSecondDom2 + "px";
        this.divSecond2.style.transform = "rotate(" + this.arrArrowsDOM[1] + "deg)";
        this.divSecond2.style.transformOrigin = "0px 1.5px";
        this.divSecond2.style.left = this.coordinateX + "px";
        this.divSecond2.style.top = this.coordinateY + "px";
        divClock.append(this.divSecond2);

        this.divMinute = document.createElement("div");
        this.divMinute.className = "arrow-minute";
        this.divMinute.style.width = this.lengthMinuteDom1 + "px";
        this.divMinute.style.transform = "rotate(" + this.arrArrowsDOM[2] + "deg)";
        this.divMinute.style.transformOrigin = "0px 2.5px";
        this.divMinute.style.left = this.coordinateX + "px";
        this.divMinute.style.top = this.coordinateY + "px";
        divClock.append(this.divMinute);
        this.divMinute2 = document.createElement("div");
        this.divMinute2.className = "arrow-minute2";
        this.divMinute2.style.width = this.lengthMinuteDom2 + "px";
        this.divMinute2.style.transform = "rotate(" + this.arrArrowsDOM[3] + "deg)";
        this.divMinute2.style.transformOrigin = "0px 2.5px";
        this.divMinute2.style.left = this.coordinateX + "px";
        this.divMinute2.style.top = this.coordinateY + "px";
        divClock.append(this.divMinute2);

        this.divHour = document.createElement("div");
        this.divHour.className = "arrow-hour";
        this.divHour.style.width = this.lengthHourDom1 + "px";
        this.divHour.style.transform = "rotate(" + this.arrArrowsDOM[4] + "deg)";
        this.divHour.style.transformOrigin = "0px 5px";
        this.divHour.style.left = this.coordinateX + "px";
        this.divHour.style.top = this.coordinateY + "px";

        divClock.append(this.divHour);
        this.divHour2 = document.createElement("div");
        this.divHour2.className = "arrow-hour2";
        this.divHour2.style.width = this.lengthHourDom2 + "px";
        this.divHour2.style.transform = "rotate(" + this.arrArrowsDOM[5] + "deg)";
        this.divHour2.style.transformOrigin = "0px 5px";
        this.divHour2.style.left = this.coordinateX + "px";
        this.divHour2.style.top = this.coordinateY + "px";
        divClock.append(this.divHour2);

        const divCenter = document.createElement("div");
        divCenter.className = "wrapper-clock__center";
        divClock.append(divCenter);

    };

    setTime(modelData) {

        this.arrArrowsDOM = modelData.arrArrowsDOM;

        this.divSecond.style.transform = "rotate(" + this.arrArrowsDOM[0] + "deg)";
        this.divSecond2.style.transform = "rotate(" + this.arrArrowsDOM[1] + "deg)";

        //minute = 59;
        this.divMinute.style.transform = "rotate(" + this.arrArrowsDOM[2] + "deg)";
        this.divMinute2.style.transform = "rotate(" + this.arrArrowsDOM[3] + "deg)";

        //hour = 5;
        //minute = 1;
        this.divHour.style.transform = "rotate(" + this.arrArrowsDOM[4] + "deg)";
        this.divHour2.style.transform = "rotate(" + this.arrArrowsDOM[5] + "deg)";
        
    };
};










