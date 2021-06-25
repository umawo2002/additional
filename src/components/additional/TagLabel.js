import React, { useContext } from 'react'
import AppContext from '../../contexts/AppContext'
// import axios from 'axios'
// import QRCode from "qrcode.react"

import {
    ADD_EVENT_LOG,
    LABEL_DELETE
} from '../../actions'

const TagLabel = ({ src }) => {
    // const componentRef = useRef();
    const { dispatch } = useContext(AppContext)

    let back_color
    switch (src.color_number) {
        case "0": back_color = "glay"; break
        case "1": back_color = "green"; break
        case "2": back_color = "red"; break
        case "3": back_color = "blue"; break
        default: back_color = "glay";
    }

    const divStyle = {
        backgroundColor: back_color,
    }

    const DeleteLabel = e => {
        const result = window.confirm(`製品名：${src.product_name} を削除しても良いですか？`)
        if (result) {
            dispatch({
                type: ADD_EVENT_LOG,
                tei_name: `ラベルを削除しました。`,
                operatedAt: Date()
            })
            dispatch({ type: LABEL_DELETE, src })
        }

    }

    const PrintLabel = e => {
        console.log(e)
    }

    return (
        <div className="lbl__wrapper" >
            <div className="lbl__pageWrapper">
                <div className="labelHeader">
                    <div className="labelTag">
                        <div style={divStyle} className="labelNumber">{src.tag_number}</div>
                    </div>
                    <div>
                        {src.parts_no}
                    </div>
                    {/* <div className="labelQr">
                        <QRCode className="qrCode" value={src.cid} />
                    </div> */}
                    <div className="operArea">
                        <input type="button" value="印刷しない" onClick={(e) => DeleteLabel({ src })} />
                        <input type="button" value="印刷" className="noprint" onClick={(e) => PrintLabel({ src })} />
                    </div>
                </div>
                <div className="makerName">
                    <div>{src.cust_name}御中</div>
                </div>
                <div className="dueDate">
                    <div>{src.dod}</div>
                </div>

                <div className="teiName">
                    <div>{src.tei_name}</div>
                </div>

                <div className="productName">
                    <div>{src.product_name}</div>
                </div>
                <div className="qty">
                    <div className="qtySize">{src.qty}</div>
                    <div className="qtyTotalSize">{src.qty_total}</div>
                </div>
                <div className="address">
                    <div>{src.address}</div>
                </div>
                <div className="labelFooter">{src.tag_number}</div>
            </div>
        </div>
    )
}
export default TagLabel
