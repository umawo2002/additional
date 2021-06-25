import QRCode from 'qrcode.react'
import './print.css'
import { tagColor } from '../../../utils/common'

const Labels = ({ val }) => {
    // ラベル色
    const divStyle = {
        backgroundColor: tagColor(val.color_number)
    }
    const partNo = '000' + val.parts_no
    const qrcode = '01' + val.cid + partNo.slice(partNo.length - 3, partNo.length)

    return (
        <div>
            {/* <input type="button" value="印刷" className="noprint" onclick="window.print();" /> */}
            <div className="wrapper">
                <div className="pageWrapper">
                    <div className="labelHeader">
                        <div className="labelTag">
                            <div style={divStyle} className="labelNumber">{val.tag_number}</div>
                        </div>
                        <div className="labelQr">
                            <QRCode className="qr" value={qrcode} />
                        </div>
                    </div>
                    <div className="makerName">
                        <div>{val.cust_name}御中</div>
                    </div>
                    <div className="dueDate">
                        <div>{val.dod}</div>
                        <div className="orderNo">{val.order_cd}</div>
                    </div>

                    <div className="teiName">
                        <div>{val.tei_name}様</div>
                    </div>

                    <div className="productName">
                        <div>{val.product_name}</div>
                    </div>
                    <div className="qty">
                        <div className="qtySize">{val.qty}</div>
                        <div className="qtyTotalSize">({val.qty}/{val.total_qty})</div>
                    </div>
                    <div className="address">
                        <div>{val.address}</div>
                    </div>
                    <div className="labelFooter">33</div>
                </div>
            </div>
        </div>
    )
}
export default Labels