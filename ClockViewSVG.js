class ClockViewSVG {
    constructor() {
        this.digitRadius = null;
        this.dialRadius = null;
        this.coordinateX = null;
        this.coordinateY = null;
        this.conteiner = null;
        this.second = null;
        this.minute = null;
        this.hour = null;
        this.width = null;
        this.height = null;
        this.city = null;
        this.arrCoordinates = null;
        this.arrArrows = null;

    };

    init(conteiner) {
        this.conteiner = conteiner;
    }    

    firstStart(modelData) {
        this.digitRadius = modelData.digitRadius;
        this.dialRadius = modelData.dialRadius;
        this.width = modelData.width;
        this.height = modelData.height;
        this.coordinateX = modelData.coordinateX;
        this.coordinateY = modelData.coordinateY;
        this.second = modelData.sec;
        this.minute = modelData.minute;
        this.hour = modelData.hour;
        this.city = modelData.city;        
        this.arrCoordinates = modelData.arrCoordinates;
        this.arrArrows = modelData.arrArrows;

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

        this.svgNS = "http://www.w3.org/2000/svg";
        this.wrapperSvg = document.createElementNS(this.svgNS, "svg");
        this.wrapperSvg.setAttributeNS(null, "width", this.width);
        this.wrapperSvg.setAttributeNS(null, "height", this.height);
        this.wrapperSvg.setAttributeNS(null, "id", "svgClock");
        this.conteiner.append(this.wrapperSvg);

        let circle = document.createElementNS(this.svgNS, "circle");
        const circleBorderWidth = 5;

        circle.setAttributeNS(null, "cx", this.coordinateX);
        circle.setAttributeNS(null, "cy", this.coordinateY);
        circle.setAttributeNS(null, "r", this.dialRadius);
        circle.setAttributeNS(null, "fill", "#ffe600");
        this.wrapperSvg.append(circle);

        for (let i = 0; i < this.arrCoordinates.length; i++) {
            let circleNumber = document.createElementNS(this.svgNS, "circle");
            let coordinateX = this.arrCoordinates[i].coordX;
            let coordinateY = this.arrCoordinates[i].coordY;
            let coordinateTextY = this.arrCoordinates[i].coordTextY;
            let nameNum = this.arrCoordinates[i].name;

            circleNumber.setAttributeNS(null, "cx", coordinateX);
            circleNumber.setAttributeNS(null, "cy", coordinateY);
            circleNumber.setAttributeNS(null, "r", this.digitRadius);
            circleNumber.setAttributeNS(null, "fill", "green");

            let textNumber = document.createElementNS(this.svgNS, "text");
            textNumber.setAttributeNS(null, "x", coordinateX);
            textNumber.setAttributeNS(null, "y", coordinateTextY);
            textNumber.setAttributeNS(null, "font-size", 16);
            textNumber.setAttributeNS(null, "fill", "white");
            textNumber.setAttributeNS(null, "text-anchor", "middle");
            textNumber.textContent = nameNum;
            this.wrapperSvg.append(circleNumber);
            this.wrapperSvg.append(textNumber);

        }

        this.arrowSecond = document.createElementNS(this.svgNS, "line");
        let coordinateXSecond = this.arrArrows[0];
        let coordinateYSecond = this.arrArrows[1];
        this.arrowSecond.setAttributeNS(null, "x1", this.coordinateX);
        this.arrowSecond.setAttributeNS(null, "y1", this.coordinateY);
        this.arrowSecond.setAttributeNS(null, "x2", coordinateXSecond);
        this.arrowSecond.setAttributeNS(null, "y2", coordinateYSecond);
        this.arrowSecond.setAttributeNS(null, "stroke", "blue");
        this.arrowSecond.setAttributeNS(null, "stroke-width", 2);
        this.arrowSecond.setAttributeNS(null, "id", "arrowSecond");
        this.wrapperSvg.append(this.arrowSecond);

        this.arrowMinute = document.createElementNS(this.svgNS, "line");
        let coordinateXMinute = this.arrArrows[2];
        let coordinateYMinute = this.arrArrows[3];
        this.arrowMinute.setAttributeNS(null, "x1", this.coordinateX);
        this.arrowMinute.setAttributeNS(null, "y1", this.coordinateY);
        this.arrowMinute.setAttributeNS(null, "x2", coordinateXMinute);
        this.arrowMinute.setAttributeNS(null, "y2", coordinateYMinute);
        this.arrowMinute.setAttributeNS(null, "stroke", "blue");
        this.arrowMinute.setAttributeNS(null, "stroke-width", 5);
        this.arrowMinute.setAttributeNS(null, "id", "arrowMinute");
        this.wrapperSvg.append(this.arrowMinute);

        this.arrowHour = document.createElementNS(this.svgNS, "line");
        let coordinateXHour = this.arrArrows[4];
        let coordinateYHour = this.arrArrows[5];
        this.arrowHour.setAttributeNS(null, "x1", this.coordinateX);
        this.arrowHour.setAttributeNS(null, "y1", this.coordinateY);
        this.arrowHour.setAttributeNS(null, "x2", coordinateXHour);
        this.arrowHour.setAttributeNS(null, "y2", coordinateYHour);
        this.arrowHour.setAttributeNS(null, "stroke", "blue");
        this.arrowHour.setAttributeNS(null, "stroke-width", 10);
        this.arrowHour.setAttributeNS(null, "id", "arrowHour");
        this.wrapperSvg.append(this.arrowHour);

        let circleCenter = document.createElementNS(this.svgNS, "circle");
        circleCenter.setAttributeNS(null, "cx", this.coordinateX);
        circleCenter.setAttributeNS(null, "cy", this.coordinateY);
        circleCenter.setAttributeNS(null, "r", 10);
        circleCenter.setAttributeNS(null, "fill", "red");
        circleCenter.setAttributeNS(null, "id", "circleCenter");
        this.wrapperSvg.append(circleCenter);
    }

    setTime(modelData) {

        this.digitRadius = modelData.digitRadius;
        this.dialRadius = modelData.dialRadius;
        this.width = modelData.width;
        this.height = modelData.height;
        this.coordinateX = modelData.coordinateX;
        this.coordinateY = modelData.coordinateY;
        this.second = modelData.sec;
        this.minute = modelData.minute;
        this.hour = modelData.hour;
        this.city = modelData.city;
        this.radiusFactor = modelData.radiusFactor;
        this.arrCoordinates = modelData.arrCoordinates;
        this.arrArrows = modelData.arrArrows;


        this.arrowSecond.remove();
        this.arrowSecond = document.createElementNS(this.svgNS, "line");
        let coordinateXSecond = this.arrArrows[0];
        let coordinateYSecond = this.arrArrows[1];
        this.arrowSecond.setAttributeNS(null, "x1", this.coordinateX);
        this.arrowSecond.setAttributeNS(null, "y1", this.coordinateY);
        this.arrowSecond.setAttributeNS(null, "x2", coordinateXSecond);
        this.arrowSecond.setAttributeNS(null, "y2", coordinateYSecond);
        this.arrowSecond.setAttributeNS(null, "stroke", "blue");
        this.arrowSecond.setAttributeNS(null, "stroke-width", 2);
        this.arrowSecond.setAttributeNS(null, "id", "arrowSecond");
        this.wrapperSvg.append(this.arrowSecond);

        this.arrowMinute.remove();
        this.arrowMinute = document.createElementNS(this.svgNS, "line");
        let coordinateXMinute = this.arrArrows[2];
        let coordinateYMinute = this.arrArrows[3];
        this.arrowMinute.setAttributeNS(null, "x1", this.coordinateX);
        this.arrowMinute.setAttributeNS(null, "y1", this.coordinateY);
        this.arrowMinute.setAttributeNS(null, "x2", coordinateXMinute);
        this.arrowMinute.setAttributeNS(null, "y2", coordinateYMinute);
        this.arrowMinute.setAttributeNS(null, "stroke", "blue");
        this.arrowMinute.setAttributeNS(null, "stroke-width", 5);
        this.arrowMinute.setAttributeNS(null, "id", "arrowMinute");
        this.wrapperSvg.append(this.arrowMinute);

        this.arrowHour.remove();
        this.arrowHour = document.createElementNS(this.svgNS, "line");
        let coordinateXHour = this.arrArrows[4];
        let coordinateYHour = this.arrArrows[5];
        this.arrowHour.setAttributeNS(null, "x1", this.coordinateX);
        this.arrowHour.setAttributeNS(null, "y1", this.coordinateY);
        this.arrowHour.setAttributeNS(null, "x2", coordinateXHour);
        this.arrowHour.setAttributeNS(null, "y2", coordinateYHour);
        this.arrowHour.setAttributeNS(null, "stroke", "blue");
        this.arrowHour.setAttributeNS(null, "stroke-width", 10);
        this.arrowHour.setAttributeNS(null, "id", "arrowHour");
        this.wrapperSvg.append(this.arrowHour);

        let circCenter = this.wrapperSvg.getElementById("circleCenter");
        circCenter.remove();
        circCenter = document.createElementNS(this.svgNS, "circle");
        circCenter.setAttributeNS(null, "cx", this.coordinateX);
        circCenter.setAttributeNS(null, "cy", this.coordinateY);
        circCenter.setAttributeNS(null, "r", 10);
        circCenter.setAttributeNS(null, "fill", "red");
        circCenter.setAttributeNS(null, "id", "circleCenter");
        this.wrapperSvg.append(circCenter);
        
    };
};


