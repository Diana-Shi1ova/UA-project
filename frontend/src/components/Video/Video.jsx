import "./Video.css";

function Video(){
    return(
        <video controls autoPlay muted loop>
            <source src="your-video-file.mp4" type="video/mp4" />
            Su navegador no soporta <code>video</code>.
        </video>
    );
}

export default Video;