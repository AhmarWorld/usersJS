const usersDiv = document.querySelector(`#users`)
async function loadUser(){
    let response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    let data = await response.json()
    return data
}
async function drawUsers(){
    let users = await loadUser()
    for(let user of users){
        let cardUser = document.createElement(`div`)
        let h3User = document.createElement(`h3`)
        h3User.innerHTML = `${user.name}`
        cardUser.style.border = `1px solid red`
        cardUser.style.borderRadius = `8px`
        cardUser.style.boxShadow = `0 0 3px 3px grey`
        cardUser.style.paddingLeft =`10px`
        cardUser.style.marginBottom = `15px`
        cardUser.classList.add(`user__card`)
        cardUser.style.cursor = `pointer`
        cardUser.setAttribute(`userId`, `${user.id}`)
        cardUser.style.fontFamily = `'Roboto', sans-serif`
        cardUser.appendChild(h3User)
        usersDiv.appendChild(cardUser)
    }
}
drawUsers().then(() => {
    const cardsUsers = document.querySelectorAll(`.user__card`)
    for(let card of cardsUsers){
        card.addEventListener(`click`, () => {
            localStorage.setItem(`clickedUserId`, card.getAttribute(`userId`))
            location.href = `userPage.html`
        })
    }
})