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
  DELETE_ADDITIONAL_ORDER,
  PRINT_TAG_DONE,
  CHOICE_CID,
  PRINT_INVOICE_CSV
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
import Component from './upload/react-pdf'

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
  const id = src.id
  // const cid = src.cid
  // const order_no = src.order_no
  // const tei_name = src.tei_name

  const classes = useStyles()

  let imgFile

  // const tagPrintButton = e => {
  //   dispatch({
  //     type: ADD_EVENT_LOG,
  //     tei_name: `${tei_name}様邸の荷札印刷完了しました。`,
  //     operatedAt: '2021-05-05'
  //   })
  //   dispatch({
  //     type: PRINT_TAG_DONE,
  //     tag_print_done: true,
  //     id,
  //   })
  //   console.log('荷札')
  // }


  // const invoicePrintButton = e => {
  //   dispatch({
  //     type: PRINT_INVOICE_CSV,
  //     tag_print_done: true,
  //     id,
  //   })
  //   console.log('送状')
  // }

  // Accept process
  const acceptButton = val => {
    const dt = new Date()
    axios.post('http://localhost:8000/api/tagInformations/', {
      "order_no": val.order_no,
      "cid": val.cid,
      "category": val.cate,
      "accepted_at": dt,
      "accepted_user": 1,
      // "printed_at": "2021-06-16T18:07:00+09:00",
      // "printed_user": 1,
      // "printed_cnt": 1,
      // "invoiced_at": "2021-06-15T18:07:00+09:00",
      // "invoiced_user": 1
    })
      .then(response => { console.log("body:", response.data) })

    dispatch(
      {
        type: ACCEPT_ORDER,
        order_no: val.order_no,
        cid: val.cid,
        category: val.category
      }
    )

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
  // const is_urgent = src.time_designation === "至急" ? true : false
  const is_urgent = src.deadline === "至急" ? true : false

  if (src.vehicle_type === "宅配便") {
    imgFile = "/static/images/deliveryVehicle/yamato.jpeg"
  } else if (src.vehicle_type === "赤帽") {
    imgFile = "/static/images/deliveryVehicle/akabou.jpg"
  }



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
              <td className='add__dueDate'>
                {src.due_date}
              </td>
              <td>
                <button onClick={() => acceptButton(src)}> 受付</button>
                <button onClick={() => deleteButton(src)}> 取消</button>
                <button onClick={() => updateButton(src)}> 更新</button>
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
        <Preview src={src} />
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
        <Done src={src} />

        {/* <button onClick={e => tagPrintButton()}>荷札</button> */}


        {/* <input type='file' onChange={(e) => handleChangeFile(e)} /> */}
        {/* <button onClick={() => uploadFile(dispatch, file)}>明細</button> */}

        {/* <button>
          <RouterLink to='/tags'>荷札</RouterLink>
        </button> */}


        <div>
          {/* <UploadFiles /> */}
          {/* <Component /> */}
        </div>

        {/* <Route path='/tags'>
          <TagLabels src={src} />
        </Route> */}
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
  const divStyle2 = {
    backgroundColor: "yellow",
    dispaly: 'inlineBlock',
    flexDirection: 'row'
  }

  return (
    <div>
      <Button onClick={dialogOpen} size="small" variant="contained" color="primary">
        送状
      </Button>
      <Dialog
        open={open}
        onClose={dialogClose}
        fullWidth="true"
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
  const { src } = props

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
          <Button onClick={dialogClose} color="primary">
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
        fullWidth="true"
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
