import React from 'react'

import { Helmet } from 'react-helmet'
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs'
import images from 'react-payment-inputs/images'

import { Button, Form, notification } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import * as qs from 'querystring'
import { history } from 'index'

const mapStateToProps = ({ dispatch, user, professionalFeatures = {} }) => {
  const data = {
    dispatch,
    user,
    professionalFeatures,
  }
  return data
}

const payment = ({ dispatch, user, professionalFeatures }) => {
  const OrderForm = () => {
    const {
      getCardNumberProps,
      getExpiryDateProps,
      getCVCProps,
      wrapperProps,
      getCardImageProps,
      meta,
    } = usePaymentInputs()

    console.log('professionalFeatures', professionalFeatures)

    const placeOrder = (dataToSend, transID) => {
      dataToSend.transactionID = transID
      console.log('dataToSend Before DISPATCH', dataToSend)

      dispatch({
        type: 'professionalFeatures/ORDER_PROFESSIONAL_FEATURES',
        payload: dataToSend,
      })
    }

    let amountToPay = 0

    professionalFeatures.cartData.cartItems.map(item => {
      console.log('item', item)
      amountToPay += item.amount
      return item
    })

    console.log('amountToPayamountToPayamountToPay', amountToPay)

    const onFinish = values => {
      console.log('values on finish click', values)

      notification.close('clicksIssue')

      dispatch({
        type: 'user/SET_STATE',
        payload: {
          loading: true,
        },
      })

      const newDataToSend = {
        name: user.name,
        email: user.email,
        amount: `${amountToPay}`,
        card_number: values.paymentDetails_cardNumber.replace(/ /g, ''),
        card_cvc: parseInt(values.paymentDetails_cardCVV, 10),
        card_exp_month: parseInt(values.paymentDetails_cardExpiry.split('/', 2)[0].trim(), 8),
        card_exp_year:
          parseInt(values.paymentDetails_cardExpiry.split('/', 2)[1].trim(), 10) + 2000,
        subscribe: '',
      }

      const dataToSend = {
        userID: user.userId,
        cardNumber: values.paymentDetails_cardNumber,
        cardType: meta.cardType.type,
        expiry: values.paymentDetails_cardExpiry.replace(/ /g, ''),
        cvv: values.paymentDetails_cardCVV,
        amount: `${amountToPay}`,
      }

      console.log('newDataToSend: ', newDataToSend)
      console.log('dataToSend: ', dataToSend)

      axios({
        method: 'post',
        url: `https://climatechangepartnership.com/secure/payment.php`,
        data: qs.stringify(newDataToSend),
      })
        .then(response => {
          dispatch({
            type: 'user/SET_STATE',
            payload: {
              loading: false,
            },
          })
          if (response.data !== '0') {
            placeOrder(dataToSend, response.data)
          } else {
            notification.error({
              key: 'payment_filed',
              message: 'Payment Failed',
              description: 'Payment Failed, Order cannot be proceed',
              placement: 'topLeft',
              duration: 5,
            })
          }
        })
        .catch(error => {
          dispatch({
            type: 'user/SET_STATE',
            payload: {
              loading: false,
            },
          })
          console.log('Error Catched: ', error)
          notification.error({
            key: 'payment_filed',
            message: 'Payment Failed',
            description: 'Payment Failed, Order cannot be proceed',
            placement: 'topLeft',
            duration: 5,
          })
        })
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    // const [amountToPay, setAmountToPay] = useState(100)

    const formItemLayout = {
      labelCol: {
        xs: { span: 28 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="card-body border">
            <Helmet title="Professional Features: Payment Form" />

            <h5 className="mb-4">
              <strong>Buy Professional Services</strong>
            </h5>
            <br />
            <Form
              {...formItemLayout}
              labelAlign="left"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="Order Details" name="paymentDetails">
                {professionalFeatures.cartData.cartItems.map(item => {
                  return (
                    <>
                      <ul>
                        <li>
                          <p>{item.name}</p>
                        </li>
                      </ul>
                    </>
                  )
                })}
              </Form.Item>
              <Form.Item label="Payment Details" name="paymentDetails">
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(58% - 6px)' }}
                  rules={[{ required: true, message: 'Please input card number' }]}
                  name="paymentDetails_cardNumber"
                >
                  <PaymentInputsWrapper {...wrapperProps}>
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps()} name="creditCardNumber" />
                  </PaymentInputsWrapper>
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(30% - 6px)' }}
                  rules={[{ required: true, message: 'Please input expiry' }]}
                  name="paymentDetails_cardExpiry"
                >
                  <PaymentInputsWrapper {...wrapperProps}>
                    <input {...getExpiryDateProps()} name="creditCardExpiry" />
                  </PaymentInputsWrapper>
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(17% - 6px)' }}
                  rules={[{ required: true, message: 'Please input CVC' }]}
                  name="paymentDetails_cardCVV"
                >
                  <PaymentInputsWrapper {...wrapperProps}>
                    <input {...getCVCProps()} name="creditCardCVC" />
                  </PaymentInputsWrapper>
                </Form.Item>
              </Form.Item>
              <Form.Item name="amount" label="Total Amount">
                {`$ ${amountToPay}`}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="text-center w-100 mb-2"
                loading={user.loading}
              >
                <strong>Place Order Now</strong>
              </Button>
            </Form>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    )
  }

  return (
    <div>
      <React.Fragment>
        {!('cartData' in professionalFeatures) ? (
          history.push(`/dashboard/alpha`)
        ) : (
          <>
            {/* <h1>Payment form</h1> */}
            <div className="style_breadcrumbs__f2r8i p-0">
              <div>
                <a href="#/dashboard/alpha">Home</a>
                <span>
                  <span className="style_arrow__1I63D" />
                  <span>Account Upgrades</span>
                  <span className="style_arrow__1I63D" />
                  <span>Professional Features</span>
                  <span className="style_arrow__1I63D" />
                  <strong className="style_current__2Hwbt">Payment</strong>
                </span>
              </div>
            </div>
            <br />
            <br />
            <OrderForm />
          </>
        )}
      </React.Fragment>
    </div>
  )
}

export default connect(mapStateToProps)(payment)
