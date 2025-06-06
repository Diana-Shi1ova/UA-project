import "./Video.css";

function Video(videoSrc=''){
    return(
        <video key={videoSrc} controls autoPlay muted loop>
            <source src="your-video-file.mp4" type="video/mp4" />
            Su navegador no soporta <code>video</code>.
        </video>
    );
}

export default Video;