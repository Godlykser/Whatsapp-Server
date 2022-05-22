import $ from 'jquery';
import { useRef } from 'react';
import "./SendVoiceButton.css";
import VoiceMessagePanel from './VoiceMessagePanel';

export default function SendVoiceButton2(props) {

    let recorder = useRef();                        // MediaRecorder
    let recording = useRef();                       // Currently recording
    let recordTime = useRef({count: 0});            // Recorded time
    let currentStream = useRef();

    let chunks = [];                                // Array of chunks of audio data

    // Starts to record
    const startRecording = () => {
        props.setInput("");
        $('#chatInput').attr('disabled', true);
        navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
            chunks = [];
            currentStream = stream;
            recorder = new MediaRecorder(stream);
            recorder.addEventListener("dataavailable", (e) => {
                if (currentStream !== stream){
                    recordTime.current.count = 0;
                    stream.getTracks().forEach(e => { e.stop(); });
                    $('#voiceTime').html('00:00');
                    return;
                }
                // update time
                $('#voiceTime').html(showTime(recordTime.current.count++));
                // add stream data to chunks
                chunks.push(e.data);
                // if recorder is 'inactive' then recording has finished
                if (recorder.state === 'inactive') {
                    // if recording is true then voice message success
                    if (recording === true) {
                        props.setInput(URL.createObjectURL(new Blob(chunks)))
                    }
                    chunks = [];
                    recordTime.current.count = 0;
                    stream.getTracks().forEach(e => { e.stop(); });
                    recording = false;
                }
            })
            recorder.start(1000);
        }).catch(function(err) {
            console.log(err)
        })
    }

    // Pauses the record
    const pauseRecord = () => {
        if (recorder !== undefined && recorder.state === 'recording'){
            recorder.pause();
            $('#playRecord').css('color', 'black');
        }
    }

    // Resumes the record
    const resumeRecord = () => {
        if (recorder !== undefined && recorder.state === 'paused'){
            recorder.resume();
            $('#playRecord').css('color', 'red');
        }
    }

    // Stops the record
    const stopRecord = () => {
        $('#resumeButton').attr('disabled', true);
        $('#pauseButton').attr('disabled', true);
        $('#playRecord').css('color', 'green');
        recorder.stop();
    }

    // Deletes the record
    const trashRecord = () => {
        $('#playRecord').css('color', 'black');
        $('#stopButton').css('display', 'inline-block');
        $('#validButton').hide();
        $('#voiceTime').html('00:00');
        $('#chatInput').attr('disabled', false);
        if(recorder.current !== undefined && recorder.state !== 'inactive'){
            recorder.stop();
        }
        recording = false; 
        recordTime.current.count = 0;
        props.setInput('');
    }


    // Records the voice message
    const recordAudio = () => {
        if (recording === true || props.input !== '') return;
        showPanel();
        recording = true;
        startRecording();
        $('#resumeButton').hide()
        $('#pauseAudioButton').hide();
        $('#playAudioButton').hide();
        $('#pauseButton').css('display', 'inline-block');
        $('#playRecord').css('color', 'red');
        $('#resumeButton').attr('disabled', false);
        $('#pauseButton').attr('disabled', false);
    }

    // Displays the voice control panel
    const showPanel = () => {
        if ($('#voiceControl').css('display') === 'none') {
            $('#voiceControl').show(250);
        } else {
            $('#voiceControl').hide(250);
        }
        
    }

    return (
        <div id='recordContainer'>
            <button id="playRecord" className="voiceButton" type='button' onClick={recordAudio}>
                <i className="bi bi-mic-fill" />
            </button>
            <VoiceMessagePanel 
                {...props}
                pauseRecord={pauseRecord}
                resumeRecord={resumeRecord}
                stopRecord={stopRecord}
                trashRecord={trashRecord}
              />
        </div>
    );
}

// Shows the record time nicely
function showTime(seconds) {
    let sec = seconds % 60;
    let min = Math.floor(seconds / 60);
    if (Math.floor(sec / 10) === 0) sec = "0" + sec.toString();
    if (Math.floor(min / 10) === 0) min = "0" + min.toString();
    return min + ':' + sec
}
