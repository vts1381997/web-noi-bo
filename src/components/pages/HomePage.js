import React, { Component } from 'react';
import Request from '@apis/Request'
import { Pie, Bar, HorizontalBar } from 'react-chartjs-2';
import { Card, Form, Col, Row, Icon, Tooltip, DatePicker, Tabs, Table, Typography, Divider, Button, Statistic, Descriptions, Select, notification } from 'antd';
import cookie from 'react-cookies'
import moment from 'moment';
import { NavLink } from 'react-router-dom'
import { Value } from 'devextreme-react/range-selector';
import { async } from 'q';
import Modal_Hotro from '@pages/Modal/Modal_Hotro.js'
import AppHeader from '../base/AppHeader'
const { Option } = Select
var formatDate = require('dateformat')
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Column } = Table;
const { Text } = Typography;
const ButtonGroup = Button.Group;
const dateFormat = 'YYYY/MM/DD';
var format = require('dateformat')
var data = {
    labels: [
        'Nam',
        'Nữ',
        'Giới Tính'
    ],
    datasets: [{
        data: [2, 5, 5],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }],
};

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pageNumber: 1,
            page: 1,
            pageSize: 10,
            countNhanSu: 1,
            countKhachHang: 1,
            countDuAn: 1,
            countHopDong: 1,
            sortBy: '',
            index: 'ns_id',
            khachhangs: [],
            dataChartjs: [],
            dataGetFollowMonth: {},
            dataGetFollowMonthBar: {},
            valueMonth: [moment('2020/01/01', dateFormat), moment('2020/12/01', dateFormat)],
            valueYear: [moment('2019/01/01', dateFormat), moment('2020/12/30', dateFormat)],
            stateOpenRangePicker: false,
            myself: [],
            dataNguoiTao: [],
            dataRank: [],
            dataKhachHang: [],
            selectedRowKeys: [],
            stateSelect: true,
            valueOption: null,
            rowRecordSelected: [],
            id_duanfillmodal: [],
            nhansu: [],
            khachhang: [],
            donvis: [],
            date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</a>,
            trangthaibutton: false,
        }
    }

    getNhansu = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        Request('nhansu/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        }).then(async (res) => {
            var countGioiTinhNam = 0
            var countGioiTinhNu = 0
            if (res.data.data.resGioitinh) {
                await res.data.data.resGioitinh.forEach(element => {
                    if (element.ns_gioitinh === "Nam") {
                        countGioiTinhNam++
                    }
                    if (element.ns_gioitinh === "Nữ")
                        countGioiTinhNu++
                });
                await this.setState({
                    nhansu: res.data.data.nhansu,
                    countNhanSu: res.data.data.count,
                    dataChartjs: [countGioiTinhNam, countGioiTinhNu, (res.data.data.count - countGioiTinhNam - countGioiTinhNu)]
                })
                data.datasets[0].data = await [countGioiTinhNam, countGioiTinhNu, (res.data.data.count - countGioiTinhNam - countGioiTinhNu)]
            }
        })
        Request('hotro/getkhachhang', 'POST', {}).then((res) => {
            if (res.data.data.khachhangs) {
                this.setState({
                    countKhachHang: res.data.data.khachhangs.length
                })
            }
        })
        Request('hotro/getidduan', 'POST', {}).then(async (res) => {
            if (res.data.data.duans) {
                await this.setState({
                    countDuAn: res.data.data.duans.length
                })
            }
        })
        var user_cookie = cookie.load('user');
        Request('hotro/getmyself', 'POST', {
            user_cookie,
            pageSize: this.state.pageSize,
            pageNumber: this.state.page,
            index: this.state.index,
            sortBy: this.state.sortBy
        }).then(async (res) => {
            if (res.data.data.myself) {
                await this.setState({
                    myself: res.data.data.myself
                })
            }
        })
        Request('hotro/gethopdong', 'POST', {})
            .then(async (response) => {
                if (response) {
                    await this.setState({
                        countHopDong: Number(response.data.data.hopdongs.length)
                    })
                }
            })
    }

    getDataDaxong = () => {
        var user_cookie = cookie.load('user');
        Request('hotro/getmyselfdaxong', 'POST', { user_cookie }).then((res) => {
            if (res.data.data.myself) {
                this.setState({
                    myself: res.data.data.myself
                })
            }
        })
    }

    getDataGap = () => {
        var user_cookie = cookie.load('user');
        Request('hotro/getmyselfgap', 'POST', { user_cookie }).then((res) => {
            if (res.data.data.myselfGap) {
                this.setState({
                    myself: res.data.data.myselfGap
                })
            }
        })
    }

    getDataNguoiTao = () => {
        var user_cookie = cookie.load('user');
        Request('hotro/getdatanguoitao', 'POST', { user_cookie }).then((res) => {
            if (res.data.data.dataNguoiTao) {
                this.setState({
                    dataNguoiTao: res.data.data.dataNguoiTao
                })
            }
        })
    }

    getDataAllDaTao = () => {
        var userDatao = cookie.load('user');
        Request('hotro/getmyself', 'POST', { userDatao }).then((res) => {
            if (res.data.data.myself) {
                this.setState({
                    dataNguoiTao: res.data.data.myself
                })
            }
        })
    }

    getDataGapDaTao = () => {
        var userDatao = cookie.load('user');
        Request('hotro/getmyselfgap', 'POST', { userDatao }).then((res) => {
            if (res.data.data.myselfGap) {
                this.setState({
                    dataNguoiTao: res.data.data.myselfGap
                })
            }
        })
    }

    getDataDaxongDaTao = () => {
        var userDaTao = cookie.load('user');
        Request('hotro/getmyselfdaxong', 'POST', { userDaTao }).then((res) => {
            if (res.data.data.myself) {
                this.setState({
                    dataNguoiTao: res.data.data.myself
                })
            }
        })
    }

    componentDidMount() {
        this.getNhansu(this.state.pageNumber, this.state.index, this.state.sortBy);
        this.getDataNguoiTao()
        this.getHotroFollowMonth('2020-01-01', '2020-12-31')
        document.getElementsByClassName('ant-statistic-title')[0].style.fontSize = '18px'
        document.getElementsByClassName('ant-statistic-title')[1].style.fontSize = '18px'
        document.getElementsByClassName('ant-statistic-title')[2].style.fontSize = '18px'
        document.getElementsByClassName('ant-statistic-title')[3].style.fontSize = '18px'
        document.getElementsByClassName('ant-table-expand-icon-th')[0].innerHTML = 'Yêu cầu / Ghi chú'
        document.getElementsByClassName('ant-table-expand-icon-th')[0].style.display = 'block'
    }

    onClick = () => {
    }

    setValueMonth = (valueMonth) => {
        this.setState({ valueMonth })
    }

    setValueYear = (valueYear) => {
        this.setState({ valueYear })
    }

    getHotroFollowMonth = (monthStart, monthEnd) => {
        Request('hotro/getfollowmonth', 'POST', { monthStart, monthEnd }).then(async (res) => {
            var arrayName = []
            var arrayCount = []
            var arrayBackGround = []
            if (res.data.rows === undefined) { return }
            this.setState({
                dataRank: res.data.rows
            })
            res.data.rows.map((value, index) => {
                arrayName.push(value.ns_hovaten)
                arrayCount.push(value.count)
                arrayBackGround.push(this.getRandomColor())
            })
            var dataFollowMonth = {
                labels: [],
                datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }]
            }
            dataFollowMonth.labels = arrayName
            dataFollowMonth.datasets[0].data = arrayCount
            dataFollowMonth.datasets[0].backgroundColor = arrayBackGround
            dataFollowMonth.datasets[0].hoverBackgroundColor = arrayBackGround
            console.log(dataFollowMonth,'dataFollowMonth');
            
            await this.setState({
                dataGetFollowMonth: dataFollowMonth
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    onChangeTab = (key) => {
        if (key === "1") {
            this.getHotroFollowMonth('2020-01-01', '2020-12-31')
        }
        else {
            this.getHotroFollowMonth('2019-01-01', '2020-12-31')
        }
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedId: selectedRowKeys
        });
        if (selectedRowKeys.length > 0) {
            this.setState({
                stateSelect: false,
                valueOption: selectedRows[0].ht_trangthai
            })
        }
        else
            this.setState({
                stateSelect: true,
                valueOption: null
            })
        if (selectedRowKeys.length === 1) {
            this.setState({
                statebuttonedit: false,
                rowRecordSelected: selectedRows[0]
            })
        }
        else
            this.setState({
                statebuttonedit: true
            })
    };

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.ht_id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.ht_id], [row])
        }
    }

    setRowClassName = (record) => {
        return record.ht_id === this.state.selectedRowKeys[0] ? 'clickRowStyl' : '';
    }

    onChangeSelected = (ht_trangthai) => {
        var values = this.state.rowRecordSelected
        if (ht_trangthai === "daxong") {
            values.ht_thoigian_hoanthanh = format(new Date(), "yyyy-mm-dd")
            values.ht_thoigian_dukien_hoanthanh = format(new Date(), "yyyy-mm-dd")
        }
        else {
            values.ht_thoigian_hoanthanh = null
        }
        if (values.ht_thoigian_dukien_hoanthanh === null) {
            values.ht_thoigian_dukien_hoanthanh = format(new Date(), "yyyy-mm-dd")
        }
        values.ht_trangthai = ht_trangthai
        let user_cookie = cookie.load('user');
        values.ns_id_capnhat = user_cookie
        values.nkht_thoigiancapnhat = new Date()
        this.setState({
            rowRecordSelected: values
        })
        Request('hotro/update', 'POST', values).then(async (response) => {
            if (response.status === 200 & response.data.success === true) {
                this.setState({
                    message: response.data.message
                })
            }
            var description = response.data.message
            var notifi_type = 'success'
            var message = 'Thành Công'
            if (await !!!response.data.success) {
                message = 'Có lỗi xảy ra !'
                notifi_type = 'error'
                description = response.data.message.map((value, index) => {
                    return <Alert type='error' message={value}></Alert>
                })
            }
            await notification[notifi_type]({
                message: message,
                description: description
            });
            this.getNhansu(this.state.page)
        }).catch((err) => {
            console.log(err)
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            id_visible: false
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    showModal = async () => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.setFieldsValue({ ht_thoigiantiepnhan: format(new Date(), "yyyy-mm-dd") });
        var user_cookie = cookie.load('user');
        await form.setFieldsValue({ ns_id_nguoitao: user_cookie })
        this.set_Select_id_duan();
        this.set_Select_NhanSu();
        this.set_Select_KhachHang(null);
        this.set_Select_DonVi();
    }

    insertOrUpdate = async () => {
        const { form } = await this.formRef.props;
        await form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = 'hotro/insert'
            if (url === 'hotro/update') {
                let user_cookie = cookie.load('user');
                values.ns_id_capnhat = user_cookie
                values.nkht_thoigiancapnhat = new Date()
            }
            if (values.ht_thoigian_dukien_hoanthanh === null) {
                values.ht_thoigian_dukien_hoanthanh = format(new Date(), 'yyyy-mm-dd')
            }
            Request(url, 'POST', values)
                .then(async (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visible: false,
                            message: response.data.message
                        })
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thanh Cong'
                    if (await !!!response.data.success) {
                        message = 'Co loi xay ra !'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    await notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getNhansu()
                }).catch((err) => {
                    console.log(err)
                })
        })
    }

    set_Select_id_duan() {
        Request('hotro/getidduan', 'POST', {}).then((res) => {
            if (res.data.data.duans) {
                this.setState({
                    id_duanfillmodal: res.data.data.duans
                })
            }
        })
    }

    set_Select_NhanSu() {
        Request('hotro/getnhansu', 'POST', {}).then((res) => {
            if (res.data.data.nhansu) {
                this.setState({
                    nhansu: res.data.data.nhansu
                })
            }
        })
    }

    set_Select_DonVi() {
        Request('hotro/getdonvi', 'POST', {}).then((res) => {
            if (res.data.data.donvis) {
                this.setState({
                    donvis: res.data.data.donvis
                })
            }
        })
    }

    onTodoChange = async (value) => {
        const { form } = this.formRef.props
        if (value === "daxong") {
            await this.setState({
                date: format(new Date(), "dd / mm / yyyy -- HH : MM : ss"),
                trangthai: true
            })
            form.setFieldsValue({ ht_thoigian_hoanthanh: format(new Date(), "yyyy-mm-dd") })
            form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: format(new Date(), "yyyy-mm-dd") })
        }
        else {
            await this.setState({
                date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</a>,
                trangthai: false
            })
            form.setFieldsValue({ ht_thoigian_hoanthanh: null })
        }
    }

    Assignme = () => {
        var user_cookie = cookie.load('user');
        Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
            if (res) {
                if (res.data.data.name[0] === undefined) {
                    this.setState({
                        trangthaibutton: true
                    })
                }
                else {
                    var ns_id = res.data.data.name[0].ns_id
                    const { form } = this.formRef.props
                    form.setFieldsValue({ ns_id_ass: ns_id })
                    this.setState({
                        trangthaibutton: true
                    })
                }
            }
        })
    }

    set_Select_KhachHang(dv) {
        if (dv === null) {
            dv = ""
        }
        Request('hotro/getkhachhangwhere', 'POST', { dv }).then((res) => {
            if (res.data.data.khachhangs) {
                this.setState({
                    khachhang: res.data.data.khachhangs
                })
            }
        })
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            columnWidth: '60px',
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Form>
                    <div style={{ background: '#ECECEC', padding: '20px' }}>
                        <div id="dasboard-widget-top">
                            <Row gutter={16}>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <NavLink to="/nhansu" >
                                            <Statistic
                                                title={
                                                    <span style={{ marginLeft: '25px' }}>
                                                        Nhân Sự
                                                    <Tooltip title="Số lượng Nhân Sự">
                                                            <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                        </Tooltip>
                                                    </span>
                                                }
                                                prefix={<Icon type="user" style={{ marginLeft: '55px' }} />}
                                                style={{ color: '1890ff' }}
                                                valueStyle={{ fontSize: '30px', color: 'red', borderTop: '1px solid #e8e8e8' }}
                                                formatter={value => {
                                                    return (
                                                        <div style={{ display: 'inline-block', padding: '0px', position: 'absolute' }}>
                                                            <div style={{ float: 'left', display: 'inline-block' }} >
                                                                <span> {this.state.countNhanSu}</span>
                                                            </div>
                                                            <div style={{ float: 'right', display: 'inline-block', marginLeft: '15px', marginTop: '5px' }}>
                                                                <span style={{ fontSize: '12px', display: 'block' }}>Nam: {this.state.dataChartjs[0]}</span>
                                                                <span style={{ fontSize: '12px', display: 'block' }}>Nữ: {this.state.dataChartjs[1]}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            />
                                        </NavLink>
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <NavLink to="/khachhang" >
                                            <Statistic
                                                title={
                                                    <span>
                                                        Khách Hàng
                                                        <Tooltip title="Số lượng Khách Hàng">
                                                            <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                        </Tooltip>
                                                    </span>
                                                }
                                                value={this.state.countKhachHang}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<Icon type="team" />}
                                                style={{ textAlign: 'center' }}
                                                valueStyle={{ fontSize: '30px', color: 'orange', borderTop: '1px solid #e8e8e8' }}
                                            />
                                        </NavLink>
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <NavLink to="/duan" >
                                            <Statistic
                                                title={
                                                    <span>
                                                        Dự Án
                                                        <Tooltip title="Số lượng Dự Án">
                                                            <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                        </Tooltip>
                                                    </span>
                                                }
                                                value={this.state.countDuAn}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<Icon type="project" />}
                                                style={{ textAlign: 'center' }}
                                                valueStyle={{ fontSize: '30px', color: 'brown', borderTop: '1px solid #e8e8e8' }}
                                            />
                                        </NavLink>
                                    </Card>
                                </Col>
                                <Col span={6} >
                                    <Card hoverable='true'>
                                        <NavLink to="/hopdong" >
                                            <Statistic
                                                title={
                                                    <span>
                                                        Hợp Đồng
                                                        <Tooltip title="Số lượng Hợp Đồng">
                                                            <Icon style={{ marginLeft: '60px', fontSize: '13px' }} type="info-circle" />
                                                        </Tooltip>
                                                    </span>
                                                }
                                                value={this.state.countHopDong}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<Icon type="file-text" />}
                                                style={{ textAlign: 'center' }}
                                                valueStyle={{ fontSize: '30px', color: 'lime', borderTop: '1px solid #e8e8e8' }}
                                            />
                                        </NavLink>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <Row style={{ marginTop: '15px' }}>
                            <Card>
                                <Text mark style={{ fontSize: '18px', marginBottom: '10px', color: '#1890ff' }}>Bảng công việc cá nhân</Text>
                                <Divider style={{ margin: '5px' }} />
                                <Tabs type="card">
                                    <TabPane tab="Công việc được giao" key="10">
                                        <Row>
                                        </Row>
                                        <Row>
                                            <Col span={4} style={{ fontSize: '16px' }}>Trạng thái công việc</Col>
                                            <Col span={3}>
                                                <Select
                                                    showSearch
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    style={{ zIndex: 999 }}
                                                    disabled={this.state.stateSelect}
                                                    value={this.state.valueOption}
                                                    onChange={this.onChangeSelected}
                                                >
                                                    <Option value='tiepnhan'>Tiếp Nhận</Option>
                                                    <Option value='dangxuly'>Đang xử lý</Option>
                                                    <Option value='dangxem'>Đang xem</Option>
                                                    <Option value='daxong'>Đã xong</Option>
                                                </Select>
                                            </Col>
                                            <Col span={3} offset={8}>
                                                <span style={{ fontSize: '16px' }}>Loại công việc</span>
                                            </Col>
                                            <Col span={6}>
                                                <ButtonGroup style={{ marginBottom: '5px', zIndex: 999 }} >
                                                    <Button onClick={this.getNhansu.bind(this)}>Tất cả</Button>
                                                    <Button onClick={this.getDataGap.bind(this)}>Gấp</Button>
                                                    <Button onClick={this.getDataDaxong.bind(this)}>Đã xong</Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                        <Table bordered dataSource={this.state.myself}
                                            rowKey="ht_id"
                                            size="small"
                                            scroll={{ x: 500 }}
                                            rowSelection={rowSelection}
                                            onRowClick={this.onRowClick.bind(this)}
                                            expandedRowRender={(record, selectedRowKeys) => {
                                                return (
                                                    <div style={{ textAlign: 'left' }}>
                                                        <div style={{ fontSize: '18px' }}> Yêu cầu: </div>
                                                        <Row style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1200' }} >{this.state.myself[selectedRowKeys].ht_noidungyeucau}</Row>
                                                        <div style={{ paddingTop: '10px', fontSize: '18px' }}> Ghi chú: </div>
                                                        <Row style={{ paddingTop: '7px' }}>{this.state.myself[selectedRowKeys].ht_ghichu}</Row>
                                                    </div>
                                                )
                                            }}
                                            rowClassName={this.setRowClassName.bind(this)}
                                        >
                                            <Column title="Dự án" dataIndex="dm_duan_ten" width={150} />
                                            <Column title="Khách hàng" dataIndex="kh_ten" width={100} className="hidden-action" />
                                            <Column title="Người tạo" dataIndex="ns_hoten" width={150} />
                                            <Column title="Người được giao" dataIndex="ns_hovaten" width={150} />
                                            <Column title="Trạng thái" dataIndex="ht_trangthai" width={100}
                                                render={
                                                    text => {
                                                        if (text === 'tiepnhan') { return 'Tiếp nhận' }
                                                        if (text === 'dangxuly') { return 'Đang xử lý' }
                                                        if (text === 'dangxem') { return "Đang xem" }
                                                        return "Đã xong"
                                                    }
                                                }
                                            />
                                            <Column title="Phân loại" dataIndex="ht_phanloai" width={70}
                                                render={text => {
                                                    if (text === 'bug') { return "Lỗi" }
                                                    if (text === 'new') { return "Việc mới" }
                                                    if (text === 'nc') { return "Nghiên cứu" }
                                                    else return "Khác"
                                                }}
                                            />
                                            <Column title="Ưu tiên" dataIndex="ht_uutien" width={50}
                                                render={text => {
                                                    if (text === 'GAP') { return <span> <Icon type="double-right" style={{ transform: 'rotate(-90deg)', color: 'red' }} /></span> }
                                                    if (text === 'CAO') { return <span> <Icon type="up" style={{ color: 'orange' }} /></span> }
                                                    if (text === 'TB') { return <span> <Icon type="pause" style={{ transform: 'rotate(-90deg)', color: 'gold' }} /></span> }
                                                    if (text === 'THAP') { return <span> <Icon type="down" style={{ color: '#ccff33' }} /></span> }
                                                    return <span> <Icon type="double-right" style={{ transform: 'rotate(90deg)', color: 'lime' }} /></span>
                                                }}
                                            />
                                            <Column title="Thời gian tiếp nhận" dataIndex="ht_thoigiantiepnhan" width={150}
                                                render={text => {
                                                    return format(text, "dd/mm/yyyy")
                                                }}
                                            />
                                            <Column title="Thời gian dự kiến hoàn thành" dataIndex="ht_thoigian_dukien_hoanthanh" width={150}
                                                render={text => {
                                                    if (text === null) { return '' }
                                                    return format(text, "dd/mm/yyyy")
                                                }}
                                            />
                                            <Column title="Thời gian hoàn thành" dataIndex="ht_thoigian_hoanthanh" width={150}
                                                render={text => {
                                                    if (text === null) { return '' }
                                                    return format(text, "dd/mm/yyyy")
                                                }}
                                            />
                                        </Table>
                                    </TabPane>
                                    <TabPane tab="Công việc đã tạo" key="11">
                                        <Row>
                                            <Col span={3}>
                                                <span style={{ fontSize: '16px' }}>Loại công việc</span>
                                            </Col>
                                            <Col span={6}>
                                                <ButtonGroup style={{ marginBottom: '5px', zIndex: 999 }} >
                                                    <Button onClick={this.getDataAllDaTao.bind(this)}>Tất cả</Button>
                                                    <Button onClick={this.getDataGapDaTao.bind(this)}>Gấp</Button>
                                                    <Button onClick={this.getDataDaxongDaTao.bind(this)}>Đã xong</Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                        <Table bordered components={this.components} dataSource={this.state.dataNguoiTao} rowKey="ht_id" size="small" scroll={{ x: 500 }}
                                            rowSelection={rowSelection}
                                            onRowClick={this.onRowClick.bind(this)}
                                            expandedRowRender={(record, selectedRowKeys) => {
                                                return (
                                                    <div style={{ textAlign: 'left' }}>
                                                        <div style={{ fontSize: '18px' }}> Yêu cầu: </div>
                                                        <Row style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1200' }} >{this.state.dataNguoiTao[selectedRowKeys].ht_noidungyeucau}</Row>
                                                        <div style={{ paddingTop: '10px', fontSize: '18px' }}> Ghi chú: </div>
                                                        <Row style={{ paddingTop: '7px' }}>{this.state.dataNguoiTao[selectedRowKeys].ht_ghichu}</Row>
                                                    </div>
                                                )
                                            }}
                                            rowClassName={this.setRowClassName}
                                        >
                                            <Column title="Dự án" dataIndex="dm_duan_ten" width={150} />
                                            <Column title="Khách hàng" dataIndex="kh_ten" width={100} className="hidden-action" />
                                            <Column title="Người tạo" dataIndex="ns_hoten" width={150} />
                                            <Column title="Người được giao" dataIndex="ns_hovaten" width={150} />
                                            <Column title="Trạng thái" dataIndex="ht_trangthai" width={100}
                                                render={
                                                    text => {
                                                        if (text === 'tiepnhan') { return 'Tiếp nhận' }
                                                        if (text === 'dangxuly') { return 'Đang xử lý' }
                                                        if (text === 'dangxem') { return "Đang xem" }
                                                        return "Đã xong"
                                                    }
                                                }
                                            />
                                            <Column title="Phân loại" dataIndex="ht_phanloai" width={70}
                                                render={text => {
                                                    if (text === 'bug') { return "Lỗi" }
                                                    if (text === 'new') { return "Việc mới" }
                                                    if (text === 'nc') { return "Nghiên cứu" }
                                                    else return "Khác"
                                                }} />
                                            <Column title="Ưu tiên" dataIndex="ht_uutien"
                                                render={text => {
                                                    if (text === 'GAP') { return <span> <Icon type="double-right" style={{ transform: 'rotate(-90deg)', color: 'red' }} /></span> }
                                                    if (text === 'CAO') { return <span> <Icon type="up" style={{ color: 'orange' }} /></span> }
                                                    if (text === 'TB') { return <span> <Icon type="pause" style={{ transform: 'rotate(-90deg)', color: 'gold' }} /></span> }
                                                    if (text === 'THAP') { return <span> <Icon type="down" style={{ color: '#ccff33' }} /></span> }
                                                    return <span> <Icon type="double-right" style={{ transform: 'rotate(90deg)', color: 'lime' }} /></span>
                                                }} />
                                            <Column title="Thời gian tiếp nhận" dataIndex="ht_thoigiantiepnhan" width={150}
                                                render={text => {
                                                    return format(text, "dd/mm/yyyy")
                                                }}
                                            />
                                            <Column title="Thời gian dự kiến hoàn thành" dataIndex="ht_thoigian_dukien_hoanthanh" width={150}
                                                render={text => {
                                                    if (text === null) { return '' }
                                                    return format(text, "dd/mm/yyyy")
                                                }}
                                            />
                                            <Column title="Thời gian hoàn thành" dataIndex="ht_thoigian_hoanthanh" width={150}
                                                render={text => {
                                                    if (text === null) { return '' }
                                                    return format(text, "dd/mm/yyyy")
                                                }}
                                            />
                                        </Table>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Card >
                                <Text mark style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu theo Tháng, Năm</Text>
                                <Divider style={{ margin: '5px' }} />
                                <Row>
                                    <Col span={12}>
                                        <Tabs onChange={this.onChangeTab} size={'small'} style={{ padding: '5px' }}>
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px' }}>Chọn Theo Tháng</span>
                                                }
                                                key="1"
                                            >
                                                <p style={{ fontSize: '14px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu theo Tháng</p>
                                                <RangePicker
                                                    placeholder={['Tháng bắt đầu', 'Tháng kết thúc']}
                                                    format="YYYY-MM"
                                                    mode={['month', 'month']}
                                                    onPanelChange={(value, datestring) => {
                                                        var dateStart = new Date(value[0]._d);
                                                        var dateEnd = new Date(value[1]._d);
                                                        var firstDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), 1);
                                                        var lastDay = new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0);
                                                        this.setValueMonth(value)
                                                        this.getHotroFollowMonth(formatDate(firstDay, 'yyyy-mm-dd'), formatDate(lastDay, 'yyyy-mm-dd'))
                                                    }}
                                                    value={this.state.valueMonth}
                                                    separator="Đến"
                                                />
                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px' }}>Chọn Theo Năm</span>
                                                }
                                                key="2"
                                            >
                                                <p style={{ fontSize: '14px' }}>Thống kê biểu đồ từng người đã hỗ trợ bao nhiêu theo Năm</p>
                                                <RangePicker
                                                    placeholder={['Năm bắt đầu', 'Năm kết thúc']}
                                                    format="YYYY"
                                                    mode={['year', 'year']}
                                                    separator="Đến"
                                                    onPanelChange={(value, datestring) => {
                                                        this.setValueYear(value)
                                                        this.getHotroFollowMonth(formatDate(value[0]._d, 'yyyy-01-01'), formatDate(value[1]._d, 'yyyy-12-31'))
                                                    }}
                                                    value={this.state.valueYear}
                                                />
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={15}>
                                        <Tabs >
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px', margin: '5px' }}>Biểu Đồ Cột <Icon type="bar-chart" /></span>
                                                }
                                                key="4"
                                                id="tabs1"
                                            >
                                                <div style={{ marginLeft: '20px' }}>
                                                    <Bar
                                                        data={this.state.dataGetFollowMonth}
                                                        options={{
                                                            legend: { display: false },
                                                            scales: {
                                                                yAxes: [{
                                                                    display: false,
                                                                    ticks: {
                                                                        beginAtZero: true,
                                                                    }
                                                                }],
                                                            },
                                                            title: {
                                                                display: true,
                                                                text: 'Thống kê'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px' }}>Biểu Đồ Tròn <Icon type="pie-chart" /></span>
                                                }
                                                key="3"
                                            >
                                                <div style={{ marginLeft: '70px' }}>
                                                    <Pie
                                                        data={this.state.dataGetFollowMonth}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: 'Thống kê'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span style={{ fontSize: '16px' }}>Biểu Đồ Ngang <Icon type="bar-chart" style={{ transform: 'rotate(90deg)' }} /></span>
                                                }
                                                key="5"
                                            >
                                                <HorizontalBar
                                                    data={this.state.dataGetFollowMonth}
                                                    options={{
                                                        legend: { display: false }
                                                    }}
                                                />
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <Table style={{ margin: '5px' }} title={() => 'Thông tin chi tiết'} dataSource={this.state.dataRank} rowKey="ns_hovaten" size="small" style={{ marginTop: '45px' }} >
                                            <Column title="Tên" dataIndex="ns_hovaten" />
                                            <Column title="Số CV hoàn thành" dataIndex="count" />
                                        </Table>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </div>
                    <Modal_Hotro
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        setidduan={this.state.id_duanfillmodal}
                        setNhansu={this.state.nhansu}
                        setKhachHang={this.state.khachhang}
                        setDonVi={this.state.donvis}
                        onTodoChange={this.onTodoChange}
                        date={this.state.date}
                        assignme={this.Assignme}
                        trangthaibutton={this.state.trangthaibutton}
                        set_Select_KhachHang={this.set_Select_KhachHang.bind(this)}
                    />
                </Form>
            </div>
        );
    }
}