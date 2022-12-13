const Modal = (function () {
    /* ------- begin view -------- */

    function ModalView() {
        let container = null;/* // передаем контейнер */
        let myModal = null; /* //обработка модального окна */
        let myModalOverlay = null;/* //обработка подлони модального окна */
        let modalObject = null;

        this.init = function (modalOverlay, modalWindow, field, modalObject) {
            container = field;
            myModal = modalWindow;
            myModalOverlay = modalOverlay;
            modalObject = modalObject;

            if (!myModal) {

                myModal = document.createElement('div');
                myModal.classList.add('modal');
                myModal.classList.add('modal_closed');
                myModal.classList.add('container_default');
                myModal.id = modalObject.supermodal;
                //let modalWindowMain = modalWindow.createElement('div');
                document.body.append(myModal);

                footerModal = document.createElement('footer');
                footerModal.classList.add('modal__footer');
                myModal.append(footerModal);

                btnCancel = document.createElement('button');
                btnCancel.classList.add('modal__cancel');
                btnCancel.id = "modal-default-cancel";
                btnCancel.textContent = 'Закрыть';
                footerModal.append(btnCancel);
            };


            if (modalObject.supermodalTitle) {
                let modalWindowHeader = myModal.querySelector('h2');
                if (modalWindowHeader) {
                    modalWindowHeader.innerHTML = modalObject.supermodalTitle;
                } else {
                    let modalWindowHeader = document.createElement('h2');
                    modalWindowHeader.textContent = "Это окно по умолчанию";
                    myModal.append(modalWindowHeader);
                }
            }
            if (modalObject.supermodalContent) {
                const mainDiv = myModal.querySelector('.modal__content');
                if (modalObject.supermodalContent.includes('https://www.youtube.com')) {
                    let newVideo = document.createElement('iframe');
                    newVideo.src = modalObject.supermodalContent;
                    newVideo.title = "Это видео ролик";
                    newVideo.frameBorder = "0";
                    newVideo.classList.add('modal__video');
                    mainDiv.append(newVideo);
                } else {
                    let newDiv = document.createElement('div');
                    newDiv.textContent = modalObject.supermodalContent;
                    if (mainDiv) {
                        mainDiv.append(newDiv);
                    }
                    else { myModal.append(newDiv); }
                }

            }



        };

        this.show = function () {/* //переданным обектам удаляем класс  modal_closed -делаем видимыми */
            myModal.classList.remove('modal_closed');
            if (myModalOverlay) {
                myModalOverlay.classList.remove('modal_closed');
            }
        };

        this.hide = function () {/* //переданным обектам добавляем класс  modal_closed - скрываем на странице */
            myModal.classList.add('modal_closed');
            if (myModalOverlay) {
                myModalOverlay.classList.add('modal_closed');
            }
        };

        this.printViewData = function (name, birthDay) { /* // вывести данные из хранилища в div.modal-data */
            /* // нашли контейнер для вывода текста-имени helloDiv  в нем создали абзац вывода имени и дня рождения */
            const helloDiv = container.querySelector('.modal-data')
            const helloName = document.createElement('p');
            helloName.textContent = `Привет ${name}`;
            const helloBirthDay = document.createElement('p');
            helloBirthDay.textContent = `У Вас день рожденния ${birthDay}!`;
            helloDiv.append(helloName);
            helloDiv.append(helloBirthDay);
        };

        this.buttonVisible = function (display) {/* // делаем видимыми "Очистит данные" */
            const clearDataBtn = container.querySelector('#clear-data');
            clearDataBtn.style.display = display;
        }

        this.clearInput = function () {/* // очистка инпутов */
            const inputs = myModal.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i += 1) {
                inputs[i].value = '';
            }
        };

        this.clearViewData = function () { /* // очистить или выдать дефолтное сообщение только для div.modal-data */
            /* если localStorage пуст, то приветствие не выводиться, кнопка невидна */
            let helloDiv = container.querySelector('.modal-data');

            /* //удаляем абзацы приветствия и дня рождения */
            while (helloDiv.firstChild) {
                helloDiv.removeChild(helloDiv.firstChild);
            }
            helloDiv.textContent = "Данные отсутствуют!";

        };
        this.disabled = function (bool) { /* //состояние кнопка "Сохранить данные"  */
            const btnSave = myModal.querySelector('#modal-save');
            if (btnSave) {
                btnSave.disabled = bool;
            }
        }

    };
    /* -------- end view --------- */

    /* ------- begin model ------- */
    function ModalModel() {
        let myModalContainer = null; /* //обрабатываем контейнер */
        let myModalView = null;/* // обрабатываем модальное окно */
        let dataObject = {};/* // создаем объект-хранилище данных */

        this.init = function (view) {
            myModalView = view;
        };

        this.openModal = function () {/* // вызываем метод модели, который делаем видимым модальное и его подложку */
            myModalView.show();/* // обьект View открывает модальное окно */
            myModalView.disabled(true);/* //  обьект View  делает кнопку "сохранить данные"  disabled */
        };

        this.closeModal = function () {/* // вызываем метод модели, который скрываем модальное и его подложку */
            myModalView.hide();/* // обьект View скрывает модальное окно */
        };

        this.saveModalData = function () { /* //получить данные из модалки и сохранить */
            localStorage.setItem('dataObject', JSON.stringify(dataObject));/* // создаем обект  localStorage */
            // myModalView.clearInput();
            //myModalView.hide();
        };

        this.getValue = function (e) {/* // функция-обработчик инпутов */
            let target = e.target;
            let bool = true;
            if (target.tagName === "INPUT") { /* // значениями инпутов заполняем обект в  localStorage */
                dataObject[target.id] = target.value;
            };
            /* //валидация данных  */
            if (Object.keys(dataObject).length < 4) {
                bool = false;
                myModalView.disabled(true);/* //если заполнено меньше 4 инпутов, то кнопка "Сохранить данные"  во VIEW disabled */
            }
            else {
                for (let key in dataObject) {
                    if (dataObject[key] === "" || dataObject[key] === "e" || dataObject[key] < 0 || dataObject[key] === "0") {
                        bool = false;
                        myModalView.disabled(true);/* //если данные неверные то кнопка "Сохранить данные"  во VIEW disabled */
                        break;
                    }
                }
            }
            if (bool) { myModalView.disabled(false) }/* //если валиидация пройдена bool = true  во VIEW  кнопка "Сохранить данные"  раз-disabled */
        }

        this.getData = function () { /* //достать данные из хранилища */
            let objectLS = JSON.parse(localStorage.getItem('dataObject'));
            if (objectLS) { /* если обект существует, то заполняем приветственные абзацы и открываем кнопку "Очистить данные"*/
                let name = objectLS['name'];
                let birthDay = objectLS['birth-day'] + "." + objectLS['birth-month'] + "." + objectLS['birth-year'];
                myModalView.printViewData(name, birthDay);
                myModalView.buttonVisible('');
            }
            else {
                myModalView.buttonVisible('none');
            }
        };


        this.clearData = function () {/*  //очистить данные в хранилище */
            localStorage.removeItem('dataObject');/* // удаляем обэект */
            myModalView.buttonVisible('none');/* // кнопку "Очистить данные" скрываем */
            myModalView.clearViewData();/* //удаляем приветственные абзацы */

        };

        this.clearForm = function () { /* //очистить данные в форме */
            myModalView.clearInput();
        };
    };

    /* -------- end model -------- */

    /* ----- begin controller ---- */
    function ModalController() {
        let myModalContainer = null;/* // обработка контейнера */
        let myModalModel = null;/* // обработка обекта-модели */
        let myModalWindow = null;/* // обработка модального окна */
        let myModalOverlay = null;/* // обработка подложки модального окна */
        let myBtnOpen = null;

        this.init = function (model, field, modalOverlay, modalWindow, btn) { /* // получаем кнопки и вешаем обработчики */

            myModalContainer = field;
            myModalModel = model;
            myModalWindow = modalWindow;
            myModalOverlay = modalOverlay;
            myBtnOpen = btn;

            document.addEventListener('DOMContentLoaded', this.goToLocalStorage);/* считываем данные из localStorage для приветствия */

            if (!myModalWindow) {
                //myModalWindow = document.querySelector('[' + dataSupermodal[i].dataset.supermodal + ']');
                myModalWindow = document.querySelector('#my-custom-default');
            };


            //const btnOpen = myModalContainer.querySelector('[data-supermodal]');/* кнопка "открыть окно " и клик по ней */
            myBtnOpen.addEventListener('click', this.openModal);



            const btnCross = myModalWindow.querySelector(".modal__close");/* кнопка "открыть окно " и клик по ней */
            if (btnCross) {
                btnCross.addEventListener('click', this.hideModal);
            };

            let btnCancel = myModalWindow.querySelector(".modal__cancel");/* кнопка "отмена " и клик по ней */
            /*if (!btnCancel) {
                let footerModal = myModalWindow.querySelector(".modal__footer");
                if (!footerModal) {
                    footerModal = document.createElement('footer');
                    footerModal.classList.add('modal__footer');
                    myModalWindow.append(footerModal);
                }
                btnCancel = document.createElement('button');
                btnCancel.classList.add('modal__cancel');
                btnCancel.id = "modal-default-cancel";
                btnCancel.textContent = 'Закрыть';
                footerModal.append(btnCancel);
            }*/
            btnCancel.addEventListener('click', this.hideModal);

            const btnSave = myModalWindow.querySelector("#modal-save");/* кнопка "сохранить данные " и клик по ней */
            if (btnSave) {
                btnSave.addEventListener('click', this.saveModal);
            };

            myModalWindow.addEventListener('input', this.getValue);// на модальное окно навешиваем событие инпут

            const clearDataBtn = myModalContainer.querySelector('#clear-data');/* очищаем localStorage */
            if (clearDataBtn) {
                clearDataBtn.addEventListener("click", this.clearData);
            };

        };


        this.goToLocalStorage = function () {
            myModalModel.getData();
        }

        this.getValue = function (e) {
            myModalModel.getValue(e);
        };

        this.openModal = function () {
            myModalModel.openModal();
        };

        this.hideModal = function () {
            myModalModel.closeModal();

        };

        this.saveModal = function () {
            myModalModel.saveModalData();
            myModalModel.getData();
            myModalModel.clearForm();
            myModalModel.closeModal();
        };

        this.clearData = function () {
            myModalModel.clearData();
        };
    };
    /* ------ end controller ----- */
    return {

        init: function (conteiner) {

            const dataSupermodal = conteiner.querySelectorAll('[data-supermodal]');
            for (let i = 0; i < dataSupermodal.length; i++) {
                const appView = new ModalView();
                const appModel = new ModalModel();
                const appController = new ModalController();
                let modalWindow = document.querySelector('#' + dataSupermodal[i].dataset.supermodal);
                let modalOverlay = null;
                
                const modalObject = {};
                modalObject.supermodal = dataSupermodal[i].dataset.supermodal;
                modalObject.supermodalTitle = dataSupermodal[i].dataset.supermodalTitle;
                modalObject.supermodalContent = dataSupermodal[i].dataset.supermodalContent;

                appView.init(modalOverlay, modalWindow, conteiner, modalObject);
                appModel.init(appView);
                appController.init(appModel, conteiner, modalOverlay, modalWindow, dataSupermodal[i]);

            }
        },

    };



})();