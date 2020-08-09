import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Pagination, Skeleton, Tooltip } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import store from 'store'
import { history, store as reduxStore } from 'index'
import { getPosts } from '../../../services/blogs.service'

class ExtraAppsWordpressPosts extends Component {
  static openPost(event, postObj) {
    event.preventDefault()
    const { _id: postId } = postObj
    store.set(`app.blog`, { postId })
    reduxStore.dispatch({
      type: 'blog/SET_STATE',
      payload: {
        postId,
      },
    })
    history.push('/blog/post-details')
  }

  constructor(props) {
    super(props)
    this.state = {
      postsList: [],
      paginationData: {
        min: 0,
        max: 5,
        totalCount: 0,
      },
      searchKey: '',
    }
    this.setPaginationData = this.setPaginationData.bind(this)
    this.fetchPosts = this.fetchPosts.bind(this)
  }

  componentDidMount() {
    this.fetchPosts()
  }

  getDifferenceTimeSpan(createdDate) {
    console.log(this.state)
    const now = moment()
    const date = moment(new Date(createdDate))
    const seconds = now.diff(date, 'seconds')
    const minutes = now.diff(date, 'minutes')
    const hours = now.diff(date, 'hours')
    const days = now.diff(date, 'days')
    const weeks = now.diff(date, 'weeks')
    const months = now.diff(date, 'months')
    const years = now.diff(date, 'years')
    let stringToreturn = ''
    if (seconds < 60) {
      stringToreturn = `${seconds} second(s) ago.`
    } else if (minutes < 60) {
      stringToreturn = `${minutes} minute(s) ago.`
    } else if (hours < 24) {
      stringToreturn = `${hours} hour(s) ago.`
    } else if (days < 7) {
      stringToreturn = `${days} day(s) ago.`
    } else if (weeks < 4) {
      stringToreturn = `${weeks} week(s) ago.`
    } else if (months < 12) {
      stringToreturn = `${months} month(s) ago.`
    } else {
      stringToreturn = `${years} year(s) ago.`
    }
    return <span>{stringToreturn}</span>
  }

  setPaginationData(page, pageSize) {
    const arrayIndex = (page - 1) * pageSize
    this.fetchPosts(arrayIndex)
  }

  fetchPosts = minReceived => {
    const {
      paginationData: { min, max },
      searchKey,
    } = this.state
    const { dispatch } = this.props
    const dataToSend = {
      min: minReceived || min,
      max,
      searchKey,
    }
    dispatch({
      type: 'user/SET_STATE',
      payload: {
        loading: true,
      },
    })
    Promise.resolve(getPosts(dataToSend)).then(response => {
      console.log('response: ', response)
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          loading: false,
        },
      })
      if (response.status) {
        this.setState(prevState => ({
          postsList: response.posts,
          paginationData: {
            ...prevState.paginationData,
            totalCount: response.totalPosts,
          },
        }))
      }
      console.log(this.state)
    })
  }

  /* eslint no-underscore-dangle: 0 */
  render() {
    const {
      postsList,
      paginationData: { max, totalCount },
    } = this.state
    const {
      user: { loading = true, userId },
    } = this.props
    if (postsList.length === 0) return null
    return (
      <div>
        <Helmet title="Wordpress Posts" />
        <div className="row">
          <Skeleton loading={loading} active={loading}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {postsList.map(post => (
                <div className="card">
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="row">
                        <div className="col-xs-11 col-md-11">
                          <a
                            href="#"
                            onClick={e => {
                              ExtraAppsWordpressPosts.openPost(e, post)
                            }}
                            className="text-dark font-size-24 font-weight-bold"
                          >
                            [{post.categoryName}] {post.title} - #{post.blogNumber}
                          </a>
                        </div>
                        {userId === post.userID && (
                          <div className="col-xs-1 col-md-1 text-right">
                            <Tooltip title="Edit Post" placement="top">
                              <a href="#" onClick={e => e.preventDefault()} className="text-dark">
                                <FormOutlined className="mr-3" />
                              </a>
                            </Tooltip>
                            <Tooltip title="Delete Post" placement="top">
                              <a href="#" onClick={e => e.preventDefault()} className="text-dark">
                                <DeleteOutlined />
                              </a>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <a className="font-weight-bold" href="#" onClick={e => e.preventDefault()}>
                        {post.userDetails.firstName}
                      </a>{' '}
                      wrote this post {this.getDifferenceTimeSpan(post.createdAt)}{' '}
                      {post.commentsCount ? post.commentsCount : 0} Comment(s)
                    </div>
                    <div className="mb-4">
                      <a
                        href="#"
                        onClick={e => e.preventDefault()}
                        className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
                      >
                        {post.categoryName}
                      </a>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                  </div>
                </div>
              ))}
            </div>
          </Skeleton>
          <Pagination
            defaultCurrent={1}
            total={totalCount}
            defaultPageSize={max}
            onChange={this.setPaginationData}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user,
})

export default connect(mapStateToProps)(ExtraAppsWordpressPosts)
