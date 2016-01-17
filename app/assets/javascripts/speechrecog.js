<script>
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

recognizer.continuous = true;

if(window.SpeechRecognition === null){
	document.getElementById('ws-unsupported').classList.remove('hidden');
	document.getElementById('button-play-ws').setAttribute('disabled','disabled');
	document.getElementById('button-stop-ws').setAttribute('disabled','disabled');
}
else{
	var recognizer = new window.SpeechRecognition();
	var transcription = document.getElementById('transcription');
	var log = document.getElementById('log');

	recognizer.onresult = function(event){
		transcription.textContent = '';
		for(var i= event.resultIndex;i<event.results.length;i++){
			if(event.results[i].isFinal){
				transcription.textContent = event.results[i][0].transcript;
			}
			else{
				transcription.textContent += event.results[i][0].transcript;
			}
		}
	};

	recognizer.onerror = function(event){
		log.innerHTML = "Recognition error: " + event.message;
	};

	document.getElementById('button-play-ws').addEventListener('click',function(){
		recognizer.interimResults = document.querySelector('input[name="recognition-type"][value="interim"]').checked;

		try{
			recognizer.start();
			log.innerHTML = 'Recognition started';
		} catch(ex){
			log.innerHTML = 'Recognition error: ' + ex.message;
		}
	});
	document.getElementById('button-stop-ws').addEventListener('click', function() {
        recognizer.stop();
        log.innerHTML = 'Recognition stopped' + '<br />' + log.innerHTML;
        });

    document.getElementById('clear-all').addEventListener('click', function() {
        transcription.textContent = '';
        log.textContent = '';
        });

}
</script>
