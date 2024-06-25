
var targetNode = document.body;

function isTimeInRange(startHour, endHour) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if the current time is between startHour:00 and endHour:00
    return (hours >= startHour && hours < endHour) || (hours === endHour && minutes === 0);
}

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer) {
    // Loop through the mutations
    for (var mutation of mutationsList) {
        // Check if nodes have been added or removed
        if (mutation.type === 'childList') {
            if(mutation?.target.id === 'ZPD_Top_Att_Stat'){
                let checkInStat = mutation?.target?.innerText;
                let isCheckedOut = (checkInStat === "Check-in");
                if(isCheckedOut && isTimeInRange(8, 11)){
                    const button = document.querySelector("#ZPD_Top_Att_Stat");
                    if (button) {
                        button.click();
                    }
                }
            }

            if (mutation?.target?.id === 'ZPD_Top_Att_THrs') {
                let timer = mutation?.target?.innerText;
                if (timer) {
                    let [hours, minutes, seconds] = timer
                        .split(' ')[0]
                        .split(':');

                    hours = parseInt(hours);
                    minutes = parseInt(minutes);
                    seconds = parseInt(seconds);

                    let time = {
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds,
                    };
                    chrome.runtime.sendMessage({
                        action: 'setTime',
                        data: time,
                    });
                }
            }
        }
        // Check if attributes have been modified
        else if (mutation.type === 'attributes') {
            //console.log('Attributes have been modified');
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
