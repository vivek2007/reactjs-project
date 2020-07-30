import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import style from '../style.module.scss'

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user,
})

const VerifyEmail = ({ dispatch, user, match = {} }) => {
  const verifyEmailByToken = () => {
    const { id = '' } = match.params
    console.log('id received: ', id)
    if (id) {
      const dataToSend = {
        id,
      }
      console.log('Success:', dataToSend)
      dispatch({
        type: 'user/VERIFY_EMAIL',
        payload: dataToSend,
      })
    }
  }
  useEffect(() => verifyEmailByToken())
  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Email Verification</strong>
        </div>
        <div>
          {user.showVerificationStatus && (
            <h5>
              <span className="mr-4">Status:</span>
              {user.emailVerificationStatus ? (
                <span className="badge badge-success">Success</span>
              ) : (
                <span className="badge badge-danger">Failed</span>
              )}
            </h5>
          )}
        </div>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          <i className="fe fe-arrow-left mr-1 align-middle" />
          Go to Sign in
        </Link>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(VerifyEmail))
