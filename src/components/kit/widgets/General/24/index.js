import React from 'react'

const General24 = ({ successReferals = [] }) => {
  return (
    <div className="text-white font-weight-bold">
      <div className="font-size-21 mb-2">Successfully Referred</div>
      <div className="d-flex align-items-end flex-wrap">
        <div className="pr-3 mr-auto">
          <i className="fe fe-server font-size-48" />
        </div>
        <div className="font-size-36 mb-n2">{successReferals.length}</div>
      </div>
    </div>
  )
}

export default General24
