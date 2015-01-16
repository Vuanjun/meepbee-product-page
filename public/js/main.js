function rotateLeft(arr, num) {
  num = num || 1;
  for (var i = 0; i < num; ++i) {
    arr.push(arr.shift());
  }
  return arr;
}

function rotateRight(arr, num) {
  num = num || 1;
  for (var i = 0; i < num; ++i) {
    arr.unshift(arr.pop());
  }
  return arr;
}

function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date()
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date()

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
}

function isImage(data) {
  if (data.url) {
    return true;
  } else {
    return false;
  }
}

function renderDisplayBox(data) {
  var displayBox = document.querySelector('.js-displayBox');
  var videoTag = document.querySelector('video');
  var img = displayBox.querySelector('img');
  if (isImage(data) === true) {
    img.style.display = '';
    img.src = data.url
    videoTag.style.display = 'none';
    fadeIn(img);
  } else {
    // process video
    img.style.display = 'none';
    videoTag.style.display = '';
    var activeFrame = document.querySelector('.js-activeFrame')
    activeFrame.style.backgroundColor = 'black';
    fadeIn(videoTag);
  }
}

function renderSubFrame(data, i) {
  var subFrames = document.querySelectorAll('.js-subFrame');
  var thisFrame = subFrames[i - 1];
  var thisImage = thisFrame.querySelector('img');
  if (isImage(data) === true) {
    if (thisImage === null) {
      thisImage = document.createElement('img');
      thisFrame.appendChild(thisImage)
      thisImage.src = data.url
      thisImage.classList.add('photoInner')
    } else {
      thisImage.src = data.url;
    }
    thisFrame.classList.remove('js-videoFrame');
    var videoDivs = thisFrame.querySelectorAll('div');
    if (videoDivs.length !== 0)
      console.log(videoDivs);
    for (var i = 0; i < videoDivs.length; ++i) {
      videoDivs[i].remove()
    }
  } else {
    // process video
    thisFrame.classList.add('js-videoFrame');
    thisFrame.classList.add('product__carousel__item__videoBtn')
    thisFrame.querySelector('img').remove()
    var circle = document.createElement('div');
    var triangle = document.createElement('div');
    var overlay = document.createElement('div');
    circle.classList.add('product__carousel__item__videoBtn__circle')
    triangle.classList.add('product__carousel__item__videoBtn__triangle')
    overlay.classList.add('product__carousel__item__videoBtn__overlay')
    thisFrame.appendChild(circle)
    thisFrame.appendChild(triangle)
    thisFrame.appendChild(overlay)
  }
}

function renderDOM(data) {
  data.forEach(function (d, i) {
    if (i === 0) {
      renderDisplayBox(d);
    } else {
      renderSubFrame(d, i);
    }
  });
}

function post(url, data) {
  var request = new XMLHttpRequest()
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
}
window.addEventListener('load', function () {

  var prevBtn = document.querySelector('.js-prevBtn');
  var nextBtn = document.querySelector('.js-nextBtn');
  var confirmBtn = document.querySelector('.confirmBtn');
  var mediaData = JSON.parse(document.querySelector('script[data-frames="app_data"]').innerHTML)
  var video = document.querySelector('video')
  mediaData.push(video);

  var subFrames = document.querySelectorAll('.js-subFrame');
  Array.prototype.forEach.call(subFrames, function (subFrame, index) {
    subFrame.addEventListener('click', function () {
      var rotated = rotateLeft(mediaData, index + 1);
      renderDOM(rotated);
    });
  });

  nextBtn.addEventListener('click', function () {
    var rotated = rotateLeft(mediaData);
    console.log(rotated);
    renderDOM(rotated);
  });

  prevBtn.addEventListener('click', function () {
    var rotated = rotateRight(mediaData);
    renderDOM(rotated);
  });

  confirmBtn.addEventListener('click', function () {
    var nameInput = document.querySelector('input.recipientInfo__name__field').value
    var phoneInput = document.querySelector('input.recipientInfo__phone__field').value
    var addressInput = document.querySelector('input.recipientInfo__address__field').value
    var memoInput = document.querySelector('input.recipientInfo__memo__field').value
  });

});
