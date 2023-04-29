///<reference path="typings/angular.d.ts" />
///<reference path="typings/manoirApp.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
///<reference path="typings/signalr/index.d.ts" />
///<reference path="typings/manoirApp.d.ts" />

module Manoir.AutomationApp {

    interface IDefaultPageScope extends ng.IScope {
        Loading: boolean;

    }
    export class DefaultPage extends Manoir.Common.ManoirAppPage {
        connection: signalR.HubConnection;

        scope: IDefaultPageScope;
        $timeout: ng.ITimeoutService;
        http: any;
        constructor($scope: IDefaultPageScope, $http: any, $timeout: ng.ITimeoutService) {
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

        private init() {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl("/hubs/1.0/appanddevices")
                .withAutomaticReconnect()
                .build();

            this.connection.on("notifyMeshChange", this.onMeshChange);

            this.connection.start().catch(err => console.error(err));

        }

        private onMeshChange(changeType: string, mesh: any) : void {
            console.log(mesh);
        }

       

        public RefreshData(): void {
            let self = this;
            let sc = self.scope;

          
        }
    }
}

var theApp = angular.module('AutomationApp', []);

theApp.controller('DefaultPage', Manoir.AutomationApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    }
});

