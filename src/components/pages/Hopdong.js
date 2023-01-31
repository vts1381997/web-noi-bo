import React from 'react';
import { Pagination, Card, Tooltip, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge } from 'antd';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import Permission from '../Authen/Permission';
import { connect } from 'react-redux';
import Request from '@apis/Request';
import '@styles/style.css';
import { fetchLoading } from '@actions/common.action';
import axios from 'axios';
function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}
const token = cookie.load('token');
const payload = jwt.decode(token);
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
      const { onChangeHandler, visible, id_visible, onCancel, onSave, form, title, confirmLoading, formtype, comboBoxDuanSource, comboBoxDatasource, onChangeClick_loaihopdong, propDatasourceSelectLoaiHopDong } = this.props;
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
          width={'80%'}
          centered
        >
          <Form layout={formtype} >
            <Row gutter={25}>
              <Col span={25}>
                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                  <Form.Item>
                    {getFieldDecorator('hd_id')(<Input type="number" disabled hidden />)}
                  </Form.Item>
                </div>
              </Col>
              {/* <Col span={0}>
                <Form.Item label="Id hợp đồng:" className="an">
                  {getFieldDecorator('hd_id', {
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col> */}
              {/* <Col span={0}>
                <Form.Item label="Id dự án:" className="an">
                  {getFieldDecorator('dm_duan_id', {
                  })(<Input type="number" size="small" />)}
                </Form.Item>
              </Col> */}
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
                        {combobox1}
                      </Select>
                    )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Loại hợp đồng:">
                  {getFieldDecorator('hd_loai', {
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
                  {getFieldDecorator('hd_doituong', {
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
                  {getFieldDecorator('hd_so', {
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Thời gian thực hiện(ngày):">
                  {getFieldDecorator('hd_thoigianthuchien', {
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
              <Col span={10}>
                <Form.Item label="Địa chỉ:">
                  {getFieldDecorator('hd_diachi', {
                  })(<Input type="text" size="small" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={4}>
                <Form.Item label="Công ty:">
                  {getFieldDecorator('hd_congty', {
                    initialValue: 'FSC'
                  })(
                    <Select size="small">
                      <Option value="FSC">FSC</Option>
                      <Option value="HCM">HCM</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Loại mua bán:">
                  {getFieldDecorator('hd_loaimuaban', {
                    initialValue: 'MV',
                  })(
                    <Select size="small">
                      <Option value="MV" >Mua vào</Option>
                      <Option value="BR" >Bán ra</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày ký hợp đồng:">
                  {getFieldDecorator('hd_ngayky', {
                  })(
                    <Input type="date" size="small" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày nghiệm thu:">
                  {getFieldDecorator('hd_ngayketthuc', {
                  })(<Input size={"small"} type="date" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Ngày thanh lý:">
                  {getFieldDecorator('hd_ngaythanhly', {
                  })(<Input type="date" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày xuất hóa đơn:">
                  {getFieldDecorator('hd_ngayxuathoadon', {
                  })(<Input type="date" size="small" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày thanh toán:">
                  {getFieldDecorator('hd_ngaythanhtoan', {
                  })(<Input type="date" size="small" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={8}>
                <Form.Item label="Trạng thái:">
                  {getFieldDecorator('hd_trangthai', {
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
              <Col span={8}>
                <Form.Item label="Tải file lên:">
                  {getFieldDecorator('hd_files', {
                  })(
                    <div>
                      {/* <label>Upload your file</label> */}
                      {/* <hr style={{ width: '0px' }} /> */}
                      <input type="file" name="file" id="file"
                        onChange={onChangeHandler}
                      />
                      {/* <hr style={{ width: '0px' }} /> */}
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={24}>
                <Form.Item label="Ghi chú:">
                  {getFieldDecorator('hd_ghichu', {
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
      timkiem: [],
      comboBoxDatasource: [],
      comboBoxDuanSource: [],
      propDatasourceSelectLoaiHopDong: {
        dataSource: [],
        label: 'Chọn khách hàng là đơn vị:',
        type: 'DV'
      }
    }
  }

  deleteHopdong = (hd_id) => {
    Request(`hopdong/delete`, 'DELETE', { hd_id: hd_id })
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
    Request('hopdong/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    })
      .then((response) => {
        if (response)
          this.setState({
            hopdongs: this.convertColumnSearch(response.data.data.hopdongs),
            count: Number(response.data.data.count)
          })
      })
    this.props.fetchLoading({
      loading: false
    })
  }

  handleSearch = (selectedKeys, value, confirm) => {
    let vl = { values: selectedKeys[0], keys: value }
    if (value && selectedKeys.length > 0) {
      this.state.timkiem.push(vl)
    }
    Request(`hopdong/search`, 'POST',
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
      })
        .then(res => {
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
        const urlFile = "http://103.74.122.80:5000/uploads/" + this.state.selectedFile.name;
        values.hd_files = urlFile
      }
      else {
        values.hd_files = " "
      }
      var url = this.state.action === 'insert' ? 'hopdong/insert' : 'hopdong/update'
      Request(url, 'POST', values)
        .then(async (response) => {
          this.setState({
            rowthotroselected: values
          })
          if (response.status === 200 & response.data.success === true) {
            form.resetFields();
            this.setState({
              visible: false,
              id_visible: false,
              selectedFile: null,
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
          await notification[notifi_type]({
            message: message,
            description: description
          })
          this.getHopdongs(this.state.page)
        })
    });
    //document.getElementById('inputFile').value = ""

  }

  refresh = (pageNumber) => {
    message.success('Tải lại thành công', 1);
    this.getHopdongs(this.state.pageNumber)
    this.setState({
      timkiem: []
    })
  }
  async componentDidMount() {
    await this.getHopdongs(this.state.pageNumber, this.state.index, this.state.sortBy);
    // document.getElementsByClassName('ant-table-expand-icon-th')[0].innerHTML = 'Thông tin liên quan'
    // document.getElementsByClassName('ant-table-expand-icon-th')[0].style.width = '85px'
  }

  onClickDownloadFile = (text) => {
    if (text === " " || text === "hd_files") {
      notification['error']({
        message: 'Lỗi',
        description: 'Hợp đồng này không có file'
      });
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
      hd_thoigianthuchien: value
    })
  }

  onChangeSelect = (value) => {
    const { form } = this.formRef.props
    form.setFieldsValue({
      hd_doituong: value
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
        hd_doituong: res.data[0].id
      })
    })
    Request('hopdong/getduan', 'POST', null).then(res => {
      this.setState({
        comboBoxDuanSource: res.data
      })
    })
    const { form } = this.formRef.props
    form.resetFields();
    this.setState({
      visible: true,
      id_visible: true,
      action: 'insert'
    });
    if (hopdong.hd_id !== undefined) {
      this.setState({
        visible: true,
        id_visible: true,
        action: 'update'
      })
      var label = hopdong.hd_loai === 'DV' ? 'Chọn khách hàng là đơn vị:' : 'Chọn khách hàng là cá nhân:'
      var api = hopdong.hd_loai === 'DV' ? 'hopdong/getdonvi' : 'hopdong/getkhachhang'
      const { form } = this.formRef.props
      Request(api, 'post', null).then((res) => {
        this.setState({
          propDatasourceSelectLoaiHopDong: {
            label: label,
            dataSource: res.data,
          }
        })
        form.setFieldsValue({
          hd_doituong: hopdong.hd_doituong
        })
      })
      this.setState({
        labelCombobox: label
      })
      hopdong.hd_ngayky = hopdong.hd_ngayky === null ? null : hopdong.hd_ngayky.split('/')[2] + "-" + hopdong.hd_ngayky.split('/')[1] + "-" + hopdong.hd_ngayky.split('/')[0]
      hopdong.hd_ngaythanhly = hopdong.hd_ngaythanhly === null ? null : hopdong.hd_ngaythanhly.split('/')[2] + "-" + hopdong.hd_ngaythanhly.split('/')[1] + "-" + hopdong.hd_ngaythanhly.split('/')[0]
      hopdong.hd_ngaythanhtoan = hopdong.hd_ngaythanhtoan === null ? null : hopdong.hd_ngaythanhtoan.split('/')[2] + "-" + hopdong.hd_ngaythanhtoan.split('/')[1] + "-" + hopdong.hd_ngaythanhtoan.split('/')[0]
      hopdong.hd_ngayxuathoadon = hopdong.hd_ngayxuathoadon === null ? null : hopdong.hd_ngayxuathoadon.split('/')[2] + "-" + hopdong.hd_ngayxuathoadon.split('/')[1] + "-" + hopdong.hd_ngayxuathoadon.split('/')[0]
      hopdong.hd_ngayketthuc = hopdong.hd_ngayketthuc === null ? null : hopdong.hd_ngayketthuc.split('/')[2] + "-" + hopdong.hd_ngayketthuc.split('/')[1] + "-" + hopdong.hd_ngayketthuc.split('/')[0]
      form.setFieldsValue(hopdong);
    }
    this.setState({
      selectedFile: null
    });
  };
  handleOK = e => {
    this.setState({
      visible: false,
      id_visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false,
      selectedFile: null,
      statebuttonedit: false
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
    // let fileList = event.target.files;
    // let file = fileList[0];
    // let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase(); 
    // if (extension === null){
    //   event.target.files.name = '';
    // }
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
        hd_doituong: res.data[0].id
      })
    })
    this.setState({
      labelCombobox: label
    })
  }
  checkDate = (check, text) => {
    if (check === 0) {
      return <a style={{ color: 'black' }}><Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
        {text}
      </Badge></a>
    }
    if (check === 1)
      return <Tooltip title="Cảnh báo hợp đồng sắp hết hạn"><Badge count={<Icon type="warning" style={{ color: '#f5222d' }} />}>
        {text}
      </Badge></Tooltip>
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
  }
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
  onRowClick = (row) => {
    if (row.hd_id == "hd_id") {
      this.onSelectChange([], [])
    }
    else
      if (this.state.selectedRowKeys[0] === row.hd_id) {
        this.onSelectChange([], [])
      }
      else {
        this.onSelectChange([row.hd_id], [row])
      }
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
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
  cancel = (e) => {
    this.setState({
      stateconfirmdelete: false
    })
  }
  handleSearchs = (nameSearch, e) => {

    if (e.target.value !== '') {
      let vl = { values: e.target.value, keys: nameSearch }
      var timkiem = this.state.timkiem
      timkiem = timkiem.push(vl)
      // this.setState({
      //     timkiem: timkiem
      // })
      Request(`hopdong/search`, 'POST',
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
            hopdongs: this.convertColumnSearch(res.data.data.hopdongs),
          })
        })
      this.setState({ searchText: e.target.value });
    }
  }
  render() {
    let claims = payload.claims;
    let canPermiss = claims.indexOf(Permission.Role.Permiss) >= 0;
    let canRead = claims.indexOf(Permission.User.Read) >= 0;
    let canUpdate = claims.indexOf(Permission.User.Update) >= 0;
    let canDelete = claims.indexOf(Permission.User.Delete) >= 0;
    let canCreate = claims.indexOf(Permission.User.Insert) >= 0;
    const { selectedRowKeys } = this.state
    //   const rowSelection = {
    //     type: 'radio',
    //     hideDefaultSelections: true,
    //     selectedRowKeys,
    //     onChange: this.onSelectChange,
    // };
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
          <Card>
            <Row>
              <Col span={2}>
                <Tooltip title="Thêm Hợp Đồng">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(null)}>
                    <Icon type="plus" />
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Sửa Hợp Đồng">
                  <Button shape="round" type="primary" size="default" onClick={this.showModal.bind(this, this.state.rowthotroselected)} disabled={this.state.statebuttonedit}>
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
                    okText="Xóa"
                    cancelText="Hủy"
                    disabled={this.state.statebuttondelete}
                  >
                    <Button shape="round" type="danger" style={{ marginLeft: '10px' }} size="default" onClick={this.checkStateConfirm} disabled={this.state.statebuttondelete} >
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Tải Lại">
                  <Button shape="round" type="primary" size="default" onClick={this.refresh.bind(null)}>
                    <Icon type="reload" />
                  </Button>
                </Tooltip>
              </Col>
              {/* <Col span={3}>
              <Tooltip title="Tải Xuống">
                      <Button shape="round" type="primary" disabled={this.state.statebuttonedit}
                      // onClick={this.onClickDownloadFile.bind(this, text)}
                      >
                        <Icon type="download" />
                      </Button>
                    </Tooltip>
              </Col> */}
            </Row>
          </Card>
          <Row style={{ marginTop: 5 }}>
            <FormModal
              wrappedComponentRef={this.saveFormRef}
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
            <Table rowSelection={rowSelection} onRowClick={this.onRowClick} pagination={false} dataSource={this.state.hopdongs} bordered="1" rowKey="hd_id" scroll={{ x: 1000 }}
            // expandedRowRender={(record, selectedRowKeys) => {
            //   return (
            //     <div style={{ textAlign: 'left' }}>
            //       <div style={{ paddingTop: '10px', fontSize: '18px' }}> Dự án: </div>
            //       <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].dm_duan_ten}</Row>
            //       <div style={{ paddingTop: '10px', fontSize: '18px' }}> Ghi chú: </div>
            //       <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].hd_ghichu}</Row>
            //       <div style={{ paddingTop: '10px', fontSize: '18px' }}> Loại hợp đồng: </div>
            //       <Row style={{ paddingTop: '7px' }}>{this.state.hopdongs[selectedRowKeys].ten_hd_loai}</Row>
            //     </div>
            //   )
            // }}
            >
              <Column title="Tên dự án" dataIndex="dm_duan_ten" key="dm_duan_ten" onHeaderCell={this.onHeaderCell}
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'dm_duan_ten' })
                }
              />
              <Column title="Tên khách hàng" dataIndex="ten_hd_doituong" key="ten_hd_doituong" onHeaderCell={this.onHeaderCell}
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'ten_hd_doituong' })
                }
                width={300}
              />
              <Column title="Loại hợp đồng" className="hidden-action" dataIndex="hd_loai" key="hd_loai" onHeaderCell={this.onHeaderCell} />
              <Column title="Tên đối tượng" className="hidden-action" dataIndex="hd_doituong" key="hd_doituong" onHeaderCell={this.onHeaderCell} />
              <Column title="Số hợp đồng" dataIndex="hd_so" key="hd_so"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_so' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Công ty" dataIndex="hd_congty" key="hd_congty"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_congty' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Thời gian thực hiện"
                dataIndex="hd_thoigianthuchienngay" key="hd_thoigianthuchienngay" onHeaderCell={this.onHeaderCell}
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_thoigianthuchienngay' })
                }
              />
              <Column title="Loại mua bán" className="hidden-action"
                dataIndex="ten_hd_loaimuaban" key="ten_hd_loaimuaban"
              />
              <Column title="Địa chỉ" className="hidden-action" dataIndex="hd_diachi" key="hd_diachi" onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày ký" dataIndex="hd_ngayky" key="hd_ngayky"
                className="hidden-action"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_ngayky' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày nghiệm thu"
                className="hidden-action"
                dataIndex="hd_ngayketthuc" key="hd_ngayketthuc"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_ngayketthuc' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày thanh lý"
                className="hidden-action"
                dataIndex="hd_ngaythanhly" key="hd_ngaythanhly"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_ngaythanhly' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày xuất hóa đơn"
                className="hidden-action"
                dataIndex="hd_ngayxuathoadon" key="hd_ngayxuathoadon"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_ngayxuathoadon' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Ngày thanh toán"
                className="hidden-action"
                dataIndex="hd_ngaythanhtoan" key="hd_ngaythanhtoan"
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'hd_ngaythanhtoan' })
                }
                onHeaderCell={this.onHeaderCell} />
              <Column title="Trạng thái" className="hidden-action" dataIndex="hd_trangthai" key="hd_trangthai" onHeaderCell={this.onHeaderCell} />
              <Column title="Trạng thái" dataIndex="ten_hd_trangthai" key="ten_hd_trangthai" onHeaderCell={this.onHeaderCell}
                render={
                  this.renderCell.bind(this, { type: 'text', name: 'ten_hd_trangthai' })
                }
              />
              <Column title="Ghi chú" dataIndex="hd_ghichu" key="hd_ghichu" className="hidden-action" onHeaderCell={this.onHeaderCell} />
              <Column title="Tải xuống"
                // className="hidden-action"
                dataIndex="hd_files" key="hd_files"
                render={(text) => (
                  <span>
                    <Tooltip title="Tải xuống">
                      <Button shape="round" type="primary" onClick={this.onClickDownloadFile.bind(this, text)}>
                        <Icon type="download" />
                      </Button>
                    </Tooltip>
                  </span>
                )}
              />
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