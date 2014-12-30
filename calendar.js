//You have to set window.calendar.table to the tbody of the calendar for this to work.
window.calendar = {

clicked: function(){
    var agentName = window.agents.getSelectedAgent();
    if (typeof agentName == 'undefined') {
        return;
    }
    
    var tdElement = event.target;
    while(tdElement.nodeName.toLowerCase() != 'td'){
        if (typeof tdElement.parentNode == 'undefined') {
            return;
        }
        tdElement = tdElement.parentNode;
    }
    
    var pAgent = tdElement.getElementsByClassName(window.calendar.DayAgentNameClass);
    if (pAgent.length != 1) {
        return;
    }
    
    pAgent[0].innerText = agentName;
    
    window.calendar.update();
},

update: function(){
    var agent = window.agents.getSelectedAgent();
    
    for(var i = 0, row; row = this.table.rows[i]; i++){
        for(var j = 0, cell; cell = row.cells[j]; j++){
            //Skip over blank schedule days.
            if (cell.className != "scheduleDay") {
                var pAgent = cell.getElementsByClassName(window.calendar.DayAgentNameClass);
                if (pAgent.length == 1 && pAgent[0].innerText == agent) {
                    cell.className = "scheduleDay agentWorksThatDay";
                }
                else{
                    cell.className = "scheduleDay agentDoesntWorkThatDay";
                }
            }
        }
    }
},

populate: function(startDate) {

    var tr = document.createElement("tr");
    this.table.appendChild(tr);
    this.padUntilFirstDay(tr, startDate);
    this.fillAMonth(tr, startDate);
},

padUntilFirstDay: function(tr, startDate) {
    for (var i = 0; i < startDate.getDay(); i++) {
        var td = document.createElement("td");
        td.className = "scheduleDay";
        tr.appendChild(td);
    }
},

months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

DayAgentNameClass: "calendarDayAgentName",

fillAMonth: function(tr, startDate) {
    var day = startDate;
    var lastMonth = -1;
    for (var i = 0; i < 28; i++) {
        var td = document.createElement("td");
        tr.appendChild(td);
        var text = "";
        if (day.getMonth() != lastMonth) {
            lastMonth = day.getMonth();
            text = this.months[lastMonth] + " ";
        }
        text += day.getDate();
        var pDay = document.createElement("p");
        pDay.innerText = text;
        td.appendChild(pDay);
        var pAgent = document.createElement("p");
        pAgent.className = this.DayAgentNameClass;
        td.appendChild(pAgent);
        td.onclick = this.clicked;

        if (day.getDay() == 6) {
            tr = document.createElement("tr");
            this.table.appendChild(tr);
        }
        
        td.className = "scheduleDay agentDoesntWorkThatDay";

        day.setDate(day.getDate() + 1);
    }
},

getLocalDate: function(gmtDate){
    var date = new Date();
    date.setFullYear(gmtDate.getUTCFullYear());
    date.setMonth(gmtDate.getUTCMonth());
    date.setDate(gmtDate.getUTCDate());
    return date;
}
};