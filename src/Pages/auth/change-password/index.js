import React from 'react'
import { Helmet } from 'react-helmet'
import ChangePassword from 'components/cleanui/system/Auth/ChangePassword'

const SystemChangePassword = () => {
  return (
    <div>
      <Helmet title="Reset Password" />
      <ChangePassword />
    </div>
  )
}

export default SystemChangePassword
