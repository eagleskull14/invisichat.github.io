  // Use https://obfuscator.io/ to encript and decript if needed
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  import { getDatabase, ref, set, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDdr4J0AcH8oC7Ihfv7l-YdhbcE787uQPI",
    authDomain: "invisichat-f9b19.firebaseapp.com",
    projectId: "invisichat-f9b19",
    storageBucket: "invisichat-f9b19.appspot.com",
    messagingSenderId: "295251479061",
    appId: "1:295251479061:web:b8b751090f1fc297781c1c",
    measurementId: "G-NVX18LB8TS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();
  var cooldown = 3
  var ImageCooldown = 30
  function sendMessage(message, exactTime, time, date) {
  set(ref(database, 'advertisement/messages/' + date + exactTime), {
    type: "text",
    message: message,
    time: time,
    date: date
  });
  document.getElementById('messageBox').value = ''
}

function sendImage(src, alt, exactTime, time, date, width, height) {
    set(ref(database, 'advertisement/messages/' + date + exactTime), {
        type: "image",
        src: src,
        alt: alt,
        time: time,
        date: date,
        width: width,
        height: height
      });
}

function setupMessage(message) {
    if(message.length > 250) {
        alert("Your message is too long.")
        return
    } else {
        let time = new Date
        var hour = time.getUTCHours()
        var minute = time.getUTCMinutes()
        var second = time.getUTCSeconds()
        var millisecond = time.getUTCMilliseconds()
        if(hour.toString().length == 1) {
            hour = "0" + hour
        }
        if(minute.toString().length == 1) {
            minute = "0" + minute
        }
        if(second.toString().length == 1) {
            second = "0" + second
            
        }
        if(millisecond.toString().length == 1) {
            millisecond = "00" + millisecond
        } else if(millisecond.toString().length == 2) {
            millisecond = "0" + millisecond
        }
	    sendMessage(message, hour+":"+minute+":"+second+":"+millisecond, hour+":"+minute+":"+second, time.getUTCFullYear() + "-" + (time.getUTCMonth() + 1) + "-" + time.getUTCDate())
    }
}

function setupImage(src, alt, width, height) {
    let time = new Date
        var hour = time.getUTCHours()
        var minute = time.getUTCMinutes()
        var second = time.getUTCSeconds()
        var millisecond = time.getUTCMilliseconds()
        if(hour.toString().length == 1) {
            hour = "0" + hour
        }
        if(minute.toString().length == 1) {
            minute = "0" + minute
        }
        if(second.toString().length == 1) {
            second = "0" + second
            
        }
        if(millisecond.toString().length == 1) {
            millisecond = "00" + millisecond
        } else if(millisecond.toString().length == 2) {
            millisecond = "0" + millisecond
        }
    sendImage(src, alt, hour+":"+minute+":"+second+":"+millisecond, hour+":"+minute+":"+second, time.getUTCFullYear() + "-" + (time.getUTCMonth() + 1) + "-" + time.getUTCDate(), width, height)
}

document.getElementById("send").addEventListener("click", ()=>{
	if(cooldown != 0) {
        alert("You are typing too fast! Wait " + cooldown + " more seconds.")
        return
    }
    if(document.getElementById("messageBox").value.replace(/[^\n]/g, "").length > 8) {
        alert("You have too many new lines! Remove at least " + (document.getElementById("messageBox").value.replace(/[^\n]/g, "").length - 8) + " new lines to send!")
        return
    }
    setupMessage(document.getElementById('messageBox').value)
    cooldown = 3
})

document.getElementById("image").addEventListener("click", ()=>{
	if(cooldown != 0) {
        alert("You are typing too fast! Wait " + cooldown + " more seconds.")
        return
    }
    if(ImageCooldown != 0) {
        alert("You are sending too many images! Wait " + ImageCooldown + " more seconds to send another image.")
        return
    }
    let src = prompt("Enter a link to the image here.")
	let alt = prompt("Enter the images name.\nThis is for if the image is unable to be loaded.")
    let width = prompt("Enter image width.\nIf blank or not a number, it will default to 100.\nMinimum of 50, max of 250.")
    let height = prompt("Enter image height.\nIf blank or not a number, it will default to 100.\nMinimum of 50, max of 250.")
    if(src == "" || alt == ""){
		alert("The link or image name cannot be blank.")
		return
	} else if(alt.length > 50){
		alert("The image name cannot be longer than 50 characters.")
		return
	}
    if(width > 250 || width < 50 || height > 250 || height < 50 || isNaN(width) || isNaN(height)) {
        width = 100
        height = 100
    }
    setupImage(src, alt, width, height)
    cooldown = 3
    ImageCooldown = 30
})
const messages = ref(database, "advertisement/messages/")
onChildAdded(messages, (data) => {
    if(data.val().type == "text") {
        addMessage(data.val().date + " : " + data.val().time + " >> " + data.val().message)
    } else if(data.val().type == "image") {
        addImage(data.val().date + " : " + data.val().time + " >> ", data.val().src, data.val().alt, data.val().width, data.val().height)
    } else {
        return
    }
});

function addMessage(totalMessage) {
	var elem = document.getElementById("messages").appendChild(document.createElement("p"))
	elem.innerText = totalMessage
	elem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function addImage(date, src, alt, width, height) {
	var elem1 = document.getElementById("messages").appendChild(document.createElement("p"))
    var elem2 = document.getElementById("messages").appendChild(document.createElement("img"))
	elem1.innerText = date
    elem2.setAttribute("src", src)
    elem2.setAttribute("alt", alt)
    if(width == undefined) {
        width = 100
    }
    if(height == undefined) {
        height = 100
    }
    elem2.style.width = width + "px"
    elem2.style.height = height + "px"
	elem2.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

var messageLength = document.getElementById("messageBox").value.length

setInterval(() => {
    messageLength = document.getElementById("messageBox").value.length
    if(messageLength > 250) {
        document.getElementById("send").innerText = "Message too long! Extra characters: " + (messageLength - 250)
        document.getElementById("send").style.color = "#ffaaaa"
        document.getElementById("send").style.backgroundColor = "#805050"
    } else if(messageLength > 200) {
        document.getElementById("send").innerText = "Send! (Characters left: " + (250 - messageLength) + ")"
        document.getElementById("send").style.color = "white"
        document.getElementById("send").style.backgroundColor = "#505050"
    } else if(document.getElementById("messageBox").value.replace(/[^\n]/g, "").length > 8){
        document.getElementById("send").innerText = "Too many new lines! Extra lines: " + (document.getElementById("messageBox").value.replace(/[^\n]/g, "").length - 8)
        document.getElementById("send").style.color = "#ffaaaa"
        document.getElementById("send").style.backgroundColor = "#805050"
    } else {
        document.getElementById("send").innerText = "Send!"
        document.getElementById("send").style.color = "white"
        document.getElementById("send").style.backgroundColor = "#505050"
    } 
}, 100);

setInterval(()=>{
    if(cooldown > 0) {
        cooldown--
    }
}, 1000)
setInterval(()=>{
    if(ImageCooldown > 0) {
        ImageCooldown--
    }
}, 1000)
window.addEventListener("offline", ()=>{
	document.getElementById("noInternet").showModal()
})