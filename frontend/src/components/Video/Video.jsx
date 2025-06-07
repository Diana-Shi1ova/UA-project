import "./Video.css";

function Video({videoSrc=''}){
    console.log(videoSrc);
    return(
        // <video key={videoSrc} controls autoPlay muted loop>
        <video key={videoSrc} controls loop>
            <source src={videoSrc} type="video/mp4" />
            Su navegador no soporta <code>video</code>.
        </video>
    );
}

export default Video;