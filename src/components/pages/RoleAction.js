import React from 'react';
import { Pagination, Checkbox, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
import '../../index.css';
import jwt from 'jsonwebtoken';
import Permission from '../Authen/Permission'
import RoleModal from '../common/roleModal'
import ActionModal from '../common/actionModal'
import SearchModal from '../common/searchModal'
const token = cookie.load('token');


const { Column } = Table;
const { Option } = Select
const { Search } = Input;

const FormModal = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                messageRequired: 'Trường này không được bỏ trống!'
            }
        }
        render() {
            const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible } = this.props;
            const { getFieldDecorator } = form;
            // console.log('actionnnnnnnnnnnnnnnnnnnnnnnnn', this.props.dataAction)
            let actionData = this.props.dataAction
            let ac = actionData.map(function (valuee) {
                return ac = { label: valuee.name, value: valuee.name }
            })
            // console.log('=========================', ac)
            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText="Lưu"
                    onCancel={onCancel}
                    onOk={onSave}
                    confirmLoading={confirmLoading}
                    width={1000}
                >
                    <Form layout={formtype}>
                        <Row gutter={24} >
                            <Col span={24}>
                                <div style={{ display: 'none' }}>
                                    <Form.Item label="Id:" >
                                        {getFieldDecorator('id', {

                                        })(<Input type="number" disabled />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Role Code">
                                    {getFieldDecorator('role', {
                                        rules: [{ required: true, message: this.state.messageRequired, }],

                                    })(
                                        <Select
                                            showSearch
                                            onChange={this.props.onchangeRole}
                                        >
                                            {this.props.dataRole.map((item, i) => {
                                                return <Option value={item.name}>{item.name}</Option>
                                            })}
                                            <Option value="role">---- Thêm mới Role ---- </Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item label="Action Code">
                                    {/* <Checkbox.Group options={ac}  /> */}
                                    {getFieldDecorator('action', {

                                        rules: [{ required: true, message: this.state.messageRequired, }],
                                    })(
                                        <Select
                                            showSearch
                                            onChange={this.props.onchangeAction}

                                        >
                                            {this.props.dataAction.map((item, i) => {
                                                return <Option value={item.name}>{item.name}</Option>
                                            })}
                                            <Option value="action"> ---- Thêm mới Action ----</Option>
                                        </Select>
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

class RoleAction extends React.Component {
    constructor(props) {
        super(props);
        //this.child = React.createRef();
        this.state = {
            pageNumber: 1,
            current: 1,
            page: 1,
            pageSize: 10,
            count: 1,
            show: false,
            visible: false,
            formtype: 'horizontal',
            title: 'Nhập thông tin',
            id_visible: false,
            action: 'insert',
            isSearch: 0,
            searchText: '',
            columnSearch: 'name',
            isSort: true,
            sortBy: 'ASC',
            index: 'id',
            orderby: 'arrow-up',
            dataRole: [],
            dataAction: [],
            roleModaVisible: false,
            actionModalVisible: false,
            selectedId: '',
            selectedRowKeys: [],
            roles: []

        }
    }
    //--------------DELETE-----------------------
    deleteRole = (id) => {
        Request(`role_action/delete`, 'DELETE', { id: id })
            .then((res) => {

                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message

                });
                this.setState({
                    selectedId: ''
                })
                this.getRoles(this.state.page)

            })
    }

    getRoles = (pageNumber) => {
        if (pageNumber <= 0)
            return;

        Request('role_action/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((response) => {
                // console.log('------------------------====-=-=-=-=-=-', response.data)
                if (response) {
                    let data = response.data;
                    let objRoles = Object.keys(data.roles[0])
                    if (data)
                        this.setState({
                            roles: data.roles,
                            objRoles: objRoles,
                            count: Number(data.count)//eps kieeru veef
                        })
                    this.props.fetchLoading({
                        loading: false
                    })
                }

            })

    }

    InsertOrUpdateRole = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'role_action/insert' : 'role_action/update'
            Request(url, 'POST', values)
                .then((response) => {
                    if (response.data.success === true) {
                        message.success(response.data.message)
                        this.setState({
                            visible: false
                        })
                    }
                    else {
                        message.error(response.data.message)
                    }
                    this.getRoles(this.state.page)
                })
        });
    }

    refresh = (pageNumber) => {
        this.getRoles(this.state.pageNumber)
    }
    componentDidMount() {
        this.getRoles(this.state.pageNumber);
    }
    onchangpage = async (page) => {
        await this.setState({
            page: page
        })

        if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getRoles(page)
        }
    }
    reqestRole = async () => {
        await Request('role_action/getRoleCode', 'POST', null).then(res => {
            let dataRole = res.data.data;
            this.setState({
                dataRole: dataRole
            })
        })
    }
    requestAction = async () => {
        await Request('role_action/getRoleAction', 'POST', null).then(res => {
            let dataAction = res.data.data;
            this.setState({
                dataAction: dataAction
            })
        })
    }
    showModal = async () => {
        const { form } = this.formRef.props
        await form.setFieldsValue({ role: '-----> Chọn role <-----', action: '-----> Chọn action <-----' })
        this.setState({
            action: 'insert',
            visible: true
        });
        this.reqestRole();
        this.requestAction();
    };
    showModalEdit = (user) => {
        if (this.state.selectedRowKeys.length === 1) {
            const { form } = this.formRef.props
            this.reqestRole();
            this.requestAction();
            if (user.id !== undefined) {
                this.setState({
                    visible: true,
                    id_visible: true,
                    action: 'update'
                })
                form.setFieldsValue(user);
            }
        }
        else {
            message.error("chọn một row thôi nhóc")
        }

    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        const { form } = this.formRef.props
        form.setFieldsValue({ role: '', action: '' })

        this.setState({
            visible: false,
            id_visible: false
        });
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
        if (this.state.searchText) {
            this.search(this.state.searchText);

        }
        else {
            this.getRoles(this.state.page)
        }
    }

    search = async (xxxx) => {
        Request('user/search', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: this.state.page,
            searchText: xxxx,
            columnSearch: this.state.columnSearch,
            p1: this.state.index,
            p2: this.state.sortBy,

        })
            .then((response) => {
                let data = response.data;

                if (data.data)
                    this.setState({
                        roles: data.data.roles,
                        count: Number(data.data.count),//eps kieeru veef,
                        searchText: xxxx,
                        isSearch: 1
                    })

            })

    }

    onChangeSearchType = async (value) => {
        await this.setState({
            columnSearch: value,
        })
        if (this.state.searchText) {
            this.search(this.state.searchText);
        }
        // console.log(`selected ${value}`);
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
                    this.search(this.state.searchText)
                }
                else {
                    this.getRoles(this.state.page)
                }
            },
        };
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }
    removeSearch = () => {
        this.setState({
            searchText: ''
        })
    }
    onchangeSearch = (event) => {
        let value = event.target.value
        this.search(value)

    }
    ChangeCheckbox = () => {
    }

    changeRows = (selectedRowKeys, selectedRows) => {
    }

    handleClickRow(rowIndex) {
        let roles = this.state.roles;
        roles[rowIndex].Selected = true;
        this.setState({
            roles: roles
        })
    }
    onchangeRole = (value) => {
        // console.log('valueeeeeeeeeeeeee', value)
        if (value === 'role') {
            this.setState({
                roleModaVisible: true
            })
        }
    }
    onchangeAction = async (value) => {
        if (value === 'action') {
            await this.setState({
                actionModalVisible: true
            })
        }

    }
    roleCancel = () => {
        this.setState({
            roleModaVisible: false
        })
    }
    roleOk = async (value) => {
        const { form } = this.formRef.props
        let name = value.name
        let des = value.description
        await Request('role_action/roleInsert', 'POST', { name, des }).then(res => {

            let data = res.data;
            message.success(data.message)
            if (data.success) {
                this.setState({
                    roleModaVisible: false
                })
                this.requestAction();
                form.setFieldsValue({ role: name })

            }
        })
    }
    actionCancel = () => {
        this.setState({
            actionModalVisible: false
        })
    }
    actionOk = async (value) => {
        const { form } = this.formRef.props
        let name = value.name
        await Request('role_action/actionInsert', 'POST', { name }).then(res => {

            let data = res.data;
            message.success(data.message)
            if (data.success) {
                this.setState({
                    roleModaVisible: false
                })
                this.requestAction();
                form.setFieldsValue({ action: name })

            }
        })
    }

    render() {
        let token = cookie.load('token');
        if (!token || !jwt.decode(token)) {
            return (
                <Login />
            )
        }
        let payload = jwt.decode(token);
        let claims = payload.claims;
        let canPermiss = claims.indexOf(Permission.Role.Permiss) >= 0;
        let canUpdate = claims.indexOf(Permission.Role.Update) >= 0;
        let canDelete = claims.indexOf(Permission.Role.Delete) >= 0;
        let canCreate = claims.indexOf(Permission.Role.Insert) >= 0;
        let canRead = claims.indexOf(Permission.Role.Read) >= 0;
        const { selectedRowKeys } = this.state
        const rowSelection = {
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: async (selectedRowKeys, selectedRows) => {
                // console.log('selected rowkeys', selectedRowKeys)
                if (selectedRows[0]) {
                    await this.setState({
                        selectedId: selectedRows[0].id,
                        selectedRowKeys: selectedRowKeys,
                        user: selectedRows[0],
                    })
                }

            },

            // getCheckboxProps: record => ({

            //     disabled: Column.title === 'Id', // Column configuration not to be checked
            //     name: record.name,
            // }),

        };
        return (
            <div>
                {
                    canRead ?
                        <div>
                            {/* <SearchModal col={this.state.objRoles} changesearch={this.onchangeSearch} remove={this.removeSearch} callback={this.search} onchangeSearch={this.onChangeSearchType} /> */}
                            <RoleModal
                                visible={this.state.roleModaVisible}
                                roleCancel={this.roleCancel}
                                roleOk={this.roleOk}
                            />
                            <ActionModal
                                visible={this.state.actionModalVisible}
                                actionCancel={this.actionCancel}
                                actionOk={this.actionOk}
                            />
                            <div style={{ display: 'flex' }}>

                                {
                                    canUpdate ?
                                        <div>
                                            <Button style={{ margin: '20px' }} onClick={this.showModalEdit.bind(this, this.state.user)}>
                                                <Icon type="edit" />
                                            </Button> Sửa
                                        </div>
                                        : null
                                }

                                {
                                    canCreate ?
                                        <div>
                                            <Button style={{ margin: '20px' }} onClick={this.showModal}>
                                                <Icon type="plus" />
                                            </Button> Thêm
                                        </div>
                                        : null
                                }
                                {
                                    canDelete ?
                                        <Popconfirm
                                            title="Bạn chắc chắn muốn xóa?"
                                            onConfirm={this.deleteRole.bind(this, this.state.selectedId)}
                                            onCancel={this.cancel}
                                            okText="Yes"
                                            cancelText="No">
                                            <Button type="danger" style={{ margin: '20px' }} >
                                                <Icon type="delete" />
                                            </Button> Xóa
                                        </Popconfirm>
                                        :
                                        null
                                }

                            </div>
                            <Row className="table-margin-bt">
                                <FormModal
                                    datacha={this.state.datacha}
                                    wrappedComponentRef={this.saveFormRef}
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    onSave={this.InsertOrUpdateRole}
                                    title={this.state.title}
                                    formtype={this.state.formtype}
                                    id_visible={this.state.id_visible}
                                    dataRole={this.state.dataRole}
                                    dataAction={this.state.dataAction}
                                    onchangeRole={this.onchangeRole}
                                    onchangeAction={this.onchangeAction}
                                />


                                <Table

                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: async event => {
                                               await this.handleClickRow.bind(this, rowIndex)
                                                if (this.state.selectedRowKeys.indexOf(record.id) >= 0) {
                                                    for (var i =0;i< this.state.selectedRowKeys.length; i++) {
                            
                                                        if (this.state.selectedRowKeys[i] === record.id)
                                                            this.state.selectedRowKeys.splice(i, 1);
                                                    }
                                                }
                                                else {
                                                    this.state.selectedRowKeys.push(record.id)

                                                }
                                                // console.log('loggggggggggggggggggggggggggg', this.state.selectedRowKeys)
                                                await this.setState({
                                                    selectedId: record.id,
                                                    user: record
                                                })
                                            }, // click row
                                        };
                                    }}
                                    expandRowByClick="true" onChange={this.changeRows}
                                    pagination={false}
                                    rowSelection={rowSelection}
                                    dataSource={this.state.roles} rowKey="id" >
                                    <Column className="hidden-action"
                                        title={<span>Id <Icon type={this.state.orderby} /></span>}
                                        dataIndex="id"
                                        key="id"
                                        onHeaderCell={this.onHeaderCell}
                                    />

                                    <Column title="Role Code" dataIndex="role" key="role" onHeaderCell={this.onHeaderCell} />
                                    <Column title="Action Code" dataIndex="action" key="action" onHeaderCell={this.onHeaderCell} />


                                </Table>
                            </Row>
                            <Row>
                                <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                            </Row>
                        </div>
                        : <h1>Không có quyền</h1>
                }

            </div >

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
)(RoleAction);
