const blockContainer = $('#block-container');
const currentDayEl = $('#currentDay');

function initialize() {
    setDay();
    createBlocks();
}

function createBlocks() {
    let currentHour = moment().format('H');
    
    for (let i = 9; i < 18; i++) {
        let newBlock = $('<div>');
        newBlock.addClass('time-block');
       
        let newRow = $('<div>');
        newRow.addClass('row');
        
        let newHour = $('<span>');
        newHour.addClass('hour col-1');
        let hour = moment(i,"HH").format("h:mm");
        newHour.text(hour);
        
        let newText = $('<input type="text" />');
        newText.addClass('textarea col-9');
        newText.attr({
            id: `textInput-${i}`,
            value: loadActivity(i)
        });
        let hourDiff = i - currentHour;
        if (hourDiff > 0) {
            newText.addClass('future');
        } else if (hourDiff < 0) {
            newText.addClass('past');
        } else {
            newText.addClass('present');
        }
        
        let newSvBtn = $('<button>');
        newSvBtn.attr({
            class: "saveBtn col-1",
            'data-hour': i
        });
        let newSvIcon = $('<i>');
        newSvIcon.text('🖫');
        newSvBtn.append(newSvIcon);

        let newClrBtn = $('<button>');
        newClrBtn.attr({
            class: "clearBtn col-1",
            'data-hour': i
        });
        let newClrIcon = $('<i>');
        newClrIcon.text('ⓧ');
        newClrBtn.append(newClrIcon);
        
        newRow.append(newHour);
        newRow.append(newText);
        newRow.append(newSvBtn);
        newRow.append(newClrBtn);
        newBlock.append(newRow);
        blockContainer.append(newBlock);
    }
}

function loadActivity(hour) {
    let loadedActivity = JSON.parse(localStorage.getItem(`activity-${hour}`));
    if (loadedActivity !== null && loadedActivity !== "null" && loadedActivity !== "undefined") {
        return loadedActivity;
    } else {
        return "";
    }
}

function saveActivity(event) {
    let hour = event.target.dataset.hour;
    let saveText = $(`#textInput-${hour}`).val();
    localStorage.setItem(`activity-${hour}`, JSON.stringify(saveText));
}

function clearActivity(event) {
    let hour = event.target.dataset.hour;
    $(`#textInput-${hour}`).val("");
    localStorage.setItem(`activity-${hour}`, JSON.stringify(""));
}

function setDay() {
    currentDayEl.text(`${moment().format('MMM Do YYYY')}`)
}

initialize();

$(document).on('click','.saveBtn',saveActivity);

$(document).on('click','.clearBtn',clearActivity);
