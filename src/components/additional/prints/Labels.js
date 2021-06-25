import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import './print.css'
import { tagColor } from '../../../utils/common'

class Labels extends Component {
    constructor(props) {
        super(props)
        this.partNo = '000' + this.props.props.parts_no
        this.qrcode = '01' + this.props.props.cid + this.partNo.slice(this.partNo.length - 3, this.partNo.length)
    }

    // ラベル色
    divStyle = {
        backgroundColor: tagColor(this.props.props.color_number)
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <div className="pageWrapper">

                        <div className="makerName">
                            <div>{this.props.props.cust_name}御中</div>
                        </div>
                        <div className="dueDate">
                            <div>{this.props.props.dod}</div>
                            <div className="orderNo">{this.props.props.order_cd}</div>
                        </div>

                        <div className="teiName">
                            <div>{this.props.props.tei_name}様</div>
                        </div>

                        <div className="productName">
                            <div>{this.props.props.product_name}</div>
                        </div>
                        <div className="qty">
                            <div className="qtySize">{this.props.props.qty}</div>
                            <div className="qtyTotalSize">({this.props.props.qty}/{this.props.props.total_qty})</div>
                        </div>
                        <div className="address">
                            <div>{this.props.props.address}</div>
                        </div>

                        <div className="labelHeader">
                            <div className="labelTag">
                                <div style={this.divStyle} className="labelNumber">{this.props.props.tag_number}</div>
                            </div>
                            <div className="labelQr">
                                <QRCode className="qr" value={this.qrcode} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Labels