import React, { useContext, forwardRef, useRef, useState } from "react";
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
} from '../../actions'

import AppContext from '../../contexts/AppContext'

import './main.css'
import { tagColor } from '../../utils/common'

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

const SpotList = ({ src }) => {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  let imgFile
  const weekDay = ["日", "月", "火", "水", "木", "金", "土"]

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

  const divStyle = {
    backgroundColor: tagColor(src.color_number),
  }

  const is_iron = src.cate === "1" ? true : false
  const is_invoice = src.vehicle_type === "宅配便" ? true : false
  const is_urgent = src.deadline === "至急" && src.accepted_at === "" ? true : false
  const is_accept = src.accepted_at !== "" ? true : false

  if (src.vehicle_type === "宅配便") {
    imgFile = "/static/images/deliveryVehicle/yamato.jpeg"
  } else if (src.vehicle_type === "赤帽") {
    imgFile = "/static/images/deliveryVehicle/akabou.jpg"
  }

  const due = new Date(src.due_date)

  return (
    <div className={'additionalInfoWrapper ' + (is_iron ? 'iron' : 'buzai') + ' ' +
      (is_urgent ? 'backgroundFlush red' : '') + ' ' + (is_accept ? 'backgroundAccept' : '')}>
      <div className="additioalInfoHeader">
        <div className='add__teiName'>
          {due.getMonth() + 1}/{due.getDate()}({weekDay[due.getDay()]}) {src.place} {src.contents}
        </div>
      </div>
      <div className={'additonalInfoTableWrapp'}>
        <table className={'additonalInfoTable'}>
          <tbody>
            <tr>
              <td colSpan="3">{src.order_name}</td>
            </tr>
            <tr>
              <td className='add__dueDate'>
                {due.getMonth()}月{due.getDate()}日
              </td>
              <td rowSpan='2' className='add__vehicleImage'>
                <Avatar className={classes.square} src={imgFile} >
                  {src.vehicle_type}
                </Avatar>
              </td>
            </tr>
            <tr>
              <td>{src.contents}</td>
              <td>{src.order_no}</td>
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
        <div>
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
export default SpotList
