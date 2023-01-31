import React, { Component } from 'react';
import { Collapse, Tabs, Row, Table, Pagination } from 'antd';
import Request from '@apis/Request'
import cookie from 'react-cookies'
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Column } = Table;
var ten = cookie.load('user');
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            pageNumber: 1,
            page: 1,
            count1: 1,
            count2: 1,
            count3: 1,
            count4: 1,
            current: 1,
            isSort: true,
            sortBy: '',
            index: 'id',
            isSearch: 0,
        }
    }
    getNotification = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        Request('notification/get1', 'POST', { //nghi 1 hoac nhieu ngay + duoc phe duyet
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy,
            ten,
        }).then((response) => {
            if (response)
                this.setState({
                    notification: response.data.data.notification,
                    count1: Number(response.data.data.count)
                })
        })
    }
    getNotifications = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        Request('notification/get2', 'POST', { //nghi 1 hoac nhieu ngay + khong phe duyet
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy,
            ten,
        }).then((response) => {
            if (response)
                this.setState({
                    notifications: response.data.data.notification,
                    count2: Number(response.data.data.count)
                })
        })
    }
    getNotificationss = (pageNumber) => { //nghi nua ngay + duoc phe duyet
        if (pageNumber <= 0)
            return;
        Request('notification/get3', 'POST', { 
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy,
            ten,
        }).then((response) => {
            if (response)
                this.setState({
                    notificationss: response.data.data.notification,
                    count3: Number(response.data.data.count)
                })
        })
    }
    getNotificationsss = (pageNumber) => {
        if (pageNumber <= 0)
            return;
        Request('notification/get4', 'POST', { //nghi nua ngay + khong phe duyet
            pageSize: this.state.pageSize,
            pageNumber: pageNumber,
            index: this.state.index,
            sortBy: this.state.sortBy,
            ten,
        }).then((response) => {
            if (response)
                this.setState({
                    notificationsss: response.data.data.notification,
                    count4: Number(response.data.data.count)
                })
        })
    }
    handleCount = () => {
        let count1 = this.state.count1;
        let count2 = this.state.count2;
        let count3 = this.state.count3;
        let count4 = this.state.count4;
        this.setState({
            count1: count1 + 1,
            count2: count2 + 1,
            count3: count3 + 1,
            count4: count4 + 1,
        })
    }
    async componentDidMount() {
        await this.getNotification(this.state.pageNumber, this.state.index);
        await this.getNotifications(this.state.pageNumber, this.state.index);
        await this.getNotificationss(this.state.pageNumber, this.state.index);
        await this.getNotificationsss(this.state.pageNumber, this.state.index);
    }
    onchangpage1 = (page) => {
        this.setState({
            page: page
        })
        this.getNotification(page);
    }
    onchangpage2 = (page) => {
        this.setState({
            page: page
        })
        this.getNotifications(page);
    }
    onchangpage3 = (page) => {
        this.setState({
            page: page
        })
        this.getNotificationss(page);
    }
    onchangpage4 = (page) => {
        this.setState({
            page: page
        })
        this.getNotificationsss(page);
    }
    onShowSizeChange = async (current, size) => {
        await this.setState({
            pageSize: size
        });
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
                    this.getNotification(this.state.page)
                    this.getNotifications(this.state.page)
                    this.getNotificationss(this.state.page)
                    this.getNotificationsss(this.state.page)
                }
            },
        };
    }
    render() {
        return (
            <div>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Nghỉ 1 hoặc nhiều ngày" key="1">
                        <Tabs type="card">
                            <TabPane tab="Được phê duyệt" key="1">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.notification} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày bắt đầu" dataIndex="day_start" key="day_start" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày kết thúc" dataIndex="day_end" key="day_end" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage1} total={this.state.count1} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>          
                            <TabPane tab="Không được phê duyệt" key="2">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.notifications} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày bắt đầu" dataIndex="day_start" key="day_start" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày kết thúc" dataIndex="day_end" key="day_end" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage2} total={this.state.count2} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Panel>
                    <Panel header="Nghỉ nửa ngày" key="2">
                        <Tabs type="card">
                            <TabPane tab="Được phê duyệt" key="1">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.notificationss} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày nghỉ" dataIndex="date" key="date" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian nghỉ" dataIndex="day" key="day" onHeaderCell={this.onHeaderCell}
                                            render={text => {
                                                if (text === "sang")
                                                    return "Sáng"
                                                else
                                                    return "Chiều"
                                            }}
                                        />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage3} total={this.state.count3} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                            <TabPane tab="Không được phê duyệt" key="2">
                                <Row>
                                    <Table components={this.components} pagination={false} dataSource={this.state.notificationsss} bordered rowKey="id">
                                        <Column title="Tên" dataIndex="name" key="name" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian đăng ký" dataIndex="registration_time" key="registration_time" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Ngày nghỉ" dataIndex="date" key="date" onHeaderCell={this.onHeaderCell} />
                                        <Column title="Thời gian nghỉ" dataIndex="day" key="day" onHeaderCell={this.onHeaderCell}
                                            render={text => {
                                                if (text === "sang")
                                                    return "Sáng"
                                                else
                                                    return "Chiều"
                                            }}
                                        />
                                        <Column title="Lý do" dataIndex="reason" key="reason" onHeaderCell={this.onHeaderCell} />
                                    </Table>
                                </Row>
                                <Row>
                                    <Pagination onChange={this.onchangpage4} total={this.state.count4} showSizeChanger onShowSizeChange={this.onShowSizeChange} showQuickJumper />
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default Notification;