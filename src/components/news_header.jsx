import React, {Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../images/logo.png'
import {
  Row,  // 行
  Col,  // 列
  Button,
  Icon,
  Menu,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from 'antd'

const MenuItem = Menu.Item
const TabPane = Tabs.TabPane
const FormItem = Form.Item

class NewsHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentKey: 'top', // 当前MenuItem的key
      username: null,  // 用户名
      modalShow: false //注册|登陆界面是否显示
    }
  }

  componentDidMount () {
    // 读取本地保存的用户数据, 如果有更新状态
    const username = localStorage.getItem('username')
    if(username) {
      this.setState({username})
    }
  }

  clickMenu = (event) => {

    // 如果点击的是注册菜单项
    if (event.key === 'register') {
      // 显示modal框
      this.setState({
        modalShow: true
      })
    }
    // 更新当前菜单项key
    this.setState({
      currentKey: event.key
    })
  }

  setModalVisible(isShow) {
    this.setState({
      modalShow: isShow
    })
  }

  handleSubmit (isRegist, event) {

    // 阻止默认行为
    event.preventDefault()

    const action = isRegist ? 'register' : 'login'
    // 得到所有表单数据的集合对象
    const formData = this.props.form.getFieldsValue()
    console.log(formData)
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}`
    if(isRegist) {
      const {r_userName, r_password, r_confirmPassword} = formData
      url +=  `&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    } else {
      const {username, password} = formData
      url +=  `&username=${username}&password=${password}`
    }
    console.log(url)
    // ajax请求注册/登陆
    axios.get(url)
      .then(response => {
        const result = response.data
        console.log(result, typeof result)
        if(isRegist) {
          if(result===true) {
            message.success('注册成功')
          } else {
            message.error('注册失败, 重新注册')
          }
        } else {
          if(result) {
            message.success('登陆成功')
            const userId = result.UserId
            const username = result.NickUserName
            // 更新状态
            this.setState({username})
            // 保存
            localStorage.setItem('userId', userId)
            localStorage.setItem('username', username)
          } else {
            message.error('登陆失败, 重新登陆')
          }
        }
      })

    // 关闭
    this.setState({modalShow: false})
  }

  handleLogout = () => {
    // 删除本地保存的用户信息
    localStorage.removeItem('userId')
    localStorage.removeItem('username')

    // 更新状态
    this.setState({
      username: null
    })
  }

  render() {
    const {modalShow, username, currentKey} = this.state

    const userShow = username ?
      (
        <MenuItem key="logout" className="register">
          <Button type="primary">{username}</Button>&nbsp;&nbsp;
          <Link to="/usercenter">
            <Button type="dashed">个人中心</Button>
          </Link>&nbsp;&nbsp;
          <Button onClick={this.handleLogout}>退出</Button>
        </MenuItem>
      )
      :
      (
        <MenuItem key="register" className="register">
          <Icon type="appstore"/> 登陆/注册
        </MenuItem>
      )

    const {getFieldDecorator} =  this.props.form

    return (
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" selectedKeys={[currentKey]} onClick={this.clickMenu}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>

              {userShow}
            </Menu>

            <Modal
              title="用户中心"
              visible={modalShow}
              onOk={this.setModalVisible.bind(this, false)}
              onCancel={this.setModalVisible.bind(this, false)}
              okText="关闭">
              <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                <TabPane tab="登陆" key="1">
                  <Form onSubmit={this.handleSubmit.bind(this, false)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('username')(<Input type="text" placeholder="请输入账号"/>)
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('password')(<Input type="password" placeholder="请输入密码"/>)
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">
                      登陆
                    </Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this, true)}>
                    <FormItem label="账户">
                      {
                        getFieldDecorator('r_userName')(
                          <Input type="text" placeholder="请输入账号" />
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('r_password')(
                          <Input type="password" placeholder="请输入密码" />
                        )
                      }
                    </FormItem>
                    <FormItem label="确认密码">
                      {
                        getFieldDecorator('r_confirmPassword')(
                          <Input type="password" placeholder="请再次输入您的密码" />
                        )
                      }
                    </FormItem>
                    <Button type="primary" htmlType='submit'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}

export default Form.create()(NewsHeader)