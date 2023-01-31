import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Spin, Card, Radio, Tag } from 'antd';
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action';
import MultiFilter from '@components/common/GroupFilter'
// import ReactModal from 'react-modal-resizable-draggable'
import '@styles/style.css'
import $ from 'jquery';
//import { format } from 'util';
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
let id = 0;
var formatDateModal = require('dateformat')
const FormModal = Form.create({ name: 'from_in_modal' })(

    class extends React.Component {

        clear = e => {
        }

        onChange = (field, value) => {
            this.setState({
                [field]: value,
            });
        }

        handleChange = async (value) => {
        }

        render() {
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, dinhdanh } = this.props;
            const { getFieldDecorator } = form;
            const selectBefore = (
                <Select placeholder="(+84)" defaultValue="0" style={{ width: 80 }}>
                    <Option value="0">(+84)</Option>
                </Select>
            );
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
                    <Form layout={formtype} style={{ padding: '10px' }}>
                        <h3>{title}</h3>
                        <Row gutter={24}>
                            <Col span={12}>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item  >
                                        {getFieldDecorator('ns_id')(<Input type="text" hidden />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} align="middle" style={{ marginTop: 'px' }}>
                            <Col span={6}>
                                <Form.Item label="Họ">
                                    {getFieldDecorator('ns_ho', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(
                                        <Input size={"small"} type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tên lót">
                                    {getFieldDecorator('ns_tenlot', {
                                        rules: [{}]
                                    })(<Input size={"small"} type="text" />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tên">
                                    {getFieldDecorator('ns_ten', {
                                        rules: [{ required: true, message: 'Trường không được để trống!', }],
                                    })(<Input size={"small"} type="text" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="Ngày Sinh">
                                    {getFieldDecorator('ns_ngaysinh', {
                                        rules: [{ required: true, message: 'Trường không được để trống!', }],
                                    })(
                                        <Input type="date" size={"small"} onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Giới Tính">
                                    {getFieldDecorator('ns_gioitinh', {
                                        initialValue: "Nam",
                                        rules: [{ required: true, message: 'Trường không được để trống', }],
                                    })(
                                        <Select
                                            size={"small"}
                                            onChange={this.handleChange}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Nam" >Nam</Option>
                                            <Option value="Nữ" >Nữ</Option>
                                            <Option value="Khác" >Khác</Option>
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <div>
                                <Col span={6}>
                                    <Form.Item label="Trạng thái">
                                        {getFieldDecorator('ns_trangthai', {
                                            rules: [{ required: true, message: 'Trường không được để trống!' }]
                                        })(
                                            <Select
                                                onChange={this.handleChange}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                initialValue="TT"
                                                size={"small"}
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
                            </div>
                            <Col span={1} offset={2}><Spin size="large" /></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item label="Định danh cá nhân">
                                    {getFieldDecorator('ns_dinhdanhcanhan', {
                                        rules: [{ required: true, message: 'Trường không được để trống!', }],
                                    })(
                                        <Select
                                            size={"small"}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                dinhdanh.map((value, index) => {
                                                    return (<Option value={value.madinhdanh}>{value.name}</Option>)
                                                })
                                            }
                                        </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Số điện thoại">
                                    {getFieldDecorator('ns_sodienthoai', {
                                        rules: [{}],
                                    })(<Input addonBefore={selectBefore} size={"small"} type="text" onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Email">
                                    {getFieldDecorator('ns_email', {
                                        rules: [{}],
                                    })(<Input size={"small"} type="email" onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item label="Địa chỉ hiện nay">
                                    {getFieldDecorator('ns_diachihiennay', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(<Input size={"small"} type="text" onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Nguyên quán">
                                    {getFieldDecorator('ns_nguyenquan', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(<Input size={"small"} type="text" onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Người liên hệ">
                                    {getFieldDecorator('ns_nguoilienhe', {
                                        rules: [{}]
                                    })(<Input size={"small"} type="text" onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item label="Bằng cấp">
                                    {getFieldDecorator('ns_bangcap', {
                                        rules: [{}]
                                    })(<Input size={"small"} type="text" onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="Các giấy tờ đã nộp">
                                    {getFieldDecorator('ns_cacgiaytodanop', {
                                        rules: [{}]
                                    })(<Input type="text" size={"small"} onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Tài khoản ngân hàng">
                                    {getFieldDecorator('ns_taikhoannganhang', {
                                        rules: [{}]
                                    })(<Input type="text" size={"small"} onChange={this.clear} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item label="Ngày học việc">
                                    {getFieldDecorator('ns_ngayhocviec', {
                                        rules: [{}]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Ngày thử việc">
                                    {getFieldDecorator('ns_ngaythuviec', {
                                        rules: [{ required: true, message: 'Trường không được để trống!' }]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Ngày làm chính thức">
                                    {getFieldDecorator('ns_ngaylamchinhthuc', {
                                        rules: [{}]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Ngày đóng bảo hiểm">
                                    {getFieldDecorator('ns_ngaydongbaohiem', {
                                        rules: [{}]
                                    })(
                                        <Input size={"small"} type="date" onChange={this.clear} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row> 
                    </Form>
                </Modal>
            );
        }
    },
)

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
}

class Nhansu extends React.Component {
    state = {
        value: 1,
    };
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            nhansu: [],
            nhansuget: [],
            current: 1,
            page: 1,
            pageSize: 10,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Nhân Sự',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            searchText: '',
            columnSearch: 'ns_ten',
            isSort: true,
            sortBy: '',
            index: 'ns_id',
            orderby: 'arrow-up',
            rowthotroselected: {},
            statebuttonedit: true,
            statebuttondelete: true,
            stateconfirmdelete: false,
            selectedRowKeys: [],
            selectedId: [],
            selectedrow: [],
            dinhdanh: [],
            modalIsOpen: false,
            timkiem: []
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    
    onChange1 = e => {
        this.setState({
            value: e.target.value,
        });
        if (e.target.value == 2) {
            //theo tháng 
            $("#" + localStorage.getItem("valueRowExpand")).html(
                '<div id=' + localStorage.getItem("valueRowExpand") + "Grid01" + ' style="float: left; display: -webkit-inline-box;">\
                <p>Chọn tháng:</p>&nbsp;\
                <select id='+ localStorage.getItem("valueRowExpand") + "selectMonth" + ' class="selectMonth">\
                <option value="01">Tháng 1</option>\
                <option value="02">Tháng 2</option>\
                <option value="03">Tháng 3</option>\
                <option value="04">Tháng 4</option>\
                <option value="05">Tháng 5</option>\
                <option value="06">Tháng 6</option>\
                <option value="07">Tháng 7</option>\
                <option value="08">Tháng 8</option>\
                <option value="09">Tháng 9</option>\
                <option value="10">Tháng 10</option>\
                <option value="11">Tháng 11</option>\
                <option value="12">Tháng 12</option>\
                </select>\
                </div>\
                <table border>\
                <thead>\
                    <tr>\
                        <th style="width:40px">STT</th>\
                        <th>Dự án</th>\
                        <th>Ưu tiên</th>\
                        <th>Trạng thái</th>\
                        <th>Phân loại</th>\
                        <th>Thời gian tiếp nhận</th>\
                        <th>Thời gian hoàn thành</th>\
                    </tr>\
                </thead>\
                <tbody id='+ localStorage.getItem("valueRowExpand") + "Grid02" + '></tbody>\
            </table>\
            <div style="text-align: center"><label style="color: red" id='+ localStorage.getItem("valueRowExpand") + "txtThongBao" + '></label></div>'
            )
            $("#" + localStorage.getItem("valueRowExpand") + "selectMonth").trigger("change")
        }
    };
    formatDate(strDate, strFormat) {
        if (strDate == null)
            return null;
        var d = new Date(strDate);
        return d;
    }

    getNhansu = (pageNumber) => {

        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('nhansu/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {
                if (res.data.data.nhansu) {
                    this.setState({
                        nhansu: res.data.data.nhansu,
                        count: res.data.data.count
                    })
                }
                this.props.fetchLoading({
                    loading: false
                })
            })

    }

    insertOrUpdate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'nhansu/insert' : 'nhansu/update'
            Request(url, 'POST', values)
                .then((response) => {
                    this.setState({
                        rowthotroselected: values
                    })
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
                    if (!!!response.data.success) {
                        message = 'Co loi xay ra !'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getNhansu(this.state.page)
                })
        })
    }

    deleteNhansu = (ns_id) => {
        Request(`nhansu/delete`, 'DELETE', { ns_id: ns_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thong Bao',
                    description: res.data.message
                });
                this.getNhansu(this.state.page)
                this.setState({
                    stateconfirmdelete: false,
                    statebuttondelete: true,
                    statebuttonedit: true,
                    selectedRowKeys: []
                })
            })
        this.setState({
            stateconfirmdelete: false,
        })
    }

    set_Select_DinhDanh() {
        Request('nhansu/getdinhdanh', 'POST', {}).then((res) => {
            if (res.data.data.users) {
                this.setState({
                    dinhdanh: res.data.data.users
                })
            }
        })

    }

    refresh = async (pageNumber) => {
        message.success('Tải lại thành công', 1);
        await this.getNhansu(this.state.pageNumber)
    }

    componentDidMount() {
        this.getNhansu(this.state.pageNumber, this.state.index, this.state.sortBy);
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px';
        $("body").on("change", ".selectMonth", function () {
            var value = localStorage.getItem("valueRowExpand");
            Request('nhansu/getjob', 'POST', { value }).then((res) => {
                if (res.data.success == true) {
                    if (res.data.data.length == 0) {
                        $("#" + localStorage.getItem("valueRowExpand") + "txtThongBao").text("Không có dữ liệu")
                    }
                    else {
                        var data = res.data.data;
                        var valMonth = $("#" + localStorage.getItem("valueRowExpand") + "selectMonth option:selected").val();
                        var count = 0;
                        var stt = 0;
                        $("#" + localStorage.getItem("valueRowExpand") + "Grid02").html("")
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].thoigiantiepnhan.split("/")[1] == valMonth) {
                                stt = stt + 1;
                                if (data[i].thoigianhoanthanh == null) {
                                    $("#" + localStorage.getItem("valueRowExpand") + "Grid02").append("<tr><td>" + stt + "</td>\
                                <td>"+ data[i].tenduan + "</td>\
                                <td>"+ data[i].uutien + "</td>\
                                <td>"+ data[i].trangthai + "</td>\
                                <td>"+ data[i].phanloai + "</td>\
                                <td>"+ data[i].thoigiantiepnhan + "</td>\
                                <td>Chưa hoàn thành</td>\
                                </tr>")
                                }
                                else {
                                    $("#" + localStorage.getItem("valueRowExpand") + "Grid02").append("<tr><td>" + stt + "</td>\
                                <td>"+ data[i].tenduan + "</td>\
                                <td>"+ data[i].uutien + "</td>\
                                <td>"+ data[i].trangthai + "</td>\
                                <td>"+ data[i].phanloai + "</td>\
                                <td>"+ data[i].thoigiantiepnhan + "</td>\
                                <td>"+ data[i].thoigianhoanthanh + "</td>\
                                </tr>")
                                }
                            }
                            else {
                                count = count + 1;
                            }
                        }
                        if (count == data.length) {
                            $("#" + localStorage.getItem("valueRowExpand") + "txtThongBao").text("Không có dữ liệu")
                        }
                        else {
                            $("#" + localStorage.getItem("valueRowExpand") + "txtThongBao").text("")
                        }
                    }
                }
            })
        })
    }

    onchangpage = (page) => {
        this.setState({
            page: page
        })
        this.getNhansu(page);
        if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getNhansu(page)
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8, align: 'center' }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
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
                    Search
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
        Request(`nhansu/search`, 'POST',
            {
                timkiem: this.state.timkiem,
                pageSize: this.state.pageSize,
                pageNumber: this.state.page
            })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Đã xuất hiện bản ghi',
                    description: res.data.message
                });
                this.setState({
                    nhansu: res.data.data.nhansu,
                })
            })


        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

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
                if (this.state.isSearch == 1) {
                    this.search(this.state.searchText)
                }
                else {
                    this.getNhansu(this.state.page)
                }
            },
        };
    }

    showModal = (nhansu) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        this.openModal()
        form.resetFields();
        form.setFieldsValue({ ns_trangthai: 'TT' })
        if (nhansu.ns_id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update'
            })
            nhansu.ns_ngaysinh = formatDateModal(nhansu.ns_ngaysinh, 'yyyy-mm-dd')
            nhansu.ns_ngayhocviec = formatDateModal(nhansu.ns_ngayhocviec, 'yyyy-mm-dd')
            nhansu.ns_ngaythuviec = formatDateModal(nhansu.ns_ngaythuviec, 'yyyy-mm-dd')
            nhansu.ns_ngaylamchinhthuc = formatDateModal(nhansu.ns_ngaylamchinhthuc, 'yyyy-mm-dd')
            nhansu.ns_ngaydongbaohiem = formatDateModal(nhansu.ns_ngaydongbaohiem, 'yyyy-mm-dd')
            form.setFieldsValue(nhansu);
        }
        this.set_Select_DinhDanh();
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
        this.closeModal()
    };

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

    cancel = (e) => {
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }
    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch, this.state.codeSearch);
        }
        else {
            this.getNhansu(this.state.page, this.state.index, this.state.sortBy)
        }
    }

    onSearch = (val) => {
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

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedId: selectedRowKeys
        });
        if (selectedRowKeys.length > 0) {
            this.setState({
                statebuttondelete: false
            })
        }
        else
            this.setState({
                statebuttondelete: true
            })
        if (selectedRowKeys.length === 1) {
            this.setState({
                statebuttonedit: false,
                rowthotroselected: selectedRows[0]
            })
        }
        else
            this.setState({
                statebuttonedit: true
            })
    }

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
    }

    clearChecked = () => {
        this.onSelectChange([], [])
    };

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.ns_id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.ns_id], [row])
        }
    }

    render() {
        const columnFilter = [{ column: 'ns_ho', type: 'text', name: 'Họ' }, { column: 'ns_ten', type: 'text', name: 'Tên' }, { column: 'ns_ngaysinh', type: 'date', name: 'Ngày sinh' }]
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
        }

        var formatDate = require('dateformat')
        return (
            <div>
                <MultiFilter
                    columnFilter={columnFilter}
                />
                <Card>
                    <Row>
                        <Col span={2}>
                            <Tooltip title="Thêm Nhân Sự">
                                <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                    <Icon type="user-add" />
                                </Button>
                            </Tooltip>
                        </Col>
                        <Col span={2}>
                            <Tooltip title="Sửa Nhân Sự">
                                <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                                    <Icon type="edit" />
                                </Button>
                            </Tooltip>
                        </Col>
                        <Col span={2}>
                            <Tooltip title="Xóa Nhân Sự">
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa?"
                                    onConfirm={this.deleteNhansu.bind(this, this.state.selectedId)}
                                    onCancel={this.cancel}
                                    okText="Yes"
                                    cancelText="No"
                                    visible={this.state.stateconfirmdelete}
                                >
                                    <Button shape="round" type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                        <Icon type="delete" />
                                    </Button>
                                </Popconfirm>
                            </Tooltip>
                        </Col>
                        <Col span={2}>
                            <Tooltip title="Tải Lại">
                                <Button shape="round" type="primary" style={{ marginLeft: '18px' }} size="default" onClick={this.refresh.bind(null)}>
                                    <Icon type="reload" />
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Card>
                <Row style={{ marginTop: 5 }}>
                    <FormModal
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        title={this.state.title}
                        formtype={this.state.formtype}
                        id_visible={this.state.id_visible}
                        dinhdanh={this.state.dinhdanh}
                        isOpen={this.state.modalIsOpen}

                    />
                    <Table rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.nhansu} rowKey="ns_id" bordered scroll={{ x: 1000 }}
                        onExpand={(expanded, record) => {
                            // this.getInformationPerson(record.ns_id) 
                        }}
                        expandedRowRender={(record, selectedRowKeys) => {
                            localStorage.setItem
                                ("valueRowExpand", record.ns_id)
                            return (
                                <div>
                                    <Radio.Group onChange={this.onChange1}>
                                        <Radio value={1}>7 ngày gần nhất</Radio>
                                        <Radio value={2}>Tháng</Radio>
                                        <Radio value={3}>Quý</Radio>
                                        <Radio value={4}>Năm</Radio>
                                    </Radio.Group>
                                    <div id={record.ns_id} style={{ width: '92%' }}></div>
                                </div>
                            )
                        }}
                    >
                        <Column title="Định danh cá nhân" dataIndex={"ns_dinhdanhcanhan"} align="center" {...this.getColumnSearchProps('ns_dinhdanhcanhan')} onHeaderCell={this.onHeaderCell} />
                        <Column title="Họ và tên" dataIndex="ns_hovaten" key="ns_hovaten" align="center" {...this.getColumnSearchProps('ns_hovaten')} onHeaderCell={this.onHeaderCell} />
                        <Column title="Ngày sinh" dataIndex="ns_ngaysinh" key="ns_ngaysinh" align="center" render={text => formatDate(text, "dd/mm/yyyy")} onHeaderCell={this.onHeaderCell} />
                        <Column title="Giới tính" dataIndex="ns_gioitinh" key="ns_gioitinh" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Số điện thoại" dataIndex="ns_sodienthoai" key="ns_sodienthoai" align="center" {...this.getColumnSearchProps('ns_sodienthoai')} onHeaderCell={this.onHeaderCell} />
                        <Column title="Email" dataIndex="ns_email" key="ns_email" align="center" {...this.getColumnSearchProps('ns_email')} onHeaderCell={this.onHeaderCell} />
                        <Column title="Địa chỉ hiện nay" dataIndex="ns_diachihiennay" key="ns_diachihiennay" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Nguyên quán" dataIndex="ns_nguyenquan" key="ns_nguyenquan" align="center" onHeaderCell={this.onHeaderCell} />
                        <Column title="Người liên hệ" dataIndex="ns_nguoilienhe" key="ns_nguoilienhe" align="center" {...this.getColumnSearchProps('ns_nguoilienhe')} onHeaderCell={this.onHeaderCell} />
                        <Column title="Bằng cấp" dataIndex="ns_bangcap" key="ns_bangcap" align="center" {...this.getColumnSearchProps('ns_bangcap')} onHeaderCell={this.onHeaderCell} />
                    </Table>
                </Row>
                <Row>
                    <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                </Row>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchLoading
    }
)(Nhansu);