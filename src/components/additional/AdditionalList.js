import React, { useContext, forwardRef, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Button
} from '@material-ui/core';
import axios from 'axios'
import {
  ADD_EVENT_LOG,
  DELETE_ADDITIONAL_ORDER,
  PRINT_TAG_DONE,
  CHOICE_CID,
} from '../../actions'

import AppContext from '../../contexts/AppContext'

import { Link as RouterLink, Route } from 'react-router-dom'

import './main.css'
import { tagColor } from '../../utils/common'
import Previews from './prints/Previews'
import TagLabels from '../../pages/TagLabels'

// React forwardRef
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AdditionalList = ({ src }) => {
  const componentRef = useRef();
  const { dispatch } = useContext(AppContext)
  const id = src.id
  const cid = src.cid
  const order_no = src.order_no
  const tei_name = src.tei_name

  const handleClickPrintButton = e => {
    const result = window.confirm(`邸名：${tei_name})を本当に削除しても良いですか？`)
    if (result) {
      dispatch({
        type: ADD_EVENT_LOG,
        tei_name: `イベント(id=)を削除しました。`,
        operatedAt: '2021-05-05'
      })
      dispatch({ type: DELETE_ADDITIONAL_ORDER, id })
    }
  }

  const tagPrintButton = e => {
    dispatch({
      type: ADD_EVENT_LOG,
      tei_name: `${tei_name}様邸の荷札印刷完了しました。`,
      operatedAt: '2021-05-05'
    })
    dispatch({
      type: PRINT_TAG_DONE,
      tag_print_done: true,
      id,
    })
    console.log('荷札')
  }

  const labelChoice = e => {
    dispatch({
      type: CHOICE_CID,
      cid: cid,
      order_no: order_no
    })
  }


  const invoicePrintButton = e => {
    console.log('送状')
  }

  // Accept process
  const acceptButton = d => {
    axios.post('http://localhost:8000/api/tagInformations/', {
      "order_no": d.order_no,
      "cid": d.cid,
      "category": d.cate,
      "accepted_at": "2021-06-15T18:07:00+09:00",
      "accepted_user": 1,
      "printed_at": "2021-06-16T18:07:00+09:00",
      "printed_user": 1,
      "printed_cnt": 1,
      "invoiced_at": "2021-06-15T18:07:00+09:00",
      "invoiced_user": 1
    })
      .then(response => { console.log("body:", response.data) })
  }

  // Accept Data Delete Process
  const deleteButton = val => {
    axios.delete('http://localhost:8000/api/tagInformations/3/', {
      param: { "order_no": val.order_no }
    })
      .then(res => { console.log(res.data) })
  }

  // Accept Data Update Process
  const updateButton = val => {
    axios.put('http://localhost:8000/api/tagInformations/3', {
      param: { "order_no": val.order_no }
    })
      .then(res => { console.log(res.data) })
  }

  const divStyle = {
    backgroundColor: tagColor(src.color_number),
  }

  const cate = src.cate === "1" ? "鉄筋" : "部材"
  const is_iron = src.cate === "1" ? true : false
  const is_invoice = src.vehicle_type === "宅配便" ? true : false
  const is_urgent = src.time_designation === "至急" ? true : false

  return (
    <div className={'additionalInfoWrapper ' + (is_iron ? 'iron' : 'buzai') + ' ' + (is_urgent ? 'backgroundFlush red' : '')}>
      <div className="additioalInfoHeader">
        <div className={'tagCnt ' + (is_iron ? 'tagCntIron' : 'tagCntBuzai')}>{src.cate_number_of_outputs}</div>
        <div style={divStyle} className={'tagNumber'}>
          {src.tag_number}
        </div>
        <div className='add__teiName'>
          {src.tei_name}
        </div>
      </div>
      <div className={'additonalInfoTableWrapp'}>
        <table className={'additonalInfoTable'}>
          <tbody>
            <tr>
              <td className='add__dueDate' colSpan='4'>
                {src.due_date}
                <button onClick={() => acceptButton(src)}> 受付</button>
                <button onClick={() => deleteButton(src)}> 取消</button>
                <button onClick={() => updateButton(src)}> 更新</button>
              </td>
            </tr>
            <tr>
              <td>{cate} </td>
              <td>{src.cate_number_of_outputs}</td>
              <td>{src.maker_short_name}</td>
              <td> {src.order_no}</td>
            </tr>
            <tr>
              <td colSpan='4'>
                {src.custname}
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                {src.place}
              </td>
              <td colSpan='2'>
                {src.vehicle_type} {src.time_designation}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="operButtonWrapp">
        {/* <Preview ref={componentRef} src={src} /> */}
        <Preview src={src} />
        <Done src={src} />
        {/* <button onClick={e => handleClickPrintButton()}>Event</button> */}
        <button onClick={e => tagPrintButton()}>荷札</button>
        <button onClick={e => labelChoice()}>荷札2</button>

        {is_invoice && <button onClick={e => invoicePrintButton()}>送状</button>}

        {/* <input type='file' onChange={(e) => handleChangeFile(e)} />
        <button onClick={() => uploadFile(dispatch, file)}>明細</button> */}

        <button>
          <RouterLink to='/tags'>荷札</RouterLink>
        </button>

        <Route path='/tags'>
          <TagLabels src={src} />
        </Route>

        <ReactToPrint
          trigger={() => (
            <Button size="small" variant="outlined" color="primary">
              印刷
            </Button>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>

          <Previews ref={componentRef} src={src} />
        </div>
      </div>
    </div>
  );
}

//
//  処理完了
//
const Done = props => {
  const [open, setOpen] = useState(false)
  const { src } = props

  const dialogOpen = () => {
    setOpen(true)
  }

  const dialogClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={dialogOpen} size="small" variant="outlined" color="secondary">
        処理完了
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">以下の物件を完了しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>{`${src.tei_name}`}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="secondary">
            キャンセル
          </Button>
          <Button onClick={dialogClose} color="primary">
            完了
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const Preview = props => {
  const componentRef = useRef()
  const [open, setOpen] = useState(false)
  const { src } = props

  const dialogOpen = () => {
    setOpen(true)
  }

  const dialogClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={dialogOpen} size="small" variant="outlined" color="primary">
        プレビュー
      </Button>
      <Dialog
        open={open}
        onClose={dialogClose}
        fullWidth="true"
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${src.tei_name}を印刷しますか？`}
        </DialogTitle>

        <DialogContent>
          {/* <Previews ref={componentRef} src={src} /> */}
          <Previews ref={componentRef} cid={src.cid} order={src.order_no} />
        </DialogContent>

        <DialogActions>
          <Button onClick={dialogClose} variant="outlined" color="secondary">
            キャンセル
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button variant="outlined" color="primary">
                印刷
              </Button>
            )}
            content={() => componentRef.current}
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default AdditionalList
