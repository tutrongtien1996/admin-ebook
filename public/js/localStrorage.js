function setToken(){
    let accessToken = document.querySelector("#accessToken").getAttribute('data-accessToken');
    localStorage.setItem('accessToken', accessToken)
}
setToken()
