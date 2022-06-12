import countries from "./constant.js" 
const selectFirst = document.querySelector(".first")
const selectSecond = document.querySelector(".second") 
const translate = document.querySelector(".translate") 
const change = document.getElementById("change")
const fromText = document.querySelector(".fromText")
const toText = document.querySelector(".toText")
const listen = document.querySelector(".listen")
const reads = document.querySelectorAll(".read")

let language1 = "en-GB"
let language2 =  "es-ES"


for (const i in countries){
  const key = Object.keys(countries[i]).toString()
  const value = Object.values(countries[i]).toString()
  selectFirst.innerHTML += `<option value="${key}">${value}</option>`
  selectSecond.innerHTML += `<option value="${key}">${value}</option>`
}

selectFirst.value = language1
selectSecond.value = language2


change.addEventListener("click",_=>{
  const selectSecondValue = selectFirst.value
  selectFirst.value = selectSecond.value
  selectSecond.value = selectSecondValue

  if(!toText.value) return
  const fromTextValue = fromText.value
  fromText.value = toText.value
  toText.value = fromTextValue
})

translate.addEventListener("click",async _=>{
  if(!fromText.value) return
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${selectFirst.value}|${selectSecond.value}`)
  const data = await res.json()
  toText.value = data.responseData.translatedText
})

reads.forEach((read,index)=>{
  read.addEventListener("click",()=>{
    const textToRead = index == 0 ? fromText.value : toText.value
    if(!textToRead) return
    speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead))
  })
})
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function(event) {
  fromText.value = event.results[0][0].transcript
}

recognition.onerror = function(event) {
  console.log(event)
}


listen.addEventListener("click",_=>{
    recognition.start()
})
          