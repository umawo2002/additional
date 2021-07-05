import React from 'react'
import { Document, Page } from 'react-pdf';

// import '@styles/react-pdf.styl'

export default class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = { page: 1, base64: null, name: null }
    }

    handleChange(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.setState({
                base64: reader.result,
                name: file.name,
            })
        }
    }

    handleDocumentLoad({ numPages }) {
        this.setState({ numPages })
    }

    handleButtonClick(page) {
        this.setState({ page })
    }

    render() {

        return <div className="component">
            {/* PDFを添付してください: */}
            <input type="file" onChange={this.handleChange.bind(this)} />
            <Document
                file={this.state.base64} style={{ border: 'dotted 1px #aaa' }}
                onLoadSuccess={this.handleDocumentLoad.bind(this)}
            >
                <Page
                    pageNumber={this.state.page}
                    style={{ border: 'solid 2px #000', height: 300 }}
                />
            </Document>
            <div>{this.state.name}</div>
            <button
                disabled={this.state.page <= 0}
                onClick={() => this.handleButtonClick(this.state.page - 1)}
            >Prev</button>
            {this.state.page || 1} / {this.state.numPages || '-'}
            <button
                disabled={this.state.page >= this.state.numPages || !this.state.numPages}
                onClick={() => this.handleButtonClick(this.state.page + 1)}
            >Next</button>

        </div>
    }
}