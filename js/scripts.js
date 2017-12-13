var synth = window.speechSynthesis;

var play= document.getElementById('#play');
var inputTxt = document.querySelector('.txt');

var voiceSelect = document.querySelector('select');

var pitch = 1
var pitchValue = 1
var rate = 1
var rateValue = 1

var voices = [];





$(document).ready(function() {
 console.log("readY")
	  d = new Date();
	  hour=d.getHours();
	  minute=d.getMinutes();
	  
	  MINUTEWORDS=['bang on','just gone','about','nearly','just about']
	  MINUTETIMEWORDS=['','five past','ten past','a quarter past','twenty past','twenty-five past','half past','twenty-five to',
	  'twenty to','a quarter to','ten to','five to']
	  HOURWORDS=['midnight','one','two','three','four','five','six','seven','eight','nine','ten','eleven','noon',
	  'one','two','three','four','five','six','seven','eight','nine','ten','eleven'];
	  window.requestAnimationFrame(step);
});
function step(timestamp) {
  var d = new Date();
      if (Math.round(timestamp)%1973==0){$(timeReadOut).removeClass("animated pulse")}
	  hour=d.getHours();
	  minute=d.getMinutes();
  var theTime=wordTimeMaker(hour,minute);
if (document.getElementById("timeReadOut").innerHTML !== 'it\'s '+theTime){
	 

      
	$(timeReadOut).addClass("animated pulse");
	 	 
	
	
	}
document.getElementById("timeReadOut").innerHTML = 'it\'s '+theTime;
   
    window.requestAnimationFrame(step);
  
}
 function wordTimeMaker(hora,mins){
	 var wordTime='';
	 var h=hora;
	 
	 var handPos=Math.round(mins/5);
	 var handMod=mins%5;
	 if  (handPos>6){h++}
	 wordTime=MINUTEWORDS[handMod]+' '+MINUTETIMEWORDS[handPos]+' '+HOURWORDS[h] ;
	return wordTime;
	 
 }
 function populateVoiceList() {
  voices = synth.getVoices();
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
	 var d = new Date();
	  hour=d.getHours();
	  minute=d.getMinutes();
  inputTxt='its ' + wordTimeMaker(hour,minute);
  console.log(inputTxt.value);
  if(inputTxt.value !== ''){
    var utterThis = new SpeechSynthesisUtterance(inputTxt);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch;
    utterThis.rate = rate;
    synth.speak(utterThis);
  }
}

i.onsubmit = function(event) {
  event.preventDefault();

  speak();

   
}

 
 
$( "#play" ).click(function() {
   
  speak();
}); 
 
