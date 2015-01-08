var photoItemObj = document.getElementsByClassName('js-photoItem');
var photoItemArray = Array.prototype.slice.call(photoItemObj);

// var subFrameItem = document.getElementsByClassName('js-subFrame');

// (function() {
//   for( var i = 0; i<photoItemObj.length; i++) {
//     photoItemObj[i].addEventListener('click', function(photoItemObj[i]){
//       console.log(i);
//     });
//   }
// })();

function showIndex (i) {
  console.log(i);
}

for(var i = 0; i<photoItemObj.length; i++) {
  photoItemObj[i].addEventListener('click', showIndex.bind(null, i));
}

// photoItemObj[1]
// photoItemObj[2]
// photoItemObj[3]
// photoItemObj[4]
