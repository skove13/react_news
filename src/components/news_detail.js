import React, {Component} from 'react'
import {
  Row,
  Col,
  BackTop
} from 'antd'
import axios from 'axios'

import NewsImageBlock from './news_image_block'
import NewsComments from './news_comments'

/**
 * 新闻详情组件
 */
export default class NewsDetail extends Component {

  constructor(props) {
    super(props)
    // 初始化数据
    this.state = {
      news: {}
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps() ', newProps)
    this.getNews(newProps)
  }

  componentDidMount() {
    this.getNews(this.props)
  }

  getNews = (props) => {
    const {uniquekey} = props.params
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data
        this.setState({news})
        document.title = news.title + " - React News | React 驱动的新闻平台";
      })
  }

  render() {
    const {pagecontent} = this.state.news

    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className="container">
            <div dangerouslySetInnerHTML={{__html: pagecontent}}/>
            <hr/>
            <NewsComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <NewsImageBlock count={40} type="top"
              cardWidth="100%" cardTitle="相关新闻" imageWidth="150px"/>
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop />
      </div>
    )
  }
}