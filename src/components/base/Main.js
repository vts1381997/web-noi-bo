import React from 'react'
import moment from 'moment';
import vi_VN from 'antd/lib/locale-provider/vi_VN'
import 'moment/locale/vi';
import { Upload, Button, Icon } from 'antd';
import { Layout } from 'antd';
import { LocaleProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppSider from '@components/base/AppSider'
import AppHeader from '@components/base/AppHeader'
import AppFooter from '@components/base/AppFooter'
import Loading from '@components/base/Loading'
import routers from '@configs/router.config'
import { connect } from 'react-redux'
//import { Value } from 'devextreme-react/range-selector';
import { fetchLoading } from '@actions/common.action';
//import App from '@src/App';

moment.locale('fr');

const { Content } = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routers: null,
      collapsed: false,
    };
  }

  renderRouter = (e) => {
    return this.setState({
      routers: (
        <Switch>
          {
            routers.map((v, i) => {
              if (v.path === '/') {
                return <Route path={v.path} component={v.component} exact />
              }
              return <Route path={v.path} component={v.component} exact  />
            })
          }
        </Switch>
      )
    })
  }

  ChangeCollapsed = (collapsed) => {
    this.setState({
      collapsed: collapsed
    })
  }

  componentDidMount() {
    this.renderRouter()
  }
  render() {
    return (
      <Router>
        <LocaleProvider locale={vi_VN}>
          <Layout>

            {/* leftmenu */}
            <AppSider collapsed={this.state.collapsed} />
            {/* leftmenu */}
            
            <Layout>
              {/* header */}
              <AppHeader OnCollapsed={this.ChangeCollapsed} collapsed={this.state.collapsed} />
              {/* header */}
              
              <Content
                style={{
                  margin: '8px',
                  padding: 8,
                  background: '#fff',
                  minHeight: 580,
                }}
              >
                {
                  this.state.routers
                }
              </Content>
              {/* footer */}
              <AppFooter></AppFooter>
              {/* footer */}
            </Layout>
            <Loading loading={this.props.todoCommon.loading} />
          </Layout>
        </LocaleProvider>

      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps,
  {
    fetchLoading
  }
)(Main)