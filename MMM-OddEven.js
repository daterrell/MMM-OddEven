Module.register("MMM-OddEven", {
    defaults: {
        format: "It's an %s day",
        odd: "odd",
        even: "even",
        startDate: null,
    },

    templateData: {
        event: "",
    },

    getScripts: function () {
        return ["moment.js", "moment-timezone.js"];
    },

    getStyles: function () {
        return ["MMM-OddEven.css"];
    },

    getTemplate: function () {
        return "MMM-OddEven.njk"
    },

    getTemplateData: function () {
        return this.templateData;
    },

    start: function () {
        console.log("Starting up " + this.name);
        this.templateData = new TemplateData(this.config.format);
        this.update();
    },

    notificationReceived: function (notification) {
        if (notification === "CLOCK_MINUTE") {
            this.update();
        }
    },

    update: function () {
        let formatter = this.config.format ?? "%s";
        let dayOfYear = this.getDayOfYear();
        let event = ""

        if (dayOfYear % 2 && this.config.odd) {
            event = this.config.odd;
        } else if (this.config.even) {
            event = this.config.even;
        }

        if (event) {
            this.templateData.event = formatter.replace("%s", event);
        } else {
            this.templateData.event = "";
        }

        this.updateDom();
    },

    getDayOfYear: function () {
        if (this.config.startDate) {
            return moment().diff(this.config.startDate, "days") + 1;
        } else {
            return moment().dayOfYear();
        }
    },
});
