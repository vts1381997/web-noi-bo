import { Tree } from 'antd';
import React from 'react';
import Request from '@apis/Request'
const { TreeNode } = Tree;

const menuData = [
  {
    title: 'ql user',
    key: 'user',
    children: [
      { title: 'a', key: 'b', children: [{ title: 'x', key: 'y' }] }
    ]
  }
]
const treeData = [

  {
    title: 'quản lý user',
    key: 'user',
    children: [
      { title: 'xem', key: 'USER.READ' },
      { title: 'thêm', key: 'USER.INSERT' },
      { title: 'sửa', key: 'USER.UPDATE' },
      { title: 'xóa', key: 'USER.DELETE' },
    ],
  },
  {
    title: 'quản lý vai trò',
    key: 'role',
    children: [
      { title: 'xem', key: 'ROLE.READ' },
      { title: 'thêm', key: 'ROLE.INSERT' },
      { title: 'sửa', key: 'ROLE.UPDATE' },
      { title: 'xóa', key: 'ROLE.DELETE' },
      { title: 'phân quyền', key: 'ROLE.PERMISISON' },
    ],
  },
  {
    title: 'hỗ trợ',
    key: 'hotro',
    children: [
      { title: 'xem', key: 'HOTRO.READ' },
      { title: 'thêm', key: 'HOTRO.INSERT' },
      { title: 'sửa', key: 'HOTRO.UPDATE' },
      { title: 'xóa', key: 'HOTRO.DELETE' },
    ],
  },
  {
    title: 'nhân sự',
    key: 'nhansu',
    children: [
      { title: 'xem', key: 'NHANSU.READ' },
      { title: 'thêm', key: 'NHANSU.INSERT' },
      { title: 'sửa', key: 'NHANSU.UPDATE' },
      { title: 'xóa', key: 'NHANSU.DELETE' },
    ],
  },
  {
    title: 'Địa bàn',
    key: 'diaban',
    children: [
      { title: 'xem', key: 'DIABAN.READ' },
      { title: 'thêm', key: 'DIABAN.INSERT' },
      { title: 'sửa', key: 'DIABAN.UPDATE' },
      { title: 'xóa', key: 'DIABAN.DELETE' },
    ],
  },
  {
    title: 'Dự án',
    key: 'duan',
    children: [
      { title: 'xem', key: 'DUAN.READ' },
      { title: 'thêm', key: 'DUAN.INSERT' },
      { title: 'sửa', key: 'DUAN.UPDATE' },
      { title: 'xóa', key: 'DUAN.DELETE' },
    ],
  },
  {
    title: 'Hợp đồng',
    key: 'hopdong',
    children: [
      { title: 'xem', key: 'HOPDONG.READ' },
      { title: 'thêm', key: 'HOPDONG.INSERT' },
      { title: 'sửa', key: 'HOPDONG.UPDATE' },
      { title: 'xóa', key: 'HOPDONG.DELETE' },
    ],
  },
  {
    title: 'Khách hàng',
    key: 'khachhang',
    children: [
      { title: 'xem', key: 'KHACHHANG.READ' },
      { title: 'thêm', key: 'KHACHHANG.INSERT' },
      { title: 'sửa', key: 'KHACHHANG.UPDATE' },
      { title: 'xóa', key: 'KHACHHANG.DELETE' },
    ],
  },

  {
    title: 'Đơn vị',
    key: 'donvi',
    children: [
      { title: 'xem', key: 'DONVI.READ' },
      { title: 'thêm', key: 'DONVI.INSERT' },
      { title: 'sửa', key: 'DONVI.UPDATE' },
      { title: 'xóa', key: 'DONVI.DELETE' },
    ],
  },
  {
    title: 'Hóa đơn',
    key: 'hoadon',
    children: [
      { title: 'xem', key: 'HOADON.READ' },
      { title: 'thêm', key: 'HOADON.INSERT' },
      { title: 'sửa', key: 'HOADON.UPDATE' },
      { title: 'xóa', key: 'HOADON.DELETE' },
    ],
  },
  {
    title: 'Tập tin',
    key: 'taptin',
    children: [
      { title: 'xem', key: 'TAPTIN.READ' },
      { title: 'thêm', key: 'TAPTIN.INSERT' },
      { title: 'sửa', key: 'TAPTIN.UPDATE' },
      { title: 'xóa', key: 'TAPTIN.DELETE' },
    ],
  },
  // {
  //   title: 'Phê Duyệt',
  //   key: 'approved',
  //   children: [
  //     { title: 'xem', key: 'PHEDUYET.READ' },
  //     { title: 'thêm', key: 'PHEDUYET.INSERT' },
  //     { title: 'sửa', key: 'PHEDUYET.UPDATE' },
  //     { title: 'xóa', key: 'PHEDUYET.DELETE' },
  //   ],
  // },
  {
    title: 'Phê duyệt',
    key: 'pheduyet',
    children: [
      { title: 'xem', key: 'PHEDUYET.READ' },
      { title: 'duyệt nửa ngày', key: 'PHEDUYET.DUYETNUA' },
      { title: 'duyệt nhiều', key: 'PHEDUYET.DUYETCA' },
    ],
  },
];

class Demo extends React.Component {

  state = {
    expandedKeys: ['user', 'role'],
    autoExpandParent: true,
    checkedKeys: this.props.dataTree,
    selectedKeys: [],
    pageNumber: 1,
    pageSize: 10,
    isSort: true,
    sortBy: 'ASC',
    index: 'dm_menu_id',
    datamenu:[]
  };

  onExpand = expandedKeys => {

    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  getState = () => {
    return this.state.checkedKeys;
  }
  onCheck = async checkedKeys => {
    await this.setState({ checkedKeys });
  };
  componentDidMount() {
    Request('menu/get', 'POST', {
      pageSize: this.state.pageSize,
      pageNumber: this.state.pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy
    }).then(res => {
      if(res.data.success){
        let datamenu = res.data.data.menus.map(function(valuee){
          return datamenu = {title:valuee.dm_menu_name,key:valuee.dm_menu_url}
        })
        this.setState({
          datamenu:datamenu
        })
      }
    })
  }
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataTree) {
      this.setState({
        checkedKeys: nextProps.dataTree
      })
    }
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <h2>Phân quyền chức năng</h2>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </div>
        <div style={{ marginLeft: '50px' }}>
          <h2>Phân quyền Menu</h2>
          <Tree
            checkable
          >
            {this.renderTreeNodes(this.state.datamenu)}
          </Tree>
        </div>
      </div>

    );
  }
}


export default Demo;