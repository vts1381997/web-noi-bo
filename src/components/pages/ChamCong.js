import React, { Component } from 'react';
import { Input, Button, Select, Tag, DatePicker, TimePicker, notification } from 'antd';
import moment from 'moment';
import '@styles/request.css';
import '@styles/style.css';
import Request from '@apis/Request'
import $ from 'jquery';
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken';
const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;
const format = 'HH:mm';
const dateFormat = 'MM/DD/YYYY';
const token = cookie.load('token');
const payload = jwt.decode(token);
var formatDateHMS = require('dateformat')
var formatNgay = formatDateHMS(new Date(), "mm/dd/yyyy")
var formatGio = formatDateHMS(new Date(), "HH:MM") 
class Half extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaiDangKy: '',
            loaiChamCong: '0',
            chonNgay: '',
            chonNgayBatDau: formatDateHMS(new Date(), "dd/mm/yyyy"),
            formatGioChamCong: formatGio,
            chonNgayKetThuc: '',
            nguoiDuyetDu: '',
            nguoiDuyetThieu: '',
            lyDo: '',
            name: '',
            registration_time: '',
            day: '',
            date: '',
            person: '',
            reason: ''
        }
    }

    onChangeHalfDay = (day) => {
        this.setState({
            halfDay: day
        });
    }

    onChangeDate = (date) => {
        this.setState({
            selectDate: formatDateHMS(date.target.value, "dd/mm/yyyy")
        });
    }

    onChangePerson = (person) => {
        this.setState({
            selectPerson: person
        });
    }

    onChangeReason = (e) => { 
        if (e.target.value.length > 500) {
            notification['warning']({
                message: 'Thông Báo',
                description: 'Ghi chú không được lớn hơn 500 ký tự'
            })
            $("#txtGhiChu").val('')
        }
        this.setState({
            lyDo: e.target.value
        });
    }

    onChangeLoaiChamCong = (e) => {
        this.setState({
            loaiChamCong: e
        })
    }

    onClickRegistrationHalf = (obj) => { 
        Request('several/insert1', 'POST', obj).then(() => { 
        })
    }
 
    onChange1 = (e) => { 
        this.setState({
            chonNgayBatDau: formatDateHMS(e._d, "dd/mm/yyyy")
        });
    }

    onChangeTimePicker = (e) => { 
        this.setState({
            formatGioChamCong: formatDateHMS(e._d, 'HH:MM')
        })
    }

    onChange2 = (e) => { 
        this.setState({
            chonNgayKetThuc: formatDateHMS(e._d, "dd/mm/yyyy")
        });
    }

    onChangeApprover = (e) => { 
        this.setState({
            nguoiDuyetDu: e
        });
    }

    onChangeApprover1 = (e) => { 
        this.setState({
            nguoiDuyetThieu: e
        });
    }
    
    onChangeA = (e) => {
        document.getElementById("id_name").style.display = 'none';
        document.getElementById("id_name1").style.display = 'block';
        document.getElementById("id_name2").style.display = 'none';
        document.getElementById("id_name5").style.display = 'block';
        document.getElementById("id_name6").style.display = 'block';
        this.setState({
            loaiDangKy: e.target.value
        });
    }

    onChangeD = (e) => {
        document.getElementById("id_name").style.display = 'block';
        document.getElementById("id_name1").style.display = 'none';
        document.getElementById("id_name2").style.display = 'block';
        document.getElementById("id_name5").style.display = 'block';
        document.getElementById("id_name6").style.display = 'block';
        this.setState({
            loaiDangKy: e.target.value
        });
    }
    componentWillMount() { 
    }
    componentDidMount() { 
    }
    onClickRegistration = async () => { 
        Request('chamcong/insert', 'POST', { 
            ten: payload.fullname,
            ngaychamcong: this.state.chonNgayBatDau,
            loaichamcong: this.state.loaiChamCong,
            ghichu: this.state.lyDo,
            giochamcong: this.state.formatGioChamCong
        }).then((res) =>
            notification[res.data.success === true ? 'success' : 'error']({
                message: 'Thông Báo',
                description: res.data.message
            })
        ).catch((err) => {
            console.log(err)
        })
    }




    render() {

        return (
            <div>
                <div id="id_name1" style={{ marginTop: 16, display: '-webkit-inline-box' }}>
                    <Tag color="#f50" style={{ width: '100px' }}>Ngày chấm công</Tag>
                    <InputGroup compact>
                        <DatePicker defaultValue={moment(formatNgay, dateFormat)} onChange={(e) => this.onChange1(e)} format={dateFormat} />
                        <TimePicker defaultValue={moment(formatGio, format)} onChange={(e) => this.onChangeTimePicker(e)} format={format} />
                    </InputGroup>
                </div>
                <div style={{ marginTop: 16 }}>
                    <Tag color="#f50">Loại chấm công</Tag>
                    <Select style={{ width: 294 }} defaultValue="0" onChange={(e) => this.onChangeLoaiChamCong(e)}>
                        <Option value="0">Chấm công vào</Option>
                        <Option value="1">Chấm công ra</Option>
                    </Select>
                </div>
                <div id="id_name5" style={{ marginTop: 16 }}>
                    <TextArea
                        id="txtGhiChu"
                        style={{ width: 400 }}
                        placeholder="Ghi chú"
                        autosize={{ minRows: 3, maxRows: 5 }}
                        onKeyUp={(e) => this.onChangeReason(e)}
                    />
                </div>
                <div id="id_name6" style={{ marginTop: 16 }}>
                    <Button type="primary"
                        onClick={() => this.onClickRegistration()}
                    >Đăng ký</Button>
                </div>
            </div>
        );
    }
}
export default Half;