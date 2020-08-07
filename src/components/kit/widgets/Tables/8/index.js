import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const mapStateToProps = ({ user, order }) => ({
  order,
  user,
})

const Table8 = ({ user, order }) => {
  const { orderForInvoice = {} } = order
  return (
    <div>
      <div className="d-flex flex-wrap">
        <div className="flex-grow-1 d-flex flex-column flex-sm-row mb-4">
          <div className="font-size-18 font-weight-bold text-uppercase mb-4">
            <div>From:</div>
            <img className="d-block" src="resources/images/site_logo.png" alt="Amazon logo" />
          </div>
          <div className="ml-sm-auto mr-lg-auto pr-3">
            Clicks Office Address Line 1
            <br />
            Clicks Office Address Line 2
            <br />
            E-mail: support@clicks.com
            <br />
            Phone: Clicks_Support_Phone_Number
            <br />
            Fax: Clicks_Fax_Number
          </div>
        </div>
        <div className="flex-grow-1 d-flex flex-column flex-sm-row mb-4">
          <div className="font-size-18 font-weight-bold text-uppercase pb-4">
            <div>To:</div>
            <div className="text-dark mb-3">Invoice info</div>
            <div className="text-dark">#{orderForInvoice.invoiceID}</div>
            <div className="text-dark">{user.name}</div>
          </div>
          <div className="mt-auto mt-sm-0 ml-sm-auto pr-3 mr-lg-auto">
            Customer Address Line 1
            <br />
            Customer Address Line 2
            <br />
            P: customer Phone Number
            <br />
            Invoice Date:{' '}
            {moment(new Date(orderForInvoice.createdAt)).format('YYYY-MMM-DD HH:MM:SS')}
            <br />
            Due Date: {moment(new Date(orderForInvoice.launchDate)).format('YYYY-MMM-DD')}
          </div>
        </div>
      </div>
      <div className="text-left font-size-18 text-dark p-4 rounded bg-light mb-4">
        <div>
          Total Clicks: <span className="font-weight-bold">{orderForInvoice.totalClicks}</span>
        </div>
        <div>Websites:</div>
        {orderForInvoice.websites.map(websiteObject => (
          <div>
            <a href={websiteObject.website} target="_blank" rel="noopener noreferrer">
              {websiteObject.website}
            </a>
            <span className="font-weight-bold ml-4">{websiteObject.clicks} - clicks</span>
          </div>
        ))}
      </div>
      <div className="text-left font-size-18 text-dark p-4 rounded bg-light mb-4">
        <div>
          Payment Method:{' '}
          <span className="font-weight-bold">
            {orderForInvoice.cardType ? orderForInvoice.cardType.toUpperCase() : 'VISA'} |{' '}
            {`XXXX XXXX XXXX ${orderForInvoice.cardNumber.substr(
              orderForInvoice.cardNumber.length - 4,
            )}`}
          </span>
        </div>
        <div>
          Grand Total:{' '}
          <span className="font-weight-bold">
            ${orderForInvoice.amount ? orderForInvoice.amount : orderForInvoice.totalClicks}
          </span>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Table8)
