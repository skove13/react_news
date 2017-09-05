import React from 'react'
import {
  Card
} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

/**
 * 图片新闻列表组件
 */
export default class NewsImageBlock extends React.Component {

  static propTypes = {
    type: React.PropTypes.string.isRequired, // 类型
    count: React.PropTypes.number.isRequired, // 数量
    cardTitle: React.PropTypes.string.isRequired, // card名称
    cardWidth: React.PropTypes.string.isRequired, // card宽度
    imageWidth: React.PropTypes.string.isRequired, // 图片宽度
  }

  constructor() {
    super()
    this.state = {
      newsArr: []
    }
  }

  componentDidMount() {
    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newsArr = response.data
        this.setState({newsArr})
      })
  }

  render() {

    const {cardTitle, cardWidth, imageWidth} = this.props
    const {newsArr} = this.state
    // 图片样式对象
    const imageStyle = {
      width: imageWidth,
      height: "90px",
      display: 'block'
    }
    // 标题样式对象
    const titleStyle = {
      width: imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }

    const newsList = newsArr.length
      ? newsArr.map((news, index) => (
          <div key={index} className="imageblock">
            <Link to={`detail/${news.uniquekey}`}>
              <div>
                <img src={news.thumbnail_pic_s} alt="" style={imageStyle}/>
              </div>
              <div className="custom-card">
                <h3 style={titleStyle}>{news.title}</h3>
                <p>{news.author_name}</p>
              </div>
            </Link>
          </div>
        ))
      : '没有任何新闻'
    return (
      <Card title={cardTitle} style={{width: cardWidth}} className="topNewsList">
        {newsList}
      </Card>
    )
  }
}
