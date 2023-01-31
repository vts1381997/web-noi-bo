import React from 'react';
import { Tag, Pagination, Card, Tooltip, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Request from '@apis/Request'
import '@styles/style.css';
import { fetchLoading } from '@actions/common.action';
import axios from 'axios';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;
const formatdate = require('dateformat')
const FormModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        labelCombobox: 'Chọn khách hàng là đơn vị:',
        selectedFile: null
      }
    }
    onChangeHandler = event => {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
    render() {
      const { onChangeHandler, visible, onCancel, onSave, form, title, confirmLoading, formtype, comboBoxDuanSource, comboBoxDatasource, onChangeClick_loaihopdong, propDatasourceSelectLoaiHopDong } = this.props;
      var combobox = []
      var combobox1 = []
      var comboboxLoaiHopDong = []
      comboBoxDatasource.map((value) => {
        combobox.push(<Option value={value.id}>{value.ten}</Option>)
      })
      comboBoxDuanSource.map((value) => {
        combobox1.push(<Option value={value.dm_duan_id}>{value.dm_duan_ten}</Option>)
      })
      propDatasourceSelectLoaiHopDong.dataSource.map((value) => {
        comboboxLoaiHopDong.push(<Option value={value.id}>{value.ten}</Option>)
      })
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
          <Form layout={formtype} >
            <Row gutter={25}>
              <Col span={0}>
                <Form.Item label="Id hợp đồng:" className="an">
                  {getFieldDecorator('nkhd_id', {
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={0}>
                <Form.Item label="Id dự án:" className="an">
                  {getFieldDecorator('dm_duan_id', {
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tên dự án:" >
                  {
                    getFieldDecorator('dm_duan_id', {
                      rules: [{ required: true, message: 'Trường này không được bỏ trống!', }],
                    })(
                      <Select
                        showSearch
                        placeholder="Chọn tên dự án"
                        optionFilterProp="children"
                        size="small" onChange={this.props.onChangeId}
                      >
                        {/* <Option value='add_duan' disabled>
                          <Icon type="plus" />Thêm dự án
                        </Option> */}
                        {combobox1}
                      </Select>
                    )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Loại hợp đồng:">
                  {getFieldDecorator('nkhd_loai', {
                    initialValue: 'DV',
                    rules: [{ required: true, message: 'Trường này không được bỏ trống!', }],
                  })(
                    <Select size="small" onSelect={onChangeClick_loaihopdong}>
                      <Option value="DV" >Đơn Vị</Option>
                      <Option value="CN" >Cá Nhân</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={propDatasourceSelectLoaiHopDong.label} >
                  {getFieldDecorator('nkhd_doituong', {
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      size="small" onChange={this.props.onChangeSelect}
                    >
                      {comboboxLoaiHopDong}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={4}>
                <Form.Item label="Số hợp đồng:">
                  {getFieldDecorator('nkhd_so', {
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Thời gian thực hiện(ngày):">
                  {getFieldDecorator('nkhd_thoigianthuchien', {
                    initialValue: '90'
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Chọn nhanh:">
                  <Select defaultValue="90" size="small" onChange={this.props.onchangeoption}>
                    <Option value="30">1 Tháng</Option>
                    <Option value="90">3 Tháng</Option>
                    <Option value="180">6 Tháng</Option>
                    <Option value="365">1 Năm</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Địa chỉ:">
                  {getFieldDecorator('nkhd_diachi', {
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Công ty:">
                  {getFieldDecorator('nkhd_congty', {
                    initialValue: 'FSC'
                  })(
                    <Select size="small">
                      <Option value="FSC">FSC</Option>
                      <Option value="HCM">HCM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Ngày ký:">
                  {getFieldDecorator('nkhd_ngayky', {
                  })(
                    <Input type="date" size="small" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày thanh lý:">
                  {getFieldDecorator('nkhd_ngaythanhly', {
                  })(<Input type="date" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày xuất hóa đơn:">
                  {getFieldDecorator('nkhd_ngayxuathoadon', {
                  })(<Input type="date" size="small" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Ngày thanh toán:">
                  {getFieldDecorator('nkhd_ngaythanhtoan', {
                  })(<Input type="date" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày nghiệm thu:">
                  {getFieldDecorator('nkhd_ngayketthuc', {
                  })(<Input size={"small"} type="date" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Trạng thái:">
                  {getFieldDecorator('nkhd_trangthai', {
                    initialValue: 'DTH'
                  })(
                    <Select size="small">
                      <Option value="DTH">Đang thực hiện</Option>
                      <Option value="TL">Thanh lý</Option>
                      <Option value="XHD">Xuất hóa đơn</Option>
                      <Option value="DTT">Đã thanh toán</Option>
                      <Option value="DONG">Đóng</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={12}>
                <Form.Item label="Files:">
                  {getFieldDecorator('nkhd_files', {
                  })(
                    <div>
                      <label>Upload your file</label>
                      <hr style={{ width: '0px' }} />
                      <input type="file" name="file"
                        onChange={onChangeHandler}
                      />
                      <hr style={{ width: '0px' }} />
                      <Tag color="#f50">Chỉ upload file nén</Tag>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ghi chú:">
                  {getFieldDecorator('nkhd_ghichu', {
                  })(
                    <TextArea rows={4} />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
)
class Hopdong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      current: 1,
      page: 1,
      timkiem: [],
      pageSize: 10,
      showPopup: false,
      count: 1,
      show: false,
      visible: false,
      formtype: 'horizontal',
      title: 'Nhập thông tin cho hợp đồng',
      id_visible: false,
      action: 'insert',
      isSearch: 0,
      searchText: '',
      columnSearch: '',
      isSort: true,
      sortBy: '',
      index: 'id',
      selectedFile: null,
      orderby: 'arrow-up',
      rowthotroselected: {},
      statebuttonedit: true,
      statebuttondelete: true,
      stateconfirmdelete: false,
      selectedRowKeys: [],
      selectedId: [],
      comboBoxDatasource: [],
      comboBoxDuanSource: [],
      propDatasourceSelectLoaiHopDong: {
        dataSource: [],
        label: 'Chọn khách hàng là đơn vị:',
        type: 'DV'
      }
    }
  }
  deleteHopdong = (nkhd_id) => {
    Request(`hopdong/delete`, 'DELETE', { nkhd_id: nkhd_id })
      .then((res) => {
        notification[res.data.success === true ? 'success' : 'error']({
          message: 'Thông báo',
          description: res.data.message
        });
        this.getHopdongs(this.state.page)
        this.setState({
          stateconfirmdelete: false,
          statebuttondelete: true,
          statebuttonedit: true,
          selectedRowKeys: []
        })
        this.render()
      }).catch((err) => {
        console.log(err)
      })
  }
  getHopdongs = (pageNumber) => {
    if (pageNumber <= 0)
      return;
    this.props.fetchLoading({
      loading: true
    })
    Request('hopdong/getnkhd', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        if (response)
          this.setState({
            hopdongs: response.data.data.hopdongs,
            count: Number(response.data.data.count)
          })
      })
    this.props.fetchLoading({
      loading: false
    })
  }

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
    Request(`hopdong/search1`, 'POST',
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
                hopdongs: res.data.data.hopdongs,
            })
        })
    confirm();
    this.setState({ searchText: selectedKeys[0] });
};

  onClickHandler = () => {
    const data = new FormData()
    if (this.state.selectedFile !== null) {
      data.append('file', this.state.selectedFile)
      axios.post("http://103.74.122.80:5000/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
        .then(res => { // then print response status
          console.log(res.statusText)
        })
    }
  }
  InsertOrUpdateHopdong = () => {
    this.onClickHandler();
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      if (this.state.selectedFile !== null) {
        const urlFile = "http://103.74.122.80:5000/upload/" + this.state.selectedFile.name;
        values.nkhd_files = urlFile
      }
      else {
        values.nkhd_files = " "
      }
      var url = this.state.action === 'insert' ? 'hopdong/insert' : 'hopdong/update'
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
          var message = 'Thành công'
          if (!!!response.data.success) {
            message = 'Có lỗi xảy ra!'
            notifi_type = 'error'
            description = response.data.message.map((values) => {
              return <Alert type='error' message={values}></Alert>
            })
          }
          notification[notifi_type]({
            message: message,
            description: description
          })
          this.getHopdongs(this.state.page)
        })
    });
  }
  refresh = () => {
    this.getHopdongs(this.state.pageNumber)
  }
  async componentDidMount() {
    await this.getHopdongs(this.state.pageNumber, this.state.index, this.state.sortBy);
    document.getElementsByClassName('ant-table-expand-icon-th')[0].innerHTML = 'Thông tin liên quan'
    document.getElementsByClassName('ant-table-expand-icon-th')[0].style.width = '71px'
  }
  onClickDownloadFile = (text) => {
    if (text === " ") {
      alert("Hợp đồng này không có file");
    }
    else {
      window.open(text)
    }
  }
  onchangpage = (page) => {
    this.setState({
      page: page
    })
    this.getHopdongs(page); if (this.state.isSearch === 1) {
      this.search(this.state.searchText)
    }
    else {
      this.getHopdongs(page)
    }
  }
  onchangeoption = (value) => {
    const { form } = this.formRef.props
    form.setFieldsValue({
      nkhd_thoigianthuchien: value
    })
  }
  onChangeSelect = (value) => {
    const { form } = this.formRef.props
    form.setFieldsValue({
      nkhd_doituong: value
    })
  }
  showModal = async (hopdong) => {
    Request('hopdong/getdonvi', 'POST', null).then(res => {
      this.setState({
        propDatasourceSelectLoaiHopDong: {
          label: 'Chọn khách hàng là đơn vị:',
          dataSource: res.data,
          type: 'DV'
        }
      })
      const { form } = this.formRef.props
      form.setFieldsValue({
        nkhd_doituong: res.data[0].id
      })
    })
    Request('hopdong/getduan', 'POST', null).then(res => {
      this.setState({
        comboBoxDuanSource: res.data
      })
    })
    const { form } = this.formRef.props
    await form.resetFields();
    this.setState({
      visible: true,
      action: 'insert'
    });
    form.resetFields();
    if (hopdong.nkhd_id !== undefined) {
      this.setState({
        id_visible: true,
        action: 'update'
      })
      var label = hopdong.nkhd_loai === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
      var api = hopdong.nkhd_loai === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
      const { form } = this.formRef.props
      Request(api, 'post', null).then((res) => {
        this.setState({
          propDatasourceSelectLoaiHopDong: {
            label: label,
            dataSource: res.data,
          }
        })
        form.setFieldsValue({
          nkhd_doituong: hopdong.nkhd_doituong
        })
      })
      this.setState({
        labelCombobox: label
      })
      hopdong.nkhd_ngayky = hopdong.nkhd_ngayky === null ? null : formatdate(hopdong.nkhd_ngayky, 'yyyy-mm-dd')
      hopdong.nkhd_ngaythanhly = hopdong.nkhd_ngaythanhly === null ? null : formatdate(hopdong.nkhd_ngaythanhly, 'yyyy-mm-dd')
      hopdong.nkhd_ngaythanhtoan = hopdong.nkhd_ngaythanhtoan === null ? null : formatdate(hopdong.nkhd_ngaythanhtoan, 'yyyy-mm-dd')
      hopdong.nkhd_ngayxuathoadon = hopdong.nkhd_ngayxuathoadon === null ? null : formatdate(hopdong.nkhd_ngayxuathoadon, 'yyyy-mm-dd')
      hopdong.nkhd_ngayketthuc = hopdong.nkhd_ngayketthuc === null ? null : formatdate(hopdong.nkhd_ngayketthuc, 'yyyy-mm-dd')
      form.setFieldsValue(hopdong);
    }
  };
  handleOK = e => {
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
    this.setState({
      stateconfirmdelete: false
    })
  }
  showTotal = (total) => {
    return `Total ${total} items `;
  }
  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size
    });
    if (this.state.isSearch === 1) {
      this.handleSearch(this.state.page, this.state.searchText, this.confirm, this.state.nameSearch,
        this.state.codeSearch);
    }
    else {
      this.getHopdongs(this.state.page, this.state.index, this.state.sortBy)
    }
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
        if (this.state.isSearch === 1) {
          this.search(this.state.searchText)
        }
        else {
          this.getHopdongs(this.state.page)
        }
      },
    };
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
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
  onChangeClick_loaihopdong = (e) => {
    var label = e === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
    var api = e === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
    const { form } = this.formRef.props
    Request(api, 'post', null).then((res) => {
      this.setState({
        propDatasourceSelectLoaiHopDong: {
          label: label,
          dataSource: res.data,
          type: e
        }
      })
      form.setFieldsValue({
        nkhd_doituong: res.data[0].id
      })
    })
    this.setState({
      labelCombobox: label
    })
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
  clearChecked = () => {
    this.onSelectChange([], [])
  };
  onRowClick = (row) => {
    this.onSelectChange([row.nkhd_tutang], [row])
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
    var dateFormat = require('dateformat');
    if (token)
      return (
        <div>
          <Card className="hidden-action">
            <Row>
              <Col span={2}>
                <Tooltip title="Thêm Hợp Đồng">
                  <Button className="hidden-action" shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                    <Icon type="user-add" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Sửa Hợp Đồng">
                  <Button className="hidden-action" shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
                    <Icon type="edit" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Xóa Hợp Đồng">
                  <Popconfirm
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={this.deleteHopdong.bind(this, this.state.selectedId)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                    visible={this.state.stateconfirmdelete}
                  >
                    <Button className="hidden-action" shape="round" type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Tải Lại">
                  <Button className="hidden-action" shape="round" type="primary" size="default" onClick={this.refresh.bind(null)}>
                    <Icon type="reload" />
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Card>
          <Row style={{ marginTop: 5 }}>
            <FormModal
              wrappedComponentRef={ this.saveFormRef }
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.InsertOrUpdateHopdong}
              title={this.state.title}
              formtype={this.state.formtype}
              id_visible={this.state.id_visible}
              onchangeoption={this.onchangeoption}
              onChangeId={this.onchangeid}
              onChangeSelect={this.onChangeSelect}
              comboBoxDatasource={this.state.comboBoxDatasource}
              comboBoxDuanSource={this.state.comboBoxDuanSource}
              onChangeClick_loaihopdong={this.onChangeClick_loaihopdong}
              propDatasourceSelectLoaiHopDong={this.state.propDatasourceSelectLoaiHopDong}
              onChangeFile={this.onChangeFile}
              onChangeHandler={this.onChangeHandler}
              onchangpagefile={this.onchangpagefile}
              onClickDownloadFile={this.onClickDownloadFile}
            />
            <Table onRowClick={this.onRowClick}
             pagination={false} dataSource={this.state.hopdongs} 
             bordered='1' rowKey="nkhd_tutang" scroll={{ x: 1000 }}
             dataSource={this.state.hopdongs}
              expandedRowRender={(record, selectedRowKeys) => {
                return (
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ paddingTop: '10px', fontSize: '18px' }}> Ghi chú: </div>
                    <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].nkhd_ghichu}</Row>
                    <div style={{ paddingTop: '10px', fontSize: '18px' }}> Địa chỉ: </div>
                    <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].nkhd_diachi}</Row>
                    <div style={{ paddingTop: '10px', fontSize: '18px' }}> Loại hợp đồng: </div>
                    <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].ten_nkhd_loai}</Row>
                    <div style={{ paddingTop: '10px', fontSize: '18px' }}> Khách hàng: </div>
                    <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].ten_nkhd_doituong}</Row>
                    <div style={{ paddingTop: '10px', fontSize: '18px' }}> Trạng thái: </div>
                    <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].ten_nkhd_trangthai}</Row>
                  </div>
                )
              }}
            >
              <Column title="Tên dự án" dataIndex="dm_duan_ten" key="dm_duan_ten" onHeaderCell={this.onHeaderCell} style={{width: '70px'}} {...this.getColumnSearchProps('dm_duan_ten')}/>
              <Column title="Số hợp đồng" dataIndex="nkhd_so" key="nkhd_so" onHeaderCell={this.onHeaderCell} style={{width: '70px'}} {...this.getColumnSearchProps('nkhd_so')}/>
              <Column title="Công ty" dataIndex="nkhd_congty" key="nkhd_congty"
                onHeaderCell={this.onHeaderCell} style={{width: '70px'}} {...this.getColumnSearchProps('nkhd_congty')}
                />
              <Column title="Thời gian thực hiện" dataIndex="nkhd_thoigianthuchien" key="nkhd_thoigianthuchien" onHeaderCell={this.onHeaderCell} style={{width: '70px'}}
                render={
                  text => {
                    if (text === null)
                      return ' '
                    else
                      return text + ' ngày'
                  }}
                  {...this.getColumnSearchProps('nkhd_thoigianthuchien')}
              />
              <Column title="Ngày ký" dataIndex="nkhd_ngayky" key="nkhd_ngayky" width={150} render={
                text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }} onHeaderCell={this.onHeaderCell} {...this.getColumnSearchProps('nkhd_ngayky')}/>
              <Column title="Ngày thanh lý" dataIndex="nkhd_ngaythanhly" key="nkhd_ngaythanhly" width={150} render={
                text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }} onHeaderCell={this.onHeaderCell} {...this.getColumnSearchProps('nkhd_ngaythanhly')}/>
              <Column title="Ngày xuất hóa đơn" dataIndex="nkhd_ngayxuathoadon" key="nkhd_ngayxuathoadon" width={150} render={
                text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }} onHeaderCell={this.onHeaderCell} {...this.getColumnSearchProps('nkhd_ngayxuathoadon')}/>
              <Column title="Ngày thanh toán" dataIndex="nkhd_ngaythanhtoan" key="nkhd_ngaythanhtoan" width={150} render={
                text => {
                  if (text === null)
                    return ' '
                  else
                    return dateFormat(text, "dd/mm/yyyy")
                }} onHeaderCell={this.onHeaderCell} {...this.getColumnSearchProps('nkhd_ngaythanhtoan')}/>
              <Column title="Ngày nghiệm thu" dataIndex="nkhd_ngayketthuc" key="nkhd_ngayketthuc" width={150}
                render={
                  text => {
                    if (text === null)
                      return ' '
                    else
                      return dateFormat(text, "dd/mm/yyyy")
                  }}
                onHeaderCell={this.onHeaderCell} {...this.getColumnSearchProps('nkhd_ngayketthuc')}/>
              <Column title="Thời gian thực hiện" dataIndex="nkhd_thoigiancapnhat" key="nkhd_thoigiancapnhat" width={150}
              render={
                text => {
                  if (text === null)
                    return ' '
                  else
                  return dateFormat(text, "dd/mm/yyyy")
                }}
              onHeaderCell={this.onHeaderCell} style={{width: '70px'}} {...this.getColumnSearchProps('nkhd_thoigiancapnhat')}/>
              <Column title="Hành động" className="hidden-action" dataIndex="nkhd_action" key="nkhd_action" style={{width: '70px'}}
               render={
                text => {
                  if (text === 'INSERT')
                    return 'Thêm mới'
                  else
                    if(text === 'UPDATE')
                    return 'Sửa'
                    else
                    return 'Xóa'
                }}
              />
              <Column title="Hành động" dataIndex="ten_nkhd_action" key="ten_nkhd_action" style={{width: '70px'}}
              {...this.getColumnSearchProps('ten_nkhd_action')}/>
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
)(Hopdong);