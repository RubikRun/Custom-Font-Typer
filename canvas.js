var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var imageHeight = 70;
var letters = ' абвгдежзийклмнопрстуфхцчшщъьюя';

function drawImages(images, firstX) {
    var x = firstX;
    
    for (var i = 0; i < images.length; i++) {
        c.drawImage(images[i].img, x, images[i].y);
        x += images[i].img.width;

        if (i < images.length - 1 && images[i].y != images[i + 1].y) {
            x = firstX;
        }
    }
}

function typeWithCustomFont(text, x, y) {
    const images = [];

    var loadCounter = 0;
    var imgCounter = 0;
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) == '\n') {
            y += imageHeight;
            loadCounter++;
            continue;
        }

        var fileName = getFileNameForLetter(text.charAt(i));
        images[imgCounter] = {img : new Image, y : y};
        images[imgCounter].img.src = 'alphabet/' + fileName;
        imgCounter++;

        images[imgCounter - 1].img.onload = function() {
            loadCounter++;
            if (loadCounter >= text.length) {
                drawImages(images, x)
            }
        }
    }
}

function getFileNameForLetter(c) {
    var index = 0;
    while (index < letters.length && letters[index] != c) {
        index++;
    }
    return index.toString() + '.png'
}

function handleInput() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    text = document.getElementById('customText').value;
    text = text.toLowerCase();

    typeWithCustomFont(text, 0, 0);
}