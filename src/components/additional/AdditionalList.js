import React, { useContext, forwardRef, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Button
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

import axios from 'axios'
import {
  ACCEPT_ORDER,
  ADD_EVENT_LOG,
  // DELETE_ADDITIONAL_ORDER,
  // PRINT_TAG_DONE,
  // CHOICE_CID,
  // PRINT_INVOICE_CSV
} from '../../actions'

import AppContext from '../../contexts/AppContext'

// import { Link as RouterLink, Route } from 'react-router-dom'

import './main.css'
import { tagColor } from '../../utils/common'
import Previews from './prints/Previews'
// import TagLabels from '../../pages/TagLabels'
// import { CenterFocusStrong } from "@material-ui/icons";

import InvoiceCSV from './invoice/InvoiceCSV'

// import UploadFiles from './upload/UploadFiles'
// import Component from './upload/react-pdf'

// React forwardRef
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  ava: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  rounded: {
    color: '#fff',
  }
}))

const AdditionalList = ({ src }) => {
  const componentRef = useRef();
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  let imgFile

  // Accept process
  const acceptButton = val => {
    const dt = new Date()
    axios.post('http://localhost:8000/api/tagInformations/', {
      "order_no": val.order_no,
      "cid": val.cid,
      "category": val.cate,
      "accepted_at": dt,
      "accepted_user": 1,
    })
      .then(response => { console.log("body:", response.data) })
    // stateの書き換え
    dispatch(
      {
        type: ACCEPT_ORDER,
        order_no: val.order_no,
        cid: val.cid,
        category: val.category,
        accepted_at: dt,
        accepted_user: 1
      }
    )
    // Event Log の追加
    dispatch(
      {
        type: ADD_EVENT_LOG,
        tei_name: val.tei_name,
        operatedAt: dt,
      }
    )
    console.log(state)
  }

  // Accept Data Delete Process
  const deleteButton = val => {
    const dt = new Date()
    axios.delete('http://localhost:8000/api/tagInformations/20/', {
      param: { "order_no": val.order_no }
    })
      .then(res => { console.log(res.data) })
    console.log('ACCEPT_DELETE EVENT')

    dispatch({
      type: ADD_EVENT_LOG,
      tei_name: val.tei_name,
      operatedAt: dt
    })
  }

  const printButton = val => {
    const dt = new Date()
    axios.patch('http://localhost:8000/api/tagInformations/1/', {
      printed_at: dt,
      printed_user: '2'
    })
      .then(res => { console.log(res.data) })
      .catch(function (error) {
        console.log(error);
      })

    dispatch({
      type: ADD_EVENT_LOG,
      tei_name: val.tei_name,
      operatedAt: dt
    })
    console.log('print')
  }

  // 処理完了にする
  const orderDone = val => {
    const dt = new Date()
    axios.patch('http://localhost:8000/api/tagInformations/1/', {
      completed_at: dt,
      completed_user: '2'
    })
      .then(res => { console.log(res.data) })
      .catch(function (error) {
        console.log(error);
      })

    dispatch({
      type: ADD_EVENT_LOG,
      tei_name: val.tei_name,
      operatedAt: dt
    })
  }


  // Accept Data Update Process
  // const updateButton = val => {
  //   axios.put('http://localhost:8000/api/tagInformations/3', {
  //     param: { "order_no": val.order_no }
  //   })
  //     .then(res => { console.log(res.data) })
  // }
  const divStyle = {
    backgroundColor: tagColor(src.color_number),
  }

  const cate = src.cate === "1" ? "鉄筋" : "部材"
  const is_iron = src.cate === "1" ? true : false
  const is_invoice = src.vehicle_type === "宅配便" ? true : false
  // const is_urgent = src.time_designation === "至急" ? true : false
  const is_urgent = src.deadline === "至急" && src.accepted_at === "" ? true : false
  const is_accept = src.accepted_at !== "" ? true : false

  if (src.vehicle_type === "宅配便") {
    imgFile = "/static/images/deliveryVehicle/yamato.jpeg"
  } else if (src.vehicle_type === "赤帽") {
    imgFile = "/static/images/deliveryVehicle/akabou.jpg"
  }

  return (
    <div className={'additionalInfoWrapper ' + (is_iron ? 'iron' : 'buzai') + ' ' +
      (is_urgent ? 'backgroundFlush red' : '') + ' ' + (is_accept ? 'backgroundAccept' : '')}>
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
              <td className='add__dueDate'>
                {src.due_date}
              </td>
              <td>
                <button onClick={() => acceptButton(src)}> 受付</button>
                <button onClick={() => deleteButton(src)}> 取消</button>
              </td>
              <td rowSpan='2' className='add__vehicleImage'>
                <Avatar className={classes.square} src={imgFile} >
                  {src.vehicle_type}
                </Avatar>
              </td>
            </tr>
            <tr>
              <td>{cate} </td>
              <td> {src.order_no}</td>
            </tr>
            <tr>
              <td colSpan='3'>
                {src.custname}
              </td>
            </tr>
            <tr>
              <td>
                {src.place}
                {src.time_designation}
              </td>
              <td colSpan='2'>
                {src.deadline}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="operButtonWrapp">
        <Preview onClick={() => printButton(src)} src={src} />
        <ReactToPrint
          trigger={() => (
            <Button size="small" variant="outlined" color="primary">
              印刷
            </Button>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
          <Previews ref={componentRef} cid={src.cid} order={src.order_no} cate={src.cate} />
        </div>
        {is_invoice && <Invoice src={src} />}
        <Done src={src} func={orderDone} />

        {/* <input type='file' onChange={(e) => handleChangeFile(e)} /> */}
        {/* <button onClick={() => uploadFile(dispatch, file)}>明細</button> */}


        <div>
          {/* <UploadFiles /> */}
          {/* <Component /> */}
        </div>
      </div>
    </div>
  );
}

//
// 送状入力
//
const Invoice = props => {
  const [open, setOpen] = useState(false)
  const { src } = props

  const dialogOpen = () => {
    setOpen(true)
  }

  const dialogClose = () => {
    setOpen(false)
  }

  const divStyle = {
    backgroundColor: tagColor(src.color_number),
  }
  // const divStyle2 = {
  //   backgroundColor: "yellow",
  //   dispaly: 'inlineBlock',
  //   flexDirection: 'row'
  // }

  return (
    <div>
      <Button onClick={dialogOpen} size="small" variant="contained" color="primary">
        送状
      </Button>
      <Dialog
        open={open}
        onClose={dialogClose}
        // fullWidth="true"
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={dialogClose} style={{ backgroundColor: '#5F9EA0', borderBottom: '1px solid #DADADA' }}>
          <div style={{ display: 'flex' }}>
            <div style={divStyle} className={'tagNumber'}>
              {src.tag_number}
            </div>
            <div style={{ padding: '0 10px', fontSize: '1.5rem', lineHeight: '3rem', alignItems: 'center', color: 'lightyellow' }}>
              {`${src.tei_name}の送状CSVを生成しますか？`}
            </div>
          </div>
        </DialogTitle>

        <DialogContent dividers style={{ backgroundColor: '#FFF' }}>
          <InvoiceCSV src={src} />
        </DialogContent>

        <DialogActions style={{ backgroundColor: '#5F9EA0', borderTop: '1px solid #DADADA' }} >
          <Button onClick={dialogClose} variant="contained" color="secondary">
            閉じる
          </Button>
          {/* <Button onClick={dialogClose} variant="outlined" color="secondary">
            CSV生成
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}

//
//  処理完了
//
const Done = props => {
  const [open, setOpen] = useState(false)
  const { src, func } = props

  const dialogOpen = () => {
    setOpen(true)
  }

  const dialogClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={dialogOpen} size="small" variant="contained" color="secondary">
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
          <Button onClick={() => func(src)} color="primary">
            完了
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

//
//  プレビュー
//
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
        // fullWidth="true"
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${src.tei_name}を印刷しますか？`}
        </DialogTitle>

        <DialogContent>
          <Previews ref={componentRef} cid={src.cid} order={src.order_no} cate={src.cate} />
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
