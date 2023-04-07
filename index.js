let plusBtn = document.querySelector(".plusCard")

let title = document.querySelector(".title")
let description = document.querySelector(".description")


let addDatas = document.querySelector(".addData")
// console.log(addDatas)
addDatas.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(title.value)
    fetch("http://localhost:3000/posts",{
        method:"POST",
        body:JSON.stringify({
            "title":`${title.value}`,
            "description":`${description.value}`
        }),
        headers:{
            'Content-type':'application/json'
        }
    })
})

window.addEventListener("DOMContentLoaded",()=>{
    fetch("http://localhost:3000/posts")
    .then(res=>res.json())
    .then(json=>console.log(json))
})