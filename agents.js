(function(){
    angular.module('main').controller('AgentCtrl', function(){
        this.agents = [];
        this.newAgentName = '';
        this.selectedAgent = {};
        
        this.agentNameInputKeyPressed = function(keyCode){
            if (keyCode == 13 && this.newAgentName !== '') {
                
                for (var i = 0; i < this.agents.length; i++) {
                    var agent = this.agents[i];
                    if (agent.name === this.newAgentName) {
                        alert(this.newAgentName + ' is already in the list.');
                        return;
                    }
                }
                
                this.agents.push({name: this.newAgentName});
                this.newAgentName = '';
            }
        };
        
        this.selectAgent = function(agent){
            this.selectedAgent = agent;
        };
    });
})();