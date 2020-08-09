import React from 'react'
import { Menu, Dropdown } from 'antd'
import { getDifferenceTimeSpan } from '../utils/date_utils'

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a>
        <i className="dropdown-icon fe fe-edit mr-1" /> Edit Post
      </a>
    </Menu.Item>
    <Menu.Item>
      <a>
        <i className="dropdown-icon fe fe-trash mr-1" /> Delete Post
      </a>
    </Menu.Item>
    <Menu.Item>
      <a>
        <i className="dropdown-icon fe fe-repeat mr-1" /> Mark as Spam
      </a>
    </Menu.Item>
  </Menu>
)

const Comments = ({ commentsList }) => {
  return (
    <div className="d-flex flex-nowrap align-items-start pt-4">
      <div className="kit__utils__avatar kit__utils__avatar--size64 mr-4 flex-shrink-0 align-self-start">
        <img src="resources/images/avatars/3.jpg" alt="Mary Stanform" />
      </div>
      <div className="flex-grow-1">
        {commentsList.map(comment => (
          <>
            <div className="border-bottom">
              <div className="d-flex flex-wrap mb-2">
                <div className="mr-auto">
                  <div className="text-gray-6">
                    {comment.userDetails && (
                      <span className="text-dark font-weight-bold">
                        {comment.userDetails.firstName} {comment.userDetails.lastName}
                      </span>
                    )}{' '}
                    posted
                  </div>
                  <div>{getDifferenceTimeSpan(comment.createdAt)}</div>
                </div>
                <div className="nav-item dropdown">
                  <Dropdown overlay={dropdownMenu} placement="bottomRight">
                    <a className="nav-link dropdown-toggle pt-sm-0">Actions</a>
                  </Dropdown>
                </div>
              </div>
              <div className="mb-3">{comment.comment}</div>
              <div className="d-flex flex-wrap justify-content-end align-items-start mb-3">
                {/* <a className="text-blue mr-3">
                    <i className="fe fe-heart mr-1" /> 61 Likes
                  </a> */}
                <a className="text-blue mr-3">
                  <i className="fe fe-message-square mr-1" />{' '}
                  {comment.replies ? comment.replies.length : 0} replies
                </a>
              </div>
            </div>
            {comment.replies.map(reply => (
              <div className="d-flex flex-nowrap align-items-start pt-4">
                <div className="kit__utils__avatar kit__utils__avatar--size64 mr-4 flex-shrink-0 align-self-start">
                  <img src="resources/images/avatars/3.jpg" alt="Mary Stanform" />
                </div>
                <div className="flex-grow-1">
                  <div className="border-bottom">
                    <div className="d-flex flex-wrap mb-2">
                      <div className="mr-auto">
                        <div className="text-gray-6">
                          {reply.userDetails && (
                            <span className="text-dark font-weight-bold">
                              {reply.userDetails.firstName} {reply.userDetails.lastName}
                            </span>
                          )}{' '}
                          posted
                        </div>
                        <div>{getDifferenceTimeSpan(comment.createdAt)}</div>
                      </div>
                      <div className="nav-item dropdown">
                        <Dropdown overlay={dropdownMenu} placement="bottomRight">
                          <a className="nav-link dropdown-toggle pt-sm-0">Actions</a>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="mb-3">{reply.comment}</div>
                    <div className="d-flex flex-wrap justify-content-start align-items-start mb-3">
                      <a className="text-blue mr-3">
                        <i className="fe fe-message-square mr-1" /> 2 Comments
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

export default Comments
