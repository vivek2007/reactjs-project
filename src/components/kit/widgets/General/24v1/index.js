import React from 'react'

const General24v1 = ({ referalsAwaited = [] }) => {
  return (
    <div className="text-dark font-weight-bold">
      <div className="font-size-21 mb-2 text-uppercase">Awaited Referals</div>
      <div className="d-flex align-items-end flex-wrap">
        <div className="pr-3 mr-auto">
          <i className="fe fe-server font-size-48 text-gray-5" />
        </div>
        <div className="font-size-36 mb-n2">{referalsAwaited.length}</div>
      </div>
    </div>
  )
}

export default General24v1
