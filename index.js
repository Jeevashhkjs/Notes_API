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

    let dates = new Date()

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

            let topLine = document.createElement("div")
            topLine.setAttribute("class","topLine")
            cards.append(topLine)

            let UserDescription = document.createElement("p")
            UserDescription.setAttribute("class","description")
            UserDescription.innerHTML = `${element.description}`
            cards.append(UserDescription)

            let bottomLine = document.createElement("div")
            bottomLine.setAttribute("class","bottomLine")
            cards.append(bottomLine)

            let footer = document.createElement("div")
            footer.setAttribute("class","footer")
            cards.append(footer)

            let createTime = document.createElement("p")
            createTime.setAttribute("class","date")
            createTime.innerText = `${dates.getDate()}/${dates.getMonth()}/${dates.getFullYear()}`
            footer.append(createTime)

            let menuAction = document.createElement("p")
            menuAction.setAttribute("class","menu")
            menuAction.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`
            footer.append(menuAction)

            let parentAction = document.createElement("div")
            parentAction.setAttribute("class","parentActions")
            cards.append(parentAction)

            let deleteBtn = document.createElement("span")
            deleteBtn.setAttribute("class","delete")
            deleteBtn.setAttribute("id",`${element.id}`)
            deleteBtn.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i> Delete`
            parentAction.append(deleteBtn)

            deletetion(deleteBtn)

            let editBtn = document.createElement("span")
            editBtn.setAttribute("class","edit")
            editBtn.setAttribute("id",`${element.id}`) 
            editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit`
            parentAction.append(editBtn)

            edition(editBtn)

            showMenu(menuAction,parentAction)

        });
    }
    )
})

plusBtn.addEventListener("click",()=>{
    addDatas.innerText = "Add Notes"
    parentDiv.classList.add("visible")
})
cloneBtn.addEventListener("click",()=>{
    parentDiv.classList.remove("visible")
})

function deletetion(deleteBtn){
    deleteBtn.addEventListener("click",(e)=>{
        fetch(`http://localhost:3000/posts/${e.target.parentElement.children[0].id}`, {
            method: "DELETE",
            headers:{'Content-type':'application/json'}
        })
    })
}


function edition(editElements){
    editElements.addEventListener("click",(e)=>{
        // console.log(e.target.parentElement.parentElement.children[2])
        addDatas.innerText = "Update"
        let updateId = e.target.parentElement.children[1].id
        exitTitle =  e.target.parentElement.parentElement.children[0]
        alreadydescriptions = e.target.parentElement.parentElement.children[2]

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

function showMenu(buttons,menus){
    buttons.addEventListener("click",()=>{
        let parents = document.querySelectorAll(".parentActions")
        for(let i=0;i<parents.length;i++){
            parents[i].classList.remove("showmenu")

            window.addEventListener("click",(e)=>{
                if(e.target.parentElement.classList.contains("menu") == false){
                    parents[i].classList.remove("showmenu")
                }
            })

        }
        menus.classList.add("showmenu")
    })

}