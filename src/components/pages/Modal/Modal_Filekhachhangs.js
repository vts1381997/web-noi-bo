import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
const { Option } = Select


const Modal_Filekhachhangs = Form.create({ name: 'from_in_modal_file_khachhangs' })(
    class extends React.Component {
        render() {
            const { title, visible, onCancel, onSave, formtype, form, onChangeFile, onChangeHandler } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    centered
                    // title={title}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onSave}
                >
                    <Form layout={formtype}>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Tên File:'>
                                    {getFieldDecorator('file_tenfile', {
                                        // rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Input type="text" size="small" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Files:'>
                                    {getFieldDecorator('file_data', {
                                        // rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                        <div>
                                            <input type="file" name="file" 
                                            // onChange={onChangeFile}
                                            onChange={onChangeHandler}
                                            />
                                        </div>)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )
        }
    })

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps,
    {
        fetchUser,
        fetchLoading
    })
    (Modal_Filekhachhangs)