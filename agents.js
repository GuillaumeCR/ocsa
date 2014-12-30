window.agents = {
list: [],

newAgentTyped: function(agentName) {
    if (agentName === "") {
        return;
    }

    if (this.agentExists(agentName)) {
        alert("That name is already in there. Pick a different name.");
        return;
    }

    var agent = {
        name: agentName
    };
    this.list[this.list.length] = agent;

    var newTr = document.createElement("tr");
    var agentTable = this.getAgentTable();
    agentTable.appendChild(newTr);
    var newAgentTd = document.createElement("td");
    newAgentTd.className = "agent";
    newAgentTd.onclick = function() {
        window.agents.agentClicked(newAgentTd);
    };
    
    newAgentTd.innerText = agentName;
    newTr.appendChild(newAgentTd);
},

isCantWorkOnSelected: function(){
    return this.getAgentTable().getElementsByClassName('cantWorkOnSelected').length > 0;
},

agentClicked: function(td) {
    var agentTable = this.getAgentTable();

    for (var i = 0, row; row = agentTable.rows[i]; i++) {
        row.cells[0].className = "agent";
        
        if (row.cells.length == 2) {
            row.removeChild(row.cells[1]);
        }
    }
    td.className = "agentSelected";
        
    var tr = td.parentNode;
    if (tr.cells.length == 1) {
        var newTd = document.createElement("td");
        newTd.className = "cantWorkOnNotSelected";
        newTd.innerText = "Can't work on";
        newTd.onclick = window.agents.cantWorkOnClicked;
        tr.appendChild(newTd);
    }
    else{
        tr.cells[1].className = "cantWorkOnNotSelected";
    }
    
    window.calendar.update();
},

cantWorkOnClicked: function(){
    event.target.className = 'cantWorkOnSelected';
},

getAgentTable: function() {
    return document.getElementById("agentTable");
},

getSelectedAgent: function() {
    var agentTable = this.getAgentTable();
    for (var i = 0, row; row = agentTable.rows[i]; i++) {
        if (row.cells[0].className == "agentSelected") {
            return row.cells[0].innerText;
        }
    }
},

agentExists: function(agentName) {
    for (var i = 0, agent; agent = this.list[i]; i++) {
        if (agent.name == agentName) {
            return true;
        }
    }
}
};