import React from "react";

import {
  Icon,
  Input,
  Popconfirm,
  message,
  Button,
  Form,
  Row,
  Col,
  notification,
  Alert,
  Select,
  Drawer,
  Dropdown,
  Menu
} from "antd";
import { connect } from "react-redux";
import Request from "@apis/Request";
import { async } from "q";
const _ = require("lodash");
const { Option } = Select;

const compareOperator = [
  { name: "Bằng", value: "=", icon: <Icon type="team" /> },
  { name: "Khác", value: "<>", icon: <Icon type="diff" /> },
  { name: "Lớn hơn", value: ">", icon: <Icon type="right" /> },
  { name: "Bé hơn", value: "<", icon: <Icon type="left" /> }
];
const text_conpare = 'text,date,datetime'
class Groupfilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Tìm kiếm nâng cao",
      visible: false,
      placement: "top",
      message_fail: "Điều kiện lọc không hợp",
      condition: [
        {
          key: 0,
          group_parent: "",
          keyCondition: 0,
          type: "gcd",
          level: 0,
          option: {
            value_type: this.props.columnFilter[0].type,
            column_name: this.props.columnFilter[0].column,
            match_logic: "and",
            match_compare: compareOperator[0].value
          },
          value: ""
        }
      ]
    };
  }
  onClose = () => {
    this.setState({
      visible: this.state.visible ? false : true,
      condition: [
        {
          key: 0,
          group_parent: "",
          keyCondition: 0,
          type: "gcd",
          level: 0,
          option: {
            value_type: this.props.columnFilter[0].type,
            column_name: this.props.columnFilter[0].column,
            match_logic: "and",
            match_compare: compareOperator[0].value
          },
          value: ""
        }
      ]
    });
  };
  showFilter = () => {
    this.setState({
      visible: true
    });
  };

  onSearch = async () => {
    var condition_lv_0 = this.state.condition[0]
    var condition = this.state.condition.slice(1);
    var level_max = 0;
    var has_condition = false;
    var all_success = true;
    for (var i = 0; i < condition.length; i++) {
      if ((condition[i].type === "cd") & (condition.value === '')) {
        all_success = false;
      }

      if (condition[i].type === "cd") {
        has_condition = true;
      }
      level_max = condition[i].level > level_max ? condition[i].level : level_max;
    }

    if (all_success & has_condition) {
      _.remove(condition, o => {
        return (o.level === level_max) & (o.type === "gcd");
      });
      var start = null;
      var next = null;
      var level = level_max;
      for (var j = 0; j < condition.length; j++) {
        if (condition[j].type === "cd") {
          var is_text = text_conpare.includes(condition[j].option.value_type) ? "'" : ' '
          condition[j].sql = '(' + condition[j].option.column_name + ' ' + condition[j].option.match_compare + ' ' + is_text + condition[j].value + is_text + ' )'
        }
      }
      var arr_condition_with_level = []
      for (var r = 0; r < condition.length; r++) {
        var in_level = false
        for (var x = 0; x < arr_condition_with_level.length; x++) {
          if (arr_condition_with_level[x].level === condition[r].level) {
            in_level = true
          }
        }


        if (in_level) {
          for (var y = 0; y < arr_condition_with_level.length; y++) {
            if (arr_condition_with_level[y].level === condition[r].level) {
              arr_condition_with_level[y].arrayCondition.push(condition[r])
            }
          }
        }
        else {
          arr_condition_with_level.push({ level: condition[r].level, arrayCondition: [condition[r]] })
        }
      }
      for (var z = 0; z < arr_condition_with_level.length; z++) {

        var arr_group_parent_in_level = []
        var str_sql = ''
        for (var n = 0; n < arr_condition_with_level[z].arrayCondition.length; n++) {
          var arr_has_key = false
          if (arr_condition_with_level[z].arrayCondition[n].type === 'cd') {
            for (var t = 0; t < arr_group_parent_in_level.length; t++) {
              if (arr_group_parent_in_level[t].group_parent === arr_condition_with_level[z].arrayCondition[n].group_parent) {
                arr_has_key = true
                break
              }
            }
            if (!arr_has_key) {
              arr_group_parent_in_level.push(arr_condition_with_level[z].arrayCondition[n])
            }
          }
        }
        for (var q = 0; q < arr_group_parent_in_level.length; q++) {
          var sql = ''
          var key_parent = ''
          for (var iq = 0; iq < arr_condition_with_level[z].arrayCondition.length; iq++) {
            if (arr_condition_with_level[z].arrayCondition[iq].group_parent === arr_group_parent_in_level[q].group_parent & arr_condition_with_level[z].arrayCondition[iq].type === 'cd') {
              var logic = sql === '' ? '' : ' needreplacewithlogicmatch '
              sql = sql + logic + arr_condition_with_level[z].arrayCondition[iq].sql
              key_parent = arr_group_parent_in_level[q].group_parent
            }
          }
          _.remove(arr_condition_with_level[z].arrayCondition, (o) => {
            return o.group_parent === key_parent & o.type === 'cd'
          })
          arr_condition_with_level[z].arrayCondition.push({
            group_parent: key_parent,
            sql: ' (' + sql + ') ',
            level: arr_condition_with_level[z].level,
            type: 'cd'
          })
        }
      }
      var first_for = false

      while (level > 0) {
        await this.addConditionFirst(arr_condition_with_level, level)
        first_for = await level === 1 ? true : false
        level = await level - 1
      }

      if (first_for) {
        var level_group = await level_max
        while (level_group > 0) {
          await this.addGConditionAndreplaceMatch(arr_condition_with_level, level_group, level_max, condition_lv_0)
          level_group = await level_group - 1
        }
      }
    } else {
      notification['error']({
        message: 'Có  lỗi xảy ra!',
        description: this.state.message_fail,
      });
    }
  };

  addConditionFirst = async (arr_condition_with_level, level) => {
    for (var dm = 0; dm < arr_condition_with_level.length; dm++) {
      if (arr_condition_with_level[dm].level === level) {
        for (var dmm = 0; dmm < arr_condition_with_level[dm].arrayCondition.length; dmm++) {
          if (arr_condition_with_level[dm].arrayCondition[dmm].type === 'cd') {
            if (arr_condition_with_level[level - 2] !== undefined) {
              await this.addConditionAndreplaceMatch(arr_condition_with_level, level, dmm, dm)
            }
          }
        }
        break;
      }
    }
  }

  addGConditionFirst = async (arr_condition_with_level, level_group, dmm, dm) => {
    for (var dmmm = 0; dmmm < arr_condition_with_level[level_group - 2].arrayCondition.length; await dmmm++) {
      if (arr_condition_with_level[level_group - 2].arrayCondition[dmmm].type === 'gcd'
        & arr_condition_with_level[level_group - 2].arrayCondition[dmmm].keyCondition === arr_condition_with_level[dm].arrayCondition[dmm].group_parent) {
        if (arr_condition_with_level[level_group - 2].arrayCondition[dmmm].sql !== undefined) {
          arr_condition_with_level[level_group - 2].arrayCondition[dmmm].sql = await arr_condition_with_level[level_group - 2].sql + ' ' + arr_condition_with_level[dm].arrayCondition[dmm].sql
        }
      }
    }
  }
  replaceMathlogic = (value, replace) => {
    value = value.replace(/needreplacewithlogicmatch/g, replace)
    return value
  }

  addConditionAndreplaceMatch = async (arr_condition_with_level, level, dmm, dm) => {
    for (var dmmm = 0; dmmm < arr_condition_with_level[level - 2].arrayCondition.length; await dmmm++) {
      if (arr_condition_with_level[level - 2].arrayCondition[dmmm].type === 'gcd'
        & arr_condition_with_level[level - 2].arrayCondition[dmmm].keyCondition === arr_condition_with_level[dm].arrayCondition[dmm].group_parent) {
        if (arr_condition_with_level[dm].arrayCondition[dmm].sql !== undefined) {
          arr_condition_with_level[level - 2].arrayCondition[dmmm].sql = await (arr_condition_with_level[level - 2].arrayCondition[dmmm].option.match_logic + ' ' + arr_condition_with_level[dm].arrayCondition[dmm].sql)
          arr_condition_with_level[level - 2].arrayCondition[dmmm].sql = await this.replaceMathlogic(arr_condition_with_level[level - 2].arrayCondition[dmmm].sql, arr_condition_with_level[level - 2].arrayCondition[dmmm].option.match_logic)
        }
      }
    }
  }

  addGConditionAndreplaceMatch = async (arr_condition_with_level, level_group, level_max, condition_lv_0) => {
    if (level_group !== level_max & level_group !== 1) {
      for (var dm = 0; dm < arr_condition_with_level.length; await dm++) {
        if (arr_condition_with_level[dm].level === level_group) {
          await this.addGConditionForSecond(arr_condition_with_level, level_group, dm, level_max)
          break;
        }
      }
    }



    if (level_group === 1) {
      var end_sql = ''
      var arr_cd = []
      var arr_gcd = []
      for (var cm = 0; cm < arr_condition_with_level[0].arrayCondition.length; await cm++) {

        if (arr_condition_with_level[0].arrayCondition[cm].type === 'cd') {
          arr_cd.push(arr_condition_with_level[0].arrayCondition[cm])
        }
        else {
          arr_gcd.push(arr_condition_with_level[0].arrayCondition[cm])
        }
      }
      for (var arr_cd_index = 0; arr_cd_index < arr_cd.length; arr_cd_index++) {
        if (end_sql === '') {
          end_sql = end_sql + arr_cd[arr_cd_index].sql
        }
        else {
          end_sql = end_sql + condition_lv_0.option.match_logic + arr_cd[arr_cd_index].sql
        }
      }
      end_sql = await end_sql === "" ? ' 1 = 1 ' : end_sql
      for (var arr_gcd_index = 0; arr_gcd_index < arr_gcd.length; arr_gcd_index++) {
        end_sql = end_sql + arr_gcd[arr_gcd_index].sql
      }
      end_sql = await this.replaceMathlogic(end_sql.replace('   ', ' ').replace('  ', ''), condition_lv_0.option.match_logic)
    }
  }

  addGConditionForSecond = async (arr_condition_with_level, level_group, dm, level_max) => {
    for (var dmm = 0; dmm < arr_condition_with_level[dm].arrayCondition.length; await dmm++) {
      if (arr_condition_with_level[dm].arrayCondition[dmm].type === 'gcd') {
        if (arr_condition_with_level[level_group - 2] !== undefined) {
          await this.addGConditionFirst(arr_condition_with_level, level_group, dmm, dm, level_max)
        }
      }
    }
  }
  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  addCondition = async (value, type) => {
    var condition = this.state.condition.sort(this.compareLevel);
    if (value.keyCondition === condition[condition.length - 1].keyCondition) {
      condition.push({
        key:
          Number(
            this.state.condition[Number(this.state.condition.length) - 1].key
          ) + 1,
        group_parent: value.keyCondition,
        keyCondition: Number(this.state.condition.length),
        type: type,
        name: "",
        level: value.level + 1,
        option: {
          value_type: this.props.columnFilter[0].type,
          column_name: this.props.columnFilter[0].column,
          match_logic: "and",
          match_compare: compareOperator[0].value
        },
        value: ""
      });
    } else {
      for (var i = 0; i < condition.length; i++) {
        if (Number(condition[i].keyCondition) > Number(value.keyCondition)) {
          condition[i].keyCondition = condition[i].keyCondition + 1;
        }
        if (Number(condition[i].group_parent) > Number(value.keyCondition)) {
          condition[i].group_parent = condition[i].group_parent + 1;
        }
      }
      condition.push({
        key:
          Number(
            this.state.condition[Number(this.state.condition.length) - 1].key
          ) + 1,
        group_parent: value.keyCondition,
        keyCondition: value.keyCondition + 1,
        type: type,
        name: "",
        level: value.level + 1,
        option: {
          value_type: this.props.columnFilter[0].type,
          column_name: this.props.columnFilter[0].column,
          match_logic: "and",
          match_compare: compareOperator[0].value
        },
        value: ""
      });
    }
    await this.setState({
      condition: []
    });
    this.setState({
      condition: condition
    });
  };
  compareLevel = (a, b) => {
    if (a.level < b.level) {
      return -1;
    }
    if (a.last_nom > b.last_nom) {
      return 1;
    }
    return 0;
  };
  compareGroup = (a, b) => {
    if (Number(a.group_parent) < Number(b.group_parent)) {
      return -1;
    }
    if (Number(a.group_parent) > Number(b.group_parent)) {
      return 1;
    }
    return 0;
  };
  comparekeyCondition = (a, b) => {
    if (Number(a.keyCondition) < Number(b.keyCondition)) {
      return -1;
    }
    if (Number(a.keyCondition) > Number(b.keyCondition)) {
      return 1;
    }
    return 0;
  };

  onDeleteCondition = async value => {
    var condition = this.state.condition;
    if (value.type === "cd") {
      _.remove(condition, o => {
        return o.keyCondition === value.keyCondition;
      });
      for (var i = 0; condition < condition.length; i++) {
        if (Number(condition[i].keyCondition) > Number(value.keyCondition)) {
          condition[i].keyCondition = condition[i].keyCondition - 1;
        }

        if (Number(condition[i].group_parent) > Number(value.keyCondition)) {
          condition[i].group_parent = condition[i].group_parent - 1;
        }
      }
    }

    if (value.type === "gcd") {
      var len_prop_remove = 0;
      var has_next = false;
      var keyCondition_next = false;
      var firstmap = false;

      condition.map((value_map_condition, index) => {
        if (
          (value_map_condition.level <= value.level) &
          (value_map_condition.keyCondition > value.keyCondition)
        ) {
          has_next = true;
        }
      });
      condition.map((map_get_group_next, index) => {
        if (
          (map_get_group_next.keyCondition > value.keyCondition) &
          (map_get_group_next.level <= value.level)
        ) {
          if (!firstmap) {
            keyCondition_next = map_get_group_next.keyCondition;
            firstmap = true;
          }
        }
      });
      if (has_next) {
        _.remove(condition, o => {
          len_prop_remove =
            (o.keyCondition >= value.keyCondition) &
              (o.keyCondition < keyCondition_next)
              ? len_prop_remove + 1
              : len_prop_remove;
          return (
            (o.keyCondition >= value.keyCondition) &
            (o.keyCondition < keyCondition_next)
          );
        });
      }

      if (!has_next) {
        _.remove(condition, o => {
          len_prop_remove =
            o.keyCondition >= value.keyCondition
              ? len_prop_remove + 1
              : len_prop_remove;
          return o.keyCondition >= value.keyCondition;
        });
      }

      for (var i = 0; condition < condition.length; i++) {
        if (Number(condition[i].keyCondition) > Number(value.keyCondition)) {
          condition[i].keyCondition =
            condition[i].keyCondition - len_prop_remove;
        }

        if (Number(condition[i].group_parent) > Number(value.keyCondition)) {
          condition[i].group_parent =
            condition[i].group_parent - len_prop_remove;
        }
      }
    }
    await this.setState({
      condition: []
    });
    this.setState({
      condition: condition
    });
  };

  renderColumnSelect = value => {
    const { columnFilter } = this.props;
    var itemColumnSelect = [];
    columnFilter.map((valuefil, index) => {
      itemColumnSelect.push(
        <Option value={valuefil.column + "@" + valuefil.type}>
          {" "}
          {valuefil.name}{" "}
        </Option>
      );
    });
    return (
      <Select
        className="select-filter filter-select-column"
        defaultValue={value.option.column_name + "@" + value.option.value_type}
        onChange={this.onChangeColumn.bind(this, value)}
      >
        {itemColumnSelect}
      </Select>
    );
  };
  renderCopareSelect = value => {
    var itemSelect = [];
    compareOperator.map((valueComp, index) => {
      itemSelect.push(
        <Option style={{ minWidth: "100px" }} value={valueComp.value}>
          {valueComp.name}
          <span style={{ float: "right" }}>{valueComp.icon}</span>
        </Option>
      );
    });

    return (
      <Select
        className="select-filter filter-select-compare"
        onChange={this.onChangeCompare.bind(this, value)}
        defaultValue={compareOperator[0].value}
      >
        {itemSelect}
      </Select>
    );
  };
  renderValueCompare = value => {
    return (
      <Input
        type={value.option.value_type}
        defaultValue={value.value}
        onBlur={this.onChangeValueCompare.bind(this, value)}
      />
    );
  };
  onChangeCompare = (value, e) => {
    var condition = this.state.condition;
    for (var i = 0; i < condition.length; i++) {
      if (condition[i].keyCondition === value.keyCondition) {
        condition[i].option.match_compare = e;
        break;
      }
    }
    this.setState({
      condition: condition
    });
  };
  onChangeColumn = async (value, e) => {
    var condition = this.state.condition;
    for (var i = 0; i < condition.length; i++) {
      if (condition[i].keyCondition === value.keyCondition) {
        condition[i].option.column_name = e.split("@")[0];
        condition[i].option.value_type = e.split("@")[1];
        break;
      }
    }
    await this.setState({ condition: [] })
    this.setState({
      condition: condition
    });
  };

  onChangeMatchLogic = (value, e) => {
    var condition = this.state.condition;
    for (var i = 0; i < condition.length; i++) {
      if (condition[i].keyCondition === value.keyCondition) {
        condition[i].option.match_logic = e;
        break;
      }
    }
    this.setState({
      condition: condition
    });
  };

  onChangeValueCompare = (value, e) => {
    var condition = this.state.condition;
    for (var i = 0; i < condition.length; i++) {
      if (condition[i].keyCondition === value.keyCondition) {
        condition[i].value = e.target.value;
        break;
      }
    }

    this.setState({
      condition: condition
    });
  };

  componentDidMount() { }

  render() {
    var arr_condition = this.state.condition;
    arr_condition.sort(this.comparekeyCondition);

    return (
      <div>
        <a href onClick={this.showFilter}>
          <Icon type="filter" />
          <span style={{ display: "inline-block", padding: "0px 10px" }}>
            {this.state.title}
          </span>
        </a>
        <Drawer
          title={this.state.tittle}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          height={window.innerHeight - 0.2 * window.innerHeight}
          width={window.innerWidth - 0.2 * window.innerWidth}
          className='drawer-filter'
        >
          <div>
            {arr_condition.map((value, index) => {
              const menu = (
                <Menu>
                  <Menu.Item key="0">
                    <a href onClick={this.addCondition.bind(this, value, "cd")}>
                      Điều kiện lọc{" "}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <a
                      href
                      onClick={this.addCondition.bind(this, value, "gcd")}
                    >
                      Nhóm điều kiện lọc{" "}
                    </a>
                  </Menu.Item>
                </Menu>
              );

              if (value.type === "gcd") {
                var deleteGroup = "";
                if (!!!_.isEqual(this.state.condition[0], value)) {
                  deleteGroup = (
                    <a
                      className="ant-dropdown-link"
                      href
                      onClick={this.onDeleteCondition.bind(this, value)}
                    >
                      <Icon type="close" style={{ lineHeight: "100%" }} />
                    </a>
                  );
                } else {
                  deleteGroup = "";
                }

                return (
                  <Row
                    gutter={24}
                    style={{
                      marginLeft: value.level * 30 + "px",
                      height: "15x"
                    }}
                    className="mg-bt-10"
                  >
                    <div className="filer-float-block">{deleteGroup}</div>

                    <div className="filer-float-block">
                      <Select
                        onChange={this.onChangeMatchLogic.bind(this, value)}
                        defaultValue={value.option.match_logic}
                        className="select-filter filter-select-logic"
                      >
                        <Option value="and">Và</Option>
                        <Option value="or">Hoặc</Option>
                      </Select>
                    </div>
                    <div className="filer-float-block">
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <a className="ant-dropdown-link" href>
                          <Icon type="plus" />
                        </a>
                      </Dropdown>
                    </div>
                  </Row>
                );
              }

              if (value.type === "cd") {
                return (
                  <Row
                    gutter={24}
                    style={{
                      marginLeft: value.level * 30 + "px",
                      height: "15x"
                    }}
                    className="mg-bt-10"
                  >
                    <div className="filter-column-grid">
                      <a
                        className="ant-dropdown-link"
                        href
                        onClick={this.onDeleteCondition.bind(this, value)}
                      >
                        <Icon type="close" style={{ lineHeight: "100%" }} />
                      </a>
                    </div>
                    <div className="filter-column-grid filter-condition-column">
                      {this.renderColumnSelect(value)}
                    </div>
                    <div className="filter-column-grid filter-condition-compare">
                      {this.renderCopareSelect(value)}
                    </div>
                    <div className="filter-column-grid filter-condition-value">
                      {this.renderValueCompare(value)}
                    </div>
                  </Row>
                );
              }
            })}
          </div>
          <div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e8e8e8",
                padding: "10px 16px",
                textAlign: "right",
                left: 0,
                background: "#fff",
                borderRadius: "0 0 4px 4px"
              }}
            >
              <Button
                style={{
                  marginRight: 8
                }}
                onClick={this.onClose}
              >
                Thoát
              </Button>
              <Button onClick={this.onSearch} type="primary">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  {}
)(Groupfilter);
