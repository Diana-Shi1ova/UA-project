import "./Audio.css";

function Audio ({audioSrc}) {
    return(
        <audio controls autoPlay loop>
            <source src={audioSrc} />
            Su navegador no soporta <code>audio</code>.
        </audio>
    );
}

export default Audio;