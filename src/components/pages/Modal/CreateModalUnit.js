import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Divider } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
// import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import { async } from 'q';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
const FormModalImport = Form.create({ name: 'from_in_modal' })(
    class extends React.Component {
        render() {
            return (
                <Modal
                    title="Import File Đơn Vị"
                    visible={this.props.visibleImport}
                    onCancel={this.props.onCancel}
                >
                    <div>
                        <label>File của bạn</label>
                        <input type="file" name="file"
                        // onChange={onChangeFile}
                        // onChange={onChangeHandler}
                        />
                    </div>
                </Modal>
            )
        }
    }
)
const CreateModalUnit = Form.create({ name: 'form_create_unit' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                visibleImport: false
            }
        }
        showModalImport = () => {
            const { form } = this.formRef.props
            this.setState({
                visibleImport: true
            })
        }

        saveFormRef = formRef => {
            this.formRef = formRef;
        }

        handleCancel = e => {
            this.setState({
                visibleImport: false
            });
        };

        render() {
            const { Option } = Select;
            const combobox = [];
            // var kh_tendaydu = this.props.settenkh;
            combobox.push(<Option key={'HD'}>Hoạt động</Option>);
            combobox.push(<Option key={'DHD'}>Dừng hoạt động</Option>);
            combobox.push(<Option key={'GT'}>Giải thể</Option>);
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, dm_dv_id_visible, handleChange, select_diabanhuyen, select_diabantinh, select_diabanxa, onSelectDiaBanTinh, onSelectDiaBanHuyen, onSelectDiaBanXa, select_tenkh, onSelectKh, stateoption } = this.props;
            const { getFieldDecorator } = form;
            var datacha = this.props.datacha
            return (
                <div>
                    <Modal
                        visible={visible}
                        title="NHẬP THÔNG TIN ĐƠN VỊ:"
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onSave}
                        confirmLoading={confirmLoading}
                        width={1000}
                    >
                        <Form layout={formtype}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <div style={{ display: dm_dv_id_visible === true ? 'block' : 'none' }}>
                                        <Form.Item>
                                            {getFieldDecorator('dm_dv_id', {
                                            })(<Input type="text" disabled hidden />)}
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label='Tên đơn vị'>
                                        {getFieldDecorator('dm_dv_ten', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label='Số điện thoại'>
                                        {getFieldDecorator('dm_dv_sodienthoai', {
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Người đại diện'>
                                        {getFieldDecorator('kh_id_nguoidaidien', {

                                        })(<Select
                                            allowClear
                                            onSelect={onSelectKh}
                                            placeholder="---Không có người đại diện có thể bỏ qua trường này---"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch
                                        >
                                            <Option value="add_nguoidaidien" disabled={stateoption}>Thêm người đại diện</Option>
                                            {
                                                select_tenkh.map((value, index) => {
                                                    return (
                                                        <Option value={value.kh_id}>{value.tennguoidaidien}</Option>
                                                    )
                                                })}
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Tỉnh/Thành phố'>
                                        {getFieldDecorator('dm_db_id_tinh', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanTinh}>
                                            {
                                                select_diabantinh.map((value, index) => {
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
                                        {getFieldDecorator('dm_db_id_huyen', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanHuyen}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch>
                                            {
                                                select_diabanhuyen.map((value, index) => {
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
                                        {getFieldDecorator('dm_db_id_xa', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Select onSelect={onSelectDiaBanXa}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch>
                                            {
                                                select_diabanxa.map((value, index) => {
                                                    return (
                                                        <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                                                    )
                                                })

                                            }
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label='Địa chỉ'>
                                        {getFieldDecorator('dm_dv_diachi', {
                                            rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label='Trạng thái'>
                                        {getFieldDecorator('dm_dv_trangthai', {
                                            rules: [{ required: true }],
                                        })(<Select
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
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
                                <Col span={8}>
                                    <Form.Item label='Mã số thuế'>
                                        {getFieldDecorator('dm_dv_masothue', {
                                        })(<Input type="text" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Đơn vị cấp trên:">
                                        {getFieldDecorator('dm_dv_id_cha', {
                                            // rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!',}],
                                        })(
                                            <Select
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                showSearch
                                            >
                                                {datacha.map((item, i) => {
                                                    return (
                                                        <Option value={item.dm_dv_id}>{item.tendonvi}</Option>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Button onClick={this.showModalImport.bind(this)}>Import File</Button>
                            </Row> */}
                        </Form>
                    </Modal>
                    <FormModalImport
                        wrappedComponentRef={this.saveFormRef}
                        visibleImport={this.state.visibleImport}
                        onCancel={this.handleCancel}
                    />
                </div>
            );

        }
    },
)
const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        //   fetchUser,
        fetchLoading
    })
    (CreateModalUnit);
