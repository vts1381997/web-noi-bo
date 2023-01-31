import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, Rate, Alert, Select, Badge, Tag, Card, DatePicker, Divider } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import Modal_Khachhangs from '@pages/Modal/Modal_Khachhangs.js';
import cookie from 'react-cookies'
import '@styles/style.css'
import moment from 'moment';
import { Width } from 'devextreme-react/linear-gauge';
const { Column } = Table;
const { Option } = Select
const { TextArea } = Input;
const desc = ['Dễ', 'Vừa phải', 'Trung bình', 'Khó', 'Phức tạp'];

const Modal_Hotro = Form.create({ name: 'from_in_modal_hotros' })(
    class extends React.Component {
        render() {
            var formatDateHMS = require('dateformat')
            var id_duan = this.props.setidduan;
            var nhansu = this.props.setNhansu;
            var khachhang = this.props.setKhachHang;
            var donvi = this.props.setDonVi;
            var first_kh_id = null;
            var first_da_id = null;
            var first_ns_id = null;
            var first_dv_id = null
            const { visible, onCancel, onSave, form, onTodoChange, assignme, trangthaibutton, changeButton, set_Select_KhachHang, valueRate, handleChangeRate } = this.props;
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
            return (
                <Modal
                    centered
                    visible={visible}
                    title="Nhập thông tin Hỗ Trợ"
                    okText="Lưu"
                    onCancel={onCancel}
                    onOk={onSave}
                    // confirmLoading={confirmLoading}
                    width={'60%'}
                    style={{ zIndex: 99999999 }}
                >
                    <Form layout={'horizontal'} >
                        <Row gutter={24} align="middle">
                            <Col span={6}>
                                <Form.Item label="Người tạo">
                                    {getFieldDecorator('ns_id_nguoitao', {
                                        rules: [{ required: true, message: 'Trường không được để trống' }]
                                    })(
                                        // <Tag>&ensp;<Icon type="user" /> &emsp;&emsp; {user_cookie} &emsp;&emsp;&emsp;&ensp;</Tag>
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
                                    })(<Select
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
                                    })(<Select
                                        size={"small"}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            id_duan.map((value, index) => {
                                                return ( 
                                                    <Option value={value.dm_duan_id}>{value.dm_duan_ten}</Option>
                                                )
                                            })
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle">
                            <Col span={12}>
                                <div style={{ display: "block" }}>
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
                                    })(<Select
                                        allowClear
                                        size={"small"}
                                        onChange={set_Select_KhachHang}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
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
                                    })(<Select
                                        allowClear
                                        size={"small"}
                                        // onChange={this.handleChange}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
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
                                    })(<Select
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
                                    })(<Select
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
                                    })(<Select
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
                                        <Tag > <Icon type="clock-circle" />&ensp;&ensp;&ensp;&ensp; {formatDateHMS(new Date(), "dd / mm / yyyy ---  HH : MM : ss")}&ensp;&ensp;&ensp;&ensp;&ensp; </Tag>
                                        // <Input type="text" disabled size={'small'}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="TG dự kiến hoàn thành">
                                    {getFieldDecorator('ht_thoigian_dukien_hoanthanh', {
                                    })(
                                        // <DatePicker showTime size={"small"} onOk={this.onOk} format="DD/ MM/ YYYY--HH: MM: ss" style={{ minWidth: '170px' }} suffixIcon={Icon('')} />
                                        <Input type="date" size={"small"} min={formatDateHMS(new Date(), "yyyy-mm-dd")} disabled={this.props.trangthai} style={{ paddingLeft: 35, paddingTop: 4, textAlign: 'center !important' }} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Thời gian hoàn thành" >
                                    {getFieldDecorator('ht_thoigian_hoanthanh', {
                                        rules: [{}],
                                    })(
                                        <Tag > <Icon type="clock-circle" /> &ensp;&ensp;&ensp;&ensp;{this.props.date} &ensp;&ensp;&ensp;&ensp;&ensp;</Tag>
                                        // <Input type="text" disabled size={'small'}/>
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
                            <Form.Item label="Vote tự đánh giá mức độ công việc">
                                {getFieldDecorator('ht_vote', {})
                                    (<Rate tooltips={desc} onChange={handleChangeRate} />)}
                                {valueRate ? <span className="ant-rate-text">{desc[valueRate - 1]}</span> : ''}
                            </Form.Item>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    })

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchUser,
        fetchLoading
    })
    (Modal_Hotro)