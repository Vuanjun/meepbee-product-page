function rotateLeft(arr, num) {
  num = num || 1;
  for (var i=0; i < num; ++i) {
    arr.push(arr.shift());
  }
  return arr;
}

function rotateRight(arr, num) {
  num = num || 1;
  for (var i=0; i < num; ++i) {
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
function insertDom(mediaArr) {
  var displayBoxImg = document.querySelector('.js-displayBox img');
  var subFrames = document.querySelectorAll('.js-subFrame');
  mediaArr.forEach(function (media, index) {
    if (index === 0) {
      displayBoxImg.src = media.url;
      fadeIn(displayBoxImg);
    } else {
      subFrameImg[index - 1].src = media.url;
      fadeIn(subFrameImg[index - 1]);
    }
  });
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
  if (isImage(data) === true) {
    displayBox.querySelector('img').src = data.url;
  } else {
    // process video
    displayBox.querySelector('img').remove();
    data.style.display = '';
    document.querySelector('.js-activeFrame').appendChild(data);
  }
}

function renderSubFrame(data, i) {
  var subFrames = document.querySelectorAll('.js-subFrame');
  if (isImage(data) === true) {
    subFrames[i - 1].querySelector('img').src = data.url;
  } else {
    // process video
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

window.addEventListener('load', function() {

  var prevBtn = document.querySelector('.js-prevBtn');
  var nextBtn = document.querySelector('.js-nextBtn');
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
    renderDOM(rotated);
  });

  prevBtn.addEventListener('click', function () {
    var rotated = rotateRight(mediaData);
    renderDOM(rotated);
  });




















  var carousel = function(el) {

    var prevBtn = document.querySelector('.js-prevBtn', el);
    var nextBtn = document.querySelector('.js-nextBtn', el);

    prevBtn.addEventListener('click', switchToPrev);
    nextBtn.addEventListener('click', switchToNext);

    var subFrameArray = document.querySelectorAll('.js-subFrame', el);

    var activeFrameObj = document.querySelector('.js-activeFrame', el);

    for(var i = 0; i<subFrameArray.length; i++) {
      subFrameArray[i].addEventListener('click', switchToCertain);
    }

    activeFrameObj.addEventListener('click', switchToCertain);

  }

  function switchToCertain(e) {

    var isActive = new RegExp('js-activeFrame');
    var isVideo = new RegExp('product__carousel__item__videoBtn');
    var isOverlay = new RegExp('overlay');

    // 如果是主要的activeFrame且又是照片的話點擊就沒反應
    if( isActive.test(e.currentTarget.className) && !isVideo.test(e.currentTarget.className) ) {
      return undefined;
    }
    else if ( isActive.test(e.currentTarget.className) && isOverlay.test(e.path[0].className) && e.currentTarget.lastChild.tagName=="VIDEO") {
      return undefined;
    }
    else if ( e.currentTarget.lastChild.tagName=="VIDEO" ) {
    //   if(e.currentTarget.lastChild.paused) {

    //     if(e.currentTarget.lastChild.ended) {
    //       console.log('停止了',e.currentTarget.lastChild.currentTime)
    //     } else {
    //       e.currentTarget.lastChild.play();
    //     }

    //   }
    //   else {
    //     e.currentTarget.lastChild.pause();
    //   }
    //   return undefined;
    }

    // 如果不是videoFrame的話就做
    if( !isVideo.test(e.currentTarget.className) ) {

      var carouselBox = e.currentTarget.parentNode;
      var displayBox = e.currentTarget.parentNode.childNodes[0];
      var activeFrameObj = e.currentTarget.parentNode.childNodes[0].childNodes[2];
      var aboutToFadeInObj = e.currentTarget;

      //刪除之前新增的videoTag
      if(activeFrameObj.tagName=="A") {
        activeFrameObj.removeChild(activeFrameObj.lastChild)
        activeFrameObj.style.backgroundColor=null;
      }

      activeFrameObj.classList.remove('js-activeFrame');
      activeFrameObj.classList.add('js-subFrame');
      aboutToFadeInObj.classList.remove('js-subFrame');
      aboutToFadeInObj.classList.add('js-activeFrame');

      carouselBox.appendChild(activeFrameObj);
      displayBox.appendChild(aboutToFadeInObj);

    } else { // 如果是videoFrame的話就做

      var carouselBox = e.currentTarget.parentNode;
      var displayBox = e.currentTarget.parentNode.childNodes[0];
      var activeFrameObj = e.currentTarget.parentNode.childNodes[0].childNodes[2];
      var aboutToFadeInObj = e.currentTarget;

      activeFrameObj.classList.remove('js-activeFrame');
      activeFrameObj.classList.add('js-subFrame');

      aboutToFadeInObj.classList.remove('js-subFrame');
      aboutToFadeInObj.classList.add('js-activeFrame');

      carouselBox.appendChild(activeFrameObj);
      displayBox.appendChild(aboutToFadeInObj);

      // 新增videoTag
      var video = document.createElement('video');
      video.src = "public/video/video.mp4";
      video.classList.add('product__carousel__item--video')
      video.controls = true;
      aboutToFadeInObj.appendChild(video);
      aboutToFadeInObj.style.backgroundColor="black";

      carouselBox.appendChild(activeFrameObj);
      displayBox.appendChild(aboutToFadeInObj);

    }

  }

  function switchToPrev(e) {

    //如果有videoTag的話則先刪除
    if(e.currentTarget.childNodes[2].lastChild.tagName=="VIDEO") {
      var videoObj = e.currentTarget.childNodes[2].lastChild;
      var videoParent = videoObj.parentNode;
      videoParent.style.backgroundColor = null;
      videoParent.removeChild(videoObj);
    }

    var activeFrameObj = e.currentTarget.parentNode.childNodes[0].childNodes[2];
    var photoItemArray = Array.prototype.slice.call(e.currentTarget.parentNode.childNodes, 1);

    var activeFrameIndex = 0;

    photoItemArray.unshift(activeFrameObj);

    photoItemArray[activeFrameIndex].classList.remove('js-activeFrame');
    photoItemArray[activeFrameIndex].classList.add('js-subFrame');
    photoItemArray[activeFrameIndex+4].classList.remove('js-subFrame');
    photoItemArray[activeFrameIndex+4].classList.add('js-activeFrame');

    e.currentTarget.parentNode.insertBefore(photoItemArray[activeFrameIndex],e.currentTarget.parentNode.childNodes[1]);
    e.currentTarget.appendChild(photoItemArray[activeFrameIndex+4]);
  }

  function switchToNext(e) {

    //如果有videoTag的話則先刪除
    if(e.currentTarget.childNodes[2].lastChild.tagName=="VIDEO") {
      var videoObj = e.currentTarget.childNodes[2].lastChild;
      var videoParent = videoObj.parentNode;
      videoParent.style.backgroundColor = null;
      videoParent.removeChild(videoObj);
    }

    var activeFrameObj = e.currentTarget.parentNode.childNodes[0].childNodes[2];
    var photoItemArray = Array.prototype.slice.call(e.currentTarget.parentNode.childNodes, 1);

    var activeFrameIndex = 0;

    photoItemArray.unshift(activeFrameObj);

    photoItemArray[activeFrameIndex].classList.remove('js-activeFrame');
    photoItemArray[activeFrameIndex].classList.add('js-subFrame');
    photoItemArray[activeFrameIndex+1].classList.remove('js-subFrame');
    photoItemArray[activeFrameIndex+1].classList.add('js-activeFrame');

    e.currentTarget.parentNode.appendChild(photoItemArray[activeFrameIndex]);
    e.currentTarget.appendChild(photoItemArray[activeFrameIndex+1]);
  }


  //var carouselBoxDiv = document.getElementsByClassName('js-carouselBox')[0];

  //carousel(carouselBoxDiv);

});
