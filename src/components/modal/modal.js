import React, { useState } from "react";
import ReactModal from "react-modal";

const MyModal = ({ isOpen, onCancel, data }) => {
    const [subButtonCount, setSubButtonCount] = useState(0);

    const handleMainButtonClick = () => {
        localStorage.setItem("mainLocation", [data.coord.lat, data.coord.lon]);
        localStorage.setItem("mainCity",data.city);
    };

    const handleSubButtonClick = () => {
        if (subButtonCount < 6) {
            let count = subButtonCount + 1;
            while (count <= 6) {
                if (!localStorage.getItem(`sub${count}Location`)) {
                    localStorage.setItem(`sub${count}Location`, [data.coord.lat, data.coord.lon]);
                    localStorage.setItem(`sub${count}City`, data.city);
                    setSubButtonCount(count);
                    break; 
                }
                count++;
            }   
        } else {
            alert("서브 날씨는 최대 6개까지 저장됩니다.");
        }
    };

    return (
        <ReactModal isOpen={isOpen}>
            <div className="section">
                <p className="city-info">{data ? data.city : ""}</p>
                <p className="temperature-info">{data ? `${Math.round(data.main.temp)}°C` : ""}</p>
            </div>
            <button onClick={onCancel}>닫기</button>
            <button onClick={handleMainButtonClick}>메인</button>
            <button onClick={handleSubButtonClick}>서브</button>
        </ReactModal>
    );
};

export default MyModal;
