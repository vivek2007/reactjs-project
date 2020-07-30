import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import style from '../style.module.scss'

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user,
})

const ChangePassword = ({ dispatch, user, match = {} }) => {
  const { id = '' } = match.params
  console.log('id received: ', id)
  const onFinish = values => {
    const dataToSend = {
      password: values.password,
      id,
    }
    console.log('Success:', dataToSend)
    dispatch({
      type: 'user/CHANGE_PASSWORD',
      payload: dataToSend,
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Reset Password</strong>
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your e-mail address' },
                  { min: 8, message: 'Password length must be atleast 8 characters' },
                ]}
                hasFeedback
              >
                <Input type="password" size="large" placeholder="Password" />
              </Form.Item>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error('The two passwords that you entered do not match!'),
                      )
                    },
                  }),
                ]}
              >
                <Input type="password" size="large" placeholder="Password" />
              </Form.Item>
            </div>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-center w-100"
            loading={user.loading}
          >
            <strong>Reset my password</strong>
          </Button>
        </Form>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          <i className="fe fe-arrow-left mr-1 align-middle" />
          Go to Sign in
        </Link>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(ChangePassword))
