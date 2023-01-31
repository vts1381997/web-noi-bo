import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, stateoption, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
// import { type } from 'os';
// import { unwatchFile } from 'fs';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
const Modal_Menus = Form.create({ name: 'from_in_modal_menus' })(
    class extends React.Component {
        // getPhanTram = (e) =>{

        //     form.setFieldsValue({ tylephantramgopvon: tt })
        // }

        render() {
            const { Option } = Select;
            const combobox = [];
            combobox.push(<Option key={'ctt'}>Chưa thanh toán</Option>);
            combobox.push(<Option key={'dtt'}>Đã thanh toán</Option>);
            // var first_dv_id = null
            // if (khachhang.length !== 0) {
            //     first_kh_id = khachhang[0].kh_id
            // }
            // if (donvi.length !== 0) {
            //     first_dv_id = donvi[0].dm_dv_id
            // }
            const { TextArea } = Input;
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, onSelectDv, onSelectDv1, formtype, getkhachhang, id_visible, khachhang, donvi, handleChange, stateoption, stateoption1 } = this.props;
            const { getFieldDecorator } = form;

            return (
                <div>
                    <Modal
                        visible={visible}
                        title="NHẬP HÓA ĐƠN"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onSave}
                        confirmLoading={confirmLoading}
                        width={'60%'}
                    >
                        <Form layout={formtype}>
                            <Row>
                                <Col span={24}>
                                    <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item>
                                            {getFieldDecorator('qlhd_id', {
                                            })(<Input type="text" disabaled hidden />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label="Loại hóa đơn">
                                        {getFieldDecorator('qlhd_loaihoadon', {
                                            rules: [{ required: true }],
                                        })(<Select
                                            onChange={this.handleChange}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            size={'small'}
                                        >
                                            <Option value="Vào" >Vào</Option>
                                            <Option value="Ra" >Ra</Option>

                                        </Select>)}
                                    </Form.Item>

                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Số hóa đơn '>
                                        {getFieldDecorator('qlhd_sohoadon', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" size={'small'}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Ngày xuất '>
                                        {getFieldDecorator('qlhd_ngayxuat', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="date" size={'small'} style={{textAlign: 'center'}}/>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label='Đơn vị bán hàng'>
                                        {getFieldDecorator('qlhd_dv_banhang', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select
                                            showSearch
                                            onChange={getkhachhang}
                                            onSelect={onSelectDv}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            size={'small'}
                                        >
                                            <Option value="add_donviban" disabled={stateoption}>Thêm đơn vị</Option>
                                            {
                                                donvi.map((value, index) => {
                                                    return (<Option value={value.dm_dv_id}>{value.dm_dv_ten}</Option>)
                                                })
                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Khách hàng bán hàng'>
                                        {getFieldDecorator('qlhd_kh_banhang', {
                                        })(<Select
                                            showSearch
                                            size={'small'}
                                        // filterOption={(input, option) =>
                                        //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        // }
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
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label='Đơn vị mua hàng'>
                                            {getFieldDecorator('qlhd_dv_muahang', {
                                                rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                            })(<Select
                                                showSearch
                                                onChange={getkhachhang}
                                                onSelect={onSelectDv}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                size={'small'}
                                            >
                                                <Option value="add_donvimua" disabled={stateoption1}>Thêm đơn vị</Option>
                                                {
                                                    donvi.map((value, index) => {
                                                        return (<Option value={value.dm_dv_id}>{value.dm_dv_ten}</Option>)
                                                    })
                                                }
                                            </Select>)}
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label='Khách hàng mua hàng'>
                                            {getFieldDecorator('qlhd_kh_muahang', {
                                            })(<Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                size={'small'}
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
                                <Row gutter={24}>
                                <Col span={16}>
                                    <Form.Item label='Số tiền(VNĐ)'>
                                        {getFieldDecorator('qlhd_sotien', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" size={'small'}/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Trạng thái">
                                        {getFieldDecorator('qlhd_trangthai', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            onChange={handleChange}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                            size={'small'}
                                        >
                                            {combobox}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label='Nội dung'>
                                        {getFieldDecorator('qlhd_noidung', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<TextArea rows={4} size={'small'}/>)}
                                    </Form.Item>
                                </Col>


                            </Row>




                        </Form>
                    </Modal>
                </div>
            )
        }
    }
)
const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        //   fetchUser,
        fetchLoading
    })
    (Modal_Menus);
