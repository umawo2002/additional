import React, { Component } from 'react'
import axios from 'axios'
import QRCode from 'qrcode.react'
import { tagColor } from '../../../utils/common'
import './print.css'

class Previews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tagInfo: []
        }
    }

    componentDidMount() {
        axios.get(`http://sv8/api/additional/getLabelsInfo/${this.props.cid}/${this.props.order}`)
            .then(response => {
                console.log(response.data + ' Did ')
                this.setState({ tagInfo: response.data })
            })
    }

    render() {
        return (
            <div ref={this.props.ref}>
                {this.state.tagInfo.map((val) => {
                    this.partNo = '000' + val.parts_no
                    this.qrcode = '01' + val.cid + this.partNo.slice(this.partNo.length - 3, this.partNo.length)

                    // ラベル色
                    this.divStyle = {
                        backgroundColor: tagColor(val.color_number)
                    }
                    return (
                        <div>
                            <div className="wrapper">
                                <div className="pageWrapper">

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

                                    <div className="labelHeader">
                                        <div className="labelTag">
                                            <div style={this.divStyle} className="labelNumber">{val.tag_number}</div>
                                        </div>
                                        <div className="labelQr">
                                            <QRCode className="qr" value={this.qrcode} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Previews
