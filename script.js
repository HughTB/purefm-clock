function main(){
    setCurrentTime();
}

function setCurrentTime(){
    var currentDateTime = new Date();

    setNumericTime(currentDateTime);
    setWrittenTime(currentDateTime);
    setDate(currentDateTime);

    tickClock();
}

function setNumericTime(currentDateTime){
    const timeNowOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    var timeToDisplay = currentDateTime.toLocaleString('en-GB', timeNowOptions);
    document.getElementById("numeric-time").innerHTML = timeToDisplay;
}

function setDate(currentDateTime){
    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    var dateToDisplay = currentDateTime.toLocaleString('en-GB', dateOptions);
    document.getElementById("date").innerHTML = dateToDisplay;
}


function setWrittenTime(currentDateTime){
    var pToSet = document.getElementById("words-time");
    var timeToPrint = getMinute(currentDateTime) + " " + getHour(currentDateTime);
    
    pToSet.innerHTML = timeToPrint;
}


function getHour(currentTime){
    const minutes = currentTime.getMinutes();
    const hours = (minutes < 31) ? currentTime.getHours() : (currentTime.getHours() + 1) % 24; // If more than half way through the hour, add 1 to the hour

    const hourTexts = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];    
    var hourText = (hours === 0) ? "midnight" : hourTexts[hours % 12];

    if (minutes === 0) {
        hourText += " o'clock"
    }

    return hourText;
}

function getMinute(currentTime){
    const minutes = currentTime.getMinutes();

    const minuteTexts = ["one minute", "two minutes", "three minutes", "four minutes", "five minutes", "six minutes", "seven minutes", "eight minutes", "nine minutes", "ten minutes", "eleven minutes", "twelve minutes", "thirteen minutes", "fourteen minutes", "quarter", "sixteen minutes", "seventeen minutes", "eighteen minutes", "nineteen minutes", "twenty minutes", "twenty one minutes", "twenty two minutes", "twenty three minutes", "twenty four minutes", "twenty five minutes", "twenty six minutes", "twenty seven minutes", "twenty eight minutes", "twenty nine minutes", "half"];
    var minText = (minutes < 31) ? minuteTexts[minutes - 1] : minuteTexts[59 - minutes];
    
    minText += (minutes < 31) ? " past " : " to ";

    if (minutes === 0) {
        minText = ""
    }

    return minText;
}

function tickClock() {
    var secondHand = document.getElementById('second-hand');
    var minsHand = document.getElementById('min-hand');
    var hourHand = document.getElementById('hour-hand');

    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = "rotate(" + secondsDegrees + "deg)";

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = "rotate(" + minsDegrees + "deg)";

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = "rotate(" + hourDegrees + "deg)";
}


setInterval(setCurrentTime, 1000);
main()