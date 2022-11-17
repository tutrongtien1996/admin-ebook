



console.log("Hello")
let btn = document.getElementById("search")
let url = document.getElementById("url_template")


function getDataURL(callback){
    if (btn) {
        btn.onclick = () => {
            
            var input = {
                url: url.value,
                from_site: "free-css.com"
            }
            fetch('https://webneeder.com//api/templates/extract', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
            })
            .then((response) => response.json())
            .then((data) => {
                callback(data.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
}

getDataURL(renderData)
function renderData(data){
    document.getElementById("name_template").value = data.name;
    document.getElementById("zip_url").value = data.zip_url;
    document.getElementById("thumbnail_url").value = data.thumbnail_url;
}