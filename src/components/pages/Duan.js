import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Card, Tooltip } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
import { fetchLoading } from '@actions/common.action';
import '@styles/style.css';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select

const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, select_qtda, getTienTo } = this.props;
      const { getFieldDecorator } = form;
      var first_qtda = null;
      if (select_qtda.length !== 0) {
        first_qtda = select_qtda[0].ns_id
      }
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
              <Col span={12}>
                <Form.Item label="">
                  {getFieldDecorator('dm_duan_id', {
                  })(<Input type="hidden" placeholder="Id dự án" hidden="true" />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Nhập thông tin dự án:">
                  {getFieldDecorator('dm_duan_ten', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Input type="text" placeholder="Tên dự án" onChange={getTienTo} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Kí hiệu dự án">
                  {getFieldDecorator('dm_duan_key', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Quản trị dự án">
                  {getFieldDecorator('ns_id_qtda', {
                    rules: [{ required: true, message: 'Trường này không được để trống!', }], initialValue: first_qtda
                  })(<Select
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      select_qtda.map((value, index) => {
                        return (<Option value={value.ns_id}>{value.ns_hovaten}</Option>)
                      })
                    }
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

class Duan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      current: 1,
      page: 1,
      timkiem: [],
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
      isSort: true,
      sortBy: '',
      index: 'id',
      orderby: 'arrow-up',
      select_qtda: [],
      selectedId: [],
      statebuttonedit: true,
      statebuttondelete: true,
      stateconfirmdelete: false,
      rowthotroselected: {},
      selectedrow: [],
      selectedRowKeys: [],
      timkiem: []
    }
  }
  //--------------DELETE-----------------------
  deleteDuAn = (dm_duan_id) => {
    Request(`duan/delete`, 'DELETE', { dm_duan_id: dm_duan_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thong Bao',
          description: res.data.message
        });
        this.getDuans(this.state.page)
        this.setState({
          stateconfirmdelete: false,
          statebuttondelete: true,
          statebuttonedit: true,
          selectedRowKeys: []
        })
      })
  }

  getDuans = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })
    Request('duan/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        if (response.data.data)
          this.setState({
            duans: response.data.data.duans,
            count: Number(response.data.data.count)//eps kieeru veef
          })
        this.props.fetchLoading({
          loading: false
        })
      })
  }
  // insert---------------------------------

  InsertOrUpdateDuan = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      var url = this.state.action === 'insert' ? 'duan/insert' : 'duan/update'
      this.setState({
        rowthotroselected: values
      })
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
            message = 'Có lỗi xảy ra!'
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
          this.getDuans(this.state.page)
        })
    });
  }

  getTienTo = (e) => {
    let str = e.target.value
    if (str !== null)
      str = str.trim()
    var tt = str[0]
    for (var i = 0; i < str.length - 1; i++) {
      if (str.charAt(i) === " ") {
        tt += str.charAt(i + 1)
      }
    }
    // tt=tt.toUpperCase()
    const { form } = this.formRef.props

    form.setFieldsValue({ dm_duan_key: tt })
  }

  refresh = (pageNumber) => {
    this.getDuans(this.state.pageNumber)
  }

  componentDidMount() {
    this.getDuans(this.state.pageNumber, this.state.index, this.state.sortBy);
    document.getElementsByClassName('ant-card-body')[0].style.padding = '7px'
  }

  onchangpage = (page) => {
    this.setState({
      page: page
    })

    this.getDuans(page); if (this.state.isSearch === 1) {
      this.search(this.state.searchText)
    }
    else {
      this.getDuans(page)
    }
  }

  set_select_qtda = () => {
    Request('duan/getcha', 'POST', {
    }).then((res) => {
      if (res.data) {
        this.setState({
          select_qtda: res.data
        })
      }
    })
  }

  showModal = async (duan) => {
    const { form } = this.formRef.props
    this.setState({
      visible: true
    });
    await form.resetFields();
    if (duan.dm_duan_id !== undefined) {
      this.setState({
        id_visible: false,
        action: 'update'
      })
      form.setFieldsValue(duan);
    }
    this.set_select_qtda()
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, align: 'center' }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={'Từ tìm kiếm'}
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
    Request(`duan/search`, 'POST',
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
                duans: res.data.data.duans,
            })
        })
    confirm();
    this.setState({ searchText: selectedKeys[0] });
};


  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false
    });
  };

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
      this.getDuans(this.state.page, this.state.index, this.state.sortBy)
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
          this.getDuans(this.state.page)
        }
      },
    };
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  checkStateConfirm = () => {
    this.setState({
      stateconfirmdelete: true
    })
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
  };
  clearChecked = () => {
    this.onSelectChange([], [])
  };
  onRowClick = (row) => {
    if (this.state.selectedRowKeys[0] === row.dm_duan_id) {
      this.onSelectChange([], [])
    }
    else {
      this.onSelectChange([row.dm_duan_id], [row])
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
          <Card >
            <Row >
              <Col span={2}>
                <Tooltip title="Thêm Dự Án">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                    <Icon type="plus" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Sửa Dự Án">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                    <Icon type="edit" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Xóa Dự Án">
                  <Popconfirm
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={this.deleteDuAn.bind(this, this.state.selectedId)}
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
                  <Button shape="round" type="primary" size="default" style={{ marginLeft: '18px' }} onClick={this.refresh.bind(null)}>
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
              onSave={this.InsertOrUpdateDuan}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              select_qtda={this.state.select_qtda}
              getTienTo={this.getTienTo}
            />
            <Table components={this.components} rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.duans} bordered rowKey="dm_duan_id">
              <Column title="Tiền tố" dataIndex="dm_duan_key" onHeaderCell={this.onHeaderCell}
                render={text => {
                  return <div style={{ textAlign: 'left' }}>{text}</div>
                }}
                {...this.getColumnSearchProps('dm_duan_key')}
              />
              <Column title="Tên dự án" dataIndex="dm_duan_ten"  {...this.getColumnSearchProps('dm_duan_ten')} onHeaderCell={this.onHeaderCell}
                render={text => {
                  return <div style={{ textAlign: 'left' }}>{text}</div>
                }} />
              <Column title="Quản trị dự án" dataIndex="ns_hovaten" {...this.getColumnSearchProps('ns_hovaten')} onHeaderCell={this.onHeaderCell} />
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
)(Duan);
