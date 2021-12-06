var liveDateEl = $("#currentDay");

calEvents = {};

hour = moment();

function Calendar(today, calEvents) {
    var rowHour = moment(today).hour(9);
    var calendar = $("div.container"); 
        
    calendar.empty(); 

    // loop 9 times to create each hour    
    for (let i = 0; i < 9; i++) {
        var row = $("<div>")
          .addClass("row"); 

        var classColor = "";
        if (today.isBefore(rowHour, "hour")) {
            classColor = "future"
        } else if (today.isAfter(rowHour, "hour")) {
            classColor = "past"
        } else {
            classColor = "present"
        };

        calendar.append(row);
           
        row.append($("<div>")
          .addClass("col-1 hour")
          .text(rowHour.format("h A")));
            
        var timeBlock = rowHour.format("hA");

        row.append($("<textarea>")
          .addClass(`col-10 ${classColor}`)
          .text(calEvents[timeBlock]));

        row.append($("<button>")
          .addClass("col-1 saveBtn")
          .html("<i class='fas fa-save'></i>")
          .attr("aria-label", "Save")
          .attr("id", rowHour.format("hA")));

        
        rowHour.add(1, "hour");

        hour = moment();
    };
};

function createCalendar() {
    var today = moment(); 
    liveDateEl.text(today.format('LLLL')); //set current day
    Calendar(today, calEvents);
};

function loadCal() {
    storedCal = JSON.parse(localStorage.getItem("calEvents"));
    if (storedCal) {
        calEvents = storedCal;
    };
};
 
loadCal(); 
createCalendar(); 
hourTracker();


function hourTracker() {
    var checkHourInterval = setInterval(function () {
        if (moment().isAfter(hour, "minute")) {
            createCalendar(); 
        }
    }, 60000);
};


// store calendar events in local storage
function storeCal() {
    localStorage.setItem("calEvents", JSON.stringify(calEvents));
}

    
$(document).on("click", "button.saveBtn", function (event) {
    calDesc = event.currentTarget.parentElement.children[1].value; 
    calEvents[event.currentTarget.id] = calDesc; 
    storeCal(); 
});

