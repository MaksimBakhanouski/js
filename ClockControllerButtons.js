class ClockControllerButtons {
    constructor() {
        this.model = null;
        this.container = null;
    }

    init(model, container) {
        this.model = model;
        this.container = container;
        let btns = this.container.querySelectorAll(".wrapper-buttons__button");
        btns[0].addEventListener("click", () => this.start());
        btns[1].addEventListener("click", () => this.stop());

        //document.addEventListener("DOMContentLoaded", () => this.start());
    };
    start() {
        this.model.start();
    }
    stop() {
        this.model.stop();
    }
};