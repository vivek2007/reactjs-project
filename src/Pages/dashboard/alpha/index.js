import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Table, Switch, Modal } from 'antd'
import { connect } from 'react-redux'

import General17 from 'components/kit/widgets/General/17'
import General17v1 from 'components/kit/widgets/General/17v1'
import General17v2 from 'components/kit/widgets/General/17v2'
import General18 from 'components/kit/widgets/General/18'
import General18v1 from 'components/kit/widgets/General/18v1'
import General6 from 'components/kit/widgets/General/6'
import General6v1 from 'components/kit/widgets/General/6v1'

import { DeleteOutlined } from '@ant-design/icons'

import { history, store as reduxStore } from 'index'

import store from 'store'
import { isEmpty } from 'lodash'

import { tableData } from './data.json'

const tableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Office',
    dataIndex: 'office',
    key: 'office',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    sorter: (a, b) => a.salary - b.salary,
  },
]

const mapStateToProps = ({ dispatch, professionalFeatures = {} }) => {
  console.log('MAP STATE TO PROPS IN Professional CALLED', professionalFeatures)
  const data = {
    professionalFeatures,
    dispatch,
  }
  return data
}

const DashboardAlpha = ({ dispatch, professionalFeatures }) => {
  const prevProps = useRef()
  useEffect(() => {
    // code to run on component mount
    if (isEmpty(professionalFeatures) || prevProps.professionalFeatures !== professionalFeatures) {
      dispatch({
        type: 'professionalFeatures/GET_FEATURES',
      })
    }
  })

  const [showCart, setshowCart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tempCart, setTempCart] = useState()

  const handleOk = cartData => {
    const cartDatas = {
      cartData: {
        cartItems: cartData,
      },
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setshowCart(false)

      store.set(`app.cartData`, cartDatas)
      reduxStore.dispatch({
        type: 'professionalFeatures/SET_STATE',
        payload: cartDatas,
      })

      history.push('/dashboard/alpha/payment')
    }, 1000)
  }

  const handleCancel = () => {
    setshowCart(false)
  }

  const handleCardClick = async value => {
    if (value.itemAddedToCart) {
      const cartItem = []
      professionalFeatures.professionalData.professionalFeatures.map(values => {
        if (values.itemAddedToCart) {
          cartItem.push(values)
        }
        return cartItem
      })
      setTempCart(cartItem)
    } else {
      await dispatch({
        type: 'professionalFeatures/ADD_TO_CART',
        payload: value._id, // eslint-disable-line
      })
    }
    setshowCart(true)
  }

  const handleRemove = value => {
    if ('featureID' in value) {
      value._id = value.featureID // eslint-disable-line
    }
    dispatch({
      type: 'professionalFeatures/REMOVE_FROM_CART',
      payload: value._id, // eslint-disable-line
    })
  }

  const handleKeyDown = value => {
    console.log('KEY DOWN', value)
  }

  return (
    <div>
      <Helmet title="Dashboard: Analytics" />
      <div className="row">
        {professionalFeatures.professionalData.professionalFeatures.map(value => {
          return (
            <div className="col-xl-4 col-lg-6 d-flex align-items-stretch">
              <div
                className="card"
                tabIndex={0}
                role="button"
                style={{ backgroundColor: '#80B8D9', opacity: 0.85 }}
                onClick={() => handleCardClick(value)}
                onKeyDown={handleKeyDown}
              >
                <div
                  className="text-light font-size-60 text-center pt-20"
                  style={{
                    position: 'absolute',
                    marginLeft: '20%',
                    marginTop: '15%',
                    lineHeight: '1',
                  }}
                >
                  <b>
                    CLICK HERE TO <br />
                    UNLOCK
                  </b>
                </div>

                <div className="card-header">
                  <div className="cui__utils__heading mb-0">
                    <strong>{value.name}</strong>
                  </div>
                  <span className="mr-2">
                    <span className="fa fa-dollar pr-1" />
                    25,000 VALUE
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="pt-5 pb-5 pl-5 pr-5 text-center font-weight-bold font-size-36 text-dark">
                    ${value.amount}
                  </div>
                  <p>
                    <b>{value.description}</b>
                  </p>
                  <span className="float-right pr-3 pb-3 align-self-end mt-auto">
                    <Switch
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      checked={value.itemAddedToCart}
                    />
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Recently Referrals</strong>
              </div>
              <div className="text-muted">Block with important Recently Referrals information</div>
            </div>
            <div className="card-body">
              <div className="kit__utils__table">
                <Table columns={tableColumns} dataSource={tableData} pagination={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cui__utils__heading mb-3">
        <strong>Your Cards (3)</strong>
        <Button className="ml-3">View All</Button>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <General17 />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <General17v1 />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <General17v2 />
          </div>
        </div>
      </div>
      <div className="cui__utils__heading mb-3">
        <strong>Your Accounts (6)</strong>
        <Button className="ml-3">View All</Button>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <General18 />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <General18v1 />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <General18v1 />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <General18 />
          </div>
        </div>
      </div>
      <div className="cui__utils__heading mb-3">
        <strong>Recent Transactions (167)</strong>
        <Button className="ml-3">View All</Button>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <General6 />
          </div>
          <div className="card">
            <General6v1 />
          </div>
          <div className="card">
            <General6 />
          </div>
          <div className="card">
            <General6v1 />
          </div>
          <div className="text-center pb-5">
            <Button type="primary" className="width-200" loading>
              Load More...
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="PAY NOW USING SECURE FORM"
        confirmLoading={loading}
        visible={showCart}
        onCancel={handleCancel}
        footer={null}
        width="30%"
      >
        {/*  eslint-disable */}
        {'cartData' in professionalFeatures &&
        professionalFeatures.cartData.cartItems.length > 0 ? (
          professionalFeatures.cartData.cartItems.map(value => {
            return (
              <>
                <div className="row">
                  <div className="col-md-1">
                    <Button
                      onClick={() => handleRemove(value)}
                      icon={<DeleteOutlined />}
                      size="medium"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4>{value.name}</h4>
                    <p>{value.description}</p>
                  </div>
                  <div className="col-md-2">
                    <h4>${value.amount}</h4>
                  </div>
                </div>
              </>
            )
          })
        ) : tempCart && !('cartData' in professionalFeatures) ? (
          tempCart.map(value2 => {
            return (
              <>
                <div className="row">
                  <div className="col-md-1">
                    <Button
                      onClick={() => handleRemove(value2)}
                      icon={<DeleteOutlined />}
                      size="medium"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4>{value2.name}</h4>
                    <p>{value2.description}</p>
                  </div>
                  <div className="col-md-2">
                    <h4>${value2.amount}</h4>
                  </div>
                </div>
              </>
            )
          })
        ) : (
          <div className="text-center">
            <h4>Your Cart is Empty</h4>
            <br />
            <h5>Please add atleast one Professional feature before continuing to billing.</h5>
            <br />
          </div>
        )}
        {'cartData' in professionalFeatures &&
        professionalFeatures.cartData.cartItems.length > 0 ? (
          <div className="text-center mt-3">
            <Button
              type="danger"
              shape="round"
              size="large"
              onClick={() => handleOk(professionalFeatures.cartData.cartItems)}
              loading={loading}
            >
              CONTINUE TO BILLING
            </Button>
          </div>
        ) : tempCart && !('cartData' in professionalFeatures) ? (
          <div className="text-center mt-3">
            <Button
              type="danger"
              shape="round"
              size="large"
              onClick={() => handleOk(tempCart)}
              loading={loading}
            >
              CONTINUE TO BILLING
            </Button>
          </div>
        ) : null}
        {/*  eslint-enable */}
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps)(DashboardAlpha)
