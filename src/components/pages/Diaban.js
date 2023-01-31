import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Tooltip, Card } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action';
import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;

const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      var comboboxlevel = [];
      comboboxlevel.push(<Option value={1}>Tỉnh/TP</Option>);
      comboboxlevel.push(<Option value={2}>Huyện/Quận</Option>);
      comboboxlevel.push(<Option value={3}>Xã/Phường</Option>);
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, comboBoxDatasource, onSelectCapDiaBan } = this.props;
      var combobox = []
      comboBoxDatasource.map((value, index) => {
        combobox.push(<Option value={value.dm_db_id}>{value.dm_db_ten}</Option>)
      })
      const { getFieldDecorator } = form;
      var datacha = this.props.datacha
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
            <Row gutter={24}>
              <Col span={24}>
                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                  <Form.Item>
                    {getFieldDecorator('dm_db_id')(<Input type="number" disabled hidden />)}
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Nhập thông tin địa bàn:">
                  {getFieldDecorator('dm_db_ten', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Input type="text" placeholder="Tên địa bàn" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Cấp địa bàn">
                  {getFieldDecorator('dm_db_cap', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Select
                    onSelect={onSelectCapDiaBan}
                    onChange={this.handleChange}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    showSearch
                  >
                    {comboboxlevel}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Địa bàn cha">
                  {getFieldDecorator('dm_db_id_cha', {
                  })(
                    <Select
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      showSearch
                    >
                      {
                        datacha.map((value, index) => {
                          return (
                            <Option value={value.dm_db_id}>{value.dm_db_ten}</Option>
                          )
                        })
                      }
                      {combobox}
                    </Select>)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
)
class Diaban extends React.Component {
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
      textSearch: '',
      columnSearch: '',
      selectedRowKeys: [],
      isSort: true,
      rowdiabanselected: {},
      statebuttondelete: true,
      statebuttonedit: true,
      stateconfirmdelete: false,
      selectedId: [],
      selectedrow: [],
      sortBy: '',
      index: 'dm_db_id',
      orderby: 'arrow-up',
      comboBoxDatasource: [],
      dataSource_Select_Parent: [],
      dm_ten: ''
    }
  }
  //--------------DELETE-----------------------
  deleteDiaban = (dm_db_id) => {
    Request(`diaban/delete`, 'DELETE', { dm_db_id: dm_db_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getDiabans(this.state.page)
        this.setState({
          statebuttondelete: true,
          stateconfirmdelete: false,
          statebuttonedit: true,
          selectedRowKeys: []
        })
      })
    this.setState({
      stateconfirmdelete: false
    })
  }

  getDiabans = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })
    Request('diaban/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        if (data.data)
          this.setState({
            diabans: data.data.diabans,
            count: Number(data.data.count)//eps kieeru veef
          })
        this.props.fetchLoading({
          loading: false
        })
      })
  }
  // insert---------------------------------

  InsertOrUpdateDiaban = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      var url = this.state.action === 'insert' ? 'diaban/insert' : 'diaban/update'
      Request(url, 'POST', values)
        .then((response) => {
          this.setState({
            rowdiabanselected: values
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
          var message = 'Thành công ^_^'

          if (!!!response.data.success) {
            message = 'Có lỗi xảy ra >_<'
            notifi_type = 'error'
            description = response.data.message.map((values, index) => {
              return <Alert type='error' message={values}></Alert>
            })
          }
          //thông báo lỗi vòa thành công
          notification[notifi_type]({
            message: message,
            description: description
          });
          this.getDiabans(this.state.page)
        })
    });
  }

  refresh = (pageNumber) => {
    this.getDiabans(this.state.pageNumber)
  }

  componentDidMount() {
    this.getDiabans(this.state.pageNumber, this.state.index, this.state.sortBy);
    document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
  }

  onchangpage = (page) => {
    this.setState({
      page: page
    })

    this.getDiabans(page); if (this.state.isSearch === 1) {
      this.search(this.state.textSearch)
    }
    else {
      this.getDiabans(page)
    }
  }

  showDataSourceParent() {
    this.getDiabans(this.state.dataSource_Select_Parent);
  }

  showModalUpdate = (diaban) => {
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    form.setFieldsValue({ dm_db_cap: diaban.ten_dm_db_cap })
    var arrayfilloption = []
    this.state.diabans.map((values, index) => {
      arrayfilloption.push({ dm_db_id: values.dm_db_id, dm_db_ten: values.dm_db_ten })
    })
    this.setState({
      dataSource_Select_Parent: arrayfilloption
    })
    form.setFieldsValue({ dm_db_cap: this.state.ten_dm_db_cap })
    if (diaban.dm_db_id !== undefined) {
      this.setState({
        id_visible: true,
        action: 'update'
      })
      form.setFieldsValue(diaban);
    }
  };

  showModalInsert = async (diaban) => {
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    form.resetFields();
    await this.setState({
      dataSource_Select_Parent: []
    })
    form.setFieldsValue({ dm_db_cap: 1 })
    var arrayfilloption = []
    this.state.diabans.map((values, index) => {
      arrayfilloption.push({ dm_db_id: values.dm_db_id, dm_db_ten: values.dm_db_ten })
    })
    if (diaban.dm_db_id === undefined) {
      this.setState({
        action: 'insert'
      })
    }
  };

  onSelectCapDiaBan = async (value) => {
    const { form } = this.formRef.props;
    if (value === 1) {
      this.setState({
        dataSource_Select_Parent: [],
      })
      form.setFieldsValue({ dm_db_id_cha: '' })
    }
    else {
      await Request('diaban/getcha', 'POST', { dm_db_cap: value }).then(res => {
        var a = res.data[0].dm_db_ten
        if (res.data) {
          this.setState({
            dataSource_Select_Parent: res.data,
            dm_ten: a
          })
          form.setFieldsValue({ dm_db_id_cha: this.state.dm_ten })
        }
      })

    }
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false,
      rowdiabanselected: false
    });
  };

  handleChange(value) {
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
    return `Total ${total} items`;
  }
  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      this.handleSearch(this.state.page, this.state.textSearch, this.confirm, this.state.nameSearch, this.state.codeSearch);
    }
    else {
      this.getDiabans(this.state.page, this.state.index, this.state.sortBy)
    }
  }

  search = async (xxxx) => {
    Request('diaban/Search', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: this.state.page,
      textSearch: xxxx,
      columnSearch: this.state.columnSearch,
      p1: this.state.index,
      p2: this.state.sortBy
    })
      .then((response) => {
        let data = response.data;
        if (data.data)
          this.setState({
            diabans: data.data.diabans,
            count: Number(data.data.count),//eps kieeru veef,
            textSearch: xxxx,
            isSearch: 1
          })
      })

  }
  onSearch = (val) => {
  }
  removeSearch = () => {
    this.setState({
      textSearch: ''
    })
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
          this.getDiabans(this.state.page)
        }
      },
    };
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
  clearChecked = () => {
    this.onSelectChange([], [])
  };
  onRowClick = (row) => {
    if (this.state.selectedRowKeys[0] === row.dm_db_id) {
      this.onSelectChange([], [])
    }
    else {
      this.onSelectChange([row.dm_db_id], [row])
    }
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
    else {
      this.setState({
        statebuttondelete: true
      })
    }
    if (selectedRowKeys.length === 1) {
      this.setState({
        statebuttonedit: false,
        rowdiabanselected: selectedRows[0]
      })
    }
    else {
      this.setState({
        statebuttonedit: true
      })
    }
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: Column.title === 'Id',
        name: record.name,
      }),
    };
    if (token)
      return (
        <div>
          <Card>
            <Row>
              <Col span={2}>
                <Tooltip title="Thêm địa bàn">
                  <Button shape="round" type="primary" size="default" onClick={this.showModalInsert.bind(null)}>
                  <Icon type="plus" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Sửa địa bàn">
                  <Button shape='round' type="primary" size="default" onClick={this.showModalUpdate.bind(this, this.state.rowdiabanselected)} disabled={this.state.statebuttonedit} >
                    <Icon type="edit" /></Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Xóa địa bàn">
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa ?"
                    onConfirm={this.deleteDiaban.bind(this, this.state.selectedId)}
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
            </Row>
          </Card>
          <Row style={{ marginTop: 5 }}>
            <FormModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateDiaban}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              comboBoxDatasource={this.state.comboBoxDatasource}
              onSelectCapDiaBan={this.onSelectCapDiaBan}
              select_diabancha={this.state.select_diabancha}
              datacha={this.state.dataSource_Select_Parent}
              handleChange={this.handleChange}
            />
            <Table components={this.components} rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.diabans} bordered='1' scroll={{ x: 1000 }} rowKey="dm_db_id" >
              <Column
                title={<span>Id địa bàn <Icon type={this.state.orderby} /></span>}
                dataIndex="dm_db_id"
                key="dm_db_id"
                className="hidden-action"
                onHeaderCell={this.onHeaderCell}
              />
              <Column title="Tên địa bàn" dataIndex="dm_db_ten" key="dm_db_ten" onHeaderCell={this.onHeaderCell}
              />
              <Column className="hidden-action" title="Cấp địa bàn" dataIndex="dm_db_cap" key="dm_db_cap" onHeaderCell={this.onHeaderCell} />
              <Column title="Cấp địa bàn" dataIndex="ten_dm_db_cap" key="ten_dm_db_cap" onHeaderCell={this.onHeaderCell} />
              <Column title="Địa bàn cha" dataIndex="tencha" key="tencha" onHeaderCell={this.onHeaderCell} />
              <Column className="hidden-action" title="Địa bàn cha" dataIndex="dm_db_id_cha" key="dm_db_id_cha" onHeaderCell={this.onHeaderCell} />
            </Table>
          </Row>
          <Row>
            <Pagination onChange={this.onchangpage} total={this.state.count} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
          </Row>
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
)(Diaban);
