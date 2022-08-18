const requestUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
const requestUrlList = 'https://boiling-refuge-66454.herokuapp.com/images/:imageId';
const requestUrlComment = 'https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments';


function sendRequest(method, url, body = null) {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if(xhr.status >= 400){
                reject(xhr.response)
            } else{
                resolve(xhr.response);
            }
    
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send(JSON.stringify(body));
    });
}

sendRequest('GET', requestUrl)
    .then(data => {
        for(let key in data) {
            const listItem = document.querySelector('.intro__list-image');
            listItem.innerHTML += `
                <div class='item'>
                    <img src='${data[key].url}'>
                    <div class='item-id'>id: ${data[key].id}</div>
                </div>
            `;
            console.log(data[key]);
        }
    })
    .catch(err => console.log(err));


const items = document.querySelector('.intro__list-image');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.close-popup');
items.addEventListener('click', () => {
    popup.classList.add('popup-active');
});

closePopup.addEventListener('click', () => {
    popup.classList.remove('popup-active');
});


const popupImg = document.querySelector('.popup__img');
let comments = [];


sendRequest('GET', requestUrlList)
    .then(data => {
        for (const key in data) {
            comments.push(data[key].comment);
            popupImg.innerHTML = `<img src="${data[key].url}">`;
        }
    })
    .catch(err => console.log(err));



document.getElementById('btn-save').onclick = function(e) {
    e.preventDefault();
    let userComment = document.getElementById('comment');
    let comment = {
        value: userComment.value,
    }
    userComment.value = '';
    comments.push(comment);

    console.log(comment);
    console.log(comments);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', requestUrlComment, true);
    xhr.getResponseHeader('Content-Type', 'application/json; charset="utf-8"');
    xhr.send(JSON.stringify(comments));

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
    })
}





