// Test browser support
window.SpeechRecognition = window.SpeechRecognition  ||
                              window.webkitSpeechRecognition ||
                                 null;
var results = [];
if (window.SpeechRecognition === null) {
  document.getElementById('ws-unsupported').classList.remove('hidden');
  document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
  document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
} 
else {
  var recognizer = new window.SpeechRecognition();
  var transcription = document.getElementById('transcription');
  var log = document.getElementById('log');
  // Recogniser doesn't stop listening even if the user pauses
  // recognizer.continuous = true;
  // Start recognising
  recognizer.onresult = function(event) {
    transcription.textContent = '';
    results.push(event.results);
    results.reverse();
    results.forEach(function(val,i){
      var el = val[0][0].transcript.toLowerCase();
      transcription.textContent = el;
      if (el === "hello"){
        log.innerHTML = "Hi there";
      }
      else if(el === "hi"){
        log.innerHTML = "Hi there";
      }
      else if(el === "hi there"){
        log.innerHTML = "Hi there";
      }
      else if(el === "hi simon"){
        log.innerHTML = "Hi there";
      }
      else if(el === "hello simon"){
        log.innerHTML = "Hi there";
      }
      else if(el === "turn on device 1"){
        log.innerHTML = "Turning on device 1";
        var id = 1;
        $.get("/devices/turn_on",{"id":id});
      }
      else if(el === "switch on device 1"){
        log.innerHTML = "Switch on device 1";
        var id = 1;
        $.get("/devices/turn_on",{"id":id});
      }
      else if(el === "how are you"){
        log.innerHTML = "I am fine. How are you? Oh chuck it I don't care";
      }
      else if(el === "turn off device 1"){
        log.innerHTML = "Turning off device 1";
        var id = 1;
        $.get("/devices/turn_off",{"id":id});
      }
      else if(el === "switch off device 1"){
        log.innerHTML = "Switch off device 1";
        var id = 1;
        $.get("/devices/turn_off",{"id":id});
      }
      else{
        log.innerHTML = "Sorry I didn't get you";
      }
    });
    results = [];
  };

  // Listen for errors
  recognizer.onerror = function(event) {
    //log.innerHTML = 'Recognition error: ' + event.message + '<br />' + log.innerHTML;
    console.log(event.message);
  };
  var play = document.getElementById('button-play-ws');
  play.addEventListener('click', function() {
    // Set if we need interim results
    recognizer.interimResults = document.querySelector('input[name="recognition-type"][value="interim"]').checked;
    recognizer.stop();
    try {
      transcription.textContent = '';
      log.textContent = '';
      recognizer.start();
    } catch(ex) {
      console.log(event.message);
    }
  });
}
