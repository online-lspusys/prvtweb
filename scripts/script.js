const header = document.querySelector("header");
const hamburgerBtn = document.querySelector("#hamburger-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

hamburgerBtn.addEventListener("click", () => header.classList.toggle("show-mobile-menu"));
closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());

var videos = document.getElementsByTagName('video');

for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener("play", function(event) {
        for (var j = 0; j < videos.length; j++) {
            if (videos[j] !== event.target) {
                videos[j].pause();
            }
        }
    });
}

function toggleDescription(photo) {
    var photos = document.querySelectorAll('.photo');
    var isPhoto1Clicked = photo.classList.contains('left') || photo.classList.contains('center');

    photos.forEach(function(item) {
        item.querySelector('.description').classList.remove('show');
        item.querySelector('.description').classList.add('hidden');
    });

    if (isPhoto1Clicked) {
        photos.forEach(function(item) {
            item.classList.remove('left', 'center', 'right', 'hidden');
            item.classList.add('visible');
        });
    } else {
        photos.forEach(function(item) {
            if (item === photo) {
                item.classList.add('left');
                item.classList.remove('center', 'right', 'hidden');
                item.addEventListener('transitionend', function showDescription() {
                    item.querySelector('.description').classList.remove('hidden');
                    item.querySelector('.description').classList.add('show');
                    item.removeEventListener('transitionend', showDescription);
                });
            } else {
                item.classList.add('hidden');
                item.classList.remove('left', 'center', 'right');
            }
        });
    }
}

function showMessage() {
    document.getElementById('floating-window').style.display = 'block';
    document.getElementById('background-overlay').style.display = 'block';
}

function hideMessage() {
    document.getElementById('floating-window').style.display = 'none';
    document.getElementById('background-overlay').style.display = 'none';
}

function clearInputs() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('messageInput').value = '';
}