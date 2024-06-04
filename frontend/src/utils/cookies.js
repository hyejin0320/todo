function setCookie(key, value, days){
    let cookie = `${key}=${value};`;

    if(days){
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        let expires = 'expires=' + date.toUTCString();
        cookie += expires;
    }

    document.cookie = cookie;
}

function getCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

function deleteCookie(key){
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export { setCookie, getCookie, deleteCookie };