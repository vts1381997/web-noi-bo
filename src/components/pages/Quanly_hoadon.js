import React from 'react'
import { Tooltip, Pagination, Icon, Table, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Card, Input } from 'antd'
import { connect } from 'react-redux'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action'
import { fetchLoading } from '@actions/common.action'
import Modal_Hoadon from '@pages/Modal/Modal_Hoadon.js'
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import '@styles/style.css'

const { Column } = Table;
var format = require('dateformat')
class Quanly_hoadon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qlhd: [],
            pageNumber: 1,
            page: 1,
            pageSize: 10,
            count: 1,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin Quản lý hóa đơn',
            id_visible: false,
            action: 'insert',
            sortBy: '',
            // index: 'qlhd_sohoadon',
            stateconfirmdelete: false,
            checkStateConfirm: true,
            statebuttondelete: true,
            statebuttonedit: true,
            rowthotroselected: [],
            selectedId: [],
            selectedRowKeys: [],
            khachhangs: [],
            donvis: [],
            stateoption: true,
            stateoption1: true,
            select_donvicha: [],
            title_dv: 'Thêm mới đơn vị',
            formtype_dv: 'horizontal',
            select_diabantinh: [],
            select_diabanhuyen: [],
            select_diabanxa: [],
            select_tenkh: [],
            visible_dv: false,
            id_unit :[],
            mua:'',
            ban:''
        }
    }


    getQuanly_hoadon = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('qlhd/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            // index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((res) => {
                if (res.data.data) {
                    this.setState({

                        qlhd: res.data.data.quanly_hoadons,
                        count: res.data.data.count
                    })
                }
                this.props.fetchLoading({
                    loading: false
                })
            })
    }


    getkhachhang = (dv) => {
        if (dv === null) {
            dv = ""
        }

        Request('hotro/getkhachhangwhere', 'POST', { dv }).then((res) => {
            if (res) {
                this.setState({
                    khachhangs: res.data.data.khachhangs
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getdonvi = () => {
        Request('hotro/getdonvi', 'POST', {}).then((res) => {
            if (res) {
                this.setState({
                    donvis: res.data.data.donvis
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }



    insertOrUpdate = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'qlhd/insert' : 'qlhd/update'
            Request(url, 'POST', values)
                .then(async (response) => {
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
                    var message = 'Thông báo'
                    if (!!!response.data.success) {
                        message = 'Có lỗi xảy ra!'
                        notifi_type = 'error'
                        // description = response.data.message.map((value, index) => {
                        //     return <Alert type='error' message={value}></Alert>
                        // })
                    }
                    await notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getQuanly_hoadon(this.state.page)
                })
        })
    }

    deleteQuanly_hoadon = (qlhd_id) => {
        Request(`qlhd/delete`, 'DELETE', { qlhd_id: qlhd_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.setState({
                    stateconfirmdelete: false,
                    statebuttondelete: true,
                    statebuttonedit: true,
                    selectedRowKeys: []
                })
                this.getQuanly_hoadon(this.state.page)
                this.render()
            })
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
        Request(`qlhd/search`, 'POST',
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
                    qlhd: res.data.data.quanly_hoadons,
                })
            })

        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    refresh = async (pageNumber) => {
        message.success('Refresh success', 1);
        await this.getQuanly_hoadon(this.state.pageNumber)
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            id_visible: false
        });
    };

    componentDidMount() {
        this.getQuanly_hoadon(this.state.pageNumber, this.state.sortBy);
        this.getkhachhang();
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
    }

    showModal = (qlhd) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false,
            action: 'insert'
        });
        form.resetFields();
        if (qlhd.qlhd_id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update',
            })
            this.set_select_tendv();
            form.setFieldsValue(qlhd);
            this.getkhachhang(qlhd.qlhd_dv_banhang)
            this.getkhachhang(qlhd.qlhd_dv_muahang)
        } else {
            this.getkhachhang(null);
        }
       
        this.getdonvi();
    }

    confirm = (e) => {
        message.success('Bấm yes để xác nhận');
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
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

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.qlhd_id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.qlhd_id], [row])
        }
    }
    saveFormRefCreate = formRef => {
        this.formRefUnit = formRef;
    }
    onCancel_dv = () => {
        this.setState({
            visible_dv: false
        })
    }
    onOk_dv = async (qlhd) => {
        // this.onSelectDv();
        const { form } = this.formRefUnit.props;
        const form1 = this.formRef.props.form;
        const form2 = this.formRef.props.form;
       await form.validateFields((err, values) => {
            if (err) {
                return
            }
            Request('unit/insert', 'POST', values)

                .then( (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields()
                         this.setState({
                            visible_dv: false,
                            message: response.data.message,
                        })

                        if (!this.state.visible_dv) {
                            var formdonvi = this.formRef.props.form
                            try {
                                formdonvi.setFieldsValue({ dm_dv_id: response.data.id_unit })
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thành công !!'

                    if (!!!response.data.success) {
                        message = 'Có lỗi xảy ra !!'
                        notifi_type = 'error'
                        description = response.data.message.map((values, index) => {
                            return <Alert type='error' message={values}></Alert>
                        })
                    }
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.set_select_tendv();
                    if(this.state.ban === 'add_donviban'){
                        form1.setFieldsValue({qlhd_dv_banhang:response.data.id_unit})
                        this.getdonvi(qlhd.qlhd_dv_banhang)
                    }else if(this.state.mua === 'add_donvimua'){
                        form1.setFieldsValue({qlhd_dv_muahang:response.data.id_unit})
                        this.getdonvi(qlhd.qlhd_dv_muahang)
                    }
                    
                })
        })
    }
    onSelectDiaBanTinh = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_diabanhuyen(value);
        if (this.state.select_diabanhuyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen: '' })
            await this.set_select_diabanxa(-1);
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
            await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id);
            if (this.state.select_diabanxa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa: ' ' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
            }
        }
    }
    onSelectDiaBanHuyen = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_diabanxa(value);
        if (this.state.select_diabanxa.length === 0) {
            await form.setFieldsValue({ dm_db_id_xa: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id });
        }
    }
    onSelectDv = async (value) => {
        if (value === 'add_donviban') {
            await this.setState({
                visible_dv: true,
                stateoption: true,
                ban : value
            })
            var form = null

            if (this.state.visible_dv) {
                form = this.formRefUnit.props.form
                form.setFieldsValue({ dm_dv_trangthai: 'HD' })
                try {
                    this.set_select_donvicha()
                    await this.set_select_diabantinh();
                    if (this.state.select_diabantinh.length === 0) {
                        form.setFieldsValue({ dm_db_id_tinh: '' })
                    }
                    form.setFieldsValue({ dm_db_id_tinh: this.state.select_diabantinh[0].dm_db_id })
                    await this.set_select_diabanhuyen(this.state.select_diabantinh[0].dm_db_id);
                    if (this.state.select_diabanhuyen.length === 0) {
                        form.setFieldsValue({ dm_db_id_huyen: '' })
                    }
                    form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
                    await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id)
                    if (this.state.select_diabanxa.length === 0) {
                        form.setFieldsValue({ dm_db_id_xa: '' })
                    }
                    form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
                    await this.set_select_tenkh();
                    // await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
                }
                catch (err) {
                    console.log(err)
                }
                // form1.setFieldsValue({qlhd_dv_muahang:response.data.id_unit})
            }
        }else if(value === 'add_donvimua') {
            await this.setState({
                visible_dv: true,
                stateoption: true,
                mua : value
            })
            var form = null

            if (this.state.visible_dv) {
                form = this.formRefUnit.props.form
                form.setFieldsValue({ dm_dv_trangthai: 'HD' })
                try {
                    this.set_select_donvicha()
                    await this.set_select_diabantinh();
                    if (this.state.select_diabantinh.length === 0) {
                        form.setFieldsValue({ dm_db_id_tinh: '' })
                    }
                    form.setFieldsValue({ dm_db_id_tinh: this.state.select_diabantinh[0].dm_db_id })
                    await this.set_select_diabanhuyen(this.state.select_diabantinh[0].dm_db_id);
                    if (this.state.select_diabanhuyen.length === 0) {
                        form.setFieldsValue({ dm_db_id_huyen: '' })
                    }
                    form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
                    await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id)
                    if (this.state.select_diabanxa.length === 0) {
                        form.setFieldsValue({ dm_db_id_xa: '' })
                    }
                    form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
                    await this.set_select_tenkh();
                    // await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        await this.set_select_tendv(value);
        if (this.state.select_tendv.length === 0) {
            await form.setFieldsValue({ dm_dv_id: '' })
        } 
        // else {
        //     await form.setFieldsValue({ dm_dv_id: 0 })
        // }
    }
    // onSelectDv1 = async (value) => {
    //     if (value === 'add_donvi') {
    //         await this.setState({
    //             visible_dv: true,
    //             stateoption1: true
    //         })
    //         var form = null

    //         if (this.state.visible_dv) {
    //             form = this.formRefUnit.props.form
    //             form.setFieldsValue({ dm_dv_trangthai: 'HD' })
    //             try {
    //                 this.set_select_donvicha()
    //                 await this.set_select_diabantinh();
    //                 if (this.state.select_diabantinh.length === 0) {
    //                     form.setFieldsValue({ dm_db_id_tinh: '' })
    //                 }
    //                 form.setFieldsValue({ dm_db_id_tinh: this.state.select_diabantinh[0].dm_db_id })
    //                 await this.set_select_diabanhuyen(this.state.select_diabantinh[0].dm_db_id);
    //                 if (this.state.select_diabanhuyen.length === 0) {
    //                     form.setFieldsValue({ dm_db_id_huyen: '' })
    //                 }
    //                 form.setFieldsValue({ dm_db_id_huyen: this.state.select_diabanhuyen[0].dm_db_id })
    //                 await this.set_select_diabanxa(this.state.select_diabanhuyen[0].dm_db_id)
    //                 if (this.state.select_diabanxa.length === 0) {
    //                     form.setFieldsValue({ dm_db_id_xa: '' })
    //                 }
    //                 form.setFieldsValue({ dm_db_id_xa: this.state.select_diabanxa[0].dm_db_id })
    //                 await this.set_select_tenkh();
    //                 // await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
    //             }
    //             catch (err) {
    //                 console.log(err)
    //             }
    //         }
    //     }
    //     await this.set_select_tendv(value);
    //     if (this.state.select_tendv.length === 0) {
    //         await form.setFieldsValue({ dm_dv_id: '' })
    //     } else {
    //         await form.setFieldsValue({ dm_dv_id: 0 })
    //     }
    // }
    set_select_diabantinh = async () => {
        await Request('customer/gettinh', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_diabantinh: res.data
                })
            }
        })
    }

    set_select_diabanhuyen = async (id_db_tinh) => {
        await Request('customer/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_diabanhuyen: res.data
                })
            }
        })
    }

    set_select_diabanxa = async (id_db_huyen) => {
        await Request('customer/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_diabanxa: res.data
                })
            }
        })
    }
    set_select_tendv = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_tendv: res.data
                })
            }
        })
    }
    set_select_donvicha = async () => {
        await Request('customer/getdonvi', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_donvicha: res.data
                })
            }
        })
    }
    set_select_tenkh = async () => {
        await Request('unit/getkhachhang', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_tenkh: res.data
                })
            }
        })
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <div>
                <Form>
                    <Row>
                        <Card>
                            <Col span={2}>
                                <Tooltip title="Thêm Hoá Đơn">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                                        <Icon type="plus" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Sửa Hoá Đơn">
                                    <Button type="primary" size="default" shape="round" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                                        <Icon type="edit" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Xóa Hoá Đơn">
                                    <Popconfirm
                                        title="Bạn chắc chắn muốn xóa?"
                                        onConfirm={this.deleteQuanly_hoadon.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                        visible={this.state.stateconfirmdelete}
                                    >
                                        <Button type="danger" style={{ marginLeft: '10px' }} shape="round" size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="round" type="primary" size="default" style={{ marginLeft: '18px' }} onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Card>
                    </Row>
                    <CreateModalUnit
                        datacha={this.state.select_donvicha}
                        wrappedComponentRef={this.saveFormRefCreate}
                        visible={this.state.visible_dv}
                        onCancel={this.onCancel_dv}
                        onSave={this.onOk_dv}
                        title={this.state.title_dv}
                        formtype={this.state.formtype_dv}
                        select_diabantinh={this.state.select_diabantinh}
                        select_diabanhuyen={this.state.select_diabanhuyen}
                        select_diabanxa={this.state.select_diabanxa}
                        select_tenkh={this.state.select_tenkh}
                        onSelectDiaBanTinh={this.onSelectDiaBanTinh}
                        onSelectDiaBanHuyen={this.onSelectDiaBanHuyen}
                        onSelectDiaBanXa={this.onSelectDiaBanXa}
                        onSelectKh={this.onSelectKh}
                        stateoption={this.state.stateoption}
                        stateoption1={this.state.stateoption1}

                    />
                    <Row style={{ marginTop: 5 }}>
                        <Table rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.qlhd} rowKey="qlhd_id" bordered>
                            <Column title="Loại hóa đơn" dataIndex="qlhd_loaihoadon" width={50} />
                            <Column title="Số hóa đơn" dataIndex="qlhd_sohoadon" width={50} />

                            <Column title="Đơn vị bán hàng" dataIndex="tendonviban" width={50} />
                            <Column title="Khách hàng bán hàng" dataIndex="tenkhachhangban" width={50} />
                            <Column title="Đơn vị mua hàng" dataIndex="tendonvimua" width={50} />
                            <Column title="Khách hàng mua hàng  " dataIndex="tenkhachhangmua" width={50} />
                            <Column title="Số tiền(VNĐ)" dataIndex="qlhd_sotien" width={50} />
                            <Column title="Ngày xuất " dataIndex="qlhd_ngayxuat" width={50}
                                render={text => {
                                    return format(text, 'dd-mm-yyyy')
                                }}
                            />
                            <Column title="Trạng thái" dataIndex="qlhd_trangthai" key="qlhd_trangthai" width={50}
                                render={text => {
                                    if (text === 'ctt') {
                                        return 'Chưa thanh toán'
                                    }
                                    return 'Đã thanh toán '
                                }}
                            />
                            <Column title="Nội dung" dataIndex="qlhd_noidung" width={50} />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} style={{ marginTop: 10 }} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>
                    <Modal_Hoadon
                        wrappedComponentRef={this.saveFormRef}
                        title={this.state.title}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onSave={this.insertOrUpdate}
                        formtype={this.state.formtype}
                        id_visible={this.state.id_visible}
                        khachhang={this.state.khachhangs}
                        donvi={this.state.donvis}
                        getkhachhang={this.getkhachhang.bind(this)}
                        onSelectDv={this.onSelectDv}
                        onSelectDv1={this.onSelectDv1}
                    />
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchUser,
        fetchLoading
    }
)(Quanly_hoadon);