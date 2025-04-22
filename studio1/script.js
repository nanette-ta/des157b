(function(){
    'use strict';
    const fs = document.querySelector('.fa-expand');
    fs.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    const mySection = document.querySelector('#poem');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const myVideo = document.querySelector('#myVideo');

    const intervalID = setInterval(checkTime, 1000);

    const poem = {
        start: [0, 5, 8],
        stop: [4, 7, 10],
        line: [line1, line2, line3]
    }

    const loading = document.querySelector('.fa-dove');

    myVideo.addEventListener('playing', function() {
        loading.style.display = 'none';
    })

    function checkTime() {
        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = "showing";
            } else {
                poem.line[i].className = "hidden";
            }
        }
    }
})();