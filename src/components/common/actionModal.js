import React from 'react';
import { Pagination, Checkbox, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select } from 'antd';
// import ChildComp from './component/ChildComp';
import '../../index.css';
class ActionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageRequired: 'Trường này không được bỏ trống!',
            visible: false

        }
    }
    render() {
        const { visible, Data, form, title, confirmLoading, formtype } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="thông tin action"
                okText="Lưu"
                onCancel={this.props.actionCancel}
                onOk={this.props.actionOk.bind(this, form.getFieldsValue())}
                confirmLoading={confirmLoading}
                width={1000}
            >
                <Form layout={formtype}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Tên Action">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: this.state.messageRequired, }],
                                })(<Input type="text" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div style={{ display: 'none' }}>
                                <Form.Item label="id">
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: this.state.messageRequired, }],
                                    })(<Input type="text" />)}
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
const ActionModal1 = Form.create({ name: 'action_modal' })(ActionModal);
export default ActionModal1