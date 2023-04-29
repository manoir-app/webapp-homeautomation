///<reference path="typings/angular.d.ts" />
///<reference path="typings/manoirApp.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
///<reference path="typings/signalr/index.d.ts" />
///<reference path="typings/manoirApp.d.ts" />
var Manoir;
(function (Manoir) {
    var AutomationApp;
    (function (AutomationApp) {
        class DefaultPage extends Manoir.Common.ManoirAppPage {
            constructor($scope, $http, $timeout) {
                super();
                this.scope = $scope;
                this.http = $http;
                this.$timeout = $timeout;
                this.scope.Events = this;
                this.scope.Loading = true;
                let self = this;
                this.init();
                this.RefreshData();
                setInterval(function () { self.RefreshData(); }, 5000);
            }
            init() {
                this.connection = new signalR.HubConnectionBuilder()
                    .withUrl("/hubs/1.0/appanddevices")
                    .withAutomaticReconnect()
                    .build();
                this.connection.on("notifyMeshChange", this.onMeshChange);
                this.connection.start().catch(err => console.error(err));
            }
            onMeshChange(changeType, mesh) {
                console.log(mesh);
            }
            RefreshData() {
                let self = this;
                let sc = self.scope;
            }
        }
        AutomationApp.DefaultPage = DefaultPage;
    })(AutomationApp = Manoir.AutomationApp || (Manoir.AutomationApp = {}));
})(Manoir || (Manoir = {}));
var theApp = angular.module('AutomationApp', []);
theApp.controller('DefaultPage', Manoir.AutomationApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});
//# sourceMappingURL=AutomationApp.js.map