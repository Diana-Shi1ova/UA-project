import "./PreviewAdaptative.css";
import Viewer3D from "../Viewer3D/Viewer3D";
import Video from "../Video/Video";
import Audio from "../Audio/Audio";
import CodeViewer from "../CodeViewer/CodeViewer";
import { FaFileAlt } from "react-icons/fa";
import "./PreviewAdaptative.css";

function PreviewAdaptative ({category, url, name}) {
    switch(category){
        case '2D': return <img src={url} alt={name}></img>
        case '3D': return <Viewer3D modelUrl={url}></Viewer3D>
        case 'Audio': return <Audio audioSrc={url}></Audio>
        case 'Vídeo': return <Video videoSrc={url}></Video>
        case 'Código': return <CodeViewer fileUrl={url}></CodeViewer>
        case 'Otros': return <p className="otros"><FaFileAlt /></p>
    }
}

export default PreviewAdaptative;