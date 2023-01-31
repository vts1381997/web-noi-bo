import React from 'react';
import { Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import '../../index.css';
import { Value } from 'devextreme-react/range-selector';
class roleModal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        messageRequired: 'Trường này không được bỏ trống!',
        visible:false

      }
    } 
    render() {
      const { visible, form, confirmLoading, formtype,  } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="thông tin role"
          okText="Lưu"
          onCancel={this.props.roleCancel}
          onOk={this.props.roleOk.bind(this,form.getFieldsValue())}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <Form layout={formtype}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tên role">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: this.state.messageRequired, }],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thông tin">
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: this.state.messageRequired, }],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row> 
          </Form>
        </Modal>
      );
    }
  }
  const roleModal1 = Form.create({ name: 'role_modal' })(roleModal);
  export default roleModal1