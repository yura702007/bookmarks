const siteUrl = '//127.0.0.1:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// загрузить CSS
let head = document.getElementsByTagName('head')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random()*9999999999999999);
head.appendChild(link);

// загрузить HTML
let body = document.getElementsByTagName('body')[0];
let boxHtml = '<div id="bookmarklet"><a href="#" id="close">&times</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
body.innerHTML += boxHtml;

function bookmarkletLaunch() {
    let bookmarklet = document.getElementById('bookmarklet');
    let imagesFound = bookmarklet.querySelector('.images');

    // очистить найденные изображения
    imagesFound.innerHTML = '';
    // показать букмарклет
    bookmarklet.style.display = 'block';

    // событие закрытия
    bookmarklet.querySelector('#close').addEventListener('click', function() {
        bookmarklet.style.display = 'none'});

    // найти изображения в DOM с минимальными размерами
    images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
    images.forEach(image => {
        if(image.naturalWidth >= minWidth && image.naturalHeight >= minHeight){
            let imageFound = document.createElement('img');
            imageFound.src = image.src;
            imagesFound.append(imageFound);
        }
    })

    // событие выбора изображения
    imagesFound.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', function(event){
            imageSelected = event.target;
            bookmarklet.style.display = 'none';
            window.open(
                siteUrl + 'image/create/?url='
                + encodeURIComponent(imageSelected.src)
                + '&title='
                + encodeURIComponent(document.title),
                '_blank'
            );
        })
    })
}

// запустить букмарклет
bookmarkletLaunch();
