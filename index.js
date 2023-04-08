let plusBtn = document.querySelector(".plusCard")
let cloneBtn = document.querySelector(".close")
let title = document.querySelector(".title")
let description = document.querySelector(".description")


let addDatas = document.querySelector(".addData")
let AllCards = document.querySelector(".NoOfCards")
let parentDiv = document.querySelector(".parentDiv")

addDatas.addEventListener("click", (e) => {
    e.preventDefault()
    if(e.target.innerText == "Add Notes"){
        fetch("http://localhost:3000/posts",{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                "title":`${title.value}`,
                "description":`${description.value}`
            }),
        })
    }
})


window.addEventListener("DOMContentLoaded",()=>{
    fetch("http://localhost:3000/posts")
    .then(res=>res.json())
    .then(UserDatas=>{
        UserDatas.forEach(element => {

            let cards = document.createElement("div")
            cards.setAttribute("class","cards")
            AllCards.append(cards)

            let UserTitle = document.createElement("h4")
            UserTitle.setAttribute("class","title")
            UserTitle.innerHTML = `${element.title}`
            cards.append(UserTitle)

            let UserDescription = document.createElement("p")
            UserDescription.setAttribute("class","description")
            UserDescription.innerHTML = `${element.description}`
            cards.append(UserDescription)

            let parentAction = document.createElement("div")
            parentAction.setAttribute("class","parentActions")
            cards.append(parentAction)

            let deleteBtn = document.createElement("span")
            deleteBtn.setAttribute("class","delete")
            deleteBtn.setAttribute("id",`${element.id}`)
            deleteBtn.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`
            parentAction.append(deleteBtn)

            deletetion(deleteBtn)

            let editBtn = document.createElement("span")
            editBtn.setAttribute("class","edit")
            editBtn.setAttribute("id",`${element.id}`)
            editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
            parentAction.append(editBtn)

            edition(editBtn)

        });
    }
    )
})

plusBtn.addEventListener("click",()=>{
    addDatas.innerText = "Add Notes"
    parentDiv.style.visibility = "visible"
})
cloneBtn.addEventListener("click",()=>{
    parentDiv.style.visibility = "hidden"
})

function deletetion(deleteBtn){
    deleteBtn.addEventListener("click",(e)=>{
        fetch(`http://localhost:3000/posts/${e.target.parentElement.id}`, {
            method: "DELETE",
            headers:{'Content-type':'application/json'}
        })
    })
}


function edition(editElements){
    editElements.addEventListener("click",(e)=>{
        addDatas.innerText = "Update"
        let updateId = e.target.parentElement.id
        exitTitle =  e.target.parentElement.parentElement.previousElementSibling.parentElement.children[0]
        alreadydescriptions = e.target.parentElement.parentElement.previousElementSibling.parentElement.children[1]

        title.value = exitTitle.innerText
        description.value = alreadydescriptions.innerText

        parentDiv.style.visibility = "visible"

        addDatas.addEventListener("click",(e)=>{
            if(e.target.innerText = "Update"){
                fetch(`http://localhost:3000/posts/${updateId}`,{
                    method:"PUT",
                    headers:{'content-type':'application/json'},
                    body: JSON.stringify({
                        "title":`${title.value}`,
                        "description":`${description.value}`
                    })
                })
            }
        })

    })
}