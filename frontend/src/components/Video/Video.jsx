function Video(){
    return(
        <video width="640" height="360" controls autoPlay muted loop>
            <source src="your-video-file.mp4" type="video/mp4" />
            Su navegador no soporta <code>video</code>.
        </video>
    );
}

export default Video;