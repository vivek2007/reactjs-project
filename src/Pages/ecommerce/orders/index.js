import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import moment from 'moment'
import store from 'store'
import { history, store as reduxStore } from 'index'
// import table from './data.json'

class EcommerceOrders extends React.Component {
  static openInvoice(event, rowData) {
    event.preventDefault()
    store.set(`app.order`, { orderForInvoice: rowData })
    reduxStore.dispatch({
      type: 'order/SET_STATE',
      payload: {
        orderForInvoice: rowData,
      },
    })
    history.push('/order/invoice')
  }

  constructor(props) {
    super(props)
    this.state = {
      ordersList: [],
      page: 0,
      numberOfOrders: 100,
    }
    this.fetchOrders = this.fetchOrders.bind(this)
  }

  componentDidMount() {
    this.fetchOrders()
  }

  fetchOrders() {
    const { user = {} } = this.props
    const { userId: userID } = user
    const { page: min = 0, numberOfOrders: max } = this.state
    const data = {
      userID,
      min,
      max,
    }
    axios({
      method: 'post',
      url: `http://clickswealthy.com:3000/v1//user/get-orders`,
      data,
    })
      .then(response => {
        console.log('Orders Received : ', response)
        console.log(moment(new Date(response.data.orderDetails[0].createdAt)).format('YYYY-MMM-DD'))
        this.setState({
          ordersList: response.data.orderDetails,
        })
      })
      .catch(error => {
        console.log('Error Catched')
        let errorData = { status: 0, message: error.message }
        if (error && error.response && error.response.data) {
          const { status, message } = error.response.data
          errorData = {
            status,
            message,
          }
          console.log(errorData)
        }
      })
  }

  render() {
    const { ordersList } = this.state
    if (ordersList.length === 0) return null
    const columns = [
      {
        title: 'ID',
        dataIndex: 'invoiceID',
        key: 'invoiceID',
        render: invoiceID => (
          <a className="btn btn-sm btn-light" href="#" onClick={e => e.preventDefault()}>
            {invoiceID}
          </a>
        ),
        // sorter: (a, b) => a.invoiceID - b.invoiceID,
      },
      {
        title: 'Order Placed Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: createdAt => (
          <span>{moment(new Date(createdAt)).format('YYYY-MMM-DD HH:MM:SS')}</span>
        ),
        sorter: (a, b) => a.createdAt - b.createdAt,
      },
      {
        title: 'Number of Clicks',
        dataIndex: 'totalClicks',
        key: 'totalClicks',
        render: totalClicks => <span>{totalClicks}</span>,
        sorter: (a, b) => a.totalClicks - b.totalClicks,
      },
      {
        title: 'Clicks Required Date',
        dataIndex: 'launchDate',
        key: 'launchDate',
        render: launchDate => <span>{moment(new Date(launchDate)).format('YYYY-MMM-DD')}</span>,
        sorter: (a, b) => a.launchDate - b.launchDate,
      },
      {
        title: 'Website(s)',
        dataIndex: 'websites',
        key: 'websites',
        render: websites => (
          <div>
            {websites.map(websiteObj => (
              <div>
                {websiteObj.website} -- {websiteObj.clicks}
              </div>
            ))}
          </div>
        ),
        // sorter: (a, b) => a.invoiceID - b.invoiceID,
      },
      {
        title: 'Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        render: paymentStatus => (
          <span
            className={
              paymentStatus === 0
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {paymentStatus === 0 ? 'Pending' : 'Processing'}
          </span>
        ),
        sorter: (a, b) => a.status.length - b.status.length,
      },
      {
        title: 'Action',
        key: 'action',
        render: row => (
          <span>
            <a
              href="#"
              onClick={e => EcommerceOrders.openInvoice(e, row)}
              className="btn btn-sm btn-light mr-2"
            >
              View Invoice
            </a>
            {/* <a href="#" onClick={e => e.preventDefault()} className="btn btn-sm btn-light">
              <small>
                <i className="fe fe-trash mr-2" />
              </small>
              Remove
            </a> */}
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Orders: Order History" />
        <div className="card">
          <div className="card-header card-header-flex">
            <div className="d-flex flex-column justify-content-center mr-auto">
              <h5 className="mb-0">Latest Orders</h5>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <a className="btn btn-primary" href="/#/order/order-form">
                New Order
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="text-nowrap">
              <Table
                columns={columns}
                dataSource={ordersList}
                onChange={this.handleTableChange}
                pagination={{ defaultPageSize: 5, total: ordersList.length }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(mapStateToProps)(EcommerceOrders)
