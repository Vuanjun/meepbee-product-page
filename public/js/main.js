// function Carousel (el) {

//   var _self = this;

//   _self.el = el;

//   _self.prevBtn = _self.el.childNodes[0].childNodes[0]
//   _self.nextBtn = _self.el.childNodes[0].childNodes[1];

//   _self.activeFrameIndex = 0;

//   _self.photoItemArray = [
//     _self.el.childNodes[0].childNodes[2],
//     _self.el.childNodes[1],
//     _self.el.childNodes[2],
//     _self.el.childNodes[3],
//     _self.el.childNodes[4]
//   ];

//   _self.nextBtn.addEventListener('click', _self.switchToNext.bind(_self));

// }

// Carousel.prototype.getActiveFrameIndex = function() {

//   var _self = this;

//   var patt = new RegExp('active');

//   for(var i = 0 ; i<_self.photoItemArray.length; i++) {
//     if(patt.test(_self.photoItemArray[i].className)) return i;
//   }

// }

// Carousel.prototype.switchToNext = function() {

//   var _self = this;

//   var aboutToFadeOutIndex = 0;
//   var aboutToFadeInIndex = 0;

//   _self.activeFrameIndex = _self.getActiveFrameIndex();

//   if( _self.activeFrameIndex==4 ) {
//     aboutToFadeOutIndex = _self.activeFrameIndex%4 + 4;
//     aboutToFadeInIndex = _self.activeFrameIndex%4;
//   } else {
//     aboutToFadeOutIndex = _self.activeFrameIndex%4;
//     aboutToFadeInIndex = _self.activeFrameIndex%4 + 1;
//   }

//   _self.photoItemArray[aboutToFadeOutIndex].classList.remove('js-activeFrame');
//   _self.photoItemArray[aboutToFadeOutIndex].classList.add('js-subFrame');
//   _self.photoItemArray[aboutToFadeInIndex].classList.remove('js-subFrame');
//   _self.photoItemArray[aboutToFadeInIndex].classList.add('js-activeFrame');
//   _self.el.appendChild(_self.photoItemArray[aboutToFadeOutIndex]);
//   _self.el.childNodes[0].appendChild(_self.photoItemArray[aboutToFadeInIndex]);

// }



// window.addEventListener('load', function() {

//   var carouselBoxDiv = document.getElementsByClassName('js-carouselBox')[0];

//   var carousel = new Carousel(carouselBoxDiv);


// });


// function c2 (el) {
//   //find all image => add data-idx


//   //find prevBtn => add click listenr
//   //next => add listener

//   //el => add click listener

// }

// function c2_destroy(el) {
//   find prevBtn => remove click
//   find nextBtn =>
//   el remove click

// }

// function nextListen(e) {
//   e.target. => subling find active => classLIst active remove

//   // calculate nextIdx
//   //move data-idx to active position
//   //seet carousel-el's data-active = next-idx
// }

// frameClickListener (e) {

//   if e.target is subFrame {

//       nextIdx = subFrame's data-idx;
//       //rearrange dom
//       e.target.parent .... carousel-el => data-active nextIdx;
//   }
// }

window.addEventListener('load', function() {

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


  var carouselBoxDiv = document.getElementsByClassName('js-carouselBox')[0];

  carousel(carouselBoxDiv);

});
