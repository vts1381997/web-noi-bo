// import React, { Component } from 'react';
// import { Pagination, Checkbox, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import Request from '@apis/Request'
// import { NavLink } from 'react-router-dom'
// import '@styles/style.css';
// import { thisExpression } from '@babel/types';
// import { async } from 'q';
// const { Column } = Table;
// class Member extends Component {
//     constructor(props) {
//         console.log('props:', props)
//         super(props);
//         this.state = {
//             pageNumber: 1,
//             current: 1,
//             page: 1,
//             pageSize: 40,
//             showPopup: false,
//             count: 1,
//             show: false,
//             visible: false,
//             formtype: 'horizontal',
//             title: 'Nhập thông tin',
//             id_visible: false,
//             action: 'insert',
//             isSearch: 0,
//             searchText: '',
//             columnSearch: 'name',
//             isSort: true,
//             sortBy: 'ASC',
//             index: 'name',
//             orderby: 'arrow-up',
//             nameSearch: '',
//             emailSearch: '',
//             phoneSearch: '',
//             passwordSearch: '',
//             fullnameSearch: '',
//             codeSearch: '',
//             roleVisible: 'none',
//             modalRoleVisible: false,
//             actionColumn: 'hidden-action',
//             users: [],
//             selectedRowKeys: [],
//             showModal: false,
//             listMemAdd: [],
//             listMemDelete: [],
//             selectedRowKeys1: []
//         }
//     }
//     //--------------DELETE-----------------------
//     deleteUser = (id) => {
//         Request(`member/delete`, 'DELETE', { id: id })
//             .then((res) => {
//                 notification[res.data.success === true ? 'success' : 'error']({
//                     message: 'Thông báo',
//                     description: res.data.message
//                 });
//                 this.getUsers(this.state.page)
//             })
//     }
//     componentDidMount() {
//         console.log('ddddddddddđ', this.props.match.params.memberName)
//         this.getUsers(this.state.pageNumber);

//     }
//     getUsers = (pageNumber) => {
//         let a = this.props.location.pathname.split('/')[2]
//         console.log('23444444444444444444444', a)
//         if (pageNumber <= 0)
//             return;

//         Request('member/get', 'POST', {
//             pageSize: this.state.pageSize,
//             pageNumber: pageNumber,
//             a
//         })
//             .then((response) => {
//                 console.log('response', response)
//                 if (response) {
//                     let data = response.data;
//                     console.log(data)
//                     if (data.data)
//                         this.setState({
//                             users: data.data.users,
//                             // count: Number(data.data.count)//eps kieeru veef
//                         })

//                 }

//             })

//     }
//     listMemberAdd = () => {
//         Request('member/listmember', 'POST').then(res => {
//             console.log('response', res)
//         })
//     }

//     InsertOrUpdateUser = () => {
//         const { form } = this.formRef.props;

//         form.validateFields((err, values) => {
//             if (err) {
//                 return
//             }
//             var url = this.state.action === 'insert' ? 'user/insert' : 'user/update'
//             Request(url, 'POST', values)
//                 .then((response) => {
//                     if (response.status === 200 & response.data.success === true) {
//                         form.resetFields();
//                         this.setState({
//                             visible: false,
//                             message: response.data.message
//                         })
//                     }
//                     var description = response.data.message
//                     var notifi_type = 'success'
//                     var message = 'Thành công'

//                     if (!!!response.data.success) {
//                         message = 'Lỗi Cmnr'
//                         notifi_type = 'error'
//                         description = response.data.message.map((value, index) => {
//                             return <Alert type='error' message={value}></Alert>
//                         })
//                     }
//                     //thông báo lỗi vòa thành công
//                     notification[notifi_type]({
//                         message: message,
//                         description: description
//                     });
//                     this.getUsers(this.state.page)
//                 })
//         });
//     }

//     deleteMember = () => {
//         console.log('deletettttttt')
//         let a = this.props.location.pathname.split('/')[2]
//         let listmem = this.state.selectedRowKeys
//         Request('member/delete', 'POST', { a, listmem }).then(res => {
//             console.log(res)
//             this.getUsers(this.state.pageNumber)
//         })
//     }
//     showModal = () => {
//         console.log('dasdasdasdasdsadasddcmmmmmmmmmmmmmmmmmmmmmmmmmmm')
//         this.setState({
//             showModal: true,
//         })
//         let a = this.props.location.pathname.split('/')[2]
//         Request('member/listmember', 'POST', {
//             groupName: a,
//             pageSize: this.state.pageSize,
//             pageNumber: this.state.page
//         }

//         ).then(res => {
//             console.log(res)
//             this.setState({
//                 members: res.data,
//             })
//         })
//     }
//     onCancel = async () => {
//         await this.setState({
//             showModal: false,
//             selectedRowKeys1: []
//         })
//         console.log('tthis selected rowkey', this.state.selectedRowKeys1)
//     }
//     onOk = async () => {
//         let mem = this.state.listMemAdd
//         let sl = this.props.location.pathname.split('/')[2]
//         await Request('group/checkrolegroup', 'POST', { sl }).then(response => {
//             console.log('asjhklassajfkfefefferferf', response.data)
//             let gr = response.data;
//             Request('member/add', 'POST', { mem, sl, gr }).then(res => {
//                 console.log(res)
//                 if (res.data) {
//                     message.success('thêm mới thành công')
//                     this.setState({
//                         showModal: false,
//                         selectedRowKeys: []
//                     })
//                     this.getUsers(this.state.pageNumber)
//                 }
//             })
//         })
//         this.setState({
//             listMemAdd: [],
//         })
//         console.log('66666666666666666666666666666666666666666666', this.state.listMemAdd)

//     }
//     handleClickRow(rowIndex) {
//         let users = this.state.users;
//         users[rowIndex].Selected = true;
//         this.setState({
//             users: users
//         })
//     }
//     onchangpage = async (page) => {
//         await this.setState({
//             page: page
//         })

//         if (this.state.isSearch === 1) {
//             this.search(this.state.searchText)
//         }
//         else {
//             this.getGroup(page)
//         }
//     }
//     onShowSizeChange = async (current, size) => {
//         await this.setState({
//             pageSize: size
//         });
//         if (this.state.searchText) {
//             this.search(this.state.searchText);

//         }
//         else {
//             this.getGroup(this.state.page)
//         }
//     }
//     render() {
//         const { selectedRowKeys } = this.state
//         const { selectedRowKeys1 } = this.state
//         const rowSelection = {
//             hideDefaultSelections: true,
//             selectedRowKeys,
//             onChange: async (selectedRowKeys, selectedRows) => {
//                 this.setState({
//                     selectedRowKeys
//                 })
//             },
//         }
//         const rowMemberSelection = {
//             hideDefaultSelections: true,
//             onChange: async (selectedRowKeys1, selectedRows) => {
//                 await this.setState({
//                     listMemAdd: selectedRowKeys1,
//                     selectedRowKeys1

//                 })
//                 console.log('selectttttttttttttttttttttttttttt', this.state.listMemAdd)
//             },
//         }
//         return (
//             <div>
//                 <Modal
//                     title="Thêm Member"
//                     visible={this.state.showModal}
//                     onOk={this.onOk}
//                     onCancel={this.onCancel}
//                 >
//                     <Table
//                         rowSelection={rowMemberSelection}
//                         dataSource={this.state.members}
//                         rowKey="name"
//                     >
//                         <Column title="Member" dataIndex="name" key="name" />
//                     </Table>
//                 </Modal>
//                 <Button style={{ margin: '20px' }}>
//                     <NavLink to="/group" className=""> <Icon type="arrow-left" /></NavLink >
//                 </Button>Back
//                 <Button style={{ margin: '20px' }} onClick={this.showModal}>
//                     <Icon type="user-add" />
//                 </Button>Thêm member
//                 <Button style={{ margin: '20px' }} onClick={this.deleteMember}>
//                     <Icon type="user-delete" />
//                 </Button>Xóa member
//                 <Row>
//                     <Table
//                         rowSelection={rowSelection}
//                         dataSource={this.state.users} rowKey="name"
//                         Pagination={false}
//                         onRow={(record, rowIndex) => {
//                             return {
//                                 onClick: async event => {
//                                     await this.handleClickRow.bind(this, rowIndex)
//                                     if (this.state.selectedRowKeys.indexOf(record.name) >= 0) {
//                                         console.log('111111111111111111111111111111111111111111')

//                                         for (var i = 0; i < this.state.selectedRowKeys.length; i++) {

//                                             if (this.state.selectedRowKeys[i] === record.name)
//                                                 this.state.selectedRowKeys.splice(i, 1);
//                                         }
//                                     }
//                                     else {
//                                         this.state.selectedRowKeys.push(record.name)

//                                     }
//                                     console.log('loggggggggggggggggggggggggggg', this.state.selectedRowKeys)
//                                     await this.setState({
//                                         selectedId: record.name,
//                                         user: record
//                                     })
//                                 }, // click row
//                             };
//                         }}
//                     >
//                         <Column className="hidden-action"
//                             title={<span>Id <Icon type={this.state.orderby} /></span>}
//                             dataIndex="id"
//                             key="id"

//                         />
//                         <Column title={<span>Tài khoản đăng nhập<Icon type={this.state.orderby} /></span>} dataIndex="name" key="name"
//                         />
//                         <Column className="hidden-action" title="Password" dataIndex="password" key="password" />
//                         <Column title="Số điện thoại" dataIndex="phone" key="phone" />
//                         <Column title="Tên đầy đủ" dataIndex="fullname" key="fullname" />
//                         <Column title="Email" dataIndex="email" key="email" />


//                     </Table>
//                 </Row>
//                 <Row>
//                     <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />

//                 </Row>
//             </div>
//         );
//     }
// }

// export default Member;