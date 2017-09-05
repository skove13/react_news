import React, {PropTypes} from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  notification
} from 'antd'
import axios from 'axios'
const FormItem = Form.Item

/**
 * 评论组件
 */
class NewsComments extends React.Component {

  static propTypes = {
    uniquekey: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    const {uniquekey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const comments = response.data
        this.setState({comments})
      })
  }

  handleSubmit(event) {
    event.preventDefault()

    const userId = localStorage.getItem('userId')
    if(!userId) {
      alert('请先登陆')
      return
    }
    const {comment} = this.props.form.getFieldsValue()
    const {uniquekey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=
                  ${userId}&uniquekey=${uniquekey}&commnet=${comment}`
    axios.get(url)
      .then(response => {
        this.componentDidMount()
        this.props.form.resetFields()
        notification.success({message: '提交成功!'})
      })
  }

  addUserCollection() {

    let userId = localStorage.getItem('userId')
    if(!userId) {
      alert('请先登陆')
      return
    }

    const url = "http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
      + userId + "&uniquekey=" + this.props.uniquekey

    axios.get(url)
      .then(response => {
        //收藏成功以后进行一下全局的提醒
        notification.success({message: 'ReactNews提醒', description: '收藏此文章成功'})
      })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {comments} = this.state
    const commentList = comments.length
      ? comments.map((comment, index) => (
      <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
        <p>{comment.Comments}</p>
      </Card>
    ))
      : '没有加载到任何评论'

    return (
      <div style={{padding: '10px'}}>
        {commentList}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label="您的评论">
            {
              getFieldDecorator('comment')(<Input type="textarea" placeholder="随便写点什么"/>)
            }
          </FormItem>
          <Button type='primary' htmlType="submit">提交评论</Button>
          &nbsp;&nbsp;
          <Button type='primary' htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
        </Form>
      </div>
    )
  }
}
export default Form.create({})(NewsComments)