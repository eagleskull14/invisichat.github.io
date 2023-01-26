const text = document.getElementById("name")
var clicked = false
text.addEventListener("dblclick", ()=>{
    clicked = true
})

document.body.addEventListener("keypress", (e)=>{
    if(!clicked) {
        return
    }
    if(e.key != "Enter") {
        return
    }
    let answer1 = prompt("c\no\nd\ne\n?")
    if(!(answer1 == "eagleskull14")) {
        return
    }
    window.location.assign("/chat-secret.html")
})