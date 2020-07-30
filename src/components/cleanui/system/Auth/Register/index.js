import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user,
})

const Register = ({ dispatch, user }) => {
  const onFinish = values => {
    console.log('Success:', values)
    dispatch({
      type: 'user/REGISTER',
      payload: values,
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className={`card ${style.container} p-4`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Create your account</strong>
        </div>
        {/* <div className="mb-4">
          <p>
            And start spending more time on your projects and less time managing your
            infrastructure.
          </p>
        </div> */}
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
          initialValues={{ email: '', username: '' }}
        >
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name' }]}
              >
                <Input size="large" placeholder="Enter First Name" autoComplete="off" />
              </Form.Item>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name' }]}
              >
                <Input size="large" placeholder="Enter Last Name" autoComplete="off" />
              </Form.Item>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your e-mail address' },
                  {
                    min: 6,
                    message: 'Username length must be atleast 6 characters',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Username" autoComplete="new-password" />
              </Form.Item>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form.Item
                label="Email"
                name="emailAddress"
                rules={[
                  { required: true, message: 'Please input your e-mail address' },
                  {
                    type: 'email',
                    message: 'Please enter valid email address',
                  },
                ]}
              >
                <Input size="large" placeholder="Email Address" autoComplete="new-password" />
              </Form.Item>
            </div>
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
            <div className="col-xs-12 col-md-12">
              <Form.Item name="referredByCode">
                <Input size="large" placeholder="Enter Referral Code" />
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
            <strong>Sign up</strong>
          </Button>
        </Form>
        <div>
          <span className="mr-1">By signing up, you agree to the</span>
          <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Already have an account?</span>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Register)
