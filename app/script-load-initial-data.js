// Animate Number (Count up)

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Get data 

var xmlhttp = new XMLHttpRequest();
var url = "example-data/dht22-mixed-single-value-query.json";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);
    getConfig(json);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getConfig(json) {

  function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
  }

  var numberOfBoxes = document.querySelectorAll('main > .box').length;
  //console.log(numberOfBoxes);

  for (var i = 0; i < numberOfBoxes; i++) {

    var dataTemp = parseInt(json[i]['temp']);
    console.log('dataTemp: ' + dataTemp);

    var dataSVGvalue = (dataTemp) * 3.5 + (15 * 3.5); // 33 Grad sind 200, also 100%
    console.log('dataTemp %: ' + dataSVGvalue);

    var dataHumi = parseInt(json[i]['humi']);
    console.log('dataHumi: ' + dataHumi);

    var dataPres = parseInt(json[i]['pres']);
    console.log('dataHumi: ' + dataHumi);

    //console.log('i = ' + i);
    idReplacement = zeroFill(i + 1, 2);
    //console.log(idReplacement.toString());

    var removeLoader = document.querySelector('#dataBox' + idReplacement + ' .box-preview');
    removeLoader.classList.remove('--loading');

    var dataSVG = document.querySelector('#dataBox' + idReplacement + ' .svg-c-percentage .svg-c-percentage-value');
    var dataSVGani = document.querySelector('#dataBox' + idReplacement + ' .svg-c-percentage .svg-c-percentage-value .svg-c-percentage-value-ani');
    var dataSVGaniColor = document.querySelector('#dataBox' + idReplacement + ' .svg-c-percentage .svg-c-percentage-value .svg-c-percentage-value-ani-color');

    //console.log('dataSVG = ' + dataSVG);

    dataSVG.setAttribute("stroke-dasharray", (dataSVGvalue / 2) + ", 133");
    dataSVG.setAttribute("stroke", "hsl(" + (200 - dataSVGvalue) + ", 100%, 40%)");
    dataSVGani.setAttribute("to", (dataSVGvalue / 2) + ", 133");
    dataSVGaniColor.setAttribute("to", "hsl(" + (200 - dataSVGvalue) + ", 100%, 40%)");

    //console.log('dataSVG = ' + dataSVG);

    var countUp = document.querySelector('#dataBox' + idReplacement + ' .weather-value-current-temp');
    animateValue(countUp, 0, dataTemp, 500);

    var currentHumi = document.querySelector('#dataBox' + idReplacement + ' .weather-value-current-humi');
    currentHumi.innerHTML = dataHumi;

    var currentHumi = document.querySelector('#dataBox' + idReplacement + ' .weather-value-current-pres');
    currentHumi.innerHTML = dataPres;

  }

}