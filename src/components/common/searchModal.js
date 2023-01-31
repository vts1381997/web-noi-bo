import React from "react";
import {
  Icon,
  Input,
  Table,
  message,
  Button,
  Form,
  Row,
  Col,
  notification,
  Alert,
  Select,
} from "antd";
// import ChildComp from './component/ChildComp';
import "../../index.css";
let id = 0;
const { Search } = Input;

const { Column } = Table;
const { Option } = Select;
class SearchModal extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
    this.props.remove();
    this.props.callback("");
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...formItemLayout}
        label={index === 0 ? "" : ""}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
        })(
          <div>
            <Select
              defaultValue={this.props.col[0]}
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.props.onchangeSearch}
              // onFocus={this.onFocus}
              // onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.props.col.map((item, i) => {
                return <Option value={item}>{item}</Option>;
              })}
            </Select>
            &nbsp;
            <Search
              style={{ width: 300 }}
              placeholder="input search text"
              onChange={this.props.changesearch.bind(this)}
              onSearch={(value) => {
                this.props.callback(value);
              }}
              enterButton
            />
          </div>
        )}
        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ color: "red" }}>
            Click vào đây để Search
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SearchModall = Form.create({ name: "search_modal" })(SearchModal);
export default SearchModall;
