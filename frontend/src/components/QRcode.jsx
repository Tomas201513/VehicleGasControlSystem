import PropTypes from "prop-types";
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';

function QRcode({ id }) {
    const qrCodeRef = useRef();

    const exportToPng = () => {
        const qrCodeElement = qrCodeRef.current;
        if (!qrCodeElement) return;

        html2canvas(qrCodeElement, {
            backgroundColor: null,
            scale: 4,
            useCORS: true,
        }).then((canvas) => {
            const maxSize = Math.max(canvas.width, canvas.height);
            const squareSize = maxSize + Math.max(qrCodeElement.offsetWidth, qrCodeElement.offsetHeight);
            const squareCanvas = document.createElement('canvas');
            const squareCtx = squareCanvas.getContext('2d');

            squareCanvas.width = squareSize;
            squareCanvas.height = squareSize;

            const offsetX = (squareSize - canvas.width) / 2;
            const offsetY = (squareSize - canvas.height) / 2;

            squareCtx.drawImage(canvas, offsetX, offsetY);

            const imgData = squareCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'qr_code.png';
            link.click();
        });
    };

    return (
        <div>
            <div ref={qrCodeRef}>
                <QRCodeSVG value={id} size={1000} level={"H"} includeMargin={true} width={256} height={256} x={100} y={100} />
            </div>
            <Button onClick={exportToPng}>Export as PNG</Button>

        </div>
    );
}

export default QRcode;

QRcode.propTypes = {
    id: PropTypes.string.isRequired,
};



//export in pdf
// import PropTypes from "prop-types";
// import React, { useRef } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import jsPDF from 'jspdf';

// function QRcodeCode({ id }) {
//     const qrCodeRef = useRef();

//     const exportToPdf = () => {
//         html2canvas(qrCodeRef.current).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF();
//             pdf.addImage(imgData, 'PNG', 0, 0);
//             pdf.save('qr_code.pdf');
//         });
//     };

//     return (
//         <div>
//             <div ref={qrCodeRef}>
//                 <QRCodeSVG value="https://example.com" />
//             </div>
//             <button onClick={exportToPdf}>Export as PDF</button>
//         </div>
//     );
// }
// QRcodeCode.propTypes = {
//     id: PropTypes.string.isRequired,
// };

// export default QRcodeCode;