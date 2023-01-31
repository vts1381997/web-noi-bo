import React, { Component } from 'react'
import { Layout, Button, Icon, Dropdown, Menu, Col, Tooltip, Divider, Row, Avatar, Badge, notification, Tabs } from 'antd'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import Request from '@apis/Request'
import Modal_Hotro from '@pages/Modal/Modal_Hotro.js'
import { NavLink } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import io from 'socket.io-client';
const { Header } = Layout
const { TabPane } = Tabs
var socket = io('http://103.74.122.80:6969');
// var socket = io('fscvn.ddns.net:6969');
// var socket = io('localhost:6969');
var format = require('dateformat')
const menu = (
  <Menu >
    <Menu.Item key="3">Đã xem</Menu.Item>
    <Menu.Item key="4">Xóa thông báo</Menu.Item>
  </Menu>
)
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
      },
    ],
  },
]
class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      collapsed: props.collapsed,
      name: null,
      visible: false,
      id_duanfillmodal: [],
      nhansu: [],
      khachhang: [],
      donvis: [],
      date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</a>,
      trangthaibutton: false,
      valueRate: 3,
      address: '',
      countBadge: 0,
      menuThongbao: null,
      noidung: 'có nội dung',
      noidungdadoc: [],
      thongbao: [],
      hotrobyid: [],
      idlink: '',
      visibleDropdown: false,
    }
  }

  getName = (user_cookie) => {
    Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
      if (res) {
        if (res.data.data.name[0] === undefined) {
          this.setState({
            name: 'Chưa tạo nhân sự'
          })
        }
        else {
          var tenNguoiDung = "";
          if (res.data.data.name[0].ns_tenlot !== "") {
            tenNguoiDung = res.data.data.name[0].ns_ho.trim() + " " + res.data.data.name[0].ns_tenlot.trim() + " " + res.data.data.name[0].ns_ten.trim()
          }
          else {
            tenNguoiDung = res.data.data.name[0].ns_ho.trim() + " " + res.data.data.name[0].ns_ten.trim()
          }
          localStorage.setItem("tenNguoiDung", tenNguoiDung);
          localStorage.setItem("nguoiGui", user_cookie);
          localStorage.setItem("urlAvatar", res.data.data.name[0].ns_address)
          this.setState({
            name: tenNguoiDung,
            address: res.data.data.name[0].ns_address
          })
        }
      }
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      id_visible: false
    });
  };

  insertOrUpdate = async () => {
    const { form } = await this.formRef.props;
    await form.validateFields((err, values) => {
      if (err) {
        return
      }
      var url = 'hotro/insert'
      if (url === 'hotro/update') {
        let user_cookie = cookie.load('user');
        values.ns_id_capnhat = user_cookie
        values.nkht_thoigiancapnhat = new Date()
      }
      if (values.ht_thoigian_dukien_hoanthanh === null || values.ht_thoigian_dukien_hoanthanh === undefined) {
        values.ht_thoigian_dukien_hoanthanh = format(new Date(), 'yyyy-mm-dd')
      } 
      Request(url, 'POST', values).then(async (response) => {
        var thongbao = {}
        thongbao.tb_thoigiantao = format(new Date(), 'dd-mm-yyyy - HH:MM:ss')
        thongbao.tb_noidung = localStorage.getItem("tenNguoiDung") + ' đã tạo công việc và gán cho bạn vào lúc ' + thongbao.tb_thoigiantao
        thongbao.tb_trangthai = 'chuadoc'
        thongbao.tb_ns_id = values.ns_id_ass
        thongbao.tb_ht_id = response.data.ht_id
        thongbao.tb_link = 'link'
        Request('thongbao/insert', 'POST', thongbao).then((res) => {
        })
        if (response.status === 200 & response.data.success === true) {
          form.resetFields();
          this.setState({
            visible: false,
            message: response.data.message
          })
          this.clientSendUsername('data')
        }
        var description = response.data.message
        var notifi_type = 'success'
        var message = 'Thành Công'
        if (await !!!response.data.success) {
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
        this.props.getNhansu
        setTimeout(() => {
          window.location.reload()
        }, 50);
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  onTodoChange = async (value) => {
    const { form } = this.formRef.props
    if (value === "daxong") {
      await this.setState({
        date: format(new Date(), "dd / mm / yyyy -- HH : MM : ss"),
        trangthai: true
      })
      form.setFieldsValue({ ht_thoigian_hoanthanh: format(new Date(), "yyyy-mm-dd") })
      form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: format(new Date(), "yyyy-mm-dd") })
    }
    else {
      await this.setState({
        date: <a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</a>,
        trangthai: false
      })
      form.setFieldsValue({ ht_thoigian_hoanthanh: null })
    }
  }

  changeButton = (value) => {
    if (value !== "9298eb00-a6d9-11e9-bd04-0986e022adbf")
      this.setState({
        trangthaibutton: false
      })
    else
      this.setState({
        trangthaibutton: true
      })
  }

  Assignme = () => {
    var user_cookie = cookie.load('user');
    Request('hotro/getname', 'POST', { user_cookie }).then((res) => {
      if (res) {
        if (res.data.data.name[0] === undefined) {
          this.setState({
            trangthaibutton: true
          })
        }
        else {
          var ns_id = res.data.data.name[0].ns_id
          const { form } = this.formRef.props
          form.setFieldsValue({ ns_id_ass: ns_id })
          this.setState({
            trangthaibutton: true
          })
        }
      }
    })
  }

  renderMenuUser = () => {
    return (
      <Menu style={{ width: '140px' }}>
        <Menu.Item key="0">
          <a href="/viewprofile"> <Icon type="user" /> <span style={{ marginLeft: '5px' }}> View Profile </span></a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/changepassword"> <Icon type="edit" /> <span style={{ marginLeft: '5px' }}> Đổi mật khẩu </span></a>
        </Menu.Item>
        <Divider style={{ marginTop: '5px', marginBottom: '5px' }} />
        <Menu.Item key="2">
          <a onClick={this.logOut} href="/" style={{ color: 'red' }}> <Icon type="logout" /> <span style={{ marginLeft: '5px' }}>Đăng xuất</span></a>
        </Menu.Item>
      </Menu>
    );
  }

  onClickThongbao = (value) => {
    var key = value.key
    var user_cookie = cookie.load('user');
    this.getThongbao(user_cookie)
    Request('thongbao/update', 'POST', { key }).then((response) => {
    })
    this.getThongbao(user_cookie)
  }

  onClick = (x) => {
  }

  callback = (key) => {
    var user_cookie = cookie.load('user');
    if (key == "dadoc") {
      Request('thongbao/getdadoc', 'POST', { tb_ns_id: user_cookie }).then((res) => {
        if (res) {
          var noidungdadoc = []
          res.data.data.thongbaodadoc.map((value, index) => {
            noidungdadoc.push({ noidungdadoc: value.tb_noidung, ht_id: value.tb_ht_id, tb_id: value.tb_id })
          })
          this.setState({
            noidungdadoc: noidungdadoc
          })
        }
      })
    }
  }

  onClickThongbaoTatcaDadoc = () => {
    Request('thongbao/updatetatcadadoc', 'POST', {}).then((response) => {
      this.setState({
        countBadge: 0
      })
      notification[response.data.success === true ? 'success' : 'error']({
        message: 'Thông báo',
        description: 'Đã cập nhật thông báo'
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  onClickXoachuadoc = () => {
    Request(`thongbao/delete`, 'DELETE', { trangthai: 'chuadoc' }).then((res) => {
      this.setState({
        countBadge: 0
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  renderMenuThongbao = () => {
    return (
      <Row style={{ width: '540px' }}>
        <span style={{ fontSize: '16px', fontFamily: 'initial', textAlign: 'center', marginLeft: '15px' }}>Thông báo</span>
        <Tabs style={{ margin: '0px' }} size='small' onChange={(e) => this.callback(e)}>
          <TabPane key={'chuadoc'} tab={<span style={{ fontSize: '14px', fontFamily: 'initial' }}>Chưa đọc</span>} >
            <div style={{ borderBottom: '1px solid gray', padding: '0px !important' }}>
              <span style={{ marginLeft: '5px' }}>Thông báo chưa đọc</span>
              <a className='hoverthongbao' style={{ marginLeft: '25%', marginRight: '2%' }} onClick={this.onClickThongbaoTatcaDadoc}> Đánh dấu tất cả là đã đọc</a><span style={{ marginRight: '2px' }}></span>
              <a className='hoverthongbao' onClick={this.onClickXoachuadoc}> Xóa tất cả</a></div>
            <div className="demo-infinite-container" style={{ padding: '0px' }}>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                useWindow={false}
              >
                {this.state.countBadge === 0 ? <span style={{ textAlign: 'center', display: 'block', margin: '10px' }}>Không có thông báo</span> :
                  <Menu
                    onClick={this.onClickThongbao}
                  >
                    {
                      this.state.noidung.map((value, index) => {
                        var link = "/search"
                        return (
                          <Menu.Item key={value.tb_id} style={{ borderBottom: '1px solid #dddfe2' }}
                          >
                            <NavLink to={link} style={{ display: 'inline' }}>
                              <Avatar src={this.state.address} style={{ fontSize: '20px', backgroundColor: 'orange', marginRight: '5px ' }} />
                              {value.noidung}
                            </NavLink >
                          </Menu.Item>
                        )
                      })
                    }
                  </Menu>
                }
              </InfiniteScroll>
            </div>
            <a className='hoverthongbao' style={{ fontSize: '16px', fontFamily: 'initial', textAlign: 'center', display: 'block' }}>Xem thêm thông báo ...</a>
          </TabPane>
          <TabPane key={'dadoc'} tab={<span style={{ fontSize: '14px', fontFamily: 'initial' }}>Đã đọc</span>}>
            <div style={{ borderBottom: '1px solid gray', padding: '0px !important' }}>
              <span style={{ marginLeft: '5px' }}>Thông báo đã đọc</span>
            </div>
            {this.state.noidungdadoc.length === 0 ? <span style={{ textAlign: 'center', display: 'block', margin: '10px' }}>Không có thông báo</span> :
              <Menu>
                {
                  this.state.noidungdadoc.map((value, index) => {
                    var link = "/search"
                    return (
                      <Menu.Item key={value.tb_id} style={{ borderBottom: '1px solid #dddfe2' }}
                      >
                        <NavLink to={link} style={{ display: 'inline' }}>
                          <Avatar src={this.state.address} style={{ fontSize: '20px', backgroundColor: 'orange', marginRight: '5px ' }} />
                          {value.noidungdadoc}
                        </NavLink >
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
            }
          </TabPane>
        </Tabs>
      </Row>
    )
  }

  toggleCollapsed = (e) => {
    this.props.OnCollapsed(!this.state.collapsed)
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logOut = (e) => {
    cookie.remove('token', { path: '/' })
    cookie.remove('user', this.state.username)
    window.location.reload();
    localStorage.clear();
  }

  async componentDidMount() {
    var that = this
    var user_cookie = cookie.load('user');
    await this.getThongbao(user_cookie)
    await this.getThongbaoDadoc(user_cookie)
    await this.setState({
      menu: this.renderMenuUser,
      menuThongbao: this.renderMenuThongbao
    })
    this.getName(user_cookie)
    socket.on("server-send-thongbao", function (data) {
      that.getThongbao(user_cookie)
    })

  }

  set_Select_KhachHang(dv) {
    if (dv === null) {
      dv = ""
    }
    Request('hotro/getkhachhangwhere', 'POST', { dv }).then((res) => {
      if (res.data.data.khachhangs) {
        this.setState({
          khachhang: res.data.data.khachhangs
        })
      }
    })
  }

  set_Select_id_duan() {
    Request('hotro/getidduan', 'POST', {}).then((res) => {
      if (res.data.data.duans) {
        this.setState({
          id_duanfillmodal: res.data.data.duans
        })
      }
    })
  }

  set_Select_NhanSu() {
    Request('hotro/getnhansu', 'POST', {}).then((res) => {
      if (res.data.data.nhansu) {
        this.setState({
          nhansu: res.data.data.nhansu
        })
      }
    })
  }

  set_Select_DonVi() {
    Request('hotro/getdonvi', 'POST', {}).then((res) => {
      if (res.data.data.donvis) {
        this.setState({
          donvis: res.data.data.donvis
        })
      }
    })
  }

  showModal = async () => {
    const { form } = this.formRef.props
    await this.setState({
      visible: true
    });
    form.setFieldsValue({ ht_thoigiantiepnhan: format(new Date(), "yyyy-mm-dd") });
    form.setFieldsValue({ ht_thoigian_dukien_hoanthanh: format(new Date(), "yyyy-mm-dd") });
    var user_cookie = await cookie.load('user');
    await form.setFieldsValue({ ns_id_nguoitao: user_cookie })
    this.set_Select_id_duan();
    this.set_Select_NhanSu();
    this.set_Select_KhachHang(null);
    this.set_Select_DonVi();
    this.Assignme();
  }

  handleChangeRate = valueRate => {
    const { form } = this.formRef.props
    form.setFieldsValue({ ht_vote: valueRate })
    this.setState({ valueRate });
  }

  getThongbao = (tb_ns_id) => {
    Request('thongbao/get', 'POST', { tb_ns_id }).then((res) => {
      if (res.data.success == true) {
        this.setState({
          countBadge: res.data.data.thongbao.length,
          thongbao: res.data.data.thongbao
        })
        var noidung = []
        res.data.data.thongbao.map((value, index) => {
          noidung.push({ noidung: value.tb_noidung, ht_id: value.tb_ht_id, tb_id: value.tb_id })
        })
        this.setState({
          noidung: noidung
        })
      }
    })
  }

  getThongbaoDadoc = (tb_ns_id) => {
    Request('thongbao/getdadoc', 'POST', { tb_ns_id }).then((res) => {
      if (res) {
        var noidungdadoc = []
        res.data.data.thongbaodadoc.map((value, index) => {
          noidungdadoc.push({ noidungdadoc: value.tb_noidung, ht_id: value.tb_ht_id, tb_id: value.tb_id })
        })
        this.setState({
          noidungdadoc: noidungdadoc
        })
      }
    })
  }

  handleVisibleChange = flag => {
    this.setState({ visibleDropdown: flag });
  }

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visibleDropdown: false });
    }
  }

  clientSendUsername = (tempValue) => {
    socket.emit("user-send-thongbao", tempValue);
  }

  render() {
    let token = cookie.load('token')
    let payload = jwt.decode(token);
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Button type="dashed" onClick={this.toggleCollapsed} style={{ marginLeft: 12 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Tooltip title='Tạo nhanh công việc'>
            <Button style={{ marginLeft: '65%' }} onClick={this.showModal.bind(this)}><Icon type="plus" /></Button>
          </Tooltip>
          <Tooltip title='Thông báo'>
            <Dropdown
              overlay={this.state.menuThongbao}
              trigger={['click']}
              visible={this.state.visibleDropdown}
              onVisibleChange={this.handleVisibleChange}
            >
              <Badge count={this.state.countBadge} style={{ fontSize: '12 px', margin: '20px' }}>
                <a><Icon type="bell" style={{ fontSize: '25px', margin: '20px' }} /></a>
              </Badge>
            </Dropdown>
          </Tooltip>
          <Dropdown overlay={this.state.menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="/">
              <Avatar src={this.state.address} style={{ fontSize: '20px', backgroundColor: 'orange' }} />
              <Tooltip title="Tên tài khoản">
                <span style={{ fontSize: '16px' }}> {this.state.name} </span>
              </Tooltip>
            </a>
          </Dropdown>
        </Header>
        <Modal_Hotro
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSave={this.insertOrUpdate}
          setidduan={this.state.id_duanfillmodal}
          setNhansu={this.state.nhansu}
          setKhachHang={this.state.khachhang}
          setDonVi={this.state.donvis}
          onTodoChange={this.onTodoChange}
          date={this.state.date}
          assignme={this.Assignme}
          trangthaibutton={this.state.trangthaibutton}
          changeButton={this.changeButton}
          set_Select_KhachHang={this.set_Select_KhachHang.bind(this)}
          handleChangeRate={this.handleChangeRate}
          valueRate={this.state.valueRate}
        />
      </div>
    )
  }
}

export default AppHeader
