class Clock {
    constructor(dialRadius, width, height, bias, city) {
        this.digitRadius = Math.round(dialRadius * 15 / 100);
        this.view = null;
        this.bias = bias;// * 60 * 60 * 1000;
        this.city = city;
        this.dialRadius = dialRadius;
        this.dialRadiusCanvas = dialRadius * 0.97;
        this.width = width;
        this.height = height;
        this.digitWidth = this.digitRadius * 2;
        this.digitHeight = this.digitRadius * 2;
    };

    getOptionsObject() {
        const modelData = {
            currentDate: new Date(),
            second: new Date().getSeconds(),
            minute: new Date().getMinutes(),
            hour: new Date().getHours() + this.bias,
            coordinateX: this.width / 2,
            coordinateY: this.height / 2,
            arrCoordinates: [],
            arrArrows: [],
            arrArrowsDOM: [],
            arrArrowsCanvas: [],
            digitRadius: this.digitRadius,
            dialRadius: this.dialRadius,
            dialRadiusCanvas: this.dialRadiusCanvas,
            width: this.width,
            height: this.height,
            city: this.city,
            digitWidth: this.digitWidth,
            digitHeight: this.digitHeight,
            lengthSecondDom1: 0,
            lengthSecondDom2: 0,
            lengthMinuteDom1: 0,
            lengthMinuteDom2: 0,
            lengthHourDom1: 0,
            lengthHourDom2: 0,
        }

        if (modelData.hour > 12) {
            modelData.hour -= 12;
        }
        let i = 1;
        let corner = 30;
        let arrCoordinates = [];
        const offsetAlongX = -8;
        const offsetAlongY = 5;
        const secondLengthFactor = 0.9;
        const minuteLengthFactor = 0.75;
        const hourLengthFactor = 0.5;
        const endArrowLengthFactor = 0.2;
        const radiusFactor = 0.8;
        const radiusFactorDOM = 0.85;
        const arrowStartAngle = 270;
        const arrowEndAngle = 90;
        const minuteFactor = 30;
        const angleOffset = 6;
        const minutesInHour = 60;
        const conversionFactorToCorner = (angleOffset / 180) * Math.PI;
        const minutesBetweenDigits = 5;
        modelData.lengthSecondDom1 = modelData.dialRadius * secondLengthFactor;
        modelData.lengthMinuteDom1 = modelData.dialRadius * minuteLengthFactor;
        modelData.lengthHourDom1 = modelData.dialRadius * hourLengthFactor;
        modelData.lengthSecondDom2 = modelData.dialRadius * endArrowLengthFactor;
        modelData.lengthMinuteDom2 = modelData.dialRadius * endArrowLengthFactor;
        modelData.lengthHourDom2 = modelData.dialRadius * endArrowLengthFactor;

        while (corner <= 360) {
            let arr = {};
            arr.coordX = Math.round(
                this.dialRadius + this.dialRadius * radiusFactor * Math.sin((Math.round(corner) / 180) * Math.PI)
            );
            arr.coordY = Math.round(
                this.dialRadius - this.dialRadius * radiusFactor * Math.cos((Math.round(corner) / 180) * Math.PI)
            );
            arr.coordDOMX = Math.round(
                Math.round(this.dialRadius * radiusFactorDOM) + Math.round(this.dialRadius * radiusFactor) * Math.sin((Math.round(corner) / 180) * Math.PI)
            );
            arr.coordDOMY = Math.round(
                Math.round(this.dialRadius * radiusFactorDOM) + Math.round(this.dialRadius * radiusFactor) * Math.cos((Math.round(corner) / 180) * Math.PI)
            );

            arr.coordTextY = arr.coordY + offsetAlongY;
            arr.coordTextX = arr.coordX + offsetAlongX;
            arr.name = i;
            corner += 30;
            i += 1;
            arrCoordinates[arrCoordinates.length] = arr;
        }
        modelData.arrCoordinates = arrCoordinates;

        let arrArrows = [];
        arrArrows[0] = Math.round(
            this.dialRadius +
            this.dialRadius * secondLengthFactor * Math.sin((Math.round(modelData.second * angleOffset) / 180) * Math.PI)
        );
        arrArrows[1] = Math.round(
            this.dialRadius -
            this.dialRadius * secondLengthFactor * Math.cos((Math.round(modelData.second * angleOffset) / 180) * Math.PI)
        );

        arrArrows[2] = Math.round(
            this.dialRadius +
            this.dialRadius * minuteLengthFactor * Math.sin((Math.round(modelData.minute * angleOffset) / 180) * Math.PI)
        );
        arrArrows[3] = Math.round(
            this.dialRadius -
            this.dialRadius * minuteLengthFactor * Math.cos((Math.round(modelData.minute * angleOffset) / 180) * Math.PI)
        );

        arrArrows[4] = Math.round(
            this.dialRadius +
            this.dialRadius * hourLengthFactor *
            Math.sin(
                (Math.round(modelData.hour * minuteFactor + minuteFactor * modelData.minute / minutesInHour) / 180) *
                Math.PI
            )
        );
        arrArrows[5] = Math.round(
            this.dialRadius -
            this.dialRadius * hourLengthFactor *
            Math.cos(
                (Math.round(modelData.hour * minuteFactor + minuteFactor * modelData.minute / minutesInHour) / 180) *
                Math.PI
            )
        );
        modelData.arrArrows = arrArrows;

        let arrArrowsDOM = [];
        arrArrowsDOM[0] = arrowStartAngle + modelData.second * angleOffset;
        arrArrowsDOM[1] = arrowEndAngle + modelData.second * angleOffset;
        arrArrowsDOM[2] = arrowStartAngle + modelData.minute * angleOffset;
        arrArrowsDOM[3] = arrowEndAngle + modelData.minute * angleOffset;
        arrArrowsDOM[4] = arrowStartAngle + (modelData.hour * minuteFactor + (minuteFactor * modelData.minute / minutesInHour));
        arrArrowsDOM[5] = arrowEndAngle + (modelData.hour * minuteFactor + (minuteFactor * modelData.minute / minutesInHour));
        modelData.arrArrowsDOM = arrArrowsDOM;

        let arrArrowsCanvas = [];

        arrArrowsCanvas[0] = Math.round(modelData.dialRadius +
            modelData.dialRadius * secondLengthFactor * Math.sin(modelData.second * conversionFactorToCorner));
        arrArrowsCanvas[1] = Math.round(modelData.dialRadius -
            modelData.dialRadius * secondLengthFactor * Math.cos(modelData.second * conversionFactorToCorner));
        arrArrowsCanvas[2] = Math.round(modelData.dialRadius +
            modelData.dialRadius * minuteLengthFactor * Math.sin(modelData.minute * conversionFactorToCorner));
        arrArrowsCanvas[3] = Math.round(modelData.dialRadius -
            modelData.dialRadius * minuteLengthFactor * Math.cos(modelData.minute * conversionFactorToCorner));
        arrArrowsCanvas[4] = Math.round(modelData.dialRadius +
            modelData.dialRadius * hourLengthFactor * Math.sin((modelData.hour + modelData.minute / minutesInHour) *
                minutesBetweenDigits * conversionFactorToCorner));
        arrArrowsCanvas[5] = Math.round(modelData.dialRadius -
            modelData.dialRadius * hourLengthFactor * Math.cos((modelData.hour + modelData.minute / minutesInHour) *
                minutesBetweenDigits * conversionFactorToCorner));
        modelData.arrArrowsCanvas = arrArrowsCanvas;
        return modelData;
    }

    init(view) {
        this.view = view;
        if (!this.view) {
            console.error("Нет данных об View!");
            return;
        }
    };

    firstStart() {
        const modelData = this.getOptionsObject();
        this.view.firstStart(modelData);
        this.start();
    };

    update(){
        this.updateView();
        cancelAnimationFrame(this.timerId);
        this.timerId = requestAnimationFrame(()=>this.update());
    }

    updateView() {
        
        const modelData = this.getOptionsObject();        
        //this.timerId = requestAnimationFrame(this.updateView);
        if (!this.view) {
            console.error("Нет данных об View!");
            return;
        }

        this.view.setTime(modelData);
        

    };
    start() {
        //this.timerId = setInterval(() => this.updateView(), 1000);
        //this.timerId = requestAnimationFrame(this.updateView);
        this.timerId = requestAnimationFrame(()=>this.update());
    };

    stop() {
        //clearInterval(this.timerId);
        cancelAnimationFrame(this.timerId);
    };

};


