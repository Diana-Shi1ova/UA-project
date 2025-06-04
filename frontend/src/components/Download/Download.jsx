import "./Download.css";
import { FaDownload } from "react-icons/fa";
import Button from "../Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Download ({downloadButton=false, userId, assetId, downloadList = []}) {
    console.log(downloadList);
    const navigate = useNavigate();
    const download = async () => {
        try {
            const response = await axios.post(
                `api/assets/download/${userId}/${assetId}`,
                { filenames: downloadList }
            );
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
        // navigate();
    }

    return (
        downloadButton ? (
            <Button buttonClass="download" buttonName="Descargar" icon="FaDownload" buttonFunction={download}></Button>
        ) : (
            // <a href="/api/assets/download/683dbff188d0659be32caf64" aria-label="Download">
            //     <FaDownload />
            // </a>
            <button className="download-mini" aria-label="Descargar" onClick={download}><FaDownload /></button>
        )
    );

}

export default Download;