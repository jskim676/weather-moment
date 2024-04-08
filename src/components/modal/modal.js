import React, { useState } from "react";
import ReactModal from "react-modal";

const MyModal = ({ isOpen, onCancel, data }) => {
    const [subButtonCount, setSubButtonCount] = useState(0);

    const handleMainButtonClick = () => {
        localStorage.setItem("mainLocation", [data.coord.lat, data.coord.lon]);
        localStorage.setItem("mainCity",data.city);
    };

    const handleSubButtonClick = () => {
        // 저장된 서브 버튼이 6개 미만인 경우에만 저장
        if (subButtonCount < 6) {
            const count = subButtonCount + 1;
            localStorage.setItem(`sub${count}Location`, [data.coord.lat, data.coord.lon]);
            localStorage.setItem(`sub${count}City`, data.city);
            setSubButtonCount(count);
        } else {
            console.log("서브 버튼은 최대 6개까지 저장됩니다.");
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
