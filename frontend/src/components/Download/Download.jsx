import "./Download.css";
import { FaDownload } from "react-icons/fa";
import Button from "../Button/Button";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Download ({downloadButton=false, userId, assetId, downloadList = [], downloadDisabled=false}) {
    console.log(downloadList);
    const navigate = useNavigate();
    /*const download = async () => {
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
    }*/

    /*const download = () => {
        axios.post(`/api/assets/download/${userId}/${assetId}`,
            { filenames: downloadList },
            { responseType: 'arraybuffer' }
        )
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        // navigate();
    }*/

    const download = () => {
        axios.post(
            `${import.meta.env.VITE_API_URL}/api/assets/download/${userId}/${assetId}`,
            { filenames: downloadList },
            { responseType: 'arraybuffer' }
        )
        .then(response => {
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'downloaded-file';
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if (match && match[1]) filename = match[1];
            }
            
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }




    return (
        downloadButton ? (
            <Button buttonClass="download" buttonName="Descargar" icon="FaDownload" buttonFunction={download} buttonDisabled={downloadDisabled}></Button>
        ) : (
            // <a href="/api/assets/download/683dbff188d0659be32caf64" aria-label="Download">
            //     <FaDownload />
            // </a>
            <button className="download-mini" aria-label="Descargar" onClick={download}><FaDownload /></button>
        )
    );

}

export default Download;