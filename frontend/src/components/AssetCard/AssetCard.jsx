import { Link } from "react-router-dom";
import img_2d from "../../assets/2d-1.jpg";
import Tag from "../Tag/Tag"

import "./AssetCard.css";

function AssetCard(){
    return(
        <article className="asset-card">
            <Link to="/asset">
                <img src={img_2d} alt="" className="asset-image"/>
                <p>Asset 1</p>
            </Link>
            {/* <footer className="card-footer">
                <Tag></Tag>
                <Tag></Tag>
                <Tag></Tag>
            </footer> */}
        </article>
    );
}

export default AssetCard;