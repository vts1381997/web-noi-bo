import React from 'react';
import { Tooltip, Pagination, Icon, Table, Input, Modal, Popconfirm, message, Button, Form, Row, Col, notification, Alert, Select, Badge, Tag, Card } from 'antd';
import { connect } from 'react-redux'
import { fetchUser } from '@actions/user.action';
import { fetchLoading } from '@actions/common.action';
const { Option } = Select

const Modal_Menus = Form.create({ name: 'from_in_modal_menus' })(
    class extends React.Component {
        render() {
            const { title, visible, onCancel, onSave, formtype, form, listmenu, id_visible } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    centered
                    title={title}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onSave}
                >
                    <Form layout={formtype}>
                        <Row>
                            <Col>
                                <div style={{ display: id_visible === true ? 'block' : 'none' }}>
                                    <Form.Item >
                                        {getFieldDecorator('dm_menu_id', {
                                        })(<Input type="number" hidden />)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Url:'>
                                    {getFieldDecorator('dm_menu_url', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(<Input type="text" size="small" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Name:'>
                                    {getFieldDecorator('dm_menu_name', {
                                        rules: [{ required: true, message: 'Vui lòng nhập vào ô này !!', }],
                                    })(
                                        <Input type="text" size="small" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Menu Parent:'>
                                    {getFieldDecorator('dm_menu_id_parent', {
                                    })(
                                        <Select
                                            size={"small"}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="notmenuparent">Do not have menu Parent</Option>
                                            {
                                                listmenu.map((data, index) => {
                                                    return <Option value={data.id} >{data.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>
                                <Form.Item label='Icon:'>
                                    {getFieldDecorator('dm_menu_icon_class', {

                                    })(
                                        <Select
                                            size={"small"}
                                        >
                                            <Option value="not icon">Do not use the icon</Option>
                                            <Option value="step-backward"> <Icon type="step-backward" />&emsp; step-backward </Option>
                                            <Option value="step-forward"> <Icon type="step-forward" />&emsp; step-forward </Option>
                                            <Option value="fast-backward"> <Icon type="fast-backward" />&emsp; fast-backward </Option>
                                            <Option value="fast-forward"> <Icon type="fast-forward" />&emsp; fast-forward </Option>
                                            <Option value="shrink"> <Icon type="shrink" />&emsp; shrink </Option>
                                            <Option value="arrows-alt"> <Icon type="arrows-alt" />&emsp; arrows-alt </Option>
                                            <Option value="down"> <Icon type="down" />&emsp; down </Option>
                                            <Option value="up"> <Icon type="up" />&emsp; up </Option>
                                            <Option value="left"> <Icon type="left" />&emsp; left </Option>
                                            <Option value="right"> <Icon type="right" />&emsp; right </Option>
                                            <Option value="caret-up"> <Icon type="caret-up" />&emsp; caret-up </Option>
                                            <Option value="caret-down"> <Icon type="caret-down" />&emsp; caret-down </Option>
                                            {/* {
                                                listmenu.map((data, index) => {
                                                    return <Option value={data.icon} > {data.icon} <Icon type={data.icon} /> </Option>
                                                })
                                            } */}
                                        </Select>
                                    )}
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
    (Modal_Menus)