function setSession(key, value){
    sessionStorage.setItem(key, value);
}

function getSession(key){
    return sessionStorage.getItem(key);
}

function deleteSession(key){
    sessionStorage.removeItem(key);
}

function deleteALl(){
    sessionStorage.clear();
}

export { setSession, getSession, deleteSession, deleteALl };