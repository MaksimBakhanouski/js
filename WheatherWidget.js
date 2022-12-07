
//const apiUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=Minsk&limit=5&appid={0d5d0a3c1f89fe9afb81ca2f6a366bc1}";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={0d5d0a3c1f89fe9afb81ca2f6a366bc1}";

const WheatherWidget = (function () {
  const delay = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));
  const apiKey = "0d5d0a3c1f89fe9afb81ca2f6a366bc1";

  function loadingWeather() {
    const appView = new ModalView();
    const appModel = new ModalModel();
    const appController = new ModalController();

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal');
    modalWindow.classList.add('modal_closed');
    document.body.append(modalWindow);

    appView.init(modalWindow);
    appModel.init(appView);
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=625144&appid=${apiKey}&units=metric&lang=ru`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=625144&appid=${apiKey}&cnt=8&units=metric&lang=ru`;
    getWeather(apiUrl, appModel);
    appController.init(appModel, modalWindow);
  }


  function showProgress() {

  }

  async function getWeather(api, modal, count = 0) {

    try {
      await delay(2000);
      const response = await fetch(api);
      //console.log(response.status);
      /*const reader = response.body.getReader();
      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      let chunks = [];
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }
        chunks.push(value);
        receivedLength += value.length;
        console.log(`Получено ${receivedLength} из ${contentLength}`)
      }
      
      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }      
      let result = new TextDecoder("utf-8").decode(chunksAll);      
      let dataWeather = JSON.parse(result);*/


      const dataWeather = await response.json();
      //console.log(dataWeather);
      modal.refreshWeather(dataWeather, count);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      console.log("Завершено удачно 'Погода'");
    }
  }

  async function getGeolocation(modal) {

    const apiUrlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=Minsk,,BY&limit=1&appid=${apiKey}`;
    let lat = 0;
    let lon = 0;
    try {
      await delay(1000);
      const response = await fetch(apiUrlGeo);
      const dataGeo = await response.json();
      lat = dataGeo[0].lat;
      lon = dataGeo[0].lon;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      console.log("Завершено удачно 'Геолокация'");
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=625144&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
    getWeather(apiUrl, modal);
  }

  /* ------- begin view -------- */
  function ModalView() {
    let myModal = null;

    this.init = function (modalWindow) {
      myModal = modalWindow;
    };

    this.show = function () {/* //переданным обектам удаляем класс  modal_closed -делаем видимыми */

      const modalHeader = document.createElement('header');
      modalHeader.classList.add('modal__header');
      myModal.append(modalHeader);

      const modalBtnClose = document.createElement('a');
      modalBtnClose.textContent = 'x';
      modalBtnClose.id = 'modal-btn-close-weather';
      modalBtnClose.href = "#";
      modalBtnClose.classList.add('modal__close');
      const modalBtnTurn = document.createElement('a');
      modalBtnTurn.textContent = '-';
      modalBtnTurn.id = 'modal-btn-turn-weather';
      modalBtnTurn.href = "#";
      modalBtnTurn.classList.add('modal__turn');
      const modalBtnShowThreeDays = document.createElement('a');
      modalBtnShowThreeDays.textContent = '3 дня';
      modalBtnShowThreeDays.id = 'modal-btn-show-three-days-weather';
      modalBtnShowThreeDays.href = "#";
      modalBtnShowThreeDays.classList.add('modal__three-days');
      const modalBtnShowOneDay = document.createElement('a');
      modalBtnShowOneDay.textContent = '1 день';
      modalBtnShowOneDay.id = 'modal-btn-show-one-day-weather';
      modalBtnShowOneDay.href = "#";
      modalBtnShowOneDay.classList.add('modal__three-days');
      modalBtnShowOneDay.classList.add('modal_closed');
      const modalBtnBack = document.createElement('a');
      modalBtnBack.textContent = '<<';
      modalBtnBack.id = 'modal-btn-back-weather';
      modalBtnBack.href = "#";
      modalBtnBack.classList.add('modal__back');
      modalBtnBack.classList.add('modal_closed');
      modalHeader.append(modalBtnClose);
      modalHeader.append(modalBtnTurn);
      modalHeader.append(modalBtnShowThreeDays);
      modalHeader.append(modalBtnBack);
      modalHeader.append(modalBtnShowOneDay);

      //<a href="#" class="modal__close" id="modal-video-close" title="Закрыть модальное окно">Закрыть</a>
      const modalH2 = document.createElement('h2');
      modalH2.textContent = "Погода Минск";
      modalHeader.append(modalH2);

      const modalMain = document.createElement('main');
      modalMain.classList.add('modal__content');
      myModal.append(modalMain);

      const modalMainDiv = document.createElement('div');
      modalMainDiv.id = 'modal-weather-content';
      modalMainDiv.classList.add('modal__content_flex');
      modalMain.append(modalMainDiv);

      const svgNS = "http://www.w3.org/2000/svg";
      const wrapperSvg = document.createElementNS(svgNS, "svg");
      wrapperSvg.setAttributeNS(null, "width", 80);
      wrapperSvg.setAttributeNS(null, "height", 20);
      wrapperSvg.setAttributeNS(null, "id", "svgWeatherProgress");
      wrapperSvg.classList.add('modal_closed');
      wrapperSvg.classList.add('modal__svg-progress');
      modalHeader.append(wrapperSvg);

      const rectSVG = document.createElementNS(svgNS, "rect");
      rectSVG.setAttributeNS(null, "x", 0);
      rectSVG.setAttributeNS(null, "y", 0);
      rectSVG.setAttributeNS(null, "width", 80);
      rectSVG.setAttributeNS(null, "height", 20);
      rectSVG.setAttributeNS(null, "fill", "red");
      rectSVG.setAttributeNS(null, "id", "modal__rectSVG");
      wrapperSvg.append(rectSVG);

    };

    this.hide = function () {
      myModal.classList.add('modal_closed');
    };


    this.turnModal = function () {
      //myModal.classList.add('modal__turn-animation-item');      
      myModal.classList.add('modal__turn-animation');

      const modalBtnBack = document.querySelector('#modal-btn-back-weather');
      modalBtnBack.classList.remove('modal_closed');

      myModal.classList.remove('modal__back-animation');

    };

    this.modalWeatherBack = function () {
      myModal.classList.remove('modal__turn-animation');
      myModal.classList.add('modal__back-animation');
      //myModal.classList.add('modal__turn-animation-none');

      const modalBtnBack = document.querySelector('#modal-btn-back-weather');
      modalBtnBack.classList.add('modal_closed');

    };

    this.refreshWeather = function (objWeather, count) {
      const modalWeatherContent = document.querySelector('#modal-weather-content');
      modalWeatherContent.innerHTML = '';
      for (let i = 0; i < objWeather.length; i++) {
        modalWeatherContent.innerHTML += `${objWeather[i]}<br/>`;
      }

      myModal.classList.remove('modal_closed');

      if (count === 1) {
        this.modalBtnShowOneDay();
      } else if (count === 3) {
        this.modalBtnShowTHreeDays();
      }
    }

    this.modalBtnShowOneDay = function () {
      const modalBtnShowOneDay = document.querySelector('#modal-btn-show-one-day-weather');
      const modalBtnShowTHreeDays = document.querySelector('#modal-btn-show-three-days-weather');
      modalBtnShowOneDay.classList.add('modal_closed');
      modalBtnShowTHreeDays.classList.remove('modal_closed');
    }

    this.modalBtnShowTHreeDays = function () {
      const modalBtnShowOneDay = document.querySelector('#modal-btn-show-one-day-weather');
      const modalBtnShowTHreeDays = document.querySelector('#modal-btn-show-three-days-weather');
      modalBtnShowTHreeDays.classList.add('modal_closed');
      modalBtnShowOneDay.classList.remove('modal_closed');
    }

    this.showAnimation = function (widthAnimation) {
      const progressSVG = document.querySelector("#svgWeatherProgress");
      progressSVG.classList.remove('modal_closed');
      const rectSVG = document.querySelector("#modal__rectSVG");      
      rectSVG.setAttributeNS(null, "width", widthAnimation);
    };

    this.stopAnimation = function () {
      const progressSVG = document.querySelector("#svgWeatherProgress");
      progressSVG.classList.add('modal_closed');      
    };

  };
  /* -------- end view --------- */

  /* ------- begin model ------- */
  function ModalModel() {
    let myModalContainer = null;
    let myModalView = null;
    let dataObject = {};

    this.init = function (view, dataWeather) {
      myModalView = view;
      myModalView.show(dataWeather);
    };

    this.refreshWeather = function (dataWeather, count) {

      const objWeather = [];
      let counter = 0;
      let bool = true;
      //objWeather.push(`${dataWeather.city.name}`);
      let intervID = setInterval(() => {
        //console.log(counter++);
        counter += 0.0015;
        this.showAnimation(counter * 80)
      }, 10);
      setTimeout(() => {
        for (let i = 0; i < dataWeather.list.length; i++) {
          let elem = dataWeather.list[i];
          if (elem.dt_txt.includes('12:00:00')) {
            objWeather.push(`<img class = "modal_block" src=https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png />`);
            objWeather.push(`<p> Дата: ${new Date(elem.dt_txt)}<br>
          Температура: ${elem.main.temp}<br>
          Скорость ветра: ${elem.wind.speed}<br>
          Облачность: ${elem.clouds.all}%<br>
          Текущая погода: ${elem.weather[0].description}</p>`);
            //objWeather.push('<hr>');
          };
        };
        bool = false;
        this.stopAnimation();
        clearInterval(intervID);
        myModalView.refreshWeather(objWeather, count);
      }, 5000);

    };

    this.showAnimation = function (widthAnimation) {
      myModalView.showAnimation(widthAnimation);
    };

    this.stopAnimation = function () {
      myModalView.stopAnimation();
    };


    this.closeModal = function () {
      myModalView.hide();
    };

    this.turnModal = function () {
      myModalView.turnModal();
    };

    this.modalWeatherBack = function () {
      myModalView.modalWeatherBack();
    };

    this.modalWeatherTHreeDays = function () {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=625144&appid=${apiKey}&cnt=24&units=metric&lang=ru`;
      getWeather(apiUrl, this, 3);

    };

    this.modalWeatherOneDay = function () {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=625144&appid=${apiKey}&cnt=8&units=metric&lang=ru`;
      getWeather(apiUrl, this, 1);

    };

  };
  /* -------- end model -------- */

  /* ----- begin controller ---- */
  function ModalController() {

    let myModalModel = null;
    let myModalWindow = null;

    this.init = function (model, modalWindow) {

      myModalModel = model;
      myModalWindow = modalWindow;

      const btnClose = myModalWindow.querySelector("#modal-btn-close-weather");
      if (btnClose) {
        btnClose.addEventListener('click', this.hideModal);
      };

      const btnTurn = myModalWindow.querySelector("#modal-btn-turn-weather");
      if (btnTurn) {
        btnTurn.addEventListener('click', this.turnModal);
      };

      const btnThreeDays = myModalWindow.querySelector("#modal-btn-show-three-days-weather");
      if (btnThreeDays) {
        btnThreeDays.addEventListener('click', this.modalWeatherTHreeDays);
      };

      const btnOneDay = myModalWindow.querySelector("#modal-btn-show-one-day-weather");
      if (btnOneDay) {
        btnOneDay.addEventListener('click', this.modalWeatherOneDay);
      };

      const btnBack = myModalWindow.querySelector("#modal-btn-back-weather");
      if (btnBack) {
        btnBack.addEventListener('click', this.modalWeatherBack);
      };

    };

    this.turnModal = function () {
      myModalModel.turnModal();
    };

    this.hideModal = function () {
      myModalModel.closeModal();
    };

    this.modalWeatherBack = function () {
      myModalModel.modalWeatherBack();
    };

    this.modalWeatherTHreeDays = function () {
      myModalModel.modalWeatherTHreeDays();
    };

    this.modalWeatherOneDay = function () {
      myModalModel.modalWeatherOneDay();
    };
  }
  /* ------ end controller ----- */
  return {

    getWeather: function () {

      //const data = getGeolocation();
      //console.log(data);
      try {
        const weatherModelCSS = document.querySelector('head');
        if (weatherModelCSS) {
          const weatherModelCSSLink = document.createElement('link');
          weatherModelCSSLink.rel = 'stylesheet';
          weatherModelCSSLink.href = "styles.css";
          weatherModelCSS.append(weatherModelCSSLink);
        }
      }
      catch (err) {
        console.error('Файл стилей не подключен!');
      }

      loadingWeather();
    }

  };



});


