import $ from 'jquery';
import "./SendVoiceButton.css";

export default function VoiceMessagePanel(props) {

    let audio = undefined;

    // Plays the recorded audio preview
    const playAudio = () => {
        $('#pauseAudioButton').css('display', 'inline-block');
        $('#playAudioButton').hide();
        if(audio === undefined) {
            audio = new Audio(props.input);
            audio.addEventListener('ended', () => {
                $('#playAudioButton').css('display', 'inline-block');
                $('#pauseAudioButton').hide();
            }, false);
        }
        audio.play();
    }

    // Pauses the recorded audio preview
    const pauseAudio = () => {
        $('#playAudioButton').css('display', 'inline-block');
        $('#pauseAudioButton').hide();
        audio.pause();
    }

    // Pauses the record
    const pause = () => {
        $('#resumeButton').css('display', 'inline-block');
        $('#pauseButton').hide();
        props.pauseRecord();
    }

    // Deletes the record
    const trash = () => {
        $('#voiceControl').hide(250);
        props.trashRecord();
    }

    // Stops the record
    const stop = () => {
        $('#validButton').css('display', 'inline-block');
        $('#stopButton').hide();
        $('#playAudioButton').css('display', 'inline-block');
        $('#resumeButton').hide();
        $('#pauseButton').hide();
        props.stopRecord();
    }

    // Resumes the record after it has been paused
    const resume = () => {
        $('#pauseButton').css('display', 'inline-block');
        $('#resumeButton').hide();
        props.resumeRecord();
    }

    return (
        <div id='voiceControl'>
            <button id='pauseButton' className='voiceControlButton' type='button' onClick={pause}>
                <i className="bi bi-pause-fill"/>
            </button>
            <button id='resumeButton' className='voiceControlButton' type='button' onClick={resume}>
                <i className="bi bi-mic-fill"/>
            </button>
            <button id='playAudioButton' className='voiceControlButton' type='button' onClick={playAudio}>
                <i className="bi bi-play-fill"/>
            </button>
            <button id='pauseAudioButton' className='voiceControlButton' type='button' onClick={pauseAudio}>
                <i className="bi bi-pause-fill"/>
            </button>
            <span id='voiceTime'>
                00:00
            </span>
            <button id='stopButton' className='voiceControlButton' type='button' onClick={stop}>
                <i className="bi bi-stop-fill"/>
            </button>
            <button id='validButton' className='voiceControlButton' type='button'>
                <i className="bi bi-check-lg"/>
            </button>
            <button id='trashButton' className='voiceControlButton' type='button' onClick={trash}>
                <i className="bi bi-trash"/>
            </button>
        </div>
    );
}
