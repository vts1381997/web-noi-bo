import React from 'react';
import { Pagination, Checkbox, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import '@styles/style.css';
import jwt from 'jsonwebtoken';
import Permission from '../Authen/Permission'
import TreeRole from '../common/Tree'
import SearchModal from '../common/searchModal'
import { NavLink } from 'react-router-dom'
//do something...
const token = cookie.load('token');
const { Column } = Table;
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
                                <Form.Item label="Tên Group">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: this.state.messageRequired, }],
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Description:">
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: this.state.messageRequired }, { email: true, message: 'Trường này phải là email!' }],
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    },
)

class Group extends React.Component {
    constructor(props) {
        super(props);
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
            index: 'name',
            orderby: 'arrow-up',
            roleVisible: 'none',
            modalRoleVisible: false,
            actionColumn: 'hidden-action',
            groups: [],
            selectedRowKeys: [],
            selectedId:'KT'
        }
    }
    //--------------DELETE-----------------------
    deleteGroup = (id) => {
        Request(`group/delete`, 'DELETE', { id: id })
            .then((res) => {
                notification[res.data.success === true ? 'success' : 'error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
                this.getGroup(this.state.page)
            })
    }

    getGroup = (pageNumber) => {

        if (pageNumber <= 0)
            return;

        Request('group/get', 'POST', {
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy
        })
            .then((response) => {
                if (response) {
                    let data = response.data;
                    let objgroups = Object.keys(data.data.groups[0])
                    if (data.data)
                        this.setState({
                            objgroups: objgroups,
                            groups: data.data.groups,
                            count: Number(data.data.count)//eps kieeru veef
                        })
                }

            })

    }

    InsertOrUpdateGroup = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }
            var url = this.state.action === 'insert' ? 'group/insert' : 'group/update'
            Request(url, 'POST', values)
                .then((response) => {
                    if (response.status === 200 & response.data.success === true) {
                        form.resetFields();
                        this.setState({
                            visible: false,
                            message: response.data.message
                        })
                    }
                    var description = response.data.message
                    var notifi_type = 'success'
                    var message = 'Thành công'

                    if (!!!response.data.success) {
                        message = 'Lỗi Cmnr'
                        notifi_type = 'error'
                        description = response.data.message.map((value, index) => {
                            return <Alert type='error' message={value}></Alert>
                        })
                    }
                    //thông báo lỗi vòa thành công
                    notification[notifi_type]({
                        message: message,
                        description: description
                    });
                    this.getGroup(this.state.page)
                })
        });
    }

    refresh = (pageNumber) => {
        this.getGroup(this.state.pageNumber)
    }
    componentDidMount() {
        this.getGroup(this.state.pageNumber);
    }
    onchangpage = async (page) => {
        await this.setState({
            page: page
        })

        if (this.state.isSearch === 1) {
            this.search(this.state.searchText)
        }
        else {
            this.getGroup(page)
        }
    }

    showModal = (user) => {
        const { form } = this.formRef.props
        this.setState({
            visible: true
        });
        form.resetFields();
        if (user.id !== undefined) {
            this.setState({
                id_visible: true,
                action: 'update'
            })
            form.setFieldsValue(user);
        }
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
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
            this.getGroup(this.state.page)
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
                        groups: data.data.groups,
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
                    this.getGroup(this.state.page)
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
    showmodalRole = async (name) => {


        if (name) {
            this.setState({
                modalRoleVisible: true,
            })
        }
        else {
            message.info('chọn user đã nhóc');
        }

    }
    okRole = async e => {
        let user = this.state.selectedId
        let a = this.child.state.checkedKeys
        Request('setGroupPermission', 'POST', { a, user }).then(res => {

        })
        await this.setState({
            modalRoleVisible: false,
        });
    };

    cancelRole = e => {
        this.setState({
            modalRoleVisible: false,
        });
    };
    changeRows = (selectedRowKeys, selectedRows) => {
    }

    handleClickRow(rowIndex) {
        let groups = this.state.groups;
        groups[rowIndex].Selected = true;
        this.setState({
            groups: groups
        })
    }
    redirectDetailMember = () => {
        window.location.href = '/group';
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
        let canRead = claims.indexOf(Permission.User.Read) >= 0;
        let canUpdate = claims.indexOf(Permission.User.Update) >= 0;
        let canDelete = claims.indexOf(Permission.User.Delete) >= 0;
        let canCreate = claims.indexOf(Permission.User.Insert) >= 0;
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            hideDefaultSelections: true,
            selectedRowKeys,
            onChange: async (selectedRowKeys, selectedRows) => {
                let sl = selectedRowKeys[0]
                Request('group/checkrolegroup', 'POST', { sl }).then((res) => {
                    let data = res.data;
                    let a = data.map(function (value) {
                        return a = { role: value.split('.')[0], acton: value.split('.')[1] }
                    })
                    this.setState({
                        dataTree: data,
                    })

                })
                if (selectedRows[0]) {
                    await this.setState({
                        selectedId: selectedRowKeys[0],
                        user: selectedRows[0],
                        selectedRowKeys
                    })
                }

            },

            getCheckboxProps: record => ({

                disabled: Column.title === 'Id', // Column configuration not to be checked
                name: record.name,
            }),

        };
        return (

            <div>
                {
                    canRead ?
                        <div>
                            <Modal
                                title="Phân quyền "
                                visible={this.state.modalRoleVisible}
                                onOk={this.okRole}
                                onCancel={this.cancelRole}
                            >
                                <TreeRole ref={instance => this.child = instance} dataTree={this.state.dataTree} />
                            </Modal>

                            <SearchModal col={this.state.objgroups} changesearch={this.onchangeSearch} remove={this.removeSearch} callback={this.search} onchangeSearch={this.onChangeSearchType} />
                            <div style={{ display: 'flex' }}>
                                {
                                    canPermiss ?
                                        <div>
                                            <Button style={{ margin: '20px' }} onClick={this.showmodalRole.bind(this, this.state.selectedId)}>
                                                <Icon type="user" />
                                            </Button> Phân Quyền
                                        </div>
                                        : null
                                }
                                {
                                    canUpdate ?
                                        <div>
                                            <Button style={{ margin: '20px' }} onClick={this.showModal.bind(this, this.state.user)}>
                                                <Icon type="edit" />
                                            </Button> Sửa
                                        </div>
                                        : null
                                }

                                {
                                    canCreate ?
                                        <div>
                                            <Button style={{ margin: '20px' }} onClick={this.showModal.bind(null)}>
                                                <Icon type="plus" />
                                            </Button> Thêm
                                        </div>
                                        : null
                                }
                                {
                                    canDelete ?
                                        <Popconfirm
                                            title="Bạn chắc chắn muốn xóa?"
                                            onConfirm={this.deleteGroup.bind(this, this.state.selectedId)}
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
                                <div>
                                    <Button style={{ margin: '20px' }}>
                                        <NavLink to={`/group/${this.state.selectedId}`} className=""> <Icon type="edit" /> </NavLink >
                                    </Button>Thông tin Member

                                </div>

                            </div>
                            <div>

                                <div>
                                    <Row className="table-margin-bt">
                                        <FormModal
                                            datacha={this.state.datacha}
                                            wrappedComponentRef={this.saveFormRef}
                                            visible={this.state.visible}
                                            onCancel={this.handleCancel}
                                            onSave={this.InsertOrUpdateGroup}
                                            title={this.state.title}
                                            formtype={this.state.formtype}
                                            id_visible={this.state.id_visible}
                                        />

                                        <Table
                                            onRow={(record, rowIndex) => {
                                                return {
                                                    onClick: event => {
                                                        this.handleClickRow.bind(this, rowIndex)
                                                        this.setState({
                                                            selectedRowKeys: [record.name],
                                                            selectedId: record.name
                                                        })
                                                    },
                                                };
                                            }}
                                            expandRowByClick="true" onChange={this.changeRows}
                                            pagination={false}
                                            rowSelection={rowSelection}
                                            dataSource={this.state.groups} rowKey="name" >
                                            <Column className="hidden-action"
                                                title={<span>Id <Icon type={this.state.orderby} /></span>}
                                                dataIndex="id"
                                                key="id"
                                                onHeaderCell={this.onHeaderCell}
                                            />
                                            <Column title={<span>UserName <Icon type={this.state.orderby} /></span>} dataIndex="name" key="name" onHeaderCell={this.onHeaderCell}
                                            />
                                            <Column title="Description" dataIndex="description" key="description" onHeaderCell={this.onHeaderCell} />


                                        </Table>
                                    </Row>
                                    <Row>
                                        <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                    </Row>
                                </div>


                            </div>
                        </div>
                        : <h1>Mày đéo có quyền vào đây</h1>
                }

            </div >

        )
    }
}
const mapStateToProps = state => ({
    ...state
})

export default Group
