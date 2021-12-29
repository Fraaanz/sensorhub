function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
  window.onscroll = function () { };
}

var dataBox = document.querySelectorAll('section.box');
var dataBoxFullsceen = document.querySelectorAll('section.box .box-preview, section.box .box-fullscreen');
var wasOpen = 0;
var isClosed = 1;

for (var i = 0; i < dataBoxFullsceen.length; i++) {
  dataBoxFullsceen[i].classList.remove('preload');
  dataBoxFullsceen[i].classList.remove('--become-inactive');
}

dataBox.forEach(box => {
  box.addEventListener("click", () => {
    if (wasOpen == 0 && isClosed == 1) {
      var queryThis = '#' + box.getAttribute('id') + ' .box-preview';
      var dataBoxFullsceen = document.querySelector(queryThis);
      dataBoxFullsceen.classList.add('--active');
      setTimeout(function () {
        var queryThis = '#' + box.getAttribute('id') + ' .box-fullscreen';
        console.log(queryThis);
        var dataBoxFullsceen = document.querySelector(queryThis);
        dataBoxFullsceen.classList.add('--active');
      }, 200);
      disableScrolling();
      wasOpen = 1;
      isClosed = 0;
    }
    else {
      wasOpen = 0;
    }
  });
});

var removeActive = document.querySelectorAll('.close-box-fullscreen');

removeActive.forEach(close => {
  close.addEventListener("click", () => {
    isClosed = 1;
    for (var i = 0; i < dataBoxFullsceen.length; i++) {
      dataBoxFullsceen[i].classList.remove('--active');
    }
    setTimeout(function () {
      enableScrolling();
    }, 500);
  });
});

var removeActiveByTouch = document.querySelectorAll('.swipeclose-box-fullscreen');
var swipeClose = document.querySelectorAll('.box-fullscreen--inner');

removeActiveByTouch.forEach(close => {
  close.addEventListener("touchmove", () => {
    isClosed = 1;
    wasOpen = 0;
    for (var i = 0; i < dataBoxFullsceen.length; i++) {
      dataBoxFullsceen[i].classList.add('--become-inactive');
    }
    for (var i = 0; i < swipeClose.length; i++) {
      swipeClose[i].classList.add('--swipeclose');
    }
    setTimeout(function () {
      for (var i = 0; i < dataBoxFullsceen.length; i++) {
        dataBoxFullsceen[i].classList.remove('--active');
        dataBoxFullsceen[i].classList.remove('--become-inactive');
      }
      for (var i = 0; i < swipeClose.length; i++) {
        swipeClose[i].classList.remove('--swipeclose');
      }
      setTimeout(function () {
        enableScrolling();
      }, 750);
    }, 500);
  });
});