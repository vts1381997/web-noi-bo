import React from 'react';
import { Menu, Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Card, Rate, Comment, Avatar, List, Dropdown } from 'antd';
import { CheckCircleTwoTone, ReloadOutlined, CommentOutlined, EyeOutlined, HomeOutlined, FormOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Request from '@apis/Request';
import { fetchHotro } from '@actions/hotro.action';
import { fetchLoading } from '@actions/common.action';
import Modal_Khachhangs from '@pages/Modal/Modal_Khachhangs.js';
import cookie from 'react-cookies';
import '@styles/style.css';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import io from 'socket.io-client';
var socket = io('http://103.74.122.80:6969');
// var socket = io('fscvn.ddns.net:6969');
// var socket = io('localhost:6969');
const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const desc = ['Dễ', 'Vừa phải', 'Trung bình', 'Khó', 'Phức tạp'];
var format = require('dateformat');
const menu = (
    <Menu >
        <Menu.Item key="1">Sửa bình luận</Menu.Item>
        <Menu.Item key="2">Xóa bình luận</Menu.Item>
    </Menu>
);
const CommentList = ({ comments }) => (
    <div className="demo-infinite-container">
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            useWindow={false}
        >
            <List
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={props =>
                    <div>
                        <Comment
                            {...props}
                            style={{ display: 'inline-block' }}
                        />
                        <Dropdown overlay={menu} >
                            <a><Icon type="ellipsis" /></a>
                        </Dropdown>
                    </div>
                }
            />
        </InfiniteScroll>
    </div>
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Thêm bình luận
        </Button>
        </Form.Item>
    </div>
);
const FormModal = Form.create({ name: 'from_in_modal' })(
    class extends React.Component {
        clear = e => {
        }

        onChange = () => {
        }

        onDateChange = value => {
            this.onChange('dateValue', value);
        }

        handleOpenChange = open => {
            if (!open) {
                this.setState({ dateOpen: true })
            }
        }

        onOk = (value) => {
        }

        render() {
            var formatDateHMS = require('dateformat')
            var id_duan = this.props.setidduan;
            var nhansu = this.props.setNhansu;
            var khachhang = this.props.setKhachHang;
            var donvi = this.props.setDonVi;
            var first_kh_id = null;
            var first_da_id = null;
            var first_ns_id = null;
            var first_dv_id = null;
            var date_Tiepnhan = null
            const { visible, onCancel, onSave, form, title, confirmLoading, formtype, id_visible, onTodoChange, assignme, trangthaibutton, changeButton, set_Select_KhachHang, dateTiepnhan, valueRate, handleChangeRate } = this.props;
            const { getFieldDecorator } = form;
            if (khachhang.length !== 0) {
                first_kh_id = khachhang[0].kh_id
            }
            if (donvi.length !== 0) {
                first_dv_id = donvi[0].dm_dv_id
            }
            if (id_duan.length !== 0) {
                first_da_id = id_duan[0].dm_duan_id
            }
            if (nhansu.length !== 0) {
                first_ns_id = nhansu[0].ns_id
            }
            if (id_visible === true) {
                date_Tiepnhan = formatDateHMS(dateTiepnhan, "dd / mm / yyyy -- HH : MM : ss")
            }
            else {
                date_Tiepnhan = formatDateHMS(new Date(), "dd / mm / yyyy -- HH : MM : ss")
            }
            return (
                <Modal
                    centered
                    visible={visible}
                    title={title}
                    okText="Lưu"
                    onCancel={onCancel}
                    onOk={onSave}
                    confirmLoading={confirmLoading}
                    width={'60%'}
                >
                    <Form layout={formtype} >
                        <Row gutter={24} align="middle">
                            <Col span={6}>
                                <Form.Item label="Người tạo">
                                    {getFieldDecorator('ns_id_nguoitao', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }]
                                    })(
                                        <Input type="text" size="small" disabled />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <div style={{ position: 'absolute', top: '2px', right: '13px', zIndex: '99999' }}>
                                    <Button size="small" onClick={assignme} disabled={trangthaibutton}> <Icon type="user" /> Tôi &emsp;</Button>
                                </div>
                                <Form.Item label="Gán cho">
                                    {getFieldDecorator('ns_id_ass', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: first_ns_id
                                    })(
                                        <Select
                                            size={"small"}
                                            onChange={changeButton}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            {
                                                nhansu.map((value, index) => {
                                                    return (<Option value={value.ns_id}>{value.ns_hovaten}</Option>)
                                                })
                                            }
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item label="Dự án">
                                    {getFieldDecorator('dm_duan_id', {
                                        rules: [{ required: true, message: 'Trường không được để trống', }], initialValue: first_da_id
                                    })(
                                        <Select
                                            size={"small"}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                id_duan.map((value, index) => {
                                                    return (<Option value={value.dm_duan_id}>{value.dm_duan_ten}</Option>)
                                                })
                                            }
                                        </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={12}>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item  >
                                        {getFieldDecorator('ht_id')(<Input type="text" hidden />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={12}>
                                <Form.Item label="Đơn vị">
                                    {getFieldDecorator('dm_dv_id', {
                                        initialValue: null
                                    })(
                                        <Select
                                            size={"small"}
                                            onChange={set_Select_KhachHang}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value={null}>Không thuộc đơn vị</Option>
                                            {
                                                donvi.map((value, index) => {
                                                    return (<Option value={value.dm_dv_id}>{value.dm_dv_ten}</Option>)
                                                })
                                            }
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Khách hàng">
                                    {getFieldDecorator('kh_id', {
                                        initialValue: null
                                    })(
                                        <Select
                                            size={"small"}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value={null}>Bỏ chọn</Option>
                                            {
                                                khachhang.map((value, index) => {
                                                    return (<Option value={value.kh_id}>{value.kh_ten}</Option>)
                                                })
                                            }
                                        </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={8}>
                                <Form.Item label="Ưu tiên">
                                    {getFieldDecorator('ht_uutien', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "TB"
                                    })(
                                        <Select
                                            size={"small"}
                                            onChange={this.handleChange}
                                        >
                                            <Option value="GAP"> <Icon type="double-right" style={{ transform: 'rotate(-90deg)', color: 'red' }} /> &ensp; Gấp </Option>
                                            <Option value="CAO"> <Icon type="up" style={{ color: 'orange' }} /> &ensp; Cao</Option>
                                            <Option value="TB"> <Icon type="pause" style={{ transform: 'rotate(-90deg)', color: 'gold' }} /> &ensp; Trung Bình</Option>
                                            <Option value="THAP"> <Icon type="down" style={{ color: 'lime' }} /> &ensp; Thấp</Option>
                                            <Option value="RT"> <Icon type="double-right" style={{ transform: 'rotate(90deg)', color: 'lime' }} /> &ensp; Rất Thấp </Option>
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Trạng thái">
                                    {getFieldDecorator('ht_trangthai', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "dangxuly"
                                    })(
                                        <Select
                                            onChange={onTodoChange}
                                            size={"small"}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="tiepnhan">Tiếp nhận</Option>
                                            <Option value="dangxuly">Đang xử lý</Option>
                                            <Option value="dangxem">Đang xem</Option>
                                            <Option value="daxong">Đã xong</Option>
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Phân loại">
                                    {getFieldDecorator('ht_phanloai', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }], initialValue: "new"
                                    })(
                                        <Select
                                            showSearch
                                            size={"small"}
                                            onChange={this.handleChange}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="bug">Sửa lỗi phần mềm</Option>
                                            <Option value="new">Công việc mới</Option>
                                            <Option value="nc">Công việc nghiên cứu</Option>
                                            <Option value="khac">Khác</Option>
                                        </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label="Thời gian tiếp nhận">
                                    {getFieldDecorator('ht_thoigiantiepnhan', {
                                        rules: [{}],
                                    })(
                                        <Input disabled size={'small'} style={{ textAlign: 'center' }} type={'date'} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="TG dự kiến hoàn thành">
                                    {getFieldDecorator('ht_thoigian_dukien_hoanthanh', {
                                    })(
                                        <Input type="date" size={"small"} min={format(new Date(), "yyyy-mm-dd")} disabled={this.props.trangthai} style={{ paddingLeft: 35, paddingTop: 4 }} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Thời gian hoàn thành" >
                                    {getFieldDecorator('ht_thoigian_hoanthanh', {
                                        rules: [{}],
                                    })(
                                        <Input disabled size={'small'} style={{ textAlign: 'center' }} type={'date'} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={24}>
                                <Form.Item label="Nội dung yêu cầu">
                                    {getFieldDecorator('ht_noidungyeucau', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }],
                                    })(<TextArea type="text" size={"small"} style={{ Height: 20 }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={24}>
                                <Form.Item label="Ghi chú">
                                    {getFieldDecorator('ht_ghichu', {
                                        rules: [{}],
                                    })(<TextArea type="text" size={"small"} style={{ Height: 20 }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Item label="Bạn cảm thấy công việc này thế nào">
                                {getFieldDecorator('ht_vote', {})
                                    (<Rate tooltips={desc} onChange={handleChangeRate} />)}
                                {valueRate ? <span className="ant-rate-text" style={{ marginRight: '10px' }}>{desc[valueRate - 1]}</span> : ''}
                                <span style={{ fontSize: '18px' }}> {valueRate === 1 || valueRate === 2 ? <Icon type="smile" /> : valueRate === 3 || valueRate === 4 ? <Icon type="meh" /> : valueRate === 5 ? <Icon type="frown" /> : ''}</span>
                            </Form.Item>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    }
)
var formatDateModal = require('dateformat');
var array_ht_trangthai = []
class Hotro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotro: [],
            id_duanfilltable: [],
            id_duanfillmodal: [],
            nhansu: [],
            khachhang: [],
            pageNumber: 1,
            page: 1,
            pageSize: 10,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Hỗ Trợ',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            valueRate: 3,
            columnSearch: 'ht_uutien',
            isSort: true,
            sortBy: 'DESC',
            index: 'ht_thoigiantiepnhan',
            orderby: 'arrow-down',
            date: null,
            trangthaibutton: false,
            selectedId: [],
            statebuttonedit: true,
            statebuttondelete: true,
            stateconfirmdelete: false,
            rowthotroselected: {},
            visible_kh: false,
            khachhangs: [],
            selectedrow: [],
            selectedRowKeys: [],
            donvis: [],
            dateTiepnhan: null,
            stateButtonDaxong: false,
            stateButtonTatca: false,
            stateButtonGap: false,
            searchText: '',
            timkiem: [],
            comments: [],
            submitting: false,
            value: '',
            expandedRowKeys: [],
            name: '',
            address: '',
            expandKey: ''
        }
    }

    reloadBinhLuan = () => {
        this.getBinhluan(this.state.expandKey)
    }

    getBinhluan = (ht_id) => {
        this.setState({
            expandKey: ht_id
        })
        Request('binhluan/get', 'POST', { ht_id }).then((res) => {
            this.setState({
                comments: res.data.data.binhluan
            })
        })
    }

    getName = (user_cookie) => {
        Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
            if (res) {
                if (res.data.data.name[0] === undefined) {
                    this.setState({
                        name: 'Chưa có tài khoản'
                    })
                }
                else {
                    this.setState({
                        name: res.data.data.name[0].ns_hovaten
                    })
                }
            }
        })
    }

    handleSubmit = async (ht_id) => {
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true,
        });
        await this.setState({
            submitting: false,
            value: '',
            comments: [
                {
                    author: this.state.name,
                    avatar: this.state.address,
                    content: this.state.value,
                    datetime: moment().format('LLLL'),
                    ht_id: ht_id
                },
                ...this.state.comments,
            ],
        });
        Request('binhluan/insert', 'POST', this.state.comments).then(async (response) => {
            this.getHotro(this.state.page)
        }).catch((err) => {
            console.log(err)
        })
        this.clientSendUsername1('data')
    }

    handleChangeComment = e => {
        this.setState({
            value: e.target.value,
        });
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

    set_Select_DonVi() {
        Request('hotro/getdonvi', 'POST', {}).then((res) => {
            if (res.data.data.donvis) {
                this.setState({
                    donvis: res.data.data.donvis
                })
            }
        })
    }

    getHotro = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: false
        })
        Request('hotro/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        }).then((res) => {
            if (res.data.data.hotros !== undefined) {
                this.setState({
                    hotro: this.convertColumnSearch(res.data.data.hotros),
                    count: res.data.data.count,
                    stateButtonTatca: true,
                    stateButtonDaxong: false,
                    stateButtonGap: false
                })
                var array_duan = []
                array_ht_trangthai = []
                res.data.data.hotros.map((data, index) => {
                    array_duan.push({ name: data.dm_duan_ten, id: data.dm_duan_id })
                    data.soNgayCanhBao = Number(format(data.ht_thoigian_dukien_hoanthanh, "yyyy/mm/dd").split("/").join("")) - Number(format(new Date(), "yyyy/mm/dd").split("/").join(""));
                    array_ht_trangthai.push(data.ht_trangthai)
                })
                this.setState({
                    id_duanfilltable: array_duan
                })
            }
            this.props.fetchLoading({
                loading: false
            })
        })
    }

    insertOrUpdate = async () => {
        const { form } = await this.formRef.props;
        await form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'hotro/insert' : 'hotro/update'
            this.setState({
                rowthotroselected: values
            })
            if (url === 'hotro/update') {
                let user_cookie = cookie.load('user');
                values.ns_id_capnhat = user_cookie
                values.nkht_thoigiancapnhat = new Date()
            }
            if (values.ht_thoigian_dukien_hoanthanh === null) {
                values.ht_thoigian_dukien_hoanthanh = format(new Date(), 'yyyy-mm-dd')
            }
            Request(url, 'POST', values).then(async (response) => {
                if (response.status === 200 & response.data.success === true) {
                    form.resetFields();
                    this.setState({
                        visible: false,
                        message: response.data.message,
                        trangthaibutton: false
                    })
                    if (response.data.message == "Sửa thành công") {
                        var row = {
                            ht_id: localStorage.getItem("onRowClickHotro")
                        }
                        this.onRowClick(row)
                    }
                    else {
                        var thongbao = {}
                        thongbao.tb_thoigiantao = format(new Date(), 'dd-mm-yyyy - HH:MM:ss')
                        thongbao.tb_noidung = localStorage.getItem("tenNguoiDung") + ' đã tạo công việc và gán cho bạn vào lúc ' + thongbao.tb_thoigiantao
                        thongbao.tb_trangthai = 'chuadoc'
                        thongbao.tb_ns_id = values.ns_id_ass
                        thongbao.tb_ht_id = response.data.ht_id
                        thongbao.tb_link = 'link'
                        console.log(thongbao, 'thong bao');
                        Request('thongbao/insert', 'POST', thongbao).then((res) => {
                        })
                        this.clientSendUsername1('data')
                    }
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
                this.getHotro(this.state.pageNumber, this.state.index, this.state.sortBy)
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    deleteHotro = (ht_id) => {
        Request(`hotro/delete`, 'DELETE', { ht_id: ht_id }).then((res) => {
            notification[res.data.success === true ? 'success' : 'error']({
                message: 'Thông Báo',
                description: res.data.message
            });
            this.setState({
                stateconfirmdelete: false,
                statebuttondelete: true,
                statebuttonedit: true,
                selectedRowKeys: []
            })
            this.getHotro(this.state.page)
        }).catch((err) => {
            console.log(err)
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8, align: 'center' }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={'Từ tìm kiếm'}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90 }}
                >
                    Tìm kiếm
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
    });

    handleSearch = (selectedKeys, value, confirm) => {
        let vl = { values: selectedKeys[0], keys: value }
        if (value && selectedKeys.length > 0) {
            this.state.timkiem.push(vl)
        }
        Request(`hotro/search`, 'POST',
            {
                timkiem: this.state.timkiem,
                pageSize: this.state.pageSize,
                pageNumber: this.state.page
            }).then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Đã xuất hiện bản ghi',
                    description: res.data.message
                });
                this.setState({
                    hotro: res.data.data.hotros,
                })
            })
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    refresh = async (pageNumber) => {
        message.success('Tải lại thành công', 1);
        await this.getHotro(this.state.pageNumber)
        this.setState({
            timkiem: []
        })
    }

    async componentDidMount() {
        var that = this
        var user_cookie = cookie.load('user');
        this.getName(user_cookie)
        this.getAddress()
        socket.on("server-send-comment", function (data) {
            that.reloadBinhLuan()
        })
        this.getHotro(this.state.pageNumber, this.state.index, this.state.sortBy)
        document.getElementsByClassName('ant-table-expand-icon-th')[0].innerHTML = 'Chi tiết'
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
        if (document.getElementsByClassName('ant-table-expand-icon-th')[1] !== undefined) {
            document.getElementsByClassName('ant-table-expand-icon-th')[0].style.height = document.getElementsByClassName('ant-table-expand-icon-th')[1].style.height
        }
        this.forceUpdate()
    }

    onchangpage = (page) => {
        this.setState({
            page: page
        })
        if (this.state.stateButtonTatca === true) {
            this.getHotro(page)
        }
        else if (this.state.stateButtonGap === true) {
            this.getDataGap(page)
        }
        else {
            this.getDataDaxong(page)
        }
    }

    onHeaderCell = (column) => {
        return {
            onClick: async () => {
                if (this.state.isSort) {
                    await this.setState({
                        sortBy: 'DESC',
                        orderby: 'arrow-down'
                    })
                }
                else {
                    await this.setState({
                        sortBy: 'ASC',
                        orderby: 'arrow-up'
                    })
                }
                this.setState({
                    isSort: !this.state.isSort,
                    index: column.dataIndex
                })
                this.getHotro(this.state.page)
            },
        };
    }

    showModal = async (hotro) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        await form.resetFields();
        this.setState({
            action: 'insert',
            valueRate: hotro.ht_vote
        })
        if (hotro.ht_trangthai === "daxong") {
            this.setState({
                trangthai: true,
                date: formatDateModal(hotro.ht_thoigian_hoanthanh, "dd / mm / yyyy -- HH : MM : ss")
            })
        }
        else {
            this.setState({
                trangthai: false,
                date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</a>
            })
        }
        form.setFieldsValue({ ht_thoigiantiepnhan: formatDateModal(new Date(), "yyyy-mm-dd") });
        if (hotro.ht_id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update',
                dateTiepnhan: hotro.ht_thoigiantiepnhan,
                valueRate: hotro.ht_vote
            })
            if (hotro.ht_thoigian_dukien_hoanthanh !== null) {
                hotro.ht_thoigian_dukien_hoanthanh = formatDateModal(hotro.ht_thoigian_dukien_hoanthanh, "yyyy-mm-dd")
            }
            if (hotro.ht_thoigiantiepnhan !== null) {
                hotro.ht_thoigiantiepnhan = formatDateModal(hotro.ht_thoigiantiepnhan, "yyyy-mm-dd")
            }
            if (hotro.ht_thoigian_hoanthanh !== null) {
                hotro.ht_thoigian_hoanthanh = formatDateModal(hotro.ht_thoigian_hoanthanh, "yyyy-mm-dd")
            }
            form.setFieldsValue({ ns_id_nguoitao: hotro.ns_id_nguoitao });
            form.setFieldsValue({ ns_id_ass: hotro.ns_id_ass });
            form.setFieldsValue({ dm_duan_id: hotro.dm_duan_id });
            form.setFieldsValue({ dm_dv_id: hotro.dm_dv_id });
            form.setFieldsValue({ kh_id: hotro.kh_id });
            form.setFieldsValue({ ht_uutien: hotro.ht_uutien });
            form.setFieldsValue({ ht_trangthai: hotro.ht_trangthai });
            form.setFieldsValue({ ht_phanloai: hotro.ht_phanloai });
            form.setFieldsValue({ ht_thoigiantiepnhan: hotro.ht_thoigiantiepnhan });
            form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: hotro.ht_thoigian_dukien_hoanthanh });
            form.setFieldsValue({ ht_thoigian_hoanthanh: hotro.ht_thoigian_hoanthanh });
            form.setFieldsValue({ ht_noidungyeucau: hotro.ht_noidungyeucau });
            form.setFieldsValue({ ht_ghichu: hotro.ht_ghichu });
            form.setFieldsValue({ ht_vote: hotro.ht_vote });
            form.setFieldsValue({ ht_id: hotro.ht_id });
        }
        else {
            this.Assignme();
            var user_cookie = cookie.load('user');
            var nguoitao = "";
            await Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
                if (res) {
                    if (res.data.data.name[0] === undefined)
                        nguoitao = "Chưa có tài khoản"
                    else
                        nguoitao = res.data.data.name[0].ns_hovaten
                }
            })
            form.setFieldsValue({ ns_id_nguoitao: user_cookie })
            form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: formatDateModal(new Date(), "yyyy-mm-dd") })
        }
        this.set_Select_id_duan();
        this.set_Select_NhanSu();
        this.set_Select_KhachHang(null);
        this.set_Select_DonVi();
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            id_visible: false
        });
    };

    handleCancelModalKhachhang = e => {
        this.setState({
            visible_kh: false
        })
    }

    confirm = (e) => {
        message.success('Bấm yes để xác nhận');
    }

    cancel = (e) => {
        this.setState({
            stateconfirmdelete: false
        })
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    onChange = async (value) => {
        await this.setState({
            columnSearch: value,
        })
        if (this.state.searchText) {
            this.search(this.state.searchText);
        }
    }

    onTodoChange = async (value) => {
        const { form } = this.formRef.props
        if (value === "daxong") {
            await this.setState({
                date: formatDateModal(new Date(), "dd / mm / yyyy -- HH : MM : ss"),
                trangthai: true
            })
            form.setFieldsValue({ ht_thoigian_hoanthanh: formatDateModal(new Date(), "yyyy-mm-dd") })
            form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: formatDateModal(new Date(), "yyyy-mm-dd") })
        }
        else {
            await this.setState({
                date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</a>,
                trangthai: false
            })
            form.setFieldsValue({ ht_thoigian_hoanthanh: null })
        }
    }

    getNguoiTao = () => {
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

    changeButton = (value) => {
        if (value !== "9298eb00-a6d9-11e9-bd04-0986e022adbf")
            this.setState({
                trangthaibutton: false
            })
        else
            this.setState({
                trangthaibutton: true
            })
    }

    convertDateToInt = (date) => {
        return formatDateModal(date, 'yyyymmdd')
    }

    convertColumnSearch = (data) => {
        if (data.length > 0) {
            var arrkey = Object.keys(data[0])
            var obj_key_search = {}
            arrkey.map(value => {
                eval('obj_key_search.' + value + "='" + value + "'")
            })
            return [obj_key_search].concat(data)
        }
        else {
            return data
        }
    }

    renderCell = (option, value, row, index) => {
        if (index === 0) {
            if (option.type === 'select') {
                return (
                    <Select >
                        {option.option.map(valueoption => {
                            return <Option></Option>
                        })}
                    </Select>
                )
            }
            return (
                <Input type={option.type} style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, option.name)} />
            )
        }
    }

    handleSearchs = (nameSearch, e) => {
        if (e.target.value !== '') {
            let vl = { values: e.target.value, keys: nameSearch }
            var timkiem = this.state.timkiem
            timkiem = timkiem.push(vl)
            Request(`hotro/search`, 'POST', {
                timkiem: this.state.timkiem,
                pageSize: this.state.pageSize,
                pageNumber: this.state.page
            }).then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Đã xuất hiện bản ghi',
                    description: res.data.message
                });
                array_ht_trangthai = [];
                res.data.data.hotros.map((value, index) => {
                    array_ht_trangthai.push(value.ht_trangthai);
                })
                this.setState({
                    hotro: this.convertColumnSearch(res.data.data.hotros),
                    count: res.data.data.count,
                })
            })
            this.setState({ searchText: e.target.value });
            this.props.fetchLoading({
                loading: false
            })
        }
    }

    checkDate = (check, text, j) => {
        j = j - 2
        if (array_ht_trangthai[j] === "daxong") {
            return <span style={{ color: 'lime' }}>{text}</span>
        }
        if (array_ht_trangthai[j] === "dangxuly" && check == 1) {
            return <span style={{ color: 'red' }}>{text}</span>
        }
        if (array_ht_trangthai[j] === "dangxuly" && check == 0) {
            return <span style={{ color: 'black' }}>{text}</span>
        }
        return <span style={{ color: 'black' }}>{text}</span>
    }

    checkDateConvert = (x) => {
        if (x != "ht_thoigian_dukien_hoanthanh") {
            var y = 0;
            const ngayHienTai = format(new Date(), "yyyy-mm-dd").split("-")[0] + format(new Date(), "yyyy-mm-dd").split("-")[1] + format(new Date(), "yyyy-mm-dd").split("-")[2];
            const ngayKiemTra = format(x, "yyyy-mm-dd").split("-")[0] + format(x, "yyyy-mm-dd").split("-")[1] + format(x, "yyyy-mm-dd").split("-")[2];
            y = Number(ngayKiemTra) - Number(ngayHienTai);
            return y;
        }
        else {
            return 10;
        }
    }

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedId: selectedRowKeys
        });
        if (selectedRowKeys.length > 0) {
            this.setState({
                statebuttondelete: false,
                stateconfirmdelete: false
            })
        }
        else
            this.setState({
                statebuttondelete: true,
                stateconfirmdelete: false
            })
        if (selectedRowKeys.length === 1) {
            if (selectedRowKeys[0] == 'ht_id') {
                this.setState({
                    statebuttondelete: true,
                    statebuttonedit: true,
                })
            }
            else {
                this.setState({
                    statebuttonedit: false,
                    rowthotroselected: selectedRows[0]
                })
            }
        }
        else
            this.setState({
                statebuttonedit: true
            })
    };

    onRowClick = (row) => {
        localStorage.setItem("onRowClickHotro", row.ht_id);
        if (this.state.selectedRowKeys[0] === row.ht_id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.ht_id], [row])
        }
    }

    getDataGap = () => {
        var user_cookie = null
        Request('hotro/getmyselfgap', 'POST', {
            user_cookie,
            pageSize: this.state.pageSize,
            pageNumber: this.state.pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        }).then((res) => {
            if (res.data.data.myselfGap) {
                this.setState({
                    hotro: res.data.data.myselfGap,
                    stateButtonTatca: false,
                    stateButtonGap: true,
                    stateButtonDaxong: false
                })
            }
            this.forceUpdate()
        })
    }

    getDataDaxong = async (pageNumber) => {
        var user_cookie = null
        Request('hotro/getmyselfdaxong', 'POST', {
            user_cookie,
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
        }).then((res) => {
            if (res.data.data.myself) {
                this.setState({
                    hotro: res.data.data.myself,
                    count: res.data.data.count,
                    stateButtonDaxong: true,
                    stateButtonTatca: false,
                    stateButtonGap: false
                })
            }
            this.forceUpdate()
        })
    }

    handleChangeRate = valueRate => {
        const { form } = this.formRef.props
        form.setFieldsValue({ ht_vote: valueRate })
        this.setState({ valueRate });
    };

    getAddress = () => {
        var user_cookie = cookie.load('user')
        Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
            if (res) {
                this.setState({
                    address: res.data.data.name[0].ns_address
                })
            }
        })
    }

    clientSendUsername = (tempValue) => {
        socket.emit("user-send-comment", tempValue);
    }

    clientSendUsername1 = (tempValue) => {
        socket.emit("user-send-thongbao", tempValue);
    }

    getLinkHotro = (ht_id) => {
        Request('hotro/gethotrobyid', 'POST', { ht_id }).then((res) => {
            this.setState({
                hotro: res.data.data.hotrobyid
            })
        })
        this.forceUpdate()
    }

    render() {
        var ten = cookie.load('user');
        var name = cookie.load('user');
        var i = 0
        var j = 0
        var formatDate = require('dateformat')
        const { selectedRowKeys } = this.state
        const rowSelection = {
            columnWidth: '60px',
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
            onHeaderCell: this.click
        };
        const { comments, submitting, value } = this.state;
        return (
            <div>
                <Form>
                    <Card>
                        <Row>
                            <Col span={8}>
                                <Tooltip title="Thêm Hỗ Trợ">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                        <Icon type="plus" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Sửa Hỗ Trợ">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '10px' }} onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                                        <Icon type="edit" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Xóa Hỗ Trợ">
                                    <Popconfirm
                                        title="Bạn chắc chắn muốn xóa?"
                                        onConfirm={this.deleteHotro.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                        visible={this.state.stateconfirmdelete}
                                    >
                                        <Button shape="round" type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip title="Tải Lại">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '10px' }} onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Công Việc Của Tôi">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '10px' }}>
                                        <NavLink to="/search" ><HomeOutlined /></NavLink>
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Trò chuyện">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '10px' }}>
                                        <NavLink to="/chat" ><CommentOutlined /></NavLink>
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={3} offset={7}>
                                <span style={{ fontSize: '16px' }}>Loại công việc</span>
                            </Col>
                            <Col span={6}>
                                <ButtonGroup style={{ marginBottom: '5px', zIndex: 999 }} >
                                    <Button
                                        disabled={this.state.stateButtonGap}
                                        onClick={this.getDataGap.bind(this)}
                                    >Gấp</Button>
                                    <Button
                                        disabled={this.state.stateButtonTatca}
                                        onClick={this.getHotro.bind(this, this.state.page)}
                                    >Tất cả</Button>
                                    <Button
                                        disabled={this.state.stateButtonDaxong}
                                        onClick={this.getDataDaxong.bind(this, this.state.page)}
                                    >Đã xong</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
                        <Table
                            rowSelection={rowSelection}
                            onRowClick={this.onRowClick.bind(this)}
                            pagination={false}
                            dataSource={this.state.hotro}
                            rowKey="ht_id"
                            bordered
                            onExpand={(expanded, record) => {
                                this.getBinhluan(record.ht_id)
                            }}
                            scroll={{ x: 1000 }}
                            expandedRowRender={(record, selectedRowKeys) => {
                                if (record.ht_id == "ht_id")
                                    return '';
                                else
                                    return (
                                        <div style={{ textAlign: 'left' }}>
                                            <Row style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1000' }} >
                                                <span style={{ fontSize: '18px' }}> Yêu cầu: </span>
                                                {this.state.hotro[selectedRowKeys].ht_noidungyeucau}
                                            </Row>
                                            <Row style={{ paddingTop: '7px', borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1000' }}>
                                                <span style={{ paddingTop: '10px', fontSize: '18px' }}> Ghi chú: </span>
                                                {this.state.hotro[selectedRowKeys].ht_ghichu}
                                            </Row>
                                            <Row style={{ paddingTop: '7px', borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1000' }}>
                                                <span style={{ paddingTop: '10px', fontSize: '18px' }}> Độ khó công việc: </span>
                                                {this.state.hotro[selectedRowKeys].ht_vote == 1 ? 'Dễ' : this.state.hotro[selectedRowKeys].ht_vote == 2 ? 'Vừa phải' : this.state.hotro[selectedRowKeys].ht_vote == 3 ? 'Trung bình' : this.state.hotro[selectedRowKeys].ht_vote == 4 ? 'Khó' : this.state.hotro[selectedRowKeys].ht_vote == 5 ? 'Phức tạp' : ''}
                                            </Row>
                                            <Row style={{ paddingTop: '7px', borderBottom: '1px solid #e8e8e8', paddingTop: '7px', paddingBottom: '16px', width: '1000' }}>
                                                <span style={{ paddingTop: '10px', fontSize: '18px' }}> Đơn vị: </span>
                                                {this.state.hotro[selectedRowKeys].dm_dv_ten}
                                            </Row>
                                            <Row style={{ paddingTop: '5px', borderBottom: '5px' }}>Khách hàng: {this.state.hotro[selectedRowKeys].kh_ten}
                                            </Row>
                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>SĐT: {this.state.hotro[selectedRowKeys].kh_sodienthoai}</Row>
                                            <Row style={{ marginTop: '5px', marginBottom: '5px' }} >Email: {this.state.hotro[selectedRowKeys].kh_email}</Row>
                                            <div>
                                                {comments.length > 0 && <CommentList comments={comments} />}
                                                <Comment
                                                    avatar={
                                                        <Avatar
                                                            src={this.state.address}
                                                            alt={name}
                                                        />
                                                    }
                                                    content={
                                                        <Editor
                                                            onChange={this.handleChangeComment}
                                                            onSubmit={this.handleSubmit.bind(this, record.ht_id)}
                                                            submitting={submitting}
                                                            value={value}
                                                        />
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                            }}
                        >
                            <Column dataIndex="ht_thoigian_dukien_hoanthanh" align='center' className="hidden-action"
                                render={
                                    text => {
                                        j++
                                        if (Number(this.checkDateConvert(text)) < 3) {
                                            i = 1
                                        }
                                        else {
                                            i = 0
                                        }
                                    }}
                            />
                            <Column title="Trạng thái" dataIndex="ht_trangthai"
                                render={
                                    text => {
                                        if (text === 'tiepnhan') { return <FormOutlined /> }
                                        if (text === 'dangxuly') { return <ReloadOutlined spin /> }
                                        if (text === 'dangxem') { return <EyeOutlined /> }
                                        if (text === 'daxong') { return <CheckCircleTwoTone twoToneColor="#52c41a" /> }
                                        return
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Ưu tiên" dataIndex="ht_uutien"
                                render={text => {
                                    if (text === 'GAP') { return <span> <Icon type="double-right" style={{ transform: 'rotate(-90deg)', color: 'red' }} /></span> }
                                    if (text === 'CAO') { return <span> <Icon type="up" style={{ color: 'orange' }} /> </span> }
                                    if (text === 'TB') { return <span> <Icon type="pause" style={{ transform: 'rotate(-90deg)', color: 'gold' }} /></span> }
                                    if (text === 'THAP') { return <span> <Icon type="down" style={{ color: '#ccff33' }} /></span> }
                                    if (text === 'RT') { return <span> <Icon type="double-right" style={{ transform: 'rotate(90deg)', color: 'lime' }} /></span> }
                                    return
                                }}
                                onHeaderCell={this.onHeaderCell}
                            />
                            <Column title="Dự án" dataIndex="dm_duan_ten"
                                render={this.renderCell.bind(this, { type: 'text', name: 'dm_duan_ten', i: i, j: j }),
                                    text => {
                                        if (text == "dm_duan_ten") {
                                            return <Input type='text' style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, 'dm_duan_ten')} />
                                        }
                                        else {
                                            return this.checkDate(i, text, j);
                                        }
                                    }
                                }
                                onHeaderCell={this.onHeaderCell}
                            />
                            <Column title="Đơn vị" dataIndex="dm_dv_ten" className="hidden-action" onHeaderCell={this.onHeaderCell} />
                            <Column title="Khách hàng" dataIndex="kh_ten" className="hidden-action" onHeaderCell={this.onHeaderCell} />
                            <Column title="Người tạo" dataIndex="ns_hoten"
                                render={this.renderCell.bind(this, { type: 'text', name: 'ns_hoten' }),
                                    text => {
                                        if (text == "ns_hoten") {
                                            return <Input type='text' style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, 'ns_hoten')} />
                                        }
                                        else {
                                            return this.checkDate(i, text, j);
                                        }
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Người được giao" dataIndex="ns_hovaten"
                                render={this.renderCell.bind(this, { type: 'text', name: 'ns_hovaten' }),
                                    text => {
                                        if (text == "ns_hovaten") {
                                            return <Input type='text' style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, 'ns_hovaten')} />
                                        }
                                        else {
                                            return this.checkDate(i, text, j);
                                        }
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Phân loại" dataIndex="ht_phanloai" className="hidden-action" onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian tiếp nhận" dataIndex="ht_thoigiantiepnhan"
                                render={this.renderCell.bind(this, { type: 'text', name: 'ht_thoigiantiepnhan' }),
                                    text => {
                                        if (text == "ht_thoigiantiepnhan") {
                                            return <Input type='text' style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, 'ht_thoigiantiepnhan')} />
                                        }
                                        else {
                                            return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                        }
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian dự kiến hoàn thành" dataIndex="ht_thoigian_dukien_hoanthanh"
                                render={this.renderCell.bind(this, { type: 'text', name: 'ht_thoigian_dukien_hoanthanh' }),
                                    text => {
                                        if (text == "ht_thoigian_dukien_hoanthanh") {
                                            return <Input type='text' style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, 'ht_thoigian_dukien_hoanthanh')} />
                                        }
                                        else {
                                            return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                        }
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Thời gian hoàn thành" dataIndex="ht_thoigian_hoanthanh"
                                render={this.renderCell.bind(this, { type: 'text', name: 'ht_thoigian_hoanthanh' }),
                                    text => {
                                        if (text == "ht_thoigian_hoanthanh") {
                                            return <Input type='text' style={{ minWidth: '100px' }} onPressEnter={this.handleSearchs.bind(this, 'ht_thoigian_hoanthanh')} />
                                        }
                                        else {
                                            if (text == null) {
                                                return ''
                                            }
                                            else {
                                                return this.checkDate(i, formatDate(text, "dd/mm/yyyy"), j)
                                            }
                                        }
                                    }
                                }
                                onHeaderCell={this.onHeaderCell} />
                            <Column title="Độ khó công việc" dataIndex="ht_vote" className="hidden-action" onHeaderCell={this.onHeaderCell} />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} style={{ marginTop: 10 }} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
                    <FormModal
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        title={this.state.title}
                        formtype={this.state.formtype}
                        id_visible={this.state.id_visible}
                        setidduan={this.state.id_duanfillmodal}
                        setNhansu={this.state.nhansu}
                        setKhachHang={this.state.khachhang}
                        setDonVi={this.state.donvis}
                        onTodoChange={this.onTodoChange}
                        date={this.state.date}
                        assignme={this.Assignme}
                        trangthaibutton={this.state.trangthaibutton}
                        changeButton={this.changeButton}
                        set_Select_KhachHang={this.set_Select_KhachHang.bind(this)}
                        dateTiepnhan={this.state.dateTiepnhan}
                        comments={this.state.comments}
                        submitting={this.state.submitting}
                        value={this.state.value}
                        valueRate={this.state.valueRate}
                        handleChangeRate={this.handleChangeRate}
                    />
                    <Modal_Khachhangs
                        title="Thêm Khách Hàng"
                        visible={true}
                        visible_kh={this.state.visible_kh}
                        onCancel={this.handleCancelModalKhachhang}
                        formtype={this.state.formtype}
                    />
                </Form>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchHotro,
        fetchLoading
    }
)(Hotro);
