import React from 'react';
import { Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, Select, AutoComplete} from 'antd';
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
const { Option } = AutoComplete;
const { Search } = Input;
const CreateModalCustomer = Form.create({ name: 'form_create_customer' })(
    class extends React.Component {
        state = {
            result: [],
        };
        handleSearch = value => {
            let result;
            if (!value || value.indexOf('@') >= 0) {
                result = [];
            } else {
                result = ['gmail.com', 'yahoo.com', 'qq.com'].map(domain => `${value}@${domain}`);
            }
            this.setState({ result });
        };
        render() {
            const { Option } = Select;
            const combobox = [];
            combobox.push(<Option key={'DD'}>Đại diện</Option>);
            combobox.push(<Option key={'DM'}>Đầu mối liên lạc</Option>);
            combobox.push(<Option key={'TXLL'}>Thường xuyên liên lạc</Option>);
            const { result } = this.state;
            const children = result.map(email => <Option key={email}>{email}</Option>);
            const { visible, onCancel, onOk_kh, Data, form, title, confirmLoading, formtype, kh_id_visible, handleChange, select_tinh, select_huyen, select_xa, onSelectTinh, onSelectHuyen, onSelectXa, select_tendv, onSelectDv, stateoption } = this.props;
            const { getFieldDecorator } = form;
            // var datacha = this.props.datacha
            return (
                <div>
                    <Modal
                        visible={visible}
                        title="NHẬP THÔNG TIN KHÁCH HÀNG"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onOk_kh}
                        confirmLoading={confirmLoading}
                        width={1000}
                    >
                        <Form layout={formtype}>
                            <Row>
                                <Col span={24}>
                                    <div style={{ display: kh_id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item>
                                            {getFieldDecorator('kh_id', {
                                            })(<Input type="text" disabaled hidden />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Tên khách hàng'>
                                        {getFieldDecorator('kh_ten', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Số điện thoại'>
                                        {getFieldDecorator('kh_sodienthoai', {

                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Email'>
                                        {getFieldDecorator('kh_email', {
                                        })(<AutoComplete style={{ width: 300 }} onSearch={this.handleSearch}>
                                            {children}
                                        </AutoComplete>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Tỉnh/Thành phố'>
                                        {getFieldDecorator('dm_db_id_tinh_customer', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectTinh}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            {
                                                select_tinh.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })
                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Huyện/Quận'>
                                        {getFieldDecorator('dm_db_id_huyen_customer', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectHuyen}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            {
                                                select_huyen.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })
                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Xã/Phường'>
                                        {getFieldDecorator('dm_db_id_xa_customer', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectXa}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            {
                                                select_xa.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })
                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label='Địa chỉ'>
                                        {getFieldDecorator('kh_diachi', {

                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={7}>
                                    <Form.Item label='Liên lạc'>
                                        {getFieldDecorator('kh_lienlac', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder='Please select'
                                            onChange={handleChange}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            {combobox}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Form.Item label='Vị trí công tác'>
                                        {getFieldDecorator('kh_vitricongtac', {
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label='Đơn vị'>
                                        {getFieldDecorator('dm_dv_id', {

                                        })(<Select
                                            allowClear
                                            onSelect={onSelectDv} placeholder="---Không có đơn vị có thể bỏ qua trường này---"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            <Option value="add_donvi" disabled={stateoption}>Thêm đơn vị</Option>
                                            {
                                                select_tendv.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_dv_id}>{value.tendonvi}</Option>
                                                    )
                                                })}
                                        </Select>)}
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
    (CreateModalCustomer);
