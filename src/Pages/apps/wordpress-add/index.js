import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { Helmet } from 'react-helmet'
import { Input, Select, Form, notification } from 'antd'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { history } from 'index'
import { getCategories, createPost } from '../../../services/blogs.service'

class ExtraAppsWordpressAdd extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    categories: [],
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories() {
    Promise.resolve(getCategories()).then(response => {
      console.log('response: ', response)
      let categoriesList = []
      if (response.status) {
        categoriesList = response.categories
      }
      this.setState({
        categories: categoriesList,
      })
    })
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    })
  }

  onFinish = values => {
    const { editorState } = this.state
    const { user } = this.props
    const { title, category, type = 'text' } = values
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const dataToSend = {
      userID: user.userId,
      categoryID: category,
      title,
      type,
      description,
    }
    console.log('dataToSend: ', dataToSend)
    Promise.resolve(createPost(dataToSend)).then(response => {
      console.log('response: ', response)
      if (response.status) {
        notification.success({
          key: 'post_create',
          message: 'Success',
          description: 'Post Created Successfully',
          placement: 'topRight',
          duration: 5,
        })
        history.push('/blog/posts-list')
      } else {
        notification.success({
          key: 'post_create',
          message: 'Failed',
          description: response.message,
          placement: 'topRight',
          duration: 5,
        })
      }
    })
  }

  onFinishFailed = errors => {
    console.log(errors)
  }

  render() {
    const { editorState, categories } = this.state
    const { Option } = Select
    return (
      <PerfectScrollbar>
        <div>
          <Helmet title="Create Post" />
          <div className="card">
            <div className="card-body">
              <Form layout="vertical" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group">
                      <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Post Title is Required' }]}
                      >
                        <Input placeholder="Post title" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group">
                      <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please Select Category from List' }]}
                      >
                        <Select placeholder="Select post category">
                          {categories.map(category => {
                            const { _id: key } = category
                            return (
                              <Option key={key} value={key}>
                                {category.name}
                              </Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please Enter Content of the Post' }]}
                  >
                    <Editor
                      editorClassName="px-3 border border-gray-1"
                      editorStyle={{
                        height: 200,
                        overflow: 'auto',
                        padding: 15,
                      }}
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                    />
                  </Form.Item>
                </div>
                <Form.Item className="text-center">
                  <button type="submit" className="btn btn-success btn-with-addon text-nowrap">
                    <span className="btn-addon">
                      <i className="btn-addon-icon fe fe-plus-circle" />
                    </span>
                    Add Post
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(mapStateToProps)(ExtraAppsWordpressAdd)
