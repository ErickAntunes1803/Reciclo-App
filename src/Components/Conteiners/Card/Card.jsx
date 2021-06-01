import React from 'react';
import './card.css';
import { BiRecycle } from "react-icons/bi";

const Card = (props) => {

    return (
        <div className="card">
            <div className={`cardbody`}>
                <div className={`circuloCard bg-${props.color} `}> <i className="iconCard"><BiRecycle size={32} /> </i></div>
                <p className="textCard">{props.texto}</p>

            </div>

        </div>
    );
}

export default Card;