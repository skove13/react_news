import React, {Component} from 'react'
import {
  Row,
  Col,
  Modal,
  Tabs,
  Icon,
  Card,
  Upload
} from 'antd'
import axios from 'axios'
const TabPane = Tabs.TabPane

/**
 * 用户个人中心组件
 */
class UserCenter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userCollections: [],
      userComments: [],
      preViewImage: '',
      previewVisible: false,
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }

  componentDidMount() {
    //获取用户收集列表数据
    const userId = localStorage.getItem('userId')
    let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + userId
    axios.get(url)
      .then(response=> {
        const userCollections = response.data
        this.setState({userCollections})
      })

    //获取用户评论列表数据
    url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + userId
    axios.get(url)
      .then(response => {
        const userComments = response.data
        this.setState({userComments})
      })
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => {
    console.log(fileList)
    this.setState({fileList})
  }

  render() {
    const {userCollections, userComments} = this.state

    const userCollectionsList = userCollections.length
      ? userCollections.map((uc, index) => (
      <Card key={index} title={uc.uniquekey}
            extra={<a href={`/#/news_detail/${uc.uniquekey}`}>查看</a>}>
        <p>{uc.Title}</p>
      </Card>
    ))
      : '您还没有收藏任何的新闻，去收藏一些新闻。'

    const userCommentsList = userComments.length
      ? userComments.map((comment, index)=>(
      <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
            extra={<a href={`/#/news_detail/${comment.uniquekey}`}>查看</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
      : '您还没有发表过任何评论。'

    const {previewVisible, previewImage, fileList} = this.state
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传照片</div>
      </div>
    )

    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                {userCollectionsList}
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                {userCommentsList}
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div>
                  <Upload
                    action="http://jsonplaceholder.typicode.com/photos"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="预览" style={{width: '100%'}} src={previewImage}/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

export default UserCenter