import "./AudioListed.css";
/*import ReactPlayer from 'react-player';*/
import Like from "../Like/Like";
import { Link } from "react-router-dom";

function AudioListed({audioSrc}){
    return(
        <div className="audio-list-element">
            <Link to="/asset?id=381749283"><p>Audio 1</p></Link>
            <audio controls autoPlay loop>
                <source src={audioSrc} />
                Su navegador no seporta <code>audio</code>.
            </audio>
            <Like></Like>
        </div>

        // <div className="player-wrapper" style={{ position: 'relative', paddingTop: '56.25%' }}>
        // <ReactPlayer
        // url="my-audio.mp3"
        // controls={true}
        // playing={false}
        // height="50px"
        // />
        // </div>
    );
}

export default AudioListed;