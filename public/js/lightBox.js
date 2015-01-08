var photoItemObj = document.getElementsByClassName('jsPhotoItem');
var previousBtn = document.getElementsByClassName('jsPreviousBtn')[0];
var nextBtn = document.getElementsByClassName('jsNextBtn')[0];

var photoItemObj = document.getElementsByClassName('js-photoItem');
var photoItemArray = Array.prototype.slice.call(photoItemObj);

var carouselBoxDiv = document.getElementsByClassName('js-carouselBox')[0];
var displayBoxDiv = document.getElementsByClassName('js-displayBox')[0];

var activeFrameIndex;

previousBtn.onclick = function () {

  photoItemArray.forEach(function(value,index){
    var lastElementIndex = value.classList.length-1;
    var frameState = value.classList[lastElementIndex];

    if(frameState === 'js-activeFrame' ) {
      activeFrameIndex = index;
    }

  });

  var aboutToFadeInItem;
  var aboutToFadeOutItem;

  // activeFrameIndex = [0, 4, 3, 2, 1];

  aboutToFadeInItem = photoItemArray[ activeFrameIndex-1 ];
  aboutToFadeOutItem = photoItemArray[ activeFrameIndex ];

  if(activeFrameIndex==0) {
    aboutToFadeInItem = photoItemArray[ 4 - activeFrameIndex ];
    aboutToFadeOutItem = photoItemArray[ activeFrameIndex ];
  }

  carouselBoxDiv.appendChild(aboutToFadeOutItem);
  displayBoxDiv.appendChild(aboutToFadeInItem);

  aboutToFadeOutItem.classList.remove('js-activeFrame');
  aboutToFadeOutItem.classList.add('js-subFrame');

  aboutToFadeInItem.classList.remove('js-subFrame');
  aboutToFadeInItem.classList.add('js-activeFrame');

}

nextBtn.onclick = function () {

  photoItemArray.forEach(function(value,index){
    var lastElementIndex = value.classList.length-1;
    var frameState = value.classList[lastElementIndex];

    if(frameState === 'js-activeFrame' ) {
      activeFrameIndex = index;
    }

  });

  var aboutToFadeInItem;
  var aboutToFadeOutItem;

  aboutToFadeInItem = photoItemArray[activeFrameIndex%4+1];
  aboutToFadeOutItem = photoItemArray[activeFrameIndex];

  if(activeFrameIndex==4) {
    aboutToFadeInItem = photoItemArray[activeFrameIndex%4];
    aboutToFadeOutItem = photoItemArray[activeFrameIndex%4+4];
  }

  carouselBoxDiv.appendChild(aboutToFadeOutItem);
  displayBoxDiv.appendChild(aboutToFadeInItem);

  aboutToFadeOutItem.classList.remove('js-activeFrame');
  aboutToFadeOutItem.classList.add('js-subFrame');

  aboutToFadeInItem.classList.remove('js-subFrame');
  aboutToFadeInItem.classList.add('js-activeFrame');

}


// function Carousel (el) {
//   this.el = el;
//   this.prevBtn = ...

// }

function Carousel (el) {
  this.el = el;
  this.prevBtn = document.getElementsByClassName('jsPreviousBtn')[0];
  this.nextBtn = document.getElementsByClassName('jsNextBtn')[0];

}


// window.addEventListener('load', function () {
//   var _cache = [];
//   Array.prorotype.forEach.call(document.querySelectorAll('div.product_carousel'), function (item) {
//       _cache.push(new Carousel(item));

//   }

// });

// Array.prototype.forEach.call(photoItem, function(value,index) {
//   console.log(value, index);
// });

// (function() {
//   photoItemArray.forEach(function(value,index){
//     console.log(value,index);
//   });
// })();
