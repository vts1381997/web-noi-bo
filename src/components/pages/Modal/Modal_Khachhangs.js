import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';

const Modal_Khachhangs = Form.create({ name: 'from_in_modal_khachhangs' })(
    class extends React.Component {
        render() {
            const { title, visible_kh, onCancel,formtype,form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    title={title}
                    visible={visible_kh}
                    onCancel={onCancel}
                >
                    <Form layout={formtype}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label='Họ:'>
                                    {getFieldDecorator('kh_ho', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Tên lót:'>
                                    {getFieldDecorator('kh_tenlot', {

                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Tên:'>
                                    {getFieldDecorator('kh_ten', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={5}>
                                <Form.Item label='Ngày sinh:'>
                                    {getFieldDecorator('kh_ngaysinh', {
                                        // rules: [{}],
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                        <Input type="date" size="small" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='Giới tính:'>
                                    {getFieldDecorator('kh_gioitinh', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                    // <Select
                                    //     style={{ width: '100%' }}
                                    //     placeholder='Please select'
                                    //     // onChange={handleChange}
                                    // >
                                    //     {comboboxx}
                                    // </Select>
                                    <Input type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='Định danh cá nhân:'>
                                    {getFieldDecorator('kh_dinhdanhcanhan', {

                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label='Email:'>
                                    {getFieldDecorator('kh_email', {
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Số điện thoại:'>
                                    {getFieldDecorator('kh_sodienthoai', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label='Mã tỉnh:'>
                                    {getFieldDecorator('dm_db_id_tinh_customer', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                    // <Select onSelect={onSelectTinh}>
                                    //     {
                                    //         select_tinh.map((value, index) => {
                                    //             return (
                                    //                 <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                    //             )
                                    //         })

                                    //     }
                                    // </Select>
                                    <Input type="text" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Mã huyện:'>
                                    {getFieldDecorator('dm_db_id_huyen_customer', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                    // <Select onSelect={onSelectHuyen}>
                                    //     {
                                    //         select_huyen.map((value, index) => {
                                    //             return (
                                    //                 <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                    //             )
                                    //         })

                                    //     }
                                    // </Select>
                                    <Input type="text" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Mã xã:'>
                                    {getFieldDecorator('dm_db_id_xa_customer', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                    // <Select onSelect={onSelectXa}>
                                    //     {
                                    //         select_xa.map((value, index) => {
                                    //             return (
                                    //                 <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                    //             )
                                    //         })

                                    //     }
                                    // </Select>
                                    <Input type="text" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label='Địa chỉ:'>
                                    {getFieldDecorator('kh_diachi', {

                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item label='Mã đơn vị:'>
                                    {getFieldDecorator('dm_dv_id', {

                                    })(
                                    // <Select onSelect={onSelectDv}
                                    // >
                                    //     <Option value="add_donvi">Thêm đơn vị</Option>
                                    //     {
                                    //         select_tendv.map((value, index) => {
                                    //             return (
                                    //                 <Option value={value.dm_dv_id}>{value.tendonvi}</Option>
                                    //             )
                                    //         })}
                                    // </Select>
                                    <Input type="text" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Vị trí công tác:'>
                                    {getFieldDecorator('kh_vitricongtac', {

                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Liên lạc:'>
                                    {getFieldDecorator('kh_lienlac', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                    // <Select
                                    //     style={{ width: '100%' }}
                                    //     placeholder='Please select'
                                    //     onChange={handleChange}
                                    // >
                                    //     {combobox}
                                    // </Select>
                                    <Input type="text" />
                                    )}
                                </Form.Item>
                            </Col>
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
    (Modal_Khachhangs)