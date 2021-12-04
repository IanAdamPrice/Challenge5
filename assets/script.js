var currentDateEl = document.querySelector('#currentDay');

var liveDate = function() {
    const today = moment();
    currentDateEl.innerHTML = today.format('dddd, MMMM do YYYY');
};

liveDate();
