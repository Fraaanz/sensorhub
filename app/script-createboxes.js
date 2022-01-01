var xmlhttp = new XMLHttpRequest();
var url = "config.json";

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);
    getConfig(json);
  }
};
xmlhttp.open("GET", url, false);
xmlhttp.send();

function getConfig(json) {
  //console.log(json["sensors"][0]["id"]);
  //console.log(json["sensors"].length);
  
  var numberOfSensors = json[0]["sensors"].length;
  console.log('Number of sensors: ' + numberOfSensors);

  for (i = 0; i < numberOfSensors; i++) {

    //Push each element to the array
    var sensorId = json[0]["sensors"][i]["id"];
    var sensorName = json[0]["sensors"][i]["sensorname"];
    //console.log(sensorId);
    console.log('Sensornames: ' + json[0]["sensors"][i]["sensorname"]);
    var dataSVG = document.getElementById('main');    

    var div = document.createElement('section');
    div.className = 'box';
    div.id = 'dataBox' + sensorId;
    div.innerHTML = '<div class="box-preview preload --loading"> <div class="weather-title">' + sensorName + '</div> <div class="weather-major"> <div class="weather-value-big"><span class="weather-value-current-temp">0</span><span class="weather-value-current-temp-unit">°</span></div> <svg class="svg-c-percentage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xml:space="preserve"> <circle class="svg-c-percentage-bg" cx="24" cy="24" r="21.1676" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-dasharray="100, 133" transform="rotate(135, 24, 24)" /> <circle class="svg-c-percentage-value" cx="24" cy="24" r="21.1676" fill="none" stroke="hsl(0, 0%, 50%)" stroke-width="4" stroke-linecap="round" stroke-dasharray="0, 133" transform="rotate(135, 24, 24)"> <animate class="svg-c-percentage-value-ani" attributeName="stroke-dasharray" from="0 133" to="0 133" dur="0.85s" repeatCount="1"/> <animate class="svg-c-percentage-value-ani-color" attributeName="stroke" from="hsl(200, 1000%, 50%)" to="hsl(0, 100%, 50%)" dur="0.85s" repeatCount="1"/> </circle> </svg> </div> <div class="weather-minor"> <div class="weather-value-small"><span class="weather-value-current-humi">0</span><span class="weather-value-current-humi-unit">%</span></div> <div class="weather-value-small"><span class="weather-value-current-pres">0</span><span class="weather-value-current-pres-unit">hPA</span><div class="weather-value-icon-small">↘︎</div> </div> </div> </div> <div class="box-fullscreen"> <div class="box-fullscreen--inner"> <button aria-label="close" class="btn--integrated close-box-fullscreen">✕</button><div class="box-fullscreen--contentplaceholder"><p>Detail sensor data placeholder for:</br>{' + sensorName + '}</p></div><button aria-label="swipe to close" class="btn--integrated swipeclose-box-fullscreen"> <div class="--inner"></div> </button> </div> </div>';
    dataSVG.appendChild(div);
  }
  if (numberOfSensors < 6) {
    for (i = 0; i < (6 - numberOfSensors); i++) {
      var div = document.createElement('section');
      div.className = 'box-empty';
      div.innerHTML = '<div class="box-preview preload"></div>';
      dataSVG.appendChild(div);
    }
  }
}

document.write('<script src="script-load-initial-data.js"></script>');

