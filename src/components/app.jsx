import React, { Component } from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'

import '../componentsCss/pc.css'
/*
PC端: 应用根路由组件
 */
export default class App extends Component {
  render() {
    return (
      <div>
        <NewsHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }
}