let currentAlbum = localStorage.getItem(`clickedAlbumId`)
let currentAlbumName = localStorage.getItem(`clickedAlbumName`)
let h1 = document.createElement(`h1`)
h1.innerHTML = currentAlbumName
document.body.appendChild(h1)
async function loadPhoto() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/photos`)
    return await response.json()
}
async function drawPhoto(){
    let photos = await loadPhoto()
    for(let photo of photos){
        if(photo.albumId == currentAlbum){
            let img = document.createElement(`img`)
            img.setAttribute(`src`, `${photo.url}`)
            let pTitle = document.createElement(`p`)
            pTitle.innerHTML = `${photo.title}`
            document.body.appendChild(pTitle)
            document.body.appendChild(img)
        }
    }
}
drawPhoto()