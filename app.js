(function() {
    var app = angular.module('main', []);
    
    app.controller('MainCtlr', function() {
        this.showAgents = false;
        this.selectedAgent = {};
        
        this.selectAgent = function (agent) {
            this.selectedAgent = agent;
        };
    });
})();