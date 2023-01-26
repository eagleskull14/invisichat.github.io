document.getElementById("notifications").addEventListener("click", ()=>{
    Notification.requestPermission().then(function(result) {    
        if(result == "denied") {
            alert("You denied!")
            return
        }
        alert("Enabled Notifications.")
    })
})  

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
  const database = getDatabase()
  var notifySleep = 3
  setInterval(() => {
    if(notifySleep <= 0) {
        return
    }
    notifySleep--
  }, 1000);
const general = ref(database, "general/messages/")
const chill = ref(database, "chill/messages/")
const gaming = ref(database, "gaming/messages/")
const venting = ref(database, "venting/messages/")
const advertisement = ref(database, "advertisement/messages/")
onChildAdded(general, () => {
    if(!(notifySleep == 0)) {
        return
    }
    new Notification('Invisichat General', {body: 'Someone sent a message!'})
})
onChildAdded(chill, () => {
    if(!(notifySleep == 0)) {
        return
    }
    new Notification('Invisichat Chill', {body: 'Someone sent a message!'})
})
onChildAdded(gaming, () => {
    if(!(notifySleep == 0)) {
        return
    }
    new Notification('Invisichat Gaming', {body: 'Someone sent a message!'})
})
onChildAdded(venting, () => {
    if(!(notifySleep == 0)) {
        return
    }
    new Notification('Invisichat Venting', {body: 'Someone sent a message!'})
})
onChildAdded(advertisement, () => {
    if(!(notifySleep == 0)) {
        return
    }
    new Notification('Invisichat Advertisement', {body: 'Someone sent a message!'})
})