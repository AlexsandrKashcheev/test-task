const requestUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
const requestUrl2 = 'https://boiling-refuge-66454.herokuapp.com/images/:imageId';

function sendRequest(method, url) {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        xhr.onload = () => {
            if(xhr.status >= 400){
                reject(xhr.response)
            } else{
                resolve(xhr.response);
            }
    
        }

        xhr.send();
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
            `
            console.log(data[key]);
        }
    })
    .catch(err => console.log(err));