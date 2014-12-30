(function() {
    angular.module('main').controller('CalendarCtrl', function() {

        this.showCalendar = false;
        this.showStartDateInput = true;
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.calendar = {};

        this.startDateChanged = function(startDate) {
            this.showStartDateInput = false;
            this.createCalendar(startDate);
            this.showCalendar = true;
        };
        
        this.dayClicked = function(day, agent){
            day.agent = agent;
        };

        this.createCalendar = function(startDate) {
            //pad until first day
            this.calendar = {
                weeks: [{
                    days: []
                }]
            };
            for (var i = 0; i < startDate.getDay(); i++) {
                this.calendar.weeks[0].days.push({});
            }

            for (var i = 0,
                    week = this.calendar.weeks[0],
                    day = startDate,
                    first = true; i < 28; i++) {

                var dateDisplay = '';
                if (first || day.getDate() == 1) {
                    dateDisplay = this.monthNames[day.getMonth()] + ' ';
                    first = false;
                }
                dateDisplay += day.getDate();
                
                week.days.push({
                    date: day,
                    displayValue: dateDisplay
                });
                
                if (day.getDay() == 6) {
                    week = {
                        days: []
                    };
                    this.calendar.weeks.push(week);
                }
                day = new Date(day);
                day.setDate(day.getDate() + 1);
            }
        };
    });
})();