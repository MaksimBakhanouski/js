class ClockViewCanvas {
  constructor() {
    this.digitRadius = null;
    this.dialRadius = null;
    this.dialRadiusCanvas = null;
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
    this.arrArrowsCanvas = null;
    this.wrapperCanvas = null;
  };

  init(conteiner) {
    this.conteiner = conteiner;
  }

  firstStart(modelData) {
    this.digitRadius = modelData.digitRadius;
    this.dialRadius = modelData.dialRadius;
    this.dialRadiusCanvas = modelData.dialRadiusCanvas;
    this.width = modelData.width;
    this.height = modelData.height;
    this.coordinateX = modelData.coordinateX;
    this.coordinateY = modelData.coordinateY;
    this.second = modelData.sec;
    this.minute = modelData.minute;
    this.hour = modelData.hour;
    this.city = modelData.city;
    this.arrCoordinates = modelData.arrCoordinates;
    this.arrArrowsCanvas = modelData.arrArrowsCanvas;

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

    this.wrapperCanvas = document.createElement("canvas");
    this.wrapperCanvas.width = this.width;
    this.wrapperCanvas.height = this.height;
    this.conteiner.append(this.wrapperCanvas);

    this.setClockFace();
    this.setClockDigit();
    this.setClockArrow();
  }

  setClockFace() {
    if (this.wrapperCanvas && this.wrapperCanvas.getContext("2d")) {
      let ctx = this.wrapperCanvas.getContext("2d");

      ctx.strokeStyle = "#ffe600";
      ctx.fillStyle = "#ffe600";
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.arc(this.coordinateX, this.coordinateY, this.dialRadiusCanvas, 0, 360);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "green";
      ctx.fillStyle = "green";
      ctx.lineWidth = 1;
      for (let i = 0; i < this.arrCoordinates.length; i++) {
        let coordinateX = this.arrCoordinates[i].coordX;
        let coordinateY = this.arrCoordinates[i].coordY;

        ctx.beginPath();
        ctx.arc(coordinateX, coordinateY, this.digitRadius, 0, 360);
        ctx.fill();
        ctx.stroke();
      }

    }
  }

  setClockDigit() {
    if (this.wrapperCanvas && this.wrapperCanvas.getContext("2d")) {
      let ctx = this.wrapperCanvas.getContext("2d");

      for (let i = 0; i < this.arrCoordinates.length; i++) {
        let coordinateX = this.arrCoordinates[i].coordX;
        let coordinateY = this.arrCoordinates[i].coordY;
        let coordinateTextX = this.arrCoordinates[i].coordTextX;
        let coordinateTextY = this.arrCoordinates[i].coordTextY;
        let nameNum = this.arrCoordinates[i].name;

        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        //ctx.fillText(nameNum, coordinateX - ctx.measureText(String(nameNum)).width / 2, coordinateY);
        ctx.fillText(nameNum, coordinateTextX, coordinateY);
      }
    };
  };

  setClockArrow() {
    if (this.wrapperCanvas && this.wrapperCanvas.getContext("2d")) {
      let ctx = this.wrapperCanvas.getContext("2d");
      let coordinateXSecond = this.arrArrowsCanvas[0];
      let coordinateYSecond = this.arrArrowsCanvas[1];
      let coordinateXMinute = this.arrArrowsCanvas[2];
      let coordinateYMinute = this.arrArrowsCanvas[3];
      let coordinateXHour = this.arrArrowsCanvas[4];
      let coordinateYHour = this.arrArrowsCanvas[5];

      ctx.strokeStyle = "blue";
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.dialRadius, this.dialRadius);
      ctx.lineTo(coordinateXSecond, coordinateYSecond);
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(this.dialRadius, this.dialRadius);
      ctx.lineTo(coordinateXMinute, coordinateYMinute);
      ctx.stroke();

      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(this.dialRadius, this.dialRadius);
      ctx.lineTo(coordinateXHour, coordinateYHour);
      ctx.stroke();
    }
  };

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
    this.arrCoordinates = modelData.arrCoordinates;
    this.arrArrowsCanvas = modelData.arrArrowsCanvas;

    if (this.wrapperCanvas && this.wrapperCanvas.getContext("2d")) {
      let ctx = this.wrapperCanvas.getContext("2d");

      function blank() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }

      blank();
      this.setClockFace();
      this.setClockDigit();
      this.setClockArrow();
    }
  };


};
