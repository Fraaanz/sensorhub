function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
  window.onscroll = function () { };
}

var dataBox = document.querySelectorAll('section.a-box');
var dataBoxFullsceen = document.querySelectorAll('section.a-box .a-box-preview, section.a-box .a-box-fullscreen');
var wasOpen = 0;
var isClosed = 1;
console.log("was open ? " + wasOpen);

dataBox.forEach(box => {
  box.addEventListener("click", () => {
    if (wasOpen == 0 && isClosed == 1) {
      var queryThis = '#' + box.getAttribute('id') + ' .a-box-preview';
      var dataBoxFullsceen = document.querySelector(queryThis);
      dataBoxFullsceen.classList.add('--active');
      setTimeout(function () {
        dataBoxFullsceen.classList.add('--display-none');
      }, 200);
      setTimeout(function () {
        var queryThis = '#' + box.getAttribute('id') + ' .a-box-fullscreen';
        console.log(queryThis);
        var dataBoxFullsceen = document.querySelector(queryThis);
        dataBoxFullsceen.classList.add('--active');
      }, 200);
      disableScrolling();
      wasOpen = 1;
      isClosed = 0;
      console.log("was open ? " + wasOpen);
    }
    else {
      wasOpen = 0;
    }
  });
});

var removeActive = document.querySelectorAll('.close-a-box-fullscreen');

removeActive.forEach(close => {
  close.addEventListener("click", () => {
    for (var i = 0; i < dataBoxFullsceen.length; i++) {
      dataBoxFullsceen[i].classList.remove('--active');
      dataBoxFullsceen[i].classList.remove('--display-none');
    }
    setTimeout(function () {
      enableScrolling();
    }, 500);
    isClosed = 1;
  });
});

var removeActiveByTouch = document.querySelectorAll('.swipeclose-a-box-fullscreen');
var swipeClose = document.querySelectorAll('.a-box-fullscreen--inner');

removeActiveByTouch.forEach(close => {
  close.addEventListener("touchmove", () => {
    for (var i = 0; i < swipeClose.length; i++) {
      swipeClose[i].classList.add('--swipeclose');
    }
    setTimeout(function () {
      for (var i = 0; i < dataBoxFullsceen.length; i++) {
        dataBoxFullsceen[i].classList.remove('--active');
        dataBoxFullsceen[i].classList.remove('--display-none');
      }
      for (var i = 0; i < swipeClose.length; i++) {
        swipeClose[i].classList.remove('--swipeclose');
      }
      setTimeout(function () {
        enableScrolling();
      }, 750);
    }, 500);
    isClosed = 1;
  });
});

