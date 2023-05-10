const currentUserId = localStorage.getItem(`clickedUserId`)

const infoDiv = document.querySelector(`#user`)
infoDiv.style.fontFamily = `'Roboto', sans-serif`

async function loadInfo(endpoint) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/` + endpoint)
    let data = await response.json()
    return data
}

async function drawInfo() {

    let user = await loadInfo(`users/${currentUserId}`)
    let posts = await loadInfo(`posts`)
    let albums = await loadInfo(`albums`)
    let todos = await loadInfo(`todos`)
    let comments = await loadInfo(`comments`)

    let pUserAddress = document.createElement(`p`)
    let pUserCompany = document.createElement(`p`)
    let pUserEmail = document.createElement(`p`)
    let pUserName = document.createElement(`p`)
    let pUserPhone = document.createElement(`p`)
    let pUserUsername = document.createElement(`p`)
    let pUserWebsite = document.createElement(`p`)

    pUserinfoDiv = document.createElement(`div`)
    pUserAddress.innerHTML = `Address: ${user.address.city}, ${user.address.street}`
    pUserCompany.innerHTML = `Company: ${user.company.name}`
    pUserEmail.innerHTML = `Email: ${user.email}`
    pUserName.innerHTML = `Name: ${user.name}`
    pUserPhone.innerHTML = `Phone: ${user.phone}`
    pUserUsername.innerHTML = `Username: ${user.username}`
    pUserWebsite.innerHTML = `Website: ${user.website}`
    pUserinfoDiv.appendChild(pUserName)
    pUserinfoDiv.appendChild(pUserUsername)
    pUserinfoDiv.appendChild(pUserEmail)
    pUserinfoDiv.appendChild(pUserCompany)
    pUserinfoDiv.appendChild(pUserAddress)
    pUserinfoDiv.appendChild(pUserPhone)
    pUserinfoDiv.appendChild(pUserWebsite)
    infoDiv.appendChild(pUserinfoDiv)

    const postsArr = []

    for (let post of posts) {
        if (post.userId == currentUserId) {
            let postObj = {
                title: post.title,
                body: post.body,
                id: post.id
            }
            postsArr.push(postObj)
        }
    }

    postsArr.sort((a, b) => {
        if (a.title > b.title) {
            return 1
        } else {
            return -1
        }
    })

    const userPostDiv = document.createElement(`div`)
    const h3UserPost = document.createElement(`h3`)
    h3UserPost.innerHTML = `Posts:`
    userPostDiv.appendChild(h3UserPost)

    for (let post of postsArr) {
        let div = document.createElement(`div`)
        let pTitle = document.createElement(`p`)
        let pBody = document.createElement(`p`)
        let hr = document.createElement(`hr`)
        pTitle.innerHTML = `${post.title}`
        pBody.innerHTML = `${post.body}`
        pTitle.style.color = `purple`
        pBody.style.color = `purple`
        let h5 = document.createElement(`h5`)
        h5.innerHTML = `Comments:`
        div.appendChild(pTitle)
        div.appendChild(pBody)
        div.appendChild(h5)

        for (let comment of comments) {
            if (comment.postId == post.id) {
                let commentDiv = document.createElement(`div`)
                let commentName = document.createElement(`p`)
                let commentEmail = document.createElement(`p`)
                let commentBody = document.createElement(`p`)
                commentDiv.style.border = `1px dashed grey`
                commentName.style.fontSize = `12px`
                commentEmail.style.fontSize = `12px`
                commentBody.style.fontSize = `12px`
                commentEmail.innerHTML = ` ${comment.email}`
                commentName.innerHTML = `${comment.name}`
                commentBody.innerHTML = `${comment.body}`
                commentDiv.appendChild(commentEmail)
                commentDiv.appendChild(commentName)
                commentDiv.appendChild(commentBody)
                div.appendChild(commentDiv)
            }
        }
        div.appendChild(hr)
        userPostDiv.appendChild(div)
    }
    infoDiv.appendChild(userPostDiv)
    const userAlbumDiv = document.createElement(`div`)
    const userAlbumH3 = document.createElement(`h3`)
    userAlbumH3.innerHTML = `Albums:`
    userAlbumDiv.appendChild(userAlbumH3)
    for (let album of albums) {
        if (album.userId == currentUserId) {
            let albumP = document.createElement(`p`)
            albumP.innerHTML = `${album.title}`
            albumP.style.fontWeight = `500`
            albumP.style.cursor = `pointer`
            albumP.classList.add(`userAlbum`)
            albumP.setAttribute(`albumId`, `${album.id}`)
            userAlbumDiv.appendChild(albumP)
        }
    }
    infoDiv.appendChild(userAlbumDiv)
    const todoDiv = document.createElement(`div`)
    const h3Todo = document.createElement(`h3`)
    h3Todo.innerHTML = `Todos:`
    todoDiv.appendChild(h3Todo)
    for (let todo of todos) {
        if (todo.userId == currentUserId) {
            let todoP = document.createElement(`p`)
            todoP.innerHTML = `${todo.title}`
            if (todo.completed) {
                todoP.style.color = `green`
            } else {
                todoP.style.color = `red`
            }
            todoDiv.appendChild(todoP)
        }
    }
    todoDiv.style.border = `1px double blue`
    infoDiv.appendChild(todoDiv)
}
drawInfo().then(() => {
    const albumsP = document.querySelectorAll(`.userAlbum`)
    for (let album of albumsP) {
        album.addEventListener(`click`, () => {
            localStorage.setItem(`clickedAlbumId`, album.getAttribute(`albumId`))
            localStorage.setItem(`clickedAlbumName`, album.innerText)
            location.href = `albums.html`
        })
    }
})