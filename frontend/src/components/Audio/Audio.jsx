import "./Audio.css";

function Audio ({audioSrc}) {
    return(
        // <audio key={audioSrc} controls autoPlay loop>
        <audio key={audioSrc} controls>
            <source src={audioSrc} />
            Su navegador no soporta <code>audio</code>.
        </audio>
    );
}

export default Audio;