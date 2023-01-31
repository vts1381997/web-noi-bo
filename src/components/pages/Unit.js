import React from 'react';
import { Pagination, Icon, Table, Input, Popconfirm, message, Button, Row, Col, notification, Alert, Select, Tooltip, Card } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import { fetchDonvi } from '@actions/donvi.action';
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
// import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import { async } from 'q';
import Modal_FileDonvis from '@pages/Modal/Modal_FileDonvis.js'
import axios from 'axios';
import Highlighter from 'react-highlight-words';

const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;

class Unit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            current: 1,
            pageSize: 10,
            page: 1,
            showPopup: false,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            dm_dv_id_visible: false,
            action: 'insert',
            isSearch: 0,
            textSearch: '',
            searchText: '',
            isSort: true,
            sortBy: 'ASC',
            index: 'dm_dv_ten',
            orderby: 'arrow-up',
            corlor: '#d9d9d9',
            visible_kh: false,
            visible_timkiem: false,
            formtype_kh: 'horizontal',
            title_kh: 'Thêm mới khách hàng',
            dataSource_Select_Parent: [],
            units: [],
            select_diabantinh: [],
            select_diabanhuyen: [],
            select_diabanxa: [],
            select_tenkh: [],
            select_tinh: [],
            select_huyen: [],
            select_xa: [],
            select_tendv: [],
            stateconfirmdelete: false,
            statebuttondelete: true,
            statebuttonedit: true,
            stateoption: true,
            selectedRowKeys: [],
            selectedrow: [],
            selectedId: [],
            rowunitselected: {},
            checked: true,
            visibleImport: false,
            selectedFile: null,
            timkiem: [],
            showDataTimkiem: []
        }
    }
    //---Delete---
    deleteUnit = (dm_dv_id) => {
        Request('unit/delete', 'DELETE', { dm_dv_id: dm_dv_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.getUnits(this.state.page)
                this.setState({
                    stateconfirmdelete: false,
                    statebuttondelete: true,
                    statebuttonedit: true,
                    selectedRowKeys: []
                })
            })
        this.setState({
            stateconfirmdelete: false
        })
    }

    getKhachhangs = () => {
        Request('unit/getkhachhang', 'POST', {
        }).then((response) => {
            let data = response.data;
            if (data.data)
                this.setState({
                    units: data.data.units,
                })
        })
    }

    getUnits = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('unit/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((response) => {
                let data = response.data;
                if (data.data)
                    this.setState({
                        units: data.data.units,
                        count: Number(data.data.count) // ép kiểu về    
                    })
                this.props.fetchLoading({
                    loading: false

                })
            })

    }

    //---Insert---
    InsertOrUpdateUnit = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'unit/insert' : 'unit/update'
            Request(url, 'POST', values)
                .then((response) => {
                    this.setState({
                        rowunitselected: values
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
                    var message = 'Thành công (^.^)'

                    if (!!!response.data.success) {
                        message = 'Có lỗi xảy ra (>.<)'
                        notifi_type = 'error'
                        description = response.data.message.map((values, index) => {
                            return <Alert type='error' message={values}></Alert>
                        })
                    }
                    //thông báo lỗi vào thành công
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getUnits(this.state.page)
                })
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8, align : 'center' }}>
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
        Request(`unit/search`, 'POST',
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
                    units: res.data.data.donvis,
                })
            })


        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    refresh = (pageNumber) => {
        this.getUnits(this.state.pageNumber)
    }
    componentDidMount() {
        this.getUnits(this.state.pageNumber, this.state.index, this.state.sortBy);
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
    }
    onchangpage = async (page) => {
        await this.setState({
            page: page
        })

        if (this.state.isSearch === 1) {
            this.search(this.state.textSearch)
        }
        else {
            this.getUnits(page)
        }
    }

    showDataSourceParent() {
        this.getUnits(this.state.dataSource_Select_Parent);
    }

    showModalUpdate = async (unit) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_kh: false,
        });
        var arrayfilloption = []
        this.state.units.map((value, index) => {
            arrayfilloption.push({ dm_dv_id: value.dm_dv_id, tendonvi: value.dm_dv_ten })
        })
        await this.setState({
            dataSource_Select_Parent: arrayfilloption
        })
        if (unit.dm_dv_id !== undefined) {
            await this.setState({
                dm_dv_id_visible: true,
                action: 'update'
            })
            this.set_select_tenkh();
            if (this.state.select_tenkh.length === 0) {
                form.setFieldsValue({ kh_id_nguoidaidien: '' })
            }
            form.setFieldsValue({ kh_id_nguoidaidien: 0 })
            this.set_select_diabantinh();
            if (this.state.select_diabantinh.length === 0) {
                form.setFieldsValue({ dm_db_id_tinh: '' })
            }
            this.set_select_diabanhuyen(unit.dm_db_id_tinh);
            if (this.state.select_diabanhuyen.length === 0) {
                form.setFieldsValue({ dm_db_id_huyen: '' })
            }
            this.set_select_diabanxa(unit.dm_db_id_huyen);
            if (this.state.select_diabanxa.length === 0) {
                form.setFieldsValue({ dm_db_id_xa: '' })
            }
            form.setFieldsValue(unit);
        }
    };

    showModalInsert = async (unit) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_kh: false
        });
        form.resetFields();
        form.setFieldsValue({ dm_dv_trangthai: 'HD' })
        var arrayfilloption = []
        this.state.units.map((value, index) => {
            arrayfilloption.push({ dm_dv_id: value.dm_dv_id, tendonvi: value.dm_dv_ten })
        })
        await this.setState({
            dataSource_Select_Parent: arrayfilloption
        })
        if (unit.dm_db_id === undefined) {
            await this.setState({
                action: 'insert'
            })
            await this.set_select_tenkh();
            // await form.setFieldsValue({ kh_id_nguoidaidien: this.state.select_tenkh[0].kh_id })
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
        }
    }

    handleOK = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            dm_dv_id_visible: false
        });
    };

    handleChangeInput = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleChange(value) {
    }

    handleCount = () => {
        let count = this.state.count;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => { //xác nhận
        message.success('Bấm yes để xác nhận');
    }

    cancel = (e) => {
        this.setState({
            stateconfirmdelete: false
        })
    }

    checkStateConfirm = () => {
        this.setState({
            stateconfirmdelete: true
        })
    }

    showTotal = (total) => { //hiển thị tổng số
        return `Total ${total} items `;
    }

    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
        }
        else {
            this.getUnits(this.state.page, this.state.index, this.state.sortBy)
        }
    }

    onChangeSearchType = async (value) => {
        await this.setState({
            columnSearch: value,
        })
        if (this.state.textSearch) {
            this.search(this.state.textSearch);
        }
    }

    onSearch = (val) => {
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
                if (this.state.isSearch == 1) {
                    this.search(this.state.textSearch)
                }
                else {
                    this.getUnits(this.state.page)
                }
            },
        };
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

    set_select_diabantinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_diabantinh: res.data
                })
            }

        })
    }

    set_select_diabanhuyen = async (id_db_tinh) => {
        await Request('unit/gethuyen', 'POST', {
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
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_diabanxa: res.data
                })
            }

        })
    }

    set_select_tinh = async () => {
        await Request('unit/gettinh', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_tinh: res.data
                })
            }

        })
    }

    set_select_huyen = async (id_db_tinh) => {
        await Request('unit/gethuyen', 'POST', {
            id_db_tinh: id_db_tinh
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_huyen: res.data
                })
            }

        })
    }

    set_select_xa = async (id_db_huyen) => {
        await Request('unit/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_xa: res.data
                })
            }
        })
    }

    onSelectKh = async (value) => {
        if (value === 'add_nguoidaidien') {
            await this.setState({
                visible_kh: true,
                stateoption: true
            })
            var form = null
            if (this.state.visible_kh) {
                form = this.formRef.props.form
                form.setFieldsValue({ kh_lienlac: 'TXLL' })
                form.setFieldsValue({ kh_gioitinh: 'Nam' })
                try {
                    await this.set_select_tinh();
                    if (this.state.select_tinh.length === 0) {
                        form.setFieldsValue({ dm_db_id_tinh_customer: '' })
                    }
                    form.setFieldsValue({ dm_db_id_tinh_customer: this.state.select_tinh[0].dm_db_id })
                    await this.set_select_huyen(this.state.select_tinh[0].dm_db_id);
                    if (this.state.select_huyen.length === 0) {
                        form.setFieldsValue({ dm_db_id_huyen_customer: '' })
                    }
                    form.setFieldsValue({ dm_db_id_huyen_customer: this.state.select_huyen[0].dm_db_id })
                    await this.set_select_xa(this.state.select_huyen[0].dm_db_id)
                    if (this.state.select_xa.length === 0) {
                        form.setFieldsValue({ dm_db_id_xa_customer: '' })
                    }
                    form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
                    this.set_select_tendv();
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        await this.set_select_tenkh(value);
        if (this.state.select_tenkh.length === 0) {
            await form.setFieldsValue({ kh_id_nguoidaidien: '' })
        }
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


    onSelectTinh = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_huyen(value);
        if (this.state.select_huyen.length === 0) {
            await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            await this.set_select_xa(-1);
            await form.setFieldsValue({ dm_db_id_xa_customer: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_huyen_customer: this.state.select_huyen[0].dm_db_id })
            await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa_customer: ' ' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id })
            }
        }
    }
    onSelectHuyen = async (value) => {
        const { form } = this.formRef.props
        await this.set_select_xa(value);
        if (this.state.select_xa.length === 0) {
            await form.setFieldsValue({ dm_db_id_xa_customer: '' })
        }
        else {
            await form.setFieldsValue({ dm_db_id_xa_customer: this.state.select_xa[0].dm_db_id });
        }
    }

    onCancel_kh = () => {
        this.setState({
            visible_kh: false
        })
    }

    onOk_kh = async () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'customer/insert' : 'unit/update'
            Request(url, 'POST', values)
                .then(async (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields()
                        await this.setState({
                            visible_kh: false,
                            message: response.data.message
                        })

                        if (!this.state.visible_kh) {
                            var formkhachhang = this.formRef.props.form
                            try {
                                formkhachhang.setFieldsValue({ kh_id_nguoidaidien: response.data.id_customer })
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
                    this.set_select_tenkh();
                })
        });
    }

    saveFormRefCreate = formRef => {
        this.saveFormRefCreate = formRef;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    clearChecked = () => {
        this.onSelectChange([], [])
    };

    onRowClick = (row) => {
        if (this.state.selectedRowKeys[0] === row.dm_dv_id) {
            this.onSelectChange([], [])
        }
        else {
            this.onSelectChange([row.dm_dv_id], [row])
        }
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedId: selectedRowKeys,
        });
        if (selectedRowKeys.length > 0) {
            this.setState({
                statebuttondelete: false
            })
        }
        else {
            this.setState({
                statebuttondelete: true
            })
        }
        if (selectedRowKeys.length === 1) {
            this.setState({
                statebuttonedit: false,
                rowunitselected: selectedRows[0]
            })
        }
        else {
            this.setState({
                statebuttonedit: true
            })
        }
    }

    showModalImport = () => {
        this.setState({
            visibleImport: true
        });
    }

    handleCancelImport = e => {
        this.setState({
            visibleImport: false
        });
    };

    onClickHandler = () => {
        const data = new FormData()
        if (this.state.selectedFile !== null) {
            data.append('file', this.state.selectedFile)
            axios.post("http://103.74.122.80:5000/upload", data, {
                // receive two    parameter endpoint url ,form data
            })
                .then(res => { // then print response status
                })
        }
    }

    saveFormRefImport = formRef => {
        this.formRefImport = formRef;
    }

    onChangeFile = async (e) => {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        var file = e.target.files[0];
        var fileUploadHopdong = await toBase64(file);
        var fileName = file.name;
        this.setState({
            valuefile: fileUploadHopdong,
            valuename: fileName
        })
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    insertImport = async () => {
        return;
        await this.onClickHandler();
        const { form } = await this.formRefImport.props;
        await form.validateFields((err, values) => {
            if (err) {
                return
            }
            if (this.state.selectedFile !== null) {
                const urlFile = "uploads/" + this.state.selectedFile.name;
                values.file_data = urlFile
            }
            else {
                values.file_data = " "
            }
            var url = 'filekhachhangs/insert'
            Request(url, 'POST', values)
                .then(async (response) => {
                    var excel = {}
                    var listExcelNotParent = []
                    var listExcelParent = []
                    var dm_dv_id_tinh = []
                    var dm_dv_id_huyen = []
                    var dm_dv_id_xa = []
                    response.data.dataSheet2.forEach(element => {
                        dm_dv_id_tinh.push({
                            tenTinh: element["Tỉnh/Thành Phố"],
                            maTinh: element["Mã Tỉnh"]
                        })
                        dm_dv_id_huyen.push({
                            tenHuyen: element["Huyện Quận"],
                            maHuyen: element["Mã Huyện"]
                        })
                        dm_dv_id_xa.push({
                            tenXa: element["Xã Phường"],
                            maXa: element["Mã Xã"]
                        })
                    })
                    await response.data.dataSheet1.forEach(async element => {

                        if (element.dm_dv_id_cha === undefined) {
                            if (element["Mã Số Thuế"] === undefined) {
                                element["Mã Số Thuế"] = null
                            }
                            if (element["Số Điện Thoại"] === undefined) {
                                element["Số Điện Thoại"] = null
                            }
                            if (element["Trạng Thái"] === "Hoạt Động") {
                                element["Trạng Thái"] = "HD"
                            }
                            else if (element["Trạng Thái"] === "Dừng hoạt động") {
                                element["Trạng Thái"] = "DHD"
                            }
                            else {
                                element["Trạng Thái"] = "GT"
                            }
                            dm_dv_id_tinh.forEach(element_Tinh => {
                                if (element_Tinh.tenTinh === element["Tỉnh/Thành Phố"]) {
                                    element["Tỉnh/Thành Phố"] = element_Tinh.maTinh
                                }
                            })
                            dm_dv_id_huyen.forEach(element_Huyen => {
                                if (element_Huyen.tenHuyen === element["Huyện Quận"]) {
                                    element["Huyện Quận"] = element_Huyen.maHuyen
                                }
                            })
                            dm_dv_id_xa.forEach(element_Xa => {
                                if (element_Xa.tenXa === element["Xã Phường"]) {
                                    element["Xã Phường"] = element_Xa.maXa
                                }
                            })
                            excel.dm_dv_id_cha = null
                            excel.dm_db_id_tinh = element["Tỉnh/Thành Phố"]
                            excel.dm_db_id_huyen = element["Huyện Quận"]
                            excel.dm_db_id_xa = element["Xã Phường"]
                            excel.dm_dv_diachi = element["Địa Chỉ"]
                            excel.dm_dv_ten = element["Tên Đơn Vị"]
                            excel.dm_dv_masothue = element["Mã Số Thuế"]
                            excel.dm_dv_trangthai = element["Trạng Thái"]
                            excel.dm_dv_sodienthoai = element["Số Điện Thoại"]
                            excel.kh_id_nguoidaidien = null
                            listExcelNotParent.push(excel)
                        }
                        else {
                            if (element["Mã Số Thuế"] === undefined) {
                                element["Mã Số Thuế"] = null
                            }
                            if (element["Số Điện Thoại"] === undefined) {
                                element["Số Điện Thoại"] = null
                            }
                            if (element["Trạng Thái"] === "Hoạt Động") {
                                element["Trạng Thái"] = "HD"
                            }
                            else if (element["Trạng Thái"] === "Dừng hoạt động") {
                                element["Trạng Thái"] = "DHD"
                            }
                            else {
                                element["Trạng Thái"] = "GT"
                            }
                            dm_dv_id_tinh.forEach(element_Tinh => {
                                if (element_Tinh.tenTinh === element["Tỉnh/Thành Phố"]) {
                                    element["Tỉnh/Thành Phố"] = element_Tinh.maTinh
                                }
                            })
                            dm_dv_id_huyen.forEach(element_Huyen => {
                                if (element_Huyen.tenHuyen === element["Huyện Quận"]) {
                                    element["Huyện Quận"] = element_Huyen.maHuyen
                                }
                            })
                            dm_dv_id_xa.forEach(element_Xa => {
                                if (element_Xa.tenXa === element["Xã Phường"]) {
                                    element["Xã Phường"] = element_Xa.maXa
                                }
                            })
                            excel.dm_dv_id_cha = null
                            excel.dm_db_id_tinh = element["Tỉnh/Thành Phố"]
                            excel.dm_db_id_huyen = element["Huyện Quận"]
                            excel.dm_db_id_xa = element["Xã Phường"]
                            excel.dm_dv_diachi = element["Địa Chỉ"]
                            excel.dm_dv_ten = element["Tên Đơn Vị"]
                            excel.dm_dv_masothue = element["Mã Số Thuế"]
                            excel.dm_dv_trangthai = element["Trạng Thái"]
                            excel.dm_dv_sodienthoai = element["Số Điện Thoại"]
                            excel.kh_id_nguoidaidien = null
                            listExcelParent.push(excel)
                        }

                    }); 
                    Request('unit/insert', 'POST', response.data.dataExcel)
                        .then((response) => {
                            if (response.status === 200 & response.data.success === true) {
                                form.resetFields();
                                this.getUnits(this.state.page)
                            }
                        })
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visibleImport: false,
                            message: response.data.message
                        })
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thành Công'
                    if (!!!response.data.success) {
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
                    this.getUnits(this.state.page)
                })
        })
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: Column.title === 'Id', // Column configuration not to be checked
                name: record.name,
            }),
        };
        if (token)
            return (
                <div>
                    <Card>
                        <Row>
                            <Col span={2}>
                                <Tooltip title="Thêm đơn vị">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModalInsert.bind(null)}>
                                        <Icon type="plus" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <span>
                                <Col span={2}>
                                    <Tooltip title="Sửa đơn vị">
                                        <Button shape='round' type="primary" size="default" onClick={this.showModalUpdate.bind(this, this.state.rowunitselected)} disabled={this.state.statebuttonedit} >
                                            <Icon type="edit" /></Button>
                                    </Tooltip>
                                </Col>
                                <Col span={2}>
                                    <Tooltip title="Xóa đơn vị">
                                        <Popconfirm
                                            title="Bạn có chắc chắn muốn xóa ?"
                                            onConfirm={this.deleteUnit.bind(this, this.state.selectedId)}
                                            onCancel={this.cancel}
                                            okText="Có"
                                            cancelText="Không"
                                            visible={this.state.stateconfirmdelete}
                                        >
                                            <Button shape='round' type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                                <Icon type="delete" /></Button>
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
                                <Col span={3}>
                                    <Button shape="round" type="primary"
                                        onClick={this.showModalImport.bind(this)}
                                    >Import File</Button>
                                </Col>
                            </span>
                        </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
                        <CreateModalUnit
                            datacha={this.state.dataSource_Select_Parent}
                            wrappedComponentRef={!this.state.visible_kh ? this.saveFormRef : this.saveFormRefCreate}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSave={this.InsertOrUpdateUnit}
                            title={this.state.title}
                            formtype={this.state.formtype}
                            dm_dv_id_visible={this.state.dm_dv_id_visible}
                            handleChange={this.handleChange}
                            select_diabantinh={this.state.select_diabantinh}
                            select_diabanhuyen={this.state.select_diabanhuyen}
                            select_diabanxa={this.state.select_diabanxa}
                            select_tenkh={this.state.select_tenkh}
                            onSelectDiaBanTinh={this.onSelectDiaBanTinh}
                            onSelectDiaBanHuyen={this.onSelectDiaBanHuyen}
                            onSelectDiaBanXa={this.onSelectDiaBanXa}
                            onSelectKh={this.onSelectKh}

                        />
                        <CreateModalCustomer
                            wrappedComponentRef={this.state.visible_kh ? this.saveFormRef : this.saveFormRefCreate}
                            visible={this.state.visible_kh}
                            onCancel={this.onCancel_kh}
                            onOk_kh={this.onOk_kh}
                            title={this.state.title_kh}
                            formtype={this.state.formtype_kh}
                            // CreateCustomer={this.CreateCustomer}
                            getunit={this.getUnits.bind(this, this.state.page)}
                            select_tendv={this.state.select_tendv}
                            select_tinh={this.state.select_tinh}
                            select_huyen={this.state.select_huyen}
                            select_xa={this.state.select_xa}
                            onSelectTinh={this.onSelectTinh}
                            onSelectHuyen={this.onSelectHuyen}
                            onSelectXa={this.onSelectXa}
                            onSelectDv={this.onSelectDv}
                            stateoption={this.state.stateoption}
                        />
                        <Table rowSelection={rowSelection} onRowClick={this.onRowClick} className="table-contents" pagination={false} dataSource={this.state.units} bordered='1' scroll={{ x: '130%' }} rowKey="dm_dv_id">
                            <Column title="ID" dataIndex="dm_dv_id" key="dm_dv_id" className="hidden-action" />
                            <Column title="Tên đơn vị" dataIndex="dm_dv_ten" key="dm_dv_ten" {...this.getColumnSearchProps('dm_dv_ten')} onHeaderCell={this.onHeaderCell} width={150} />
                            <Column title="ID Đơn vị cấp trên" dataIndex="dm_dv_id_cha" key="dm_dv_id_cha" className="hidden-action" />
                            <Column title="Đơn vị cấp trên" dataIndex="tendonvicha" key="tendonvicha" onHeaderCell={this.onHeaderCell} />
                            <Column title="Địa chỉ" dataIndex="dm_dv_diachi" key="dm_dv_diachi" {...this.getColumnSearchProps('dm_dv_diachi')} onHeaderCell={this.onHeaderCell} width={150} />
                            <Column title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa" onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã số thuế" dataIndex="dm_dv_masothue" key="dm_dv_masothue" {...this.getColumnSearchProps('dm_dv_masothue')} onHeaderCell={this.onHeaderCell} />
                            <Column title="Số điện thoại" dataIndex="dm_dv_sodienthoai" key="dm_dv_sodienthoai" {...this.getColumnSearchProps('dm_dv_sodienthoai')} onHeaderCell={this.onHeaderCell} />
                            <Column title="Mã người đại diện" dataIndex="kh_id_nguoidaidien" key="kh_id_nguoidaidien" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Người đại diện" dataIndex="tennguoidaidien" key="tennguoidaidien" onHeaderCell={this.onHeaderCell} width={150} />
                            <Column title="Trạng thái đơn vị" dataIndex="dm_dv_trangthai" key="dm_dv_trangthai" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Trạng thái" dataIndex="dm_dv_trangthai_txt" key="dm_dv_trangthai_txt" />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>

                    <Modal_FileDonvis
                        wrappedComponentRef={this.saveFormRefImport}
                        visible={this.state.visibleImport}
                        onCancel={this.handleCancelImport}
                        onSave={this.insertImport}
                        onChangeFile={this.onChangeFile}
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
        fetchUser,
        fetchLoading,
        fetchDonvi
    })
    (Unit);