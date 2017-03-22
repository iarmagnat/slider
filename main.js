
var imagesUrl = [];
var currentImg = 0;
var imgCount;
var updateDone = true;
var previous = document.createElement('button');
var next = document.createElement('button');
var main = document.createElement('div');
var inner = document.createElement('div');
var slider = document.getElementById("slider");
var autoInterval;

var prefixes = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
	for (var p = 0; p < prefixes.length; p++) {
		if (!prefixes[p]) type = type.toLowerCase();
		element.addEventListener(prefixes[p]+type, callback, false);
	}
}

function nextAction(){
    if (updateDone){
        updateDone = false;

        currentImg += 1;
        inner.setAttribute('class', 'nextAnim');


        if (currentImg === imgCount){
            currentImg = 0;
        }

        updatePreviews();
    }
}

function previousAction(){
    if (updateDone){
        updateDone = false;

        if (currentImg === 0){
            currentImg = imgCount;
            inner.style.marginLeft = (-220 * currentImg) + 'px';
        }

        currentImg -= 1;
        inner.setAttribute('class', 'previousAnim');

        updatePreviews();
    }
}

function updatePreviews(){
    prevPreviewUrl = imagesUrl[ (currentImg - 1 + imgCount) % imgCount ];
    nextPreviewUrl = imagesUrl[ (currentImg + 1 + imgCount) % imgCount ];
    next.innerHTML = '<i class="fa fa-arrow-circle-right fa-5x"></i>';
    previous.innerHTML = '<i class="fa fa-arrow-circle-left fa-5x"></i>';

    var prevImg = document.createElement('img');
    prevImg.src = prevPreviewUrl;
    prevImg.setAttribute('class', 'preview');
    previous.appendChild(prevImg);

    var nextImg = document.createElement('img');
    nextImg.src = nextPreviewUrl;
    nextImg.setAttribute('class', 'preview');
    next.insertBefore(nextImg, next.childNodes[0]);
}

function auto() {
    button = document.getElementById("autoBtn");
    if (button.innerHTML === "Start auto mode"){
        button.innerHTML = "Stop auto mode";
        autoInterval = setInterval(nextAction, 3000);
    } else {
        button.innerHTML = "Start auto mode";
        clearInterval(autoInterval);
    }
}

slider.childNodes.forEach(function(element) {
    if (element.nodeName === 'IMG'){
        imagesUrl.push(element.src);
    }
});
slider.innerHTML = '';
imgCount = imagesUrl.length;

previous.id = 'previous';
previous.setAttribute('onclick' , 'previousAction()');
next.id = 'next';
next.setAttribute('onclick' , 'nextAction()');
main.id = 'main';
inner.id = 'inner';

imagesUrl.forEach(function(url){
    var img = document.createElement('img');
    img.src = url;
    inner.appendChild(img);
});
var img = document.createElement('img');
img.src = imagesUrl[0];
inner.appendChild(img);
inner.style.width = (220 * (imgCount + 1) ) + 'px';

main.appendChild(inner);
PrefixedEvent(inner, "AnimationEnd", function() {
	inner.setAttribute('class', '');
    inner.style.marginLeft = (-220 * currentImg) + 'px';
    updateDone = true;
});

slider.appendChild(previous);
slider.appendChild(main);
slider.appendChild(next);

updatePreviews()