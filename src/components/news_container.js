import React from 'react'
import {
  Row,
  Col,
  Carousel,
  Tabs
} from 'antd'
import NewsImageBlock from './news_image_block'
import NewsBlock from './news_block'
import NewsProducts from './news_products'

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

const TabPane = Tabs.TabPane

/**
 * Created by xfzhang on 2017/3/3.
 * 首页主体组件
 */
export default class NewsContainer extends React.Component {

  render() {

    return (
      <div>
        <Row className='container'>
          <Col span={1}/>
          <Col span={22}>

            <div className="leftContainer" style={{width: "35%"}}>
              <Carousel autoplay infinite dots>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>
              <NewsImageBlock type='guoji' cardTitle='国际新闻'
                              count={6} cardWidth='400px'
                              imageWidth='112px'/>
            </div>

            <Tabs className='tabs_news' style={{width: "35%"}}>
              <TabPane tab="头条新闻" key="1">
                <NewsBlock type="top" count={22}/>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <NewsBlock type="guoji" count={22}/>
              </TabPane>
            </Tabs>

            <Tabs className="tabs_product" style={{width: "30%"}}>
              <TabPane tab="React News产品" key="1">
                <NewsProducts />
              </TabPane>
            </Tabs>

            <div>
              <NewsImageBlock count={8} type="guonei" cardWidth="100%"
                              cardTitle="国内新闻" imageWidth="132px"/>
              <NewsImageBlock count={16} type="yule" cardWidth="100%"
                              cardTitle="娱乐新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={1}/>
        </Row>
      </div>
    )
  }
}