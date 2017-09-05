import React,{Component} from 'react'

import MobileNewsHeader from './mobile_news_header'
import NewsFooter from './news_footer'
import '../componentsCss/mobile.css'

/*Mobile端根路由组件*/
export default class MobileApp extends Component{

    render (){
        return (
            <div>
            <MobileNewsHeader/>
            {this.props.children}
            <NewsFooter/>
        </div>)
    }
}