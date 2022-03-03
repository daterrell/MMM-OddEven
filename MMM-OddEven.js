Module.register("MMM-OddEven", {
    defaults: {
        format: "It's an %s day",
        odd: "odd",
        even: "even"
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
        let event = moment().dayOfYear() % 2 ?
            this.config.odd :
            this.config.even;
        
        this.templateData.event = formatter.replace("%s", event);
        
        this.updateDom();
    },
});
