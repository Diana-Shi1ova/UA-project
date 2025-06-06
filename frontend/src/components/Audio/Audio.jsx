import "./Audio.css";

function Audio ({audioSrc}) {
    return(
        <audio key={audioSrc} controls autoPlay loop>
            <source src={audioSrc} />
            Su navegador no soporta <code>audio</code>.
        </audio>
    );
}

export default Audio;