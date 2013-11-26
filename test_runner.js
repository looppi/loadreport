/**
 * Created by teppo on 11/15/13.
 */
//var require = patchRequire(require);
var loadreport_lib = require("./loadreport");
var loadreport = loadreport_lib.loadreport;

var tester = {
    task: "performance",
    format: "json",
    sequence_number: 0,
    test_plan: [
        "http://kalastus.hongkong.fi",
        "http://kalastus.hongkong.fi/fi/vieheet/jerkit/c/30504/",
       "http://kalastus.hongkong.fi/fi/vieheet/jerkit/svartzonker-mcmy-tail-jerkki/p/436004/",
        "http://prisma.s-verkkokauppa.fi/fi/prisma",
        "http://prisma.s-verkkokauppa.fi/fi/prisma/haku/nokia%20lumia",
        "http://verkkokauppa.starkki.fi/fi/",
//        "http://www.verkkokauppa.com/",
//        "http://www.verkkokauppa.com/fi/search?q=galaxy%20s4"
    ],

    config: {
        "task": this.task,
        "format": this.format,
        "configFile": "config.json"
    },

    run: function() {
        var i = this.sequence_number;
        if(i < this.test_plan.length) {
            var url = this.test_plan[i];
            console.log("Loading Page: "+url);
            this.config.url = url;
            loadreport.config = loadreport.mergeConfig(this.config, this.config.configFile);
            var task = loadreport[this.task];
            task.start = null;
            task.end_task = this.end_task;
            task.url = url;
            loadreport.load(this.config, task, loadreport);
            this.sequence_number++;
        } else {
            phantom.exit();
        }
    },

    end_task: function() {
        setTimeout(function() {
            console.log("Loading done");
            tester.run();
        }, 1000);
    }
};

tester.run();
