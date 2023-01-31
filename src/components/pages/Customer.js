import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Tooltip, Card } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import CreateModalUnit from '@pages/Modal/CreateModalUnit';
import { async } from 'q';
import axios from 'axios';
import Modal_Filekhachhangs from '@pages/Modal/Modal_Filekhachhangs.js'
import { element } from 'prop-types';
const token = cookie.load('token');
const { Column } = Table;
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            current: 1,
            pageSize: 10,
            page: 1,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            kh_id_visible: false,
            action: 'insert',
            isSearch: 0,
            textSearch: '',
            isSort: true,
            sortBy: 'ASC',
            index: 'kh_ten',
            orderby: 'arrow-up',
            select_donvicha: [],
            customers: [],
            select_tinh: [],
            select_huyen: [],
            select_xa: [],
            select_diabantinh: [],
            select_diabanhuyen: [],
            select_diabanxa: [],
            select_tendv: [],
            select_tenkh: [],
            formtype_dv: 'horizontal',
            rowcustomerselected: {},
            statebuttondelete: true,
            statebuttonedit: true,
            stateconfirmdelete: false,
            selectedId: [],
            selectedrow: [],
            selectedRowKeys: [],
            title_dv: 'Thêm mới đơn vị',
            stateoption: true,
            visible_dv: false,
            selectedFile: null,
            visibleImport: false,
            timkiem: [],
        }
    }

    deleteCustomer = (kh_id) => {
        Request(`customer/delete`, 'DELETE', { kh_id: kh_id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.getCustomers(this.state.page)
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

    getDonvis = () => {
        Request('customer/getdonvi', 'POST', {
        }).then((response) => {
            let data = response.data;
            if (data.data) {

                this.setState({
                    customers: data.data.customers,
                })
            }
        })
    }

    getCustomers = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        this.props.fetchLoading({
            loading: true
        })
        Request('customer/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy,
        })
            .then(async (response) => {
                let data = response.data;
                if (data.data) {
                    await this.setState({
                        customers: this.convertColumnSearch(data.data.customers),
                        count: Number(data.data.count)
                    })
                }
                this.props.fetchLoading({
                    loading: false
                })
            })
    }

    InsertOrUpdateCustomer = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            var url = this.state.action === 'insert' ? 'customer/insert' : 'customer/update'
            if (url === 'customer/update') {
                // values.dm_db_id_tinh_customer = this.state.rowcustomerselected.idtinh
                // values.dm_db_id_huyen_customer = this.state.rowcustomerselected.idhuyen
                // values.dm_db_id_xa_customer = this.state.rowcustomerselected.idxa

                values.idtinh = this.state.rowcustomerselected.idtinh
                values.idhuyen = this.state.rowcustomerselected.idhuyen
                values.idxa = this.state.rowcustomerselected.idxa
            }
            Request(url, 'POST', values)
                .then((response) => {
                    this.setState({
                        rowcustomerselected: values
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
                        message = 'Co loi xay ra'
                        notifi_type = 'error'
                        description = response.data.message.map((values, index) => {
                            return <Alert type='error' message={values}></Alert>
                        })
                    }
                    //thông báo lỗi và thành công
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getCustomers(this.state.page)
                })
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
                    Search
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
    });

    handleSearch = (selectedKeys, value, confirm) => {


    };

    refresh = (pageNumber) => {
        this.getCustomers(this.state.pageNumber)
    }
    componentDidMount() {
        this.getCustomers(this.state.pageNumber, this.state.index, this.state.sortBy);
        document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
    }
    onchangpage = async (page) => {
        await this.setState({
            page: page
        })
        if (this.state.isSearch === 1) {
            this.search(this.state.textSearch)
        }
        this.getCustomers(page)
    }

    showModalUpdate = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false
        });
        if (customer.kh_id !== undefined) {
            this.setState({
                kh_id_visible: true,
                action: 'update'
            })
            await form.setFieldsValue({ dm_dv_id: customer.tendonvi })
            await this.set_select_tinh();
            if (this.state.select_tinh.length > 0) {
                await form.setFieldsValue({ dm_db_id_tinh_customer: customer.tentinh })
                await this.set_select_huyen(this.state.select_tinh[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_tinh_customer: '' })
            }
            if (this.state.select_huyen.length > 0) {
                await form.setFieldsValue({ dm_db_id_huyen_customer: customer.tenhuyen })
                await this.set_select_xa(this.state.select_huyen[0].dm_db_id);
            } else {
                await form.setFieldsValue({ dm_db_id_huyen_customer: '' })
            }
            if (this.state.select_xa.length === 0) {
                await form.setFieldsValue({ dm_db_id_xa_customer: '' })
            }
            else {
                await form.setFieldsValue({ dm_db_id_xa_customer: customer.tenxa })
            }
            form.setFieldsValue(customer);
        }
    }

    showModalInsert = async (customer) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true,
            visible_dv: false
        });
        form.resetFields();
        form.setFieldsValue({ kh_lienlac: 'TXLL' })
        if (customer.kh_id === undefined) {
            await this.setState({
                action: 'insert'
            })
            await this.set_select_tendv();
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
        }
    };

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

    set_select_tinh = async () => {
        await Request('customer/gettinh', 'POST', {
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_tinh: res.data
                })
            }
        })
    }

    set_select_huyen = async (id_db_tinh) => {
        await Request('customer/gethuyen', 'POST', {
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
        await Request('customer/getxa', 'POST', {
            id_db_huyen: id_db_huyen
        }).then(async (res) => {
            if (res.data) {
                await this.setState({
                    select_xa: res.data
                })
            }
        })
    }

    onSelectDv = async (value) => {
        if (value === 'add_donvi') {
            await this.setState({
                visible_dv: true,
                stateoption: true
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
        } else {
            await form.setFieldsValue({ dm_dv_id: 0 })
        }
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

    handleCancel = e => {
        this.setState({
            visible: false,
            kh_id_visible: false
        });
    };

    handleCount = () => {
        let count = this.state;
        this.setState({
            count: count + 1
        })
    }

    confirm = (e) => {
        message.success('Bấm yes để xác nhận')
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

    showTotal = (total) => {
        return `Total ${total} item`;
    }

    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
        if (this.state.isSearch === 1) {
            this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
        }
        else {
            this.getCustomers(this.state.page, this.state.index, this.state.sortBy)
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
                if (this.state.isSearch == 1) {
                    this.search(this.state.textSearch)
                }
                else {
                    this.getCustomers(this.state.page)
                }
            },
        };
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    saveFormRefCreate = formRef => {
        this.formRefUnit = formRef;
    }

    onCancel_dv = () => {
        this.setState({
            visible_dv: false
        })
    }

    onOk_dv = async () => {
        const { form } = this.formRefUnit.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            Request('unit/insert', 'POST', values)
                .then(async (response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields()
                        await this.setState({
                            visible_dv: false,
                            message: response.data.message
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
                })
        })
    }

    clearChecked = () => {
        this.onSelectChange([], [])
    };

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
        return value
    }

    handleSearchs = (nameSearch, e) => {

        if (e.target.value !== '') {
            let vl = { values: e.target.value, keys: nameSearch }
            var timkiem = this.state.timkiem
            timkiem = timkiem.push(vl)
            // this.setState({
            //     timkiem: timkiem
            // })
            Request(`customer/search`, 'POST',
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
                        customers: this.convertColumnSearch(res.data.data.khachhangs),
                    })
                })
            this.setState({ searchText: e.target.value });
        }
    }

    onRowClick = (row) => {
        if (row.kh_id == "kh_id") {
            this.onSelectChange([], [])
        }
        else
            if (this.state.selectedRowKeys[0] === row.kh_id) {
                this.onSelectChange([], [])
            }
            else {
                this.onSelectChange([row.kh_id], [row])
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
                rowcustomerselected: selectedRows[0]
            })
        }
        else {
            this.setState({
                statebuttonedit: true
            })
        }
    }

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
        this.onClickHandler();
        const { form } = this.formRefImport.props;
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            if (this.state.selectedFile !== null) {
                const urlFile = "upload/" + this.state.selectedFile.name;
                values.file_data = urlFile
            }
            else {
                values.file_data = " "
            }
            var url = 'filekhachhangs/insert'
            Request(url, 'POST', values)
                .then(async (response) => {
                    // array.forEach(element => {
                    // });
                    Request('customer/insert', 'POST', response.data.dataExcel)
                        .then((response) => {
                            if (response.status === 200 & response.data.success === true) {
                                form.resetFields();
                                this.getCustomers(this.state.page)
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
                        description = response.data.message.map((value) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    await notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getCustomers(this.state.page)
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
                                <Tooltip title="Thêm khách hàng">
                                    <Button shape="round" type="primary" size="default" onClick={this.showModalInsert.bind(null)}>
                                        <Icon type="plus" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Sửa khách hàng">
                                    <Button shape='round' type="primary" size="default" onClick={this.showModalUpdate.bind(this, this.state.rowcustomerselected)} disabled={this.state.statebuttonedit} >
                                        <Icon type="edit" /></Button>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip disabled={this.state.statebuttondelete} title="Xóa khách hàng">
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa ?"
                                        onConfirm={this.deleteCustomer.bind(this, this.state.selectedId)}
                                        onCancel={this.cancel}
                                        disabled={this.state.statebuttondelete}
                                        okText="Yes"
                                        cancelText="No">
                                        <Button shape='round' type="danger" size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                                            <Icon type="delete" /></Button>
                                    </Popconfirm>
                                </Tooltip>
                            </Col>
                            <Col span={2}>
                                <Tooltip title="Tải Lại">
                                    <Button shape="round" type="primary" style={{ marginLeft: '10px' }} size="default" onClick={this.refresh.bind(null)}>
                                        <Icon type="reload" />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={3}>
                                <Button shape="round" type="primary" onClick={this.showModalImport.bind(this)}>Import File</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Row style={{ marginTop: 5 }}>
                        <CreateModalCustomer
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onOk_kh={this.InsertOrUpdateCustomer}
                            title={this.state.title}
                            formtype={this.state.formtype}
                            kh_id_visible={this.state.kh_id_visible}
                            select_tinh={this.state.select_tinh}
                            select_huyen={this.state.select_huyen}
                            select_xa={this.state.select_xa}
                            select_tendv={this.state.select_tendv}
                            onSelectTinh={this.onSelectTinh}
                            onSelectHuyen={this.onSelectHuyen}
                            onSelectXa={this.onSelectXa}
                            onSelectDv={this.onSelectDv}
                        />
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
                        />
                        <Table rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.customers} bordered='1' scroll={{ x: 1000 }} rowKey="kh_id">
                            <Column title="Tên khách hàng" dataIndex="kh_ten" key="kh_ten" onHeaderCell={this.onHeaderCell} width={150}
                                render={this.renderCell.bind(this, { type: 'text', name: 'kh_ten' })}
                            />
                            <Column title="Số điện thoại" dataIndex="kh_sodienthoai" key="kh_sodienthoai" onHeaderCell={this.onHeaderCell}
                                render={this.renderCell.bind(this, { type: 'text', name: 'kh_sodienthoai' })} />
                            <Column title="Email" dataIndex="kh_email" key="kh_email" onHeaderCell={this.onHeaderCell}
                                render={this.renderCell.bind(this, { type: 'text', name: 'kh_email' })} />
                            <Column title="Mã tỉnh" dataInde="dm_db_id_tinh" key="dm_db_id_tinh" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Tỉnh/TP" dataIndex="tentinh" key="tentinh" render={this.renderCell.bind(this, { type: 'text', name: 'tentinh' })} />
                            <Column title="Mã huyện" dataIndex="dm_db_id_huyen" key="dm_db_id_huyen" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Huyện/Quận" dataIndex="tenhuyen" key="tenhuyen" render={this.renderCell.bind(this, { type: 'text', name: 'tenhuyen' })} />
                            <Column title="Mã xã" dataIndex="dm_db_id_xa" key="dm_db_id_xa" className="hidden-action" disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Xã/Phường" dataIndex="tenxa" key="tenxa" render={this.renderCell.bind(this, { type: 'text', name: 'tenxa' })} />
                            <Column title="Địa chỉ" dataIndex="kh_diachi" key="kh_diachi" onHeaderCell={this.onHeaderCell} width={150}
                                render={this.renderCell.bind(this, { type: 'text', name: 'kh_diachi' })} />
                            <Column title="Mã đơn vị" dataIndex="dm_dv_id" key="dm_dv_id" className='hidden-action' disabled onHeaderCell={this.onHeaderCell} />
                            <Column title="Đơn vị" dataIndex="tendonvi" key="tendonvi" onHeaderCell={this.onHeaderCell}
                                render={this.renderCell.bind(this, { type: 'text', name: 'tendonvi' })} />
                            <Column title="Vị trí công tác" dataIndex="kh_vitricongtac" key="kh_vitricongtac" onHeaderCell={this.onHeaderCell}
                                render={this.renderCell.bind(this, { type: 'text', name: 'kh_vitricongtac' })}
                            />
                            <Column title="Liên lạc" dataIndex="kh_lienlac" key="kh_lienlac" className='hidden-action' disabaled onHeaderCell={this.onHeaderCell} />
                            <Column title="Liên lạc" dataIndex="lienlac" key="lienlac"
                                render={this.renderCell.bind(this, { type: 'text', name: 'lienlac' })}
                            />
                        </Table>
                    </Row>
                    <Row>
                        <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                    </Row>

                    <Modal_Filekhachhangs
                        wrappedComponentRef={this.saveFormRefImport}
                        visible={this.state.visibleImport}
                        onCancel={this.handleCancelImport}
                        onSave={this.insertImport}
                        formtype={this.state.formtype}
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
        fetchLoading
    })
    (Customer);