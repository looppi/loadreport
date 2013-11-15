/**
 * Created by teppo on 11/15/13.
 */
//var require = patchRequire(require);
var loadreport_lib = require("./loadreport");
var loadreport = loadreport_lib.loadreport;

var tester = {
    task: "performance",
    format: "json",
    test_plan: [
        "http://kalastus.hongkong.fi",
        "http://kalastus.hongkong.fi/fi/vieheet/jerkit/c/30504/",
        "http://kalastus.hongkong.fi/fi/vieheet/jerkit/svartzonker-mcmy-tail-jerkki/p/436004/"],

    config: {
        "task": this.task,
        "format": this.format,
        "configFile": "config.json"
    },

    run: function() {
        for (var i in this.test_plan) {
            url = this.test_plan[i];
            console.log(url);
            this.config.url = url;
            loadreport.config = loadreport.mergeConfig(this.config, this.config.configFile);
            var task = loadreport[this.task];
            loadreport.load(this.config, task, loadreport);
        }
    }

}

tester.run();