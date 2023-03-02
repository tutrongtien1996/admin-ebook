const URL_API = "http://localhost:5506"
async function start(){
    let listAuthors = await getAuthors()
    console.log(listAuthors)
    addDataNewAuthor()
    changeAuthor(listAuthors)
}
start()

function  addDataNewAuthor(){
    let nameElement = document.querySelector("#author_id");
    if(nameElement.value.trim().length > 0){
        let addElement = document.querySelector(".spanAdd")
        addElement.onclick = async () => {
            let headers = {
                authorization: localStorage.getItem('accessToken')
            }
            let input = {name: nameElement.value}
            let results =  await axios.post(URL_API +'/api/users', input, {headers: headers})
                    .then(response => {
                      return response.data
                    })
            document.querySelector('input[name="user_id"]').value = results.data.id
            results && alert("create new author success")
        }
    }
}
function changeAuthor(listAuthors){
    let nameElement = document.querySelector("#author_id")
    nameElement.onkeyup = () =>{
        addDataNewAuthor()
        let newList = listAuthors.filter(author => author.name.toLowerCase().includes(nameElement.value))
        let list_author = document.querySelector(".list_author ul")
            let html = ""
        if(newList.length > 0){
            newList.forEach(element => {
                html += `<li class="list-group-item" id="${element.id}">${element.name}</li>`
            });  
        }
        list_author.innerHTML = html;
        if(nameElement.value.length == 0){
            document.querySelector(".list_author ul").innerHTML = ""
        }
    getValueAuthor()
    } 
}

async function getAuthors(){
    let headers = {
        authorization: localStorage.getItem('accessToken')
    }
    console.log(headers)
    console.log(URL_API + '/api/users')
    let results =  await axios.get(URL_API + '/api/users', {headers: headers})
                .then(response => {
                  return response.data.data
                })
    return results
}

function getValueAuthor(){
    let nameElement = document.querySelector("#author_id");
    let list_author = document.querySelectorAll(".list_author ul li")
    if(list_author){
        list_author.forEach(element => {
            element.onclick = () => {
                nameElement.value = element.innerText
                document.querySelector('input[name="user_id"]').value = element.id
                element.parentElement.innerHTML =""
            }
        })
    }

}