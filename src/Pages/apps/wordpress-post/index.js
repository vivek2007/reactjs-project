import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Modal, Form, Input, Button, notification } from 'antd'
import List15 from 'components/kit/widgets/Lists/15'
import Comments from '../comments'
import { getPostDetails, addComment } from '../../../services/blogs.service'
import { BLOG_ENDPOINTS } from '../../../constants/SERVICE_ENDPOINTS'

const { TextArea } = Input

class ExtraAppsWordpressPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postDetails: null,
      showModal: false,
      commentData: {},
      comment: '',
    }
    this.fetchPostDetails = this.fetchPostDetails.bind(this)
    this.commentToPost = this.commentToPost.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.fetchPostDetails()
  }

  onFinish(values) {
    console.log(values)
    const { commentData } = this.state
    const { comment } = values
    const dataToSend = {
      url: commentData.url,
      dataToSubmit: {
        ...commentData,
        comment,
        url: undefined,
      },
    }
    this.commentToPost(dataToSend)
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

  commentToPost(dataToSend) {
    Promise.resolve(addComment(dataToSend)).then(response => {
      console.log('response: ', response)
      if (response.status) {
        notification.success({
          message: 'success',
          description: 'Comment Added Successfully',
          placement: 'topRight',
          duration: 5,
        })
        this.toggleModal(null, {})
        this.fetchPostDetails()
      }
    })
  }

  toggleModal(e, dataToSubmit) {
    console.log(dataToSubmit)
    if (e) {
      e.preventDefault()
    }
    this.setState(prevState => ({
      comment: '',
      showModal: !prevState.showModal,
      commentData: dataToSubmit,
    }))
  }

  fetchPostDetails() {
    const {
      user: { userId },
      blog: { postId },
    } = this.props
    console.log('postId: ', postId)
    const dataToSend = {
      userID: userId,
      postID: postId,
    }
    Promise.resolve(getPostDetails(dataToSend)).then(response => {
      console.log('response: ', response)
      if (response.status) {
        this.setState({
          postDetails: response.post,
        })
      }
      console.log(this.state)
    })
  }

  /* eslint no-underscore-dangle: 0 */
  render() {
    const { postDetails: post, showModal, comment } = this.state
    const {
      user: { loading, userId },
    } = this.props
    if (!post) return null
    const { _id: postID } = post
    const modalBody = () => (
      <Form className="login-form" onFinish={this.onFinish} initialValues={{ comment: '' }}>
        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Please enter your comment' }]}
        >
          <TextArea
            rows={3}
            placeholder="Your comment"
            allowClear
            value={comment}
            onChange={e => {
              this.setState({ comment: e.target.value })
            }}
          />
        </Form.Item>
        <Form.Item className="text-center">
          <Button
            className="mr-2"
            type="primary"
            htmlType="button"
            onClick={e => {
              this.toggleModal(e)
            }}
          >
            Cancel
          </Button>
          <Button className="mr-2" type="primary" htmlType="submit" loading={loading}>
            Comment
          </Button>
        </Form.Item>
      </Form>
    )

    return (
      <div>
        <Helmet title="Post Details" />
        <div className="row">
          <div className="col-xl-9 col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="mb-2">
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="text-dark font-size-24 font-weight-bold"
                  >
                    [{post.categoryName}] {post.title} #{post.blogNumber}
                  </a>
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
                <div className="d-flex flex-wrap justify-content-end align-items-start mt-4">
                  {/* <a className="text-blue mr-3">
                    <i className="fe fe-heart mr-1" /> Like
                  </a> */}
                  <a
                    href="#"
                    onClick={e => {
                      this.toggleModal(e, {
                        url: BLOG_ENDPOINTS.ADD_COMMENT,
                        userID: userId,
                        postID,
                      })
                    }}
                    className="text-blue mr-3"
                  >
                    <i className="fe fe-message-square mr-1" /> Comment
                  </a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h6 className="mb-4 text-uppercase">
                  <strong>Comments ({post.commentsCount ? post.commentsCount : 0})</strong>
                </h6>
                {post.commentsCount && (
                  <Comments
                    commentsList={post.comments}
                    onComment={this.toggleModal}
                    userId={userId}
                    postID={postID}
                  />
                )}

                {/* <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="d-block btn btn-light text-primary mt-3"
                >
                  Load More
                </a> */}
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-12">
            <div className="pb-4 mb-3 border-bottom">
              <label className="font-weight-bold d-block" htmlFor="search-input">
                <span className="mb-2 d-inline-block">Search Post</span>
                <input
                  className="form-control width-100p"
                  type="text"
                  placeholder="Search post..."
                  id="search-input"
                />
              </label>
            </div>
            <div className="pb-4 mb-3 border-bottom">
              <label className="font-weight-bold d-block" htmlFor="subscribe-input">
                <span className="mb-2 d-inline-block">Subscribe</span>
                <input
                  className="form-control width-100p"
                  type="text"
                  id="subscribe-input"
                  placeholder="Enter your email..."
                />
              </label>
            </div>
            <div className="pb-4 mb-3 border-bottom">
              <div className="font-weight-bold mb-2">Categories</div>
              <div>
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
                >
                  Umi
                </a>
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
                >
                  React-framework
                </a>
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
                >
                  Umijs
                </a>
              </div>
            </div>
            <div className="pb-4 mb-3 border-bottom">
              <div className="font-weight-bold mb-3">Latest Posts</div>
              <List15 />
            </div>
          </div>
        </div>
        <Modal
          title="Comment to Post"
          visible={showModal}
          onCancel={e => {
            this.toggleModal(e)
          }}
          footer={[]}
        >
          {modalBody()}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ user, blog }) => ({
  user,
  blog,
})

export default connect(mapStateToProps)(ExtraAppsWordpressPost)
