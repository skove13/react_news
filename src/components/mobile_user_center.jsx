import React,{Component} from 'react'
import {Link}  from 'router'
import axios from 'axios'
import {
    Tabs,
    Card,
} from 'antd'
const Tabpane=Tabs.TabPane

export default class MobileUserCenter extends Component{

    state={
        userCollections:[],
        userComments:[]
    }

    componentDidMount (){
        const userId=localStorage.getItem('userId')
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response=>{
                const userCollections=response.data
                this.setState({userCollections})
            })
        let url2=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
         axios.get(url2)
            .then(response=>{
                const userComments=response.data
                this.setState({userComments})
            })
    }

    render () {
        const {userCollections,userComments}=this.state

        const userCollectionsList=userCollections.length
        ? userCollections.map((item,index)=>(
            <Card key="index" title={item.uniquekey}
                  extra={<Link to={`/new_detail/$(item.unicquekey)`}>查看</Link>}>
                <p>{item.title}</p>
            </Card>
          ))
        :'还没有新闻，快去收藏'
        const userCommentsList=userComments.length
            ? userComments.map((item,index)=>(
                <Card key="index" title={`于${item.datetime} 评论了文章${item.unicquekey}`}
                      extra={<Link to={`/new_detail/$(item.unicquekey)`}>查看</Link>}>
                    <p>{item.Comments}</p>
                </Card>
            ))
         :'还没有评价，快去评价'

        return(
              <div>
                  <Tabs>
                      <Tabpane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                          {userCollectionsList}
                      </Tabpane>
                      <Tabpane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                          {userCommentsList}
                      </Tabpane>

                  </Tabs>
              </div>
        )
    }
}