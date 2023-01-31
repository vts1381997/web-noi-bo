import React from 'react';
import { Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Divider } from 'antd';
// import ChildComp from './component/ChildComp';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Login from '@components/Authen/Login'
import Request from '@apis/Request'
// import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
// import CreateModalCustomer from '@pages/Modal/CreateModalCustomer';
import { async } from 'q';

// import { async } from 'q';
const token = cookie.load('token');
const { Column } = Table;
const { Option } = Select
const { Search } = Input;
const Modal_Duan = Form.create({ name: 'form_in_modal_duan' })(
  class extends React.Component {
    render() {
      const { onOk_duan, visible, onCancel, onSave, Data, form, title, confirmLoading, formtype, id_visible, select_qtda } = this.props;
      const { getFieldDecorator } = form;
      var first_qtda = null;
      if (select_qtda.length !== 0) {
        first_qtda = select_qtda[0].ns_id
      }
      return (
        <Modal
          visible={visible}
          title="Nhập thông tin cho dự án"
          okText="Lưu"
          onCancel={onCancel}
          onOk={onOk_duan}
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
                  })(<Input type="text" placeholder="Tên dự án" />)}
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
const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps,
  {
    //   fetchUser,
    fetchLoading
  })
  (Modal_Duan);  