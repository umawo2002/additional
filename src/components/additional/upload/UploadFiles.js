import React, { useRef, useState } from 'react'
import { useFileUpload } from 'use-file-upload'

const UploadFiles = () => {
    const [files, setFiles] = useFileUpload();
    // const inputRef = useRef(null)
    // const onFileInputChange = (e) => {
    //     console.log("onChange")
    //     setFiles([...files, ...e.target.files])
    //     e.target.value = ''
    // }

    // const fileUpload = () => {
    //     console.log(inputRef.current)
    //     inputRef.current.click()
    // }

    // const resetFile = () => {
    //     setFiles([])
    // }

    const defaultSrc =
        "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";
    return (
        <div>
            <p>
                <img src={files?.source || defaultSrc} alt="preview" />
            </p>
            {/* <button onClick={fileUpload}>ファイルアップロード</button>
            <button onClick={resetFile}>リセット</button> */}
            <button
                onClick={() =>
                    setFiles({ accept: "pdf/*" }, ({ name, size, source, file }) => {
                        console.log("Files Selected", { name, size, source, file });
                    })
                }
            >
                明細表
            </button>

            {/* <input
                hidden
                ref={inputRef}
                type="file"
                //multiple
                onChange={onFileInputChange}
            /> */}
        </div>
    )
}

export default UploadFiles
