var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("appViewModel", ["require", "exports"], function (require, exports) {
    "use strict";
    var AppViewModel = (function () {
        function AppViewModel() {
        }
        AppViewModel.prototype.subscribe = function (fn) {
        };
        return AppViewModel;
    }());
    exports.AppViewModel = AppViewModel;
});
define("api", ["require", "exports"], function (require, exports) {
    "use strict";
    var storageKey = 'convoy:jobsList';
    function getJobs() {
        var jobs = null;
        try {
            jobs = JSON.parse(localStorage.getItem(storageKey));
        }
        catch (e) {
            console.error(e);
        }
        if (!jobs)
            jobs = getInitialJobs();
        return jobs;
    }
    exports.getJobs = getJobs;
    function setJobs(jobs) {
        console.log("setJobs", jobs);
        localStorage.setItem(storageKey, JSON.stringify(jobs));
    }
    exports.setJobs = setJobs;
    // In reality this would come from server
    function getInitialJobs() {
        return [
            {
                title: 'Coals to Newcastle',
                referenceId: '18615',
                stops: [
                    {
                        type: 'PICKUP',
                        address: '4506 East Avenue, Renton, Wa 98058',
                        cargoDescription: '6 boxes 10x10x23',
                        arrivalTime: '2016-01-19T19:14:33.000Z'
                    },
                    {
                        type: 'DROPOFF',
                        address: '6352 Sherwood Drive, Seattle, Wa 98121',
                        arrivalTime: '2016-01-19T22:15:52.000Z'
                    },
                ]
            },
            {
                title: 'Twinbrook Creamery To Starbucks',
                referenceId: '548482',
                stops: [
                    {
                        type: 'PICKUP',
                        address: '4103 Fulton Street, Renton, Wa 98058',
                        cargoDescription: '5 pallets',
                        arrivalTime: '2016-01-20T19:00:00.000Z'
                    },
                    {
                        type: 'DROPOFF',
                        address: '7745 Cherry Street, Seattle, Wa 98121',
                        arrivalTime: '2016-01-20T23:10:00.000Z'
                    },
                ]
            },
            {
                title: 'Victrola To Seinheiser',
                referenceId: '4D23C6',
                stops: [
                    {
                        type: 'PICKUP',
                        address: '628 Depot Street, Renton, Wa 98058',
                        cargoDescription: '4 pallets',
                        arrivalTime: '2016-01-20T21:00:00.000Z'
                    },
                    {
                        type: 'DROPOFF',
                        address: '58 Sunset Avenue, Seattle, Wa 98121',
                        arrivalTime: '2016-01-21T00:10:00.000Z'
                    },
                ]
            },
            {
                title: 'Uber To Imprint',
                referenceId: 'B12311',
                stops: [
                    {
                        type: 'PICKUP',
                        address: '163 Cambridge Road, Renton, Wa 98058',
                        cargoDescription: '1 box 12x10x12',
                        arrivalTime: '2016-01-20T21:00:00.000Z'
                    },
                    {
                        type: 'DROPOFF',
                        address: '668 Jackson Avenue, Seattle, Wa 98121',
                        arrivalTime: '2016-01-21T00:10:00.000Z'
                    },
                ]
            },
        ];
    }
});
define("theme", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.theme = {
        fontFamily: 'Helvetica',
        borderColor: '#ddd',
        textColor: '#444'
    };
});
define("appView", ["require", "exports", "preact", "theme"], function (require, exports, preact_1, theme_1) {
    "use strict";
    var JobItemView = function (_a) {
        var job = _a.job;
        var jobStyle = {
            borderTop: "1px solid " + theme_1.theme.borderColor,
            padding: 20
        };
        var stopStyle = {
            borderTop: "1px solid " + theme_1.theme.borderColor,
            marginLeft: 50,
            marginTop: 20,
            padding: 10,
            paddingBottom: 0
        };
        var itemStyle = {
            paddingBottom: 5
        };
        return (preact_1.h("div", { style: jobStyle },
            preact_1.h("div", null,
                job.referenceId,
                " - ",
                preact_1.h("span", null, job.title)),
            job.stops.map(function (stop) {
                return preact_1.h("div", { style: stopStyle },
                    preact_1.h("div", { style: itemStyle },
                        stop.type,
                        ": ",
                        stop.cargoDescription),
                    preact_1.h("div", { style: itemStyle },
                        "Address: ",
                        stop.address),
                    preact_1.h("div", { style: itemStyle },
                        "Arrival Time: ",
                        new Date(stop.arrivalTime).toString()),
                    stop.type == 'PICKUP' ?
                        preact_1.h("div", null,
                            preact_1.h("input", { type: 'checkbox' }),
                            " Photograph of Inventory ",
                            preact_1.h("br", null),
                            preact_1.h("input", { type: 'checkbox' }),
                            " Bill of Ladig ",
                            preact_1.h("br", null))
                        :
                            preact_1.h("div", null,
                                preact_1.h("input", { type: 'checkbox' }),
                                " Photograph of Inventory ",
                                preact_1.h("br", null),
                                preact_1.h("input", { type: 'checkbox' }),
                                " Bill of Ladig Signed ",
                                preact_1.h("br", null)));
            })));
    };
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView() {
            return _super.apply(this, arguments) || this;
        }
        AppView.prototype.render = function (_a) {
            var viewModel = _a.viewModel;
            var appStyle = {
                fontFamily: theme_1.theme.fontFamily,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: 540,
                border: "1px solid " + theme_1.theme.borderColor,
                color: theme_1.theme.textColor
            };
            var titleStyle = {
                textAlign: 'center',
                fontSize: 20,
                marginTop: 20,
                marginBottom: 20,
                fontWeight: 'bold'
            };
            return (preact_1.h("div", { style: appStyle },
                preact_1.h("div", { style: titleStyle }, "CONVOY JOB LIST"),
                preact_1.h("div", null, viewModel.jobs.map(function (job) {
                    return preact_1.h(JobItemView, { job: job });
                }))));
        };
        return AppView;
    }(preact_1.Component));
    exports.AppView = AppView;
});
define("main", ["require", "exports", "preact", "appViewModel", "appView", "api"], function (require, exports, preact_2, appViewModel_1, appView_1, api) {
    "use strict";
    function onReady() {
        var viewModel = new appViewModel_1.AppViewModel();
        // Load initial list of jobs
        viewModel.jobs = api.getJobs();
        // Bind viewModel changes to storage
        viewModel.subscribe(function () {
            api.setJobs(viewModel.jobs);
        });
        // Bind viewModel changes to view
        var onViewRef = function (view) {
            if (view)
                viewModel.subscribe(view.enqueueRender);
        };
        preact_2.render(preact_2.h(appView_1.AppView, { ref: onViewRef, viewModel: viewModel }), document.body);
    }
    // render an instance of Clock into <body>:
    window.addEventListener("DOMContentLoaded", onReady);
});
