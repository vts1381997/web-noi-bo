import React from 'react';
import {  Pagination, AutoComplete, Icon, Mentions, Upload, Table, Input, Checkbox, Modal, Popconfirm, message, Button, Spin, Form, Row, Col, notification, Alert, Select } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action'
import jwt from 'jsonwebtoken'
import '@styles/style.css'
import Modal_FileUpload from '@pages/Modal/Modal_FileUpload.js'
import axios from 'axios';

var formatDateModal = require('dateformat')
const token = cookie.load('token');
var { Option } = Mentions;
var { Option } = AutoComplete;

const FormSyss = Form.create({ name: 'normal_login' })(
    class extends React.Component {
        state = {
            result: [],
          };
        handleSubmit = e => {
            e.preventDefault()
            this.props.save();
        };
        setform = (value) => {
            this.props.form.setFieldsValue(value)
        }
        handleSearch = value => {
            let result;
            if (!value || value.indexOf('@') >= 0) {
              result = [];
            } else {
              result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
            }
            this.setState({ result });
          };

        render() {
            const { form, getProfile, onSave } = this.props;
            const { getFieldDecorator } = form;
            const profile = this.props.profile
            const { result } = this.state;
            const children = result.map(email => <Option key={email}>{email}</Option>);
            return (
                <Form style={{ padding: '10px' }} onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <div >
                                <Form.Item  >
                                    {getFieldDecorator('ns_id')(<Input type="text" hidden />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={24} align="middle" type="flex">
                        <Col span={6}>
                            <Form.Item label="Họ">
                                {getFieldDecorator('ns_ho', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(
                                    <Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tên lót">
                                {getFieldDecorator('ns_tenlot', {
                                    rules: [{}]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tên">
                                {getFieldDecorator('ns_ten', {
                                    rules: [{ required: true, message: 'Trường không được để trống!', }],
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <img src={this.props.address} style={{width: '120px', height: '120px'}}/>
                        </Col>
                    </Row>
                    
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Ngày Sinh">
                                {getFieldDecorator('ns_ngaysinh', {
                                    rules: [{ required: true, message: 'Trường không được để trống!', }],
                                })
                                    (
                                        <Input type="date" />
                                    )

                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Giới Tính">
                                {getFieldDecorator('ns_gioitinh', {
                                    // initialValue: "Nam",
                                    rules: [{ required: true, message: 'Trường không được để trống', }],
                                })(<Select
                                    size="default"
                                >
                                    <Option value="Nam" >Nam</Option>
                                    <Option value="Nữ" >Nữ</Option>
                                    <Option value="Khác" >Khác</Option>
                                </Select >)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Trạng thái">
                                {getFieldDecorator('ns_trangthai', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(<Select
                                    size="default"
                                >
                                    <Option value="TT" >Thực Tập</Option>
                                    <Option value="HC" >Học Việc</Option>
                                    <Option value="TV" >Thử Việc</Option>
                                    <Option value="CT" >Chính Thức</Option>
                                    <Option value="NV" >Nghỉ Việc</Option>
                                    <Option value="Khac" >Khác</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                            <Col span={6}>
                                <Form.Item label='Chọn ảnh'>
                                    <Button onClick={this.props.showModalUpload}>Chọn Ảnh</Button>
                                </Form.Item>
                            </Col>

                    </Row>


                    <Row gutter={24}>
                        <Col span={9}>
                            <Form.Item label="Định danh cá nhân">
                                {getFieldDecorator('ns_dinhdanhcanhan', {
                                    rules: [{ required: true, message: 'Trường không được để trống!', }],
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Số điện thoại">
                                {getFieldDecorator('ns_sodienthoai', {
                                    rules: [{}],
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Email">
                                {getFieldDecorator('ns_email', {
                                    rules: [{}],
                                })(<Input type="email" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={9}>
                            <Form.Item label="Địa chỉ hiện nay">
                                {getFieldDecorator('ns_diachihiennay', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Nguyên quán">
                                {getFieldDecorator('ns_nguyenquan', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Người liên hệ">
                                {getFieldDecorator('ns_nguoilienhe', {
                                    rules: [{}]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={9}>
                            <Form.Item label="Bằng cấp">
                                {getFieldDecorator('ns_bangcap', {
                                    rules: [{}]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Các giấy tờ đã nộp">
                                {getFieldDecorator('ns_cacgiaytodanop', {
                                    rules: [{}]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Tài khoản ngân hàng">
                                {getFieldDecorator('ns_taikhoannganhang', {
                                    rules: [{}]
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Ngày học việc">
                                {getFieldDecorator('ns_ngayhocviec', {
                                    rules: [{}]
                                })(
                                    <Input type="date" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày thử việc">
                                {getFieldDecorator('ns_ngaythuviec', {
                                    rules: [{ required: true, message: 'Trường không được để trống!' }]
                                })(
                                    <Input type="date" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày làm chính thức">
                                {getFieldDecorator('ns_ngaylamchinhthuc', {
                                    rules: [{}]
                                })(
                                    <Input type="date" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày đóng bảo hiểm">
                                {getFieldDecorator('ns_ngaydongbaohiem', {
                                    rules: [{}]
                                })(
                                    <Input type="date" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row>
                            <Button onClick={this.props.onCancel}>Thoát</Button>
                        </Row> */}
                    <Form.Item style={{ marginTop: '25px' }}>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '490px' }} >
                            Lưu Thay Đổi
                        </Button>
                        <Button type="default" style={{ marginLeft: '10px' }} onClick={getProfile}  >
                            Trở Về
                         </Button>
                    </Form.Item>
                </Form>
            );

        }
    }
);


class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            searchText: '',
            columnSearch: '',
            isSort: true,
            sortBy: '',
            index: 'id',
            orderby: 'arrow-up',
            pagexx: [],
            editForm: true,
            nhansu: [],
            visibleUpload: false,
            selectedFile: null,
            address: ''
        }
    }
    //--------------DELETE-----------------------

    save = () => {

        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            values.ns_address=this.state.address
            Request('nhansu/updatens', 'POST', values).then(res => {
                message.success(res.data.message)
                this.setState({
                    nhansu: values
                })
            })
        })


    }

    getProfile = async () => {
        const form = this.formRef.props.form;
        // const value = form.getFieldsValue()
        await Request('nhansu/get', 'POST', null)
            .then((response) => {
                if (response.data)

                    this.setState({
                        profile: response.data,
                    })
            })
        form.setFieldsValue(this.state.nhansu)
    }

    refresh = (pageNumber) => {
        this.getProfile(this.state.pageNumber)
    }

    bindData = async () => {
        const { form } = this.formRef.props
        var payload = jwt.decode(token);

        let a = payload.mdd
        await Request('nhansu/viewprofile', 'POST', {
            a
        })
            .then((res) => {
                let xx = res.data.data.nhansu[0]
                xx.ns_ngaysinh = formatDateModal(xx.ns_ngaysinh, 'yyyy-mm-dd')
                xx.ns_ngayhocviec = formatDateModal(xx.ns_ngayhocviec, 'yyyy-mm-dd')
                xx.ns_ngaythuviec = formatDateModal(xx.ns_ngaythuviec, 'yyyy-mm-dd')
                xx.ns_ngaylamchinhthuc = formatDateModal(xx.ns_ngaylamchinhthuc, 'yyyy-mm-dd')
                xx.ns_ngaydongbaohiem = formatDateModal(xx.ns_ngaydongbaohiem, 'yyyy-mm-dd')
                if (res.data.data.nhansu) {
                    this.setState({
                        nhansu: xx,

                    })
                }
                this.props.fetchLoading({
                    loading: false
                })
            })
        form.setFieldsValue(this.state.nhansu)
    }
    componentDidMount() {
        this.bindData();

    }

    onchangpage = (page) => {
        this.setState({
            page: page
        })

        this.getProfile(page); if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getProfile(page)
        }
    }

    handleChangeInput = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleCount = () => {
        let count = this.state.count;
        this.setState({
            count: count + 1
        })
    }
    confirm = (e) => {
        message.success('Bấm yes để xác nhận');
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }

    saveFormRefImage = formRef => {
        this.formRefImage = formRef;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    showModalUpload = () => {
        this.setState({
            visibleUpload: true
        });
    }

    handleCancel = e => {
        this.setState({
            visibleUpload: false,
        });
    };

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        if (this.state.selectedFile !== null) {
            data.append('file', this.state.selectedFile)
            axios.post("http://103.74.122.80:5000/upload", data, {
            })
                .then(res => {
                    this.setState({
                        visibleUpload: false
                    })
                    var notifi_type = 'success'
                    var message = 'Thành Công'

                    notification[notifi_type]({
                        message: message
                    });
                })
        }
    }

    insertOrUpdateUpload = () => {
        this.onClickHandler();
        this.setState({
            address: "http://103.74.122.80:5000/uploads/" +this.state.selectedFile.name
        })
        // const { form } = this.formRef.props;
        // form.validateFields((err, values) => {
        //     if (err) {
        //         return
        //     }
        //     if (this.state.selectedFile !== null) {
        //         const urlFile = "http://fscvn.ddns.net:5000/upload/" + this.state.selectedFile.name;
        //         values.file_data = urlFile
        //     }
        //     else {
        //         values.file_data = " "
        //     }
        // var url = this.state.action === 'insert' ? 'filekhachhangs/insert' : 'filekhachhangs/update'

        // Request(url, 'POST', values)
        //     .then(async (response) => {
        //         this.setState({
        //             rowthotroselected: values
        //         })
        //         if (response.status === 200 & response.data.success === true) {
        //             form.resetFields();
        //             this.setState({
        //                 visible: false,
        //                 message: response.data.message
        //             })
        //         }
        //         var description = response.data.message
        //         var notifi_type = 'success'
        //         var message = 'Thanh Cong'
        //         if (!!!response.data.success) {
        //             message = 'Co loi xay ra !'
        //             notifi_type = 'error'
        //             description = response.data.message.map((value, index) => {
        //                 return <Alert type='error' message={value}></Alert>
        //             })
        //         }
        //         await notification[notifi_type]({
        //             message: message,
        //             description: description
        //         });
        //     })
        // })
    }

    render() {
        if (token)
            return (
                <div>
                    <p style={{ textAlign: 'center' }}></p>
                    <FormSyss wrappedComponentRef={this.saveFormRef} save={this.save} onSave={this.insertOrUpdate} getProfile={this.getProfile} showModalUpload={this.showModalUpload} address={this.state.nhansu.ns_address} />
                    <Modal_FileUpload
                        wrappedComponentRef={this.saveFormRefImage}
                        visible={this.state.visibleUpload}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdateUpload}
                        onChangeHandler={this.onChangeHandler}
                    />
                </div>
            );
        else
            return (
                <Login />
            )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchLoading
    }
)(ViewProfile);
