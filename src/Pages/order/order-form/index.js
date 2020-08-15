import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Input, Slider, Form, DatePicker, InputNumber, Button, Tooltip, notification } from 'antd'
// import { css } from 'styled-components';
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs'
import images from 'react-payment-inputs/images'
import * as qs from 'querystring'

function disabledDate(current) {
  // Can not select days before today and today
  return current < moment().subtract(1, 'day')
}

const mapStateToProps = ({ user, dispatch, order }) => ({
  dispatch,
  user,
  order,
})

const OrderForm = ({ user, dispatch, order = {} }) => {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    getCardImageProps,
    meta,
  } = usePaymentInputs()

  console.log('Props Update:.. ', order.orderSuccess)
  // if (order.orderSuccess) {
  //   const [form] = Form.useForm();
  //   form.resetFields();
  //   dispatch({
  //     type: 'order/SET_STATE',
  //     payload: {
  //       orderSuccess: false,
  //     },
  //   })
  // }
  const placeOrder = (dataToSend, transID) => {
    dataToSend.transactionID = transID
    console.log('dataToSend Before DISPATCH', dataToSend)
    dispatch({
      type: 'order/PLACE_ORDER',
      payload: dataToSend,
    })
  }
  const onFinish = values => {
    let totalClicks = 0
    const websites = []
    webSites.forEach(website => {
      console.log('values[website.clicksRequired]: ', values[website.clicksRequired])
      totalClicks = values[website.clicksRequired] + totalClicks
      websites.push({
        website: values[website.name],
        clicks: values[website.clicksRequired],
      })
    })
    console.log('Total Clicks: ', totalClicks)
    if (totalClicks !== amountToPay) {
      notification.error({
        key: 'clicksIssue',
        message: 'Clicks not Matched',
        description: 'Number Clicks should equal to Splitting Clicks',
        placement: 'topLeft',
        duration: 5,
      })
    } else {
      console.log('Success:', values)
      notification.close('clicksIssue')
      // notification.success({
      //   message: 'Details Validation Success',
      //   description: 'Placing your Order...',
      //   placement: 'topRight',
      //   duration: 10,
      // })
      const dataToSend = {
        userID: user.userId,
        totalClicks,
        launchDate: values.requiredDate.format('YYYY-MM-DDT00:00:00Z'),
        cardNumber: values.paymentDetails_cardNumber,
        cardType: meta.cardType.type,
        expiry: values.paymentDetails_cardExpiry.replace(/ /g, ''),
        cvv: values.paymentDetails_cardCVV,
        websites,
        amount: totalClicks,
      }

      const newDataToSend = {
        name: user.name,
        email: user.email,
        amount: totalClicks,
        card_number: values.paymentDetails_cardNumber.replace(/ /g, ''),
        card_cvc: parseInt(values.paymentDetails_cardCVV, 10),
        card_exp_month: parseInt(values.paymentDetails_cardExpiry.split('/', 2)[0].trim(), 8),
        card_exp_year:
          parseInt(values.paymentDetails_cardExpiry.split('/', 2)[1].trim(), 10) + 2000,
        subscribe: '',
      }
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          loading: true,
        },
      })
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
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
    console.log('formValues: ', formValues)
    setFormValues({})
  }
  const [webSites, setWebSites] = useState([
    {
      name: 'websiteURL_0',
      clicksRequired: 'clicksRequired_0',
      nextLength: 1,
    },
  ])

  const [amountToPay, setAmountToPay] = useState(100)

  const [formValues, setFormValues] = useState({
    totalClicks: 100,
    launchDate: new Date(),
    websites: [],
  })

  const addOrRemoveWebSites = (addWebsite, index) => {
    const freshListOfWebSites = [...webSites]
    if (addWebsite) {
      const nextLength = webSites[webSites.length - 1].nextLength + 1
      freshListOfWebSites.push({
        name: `websiteURL_${nextLength}`,
        clicksRequired: `clicksRequired_${nextLength}`,
        nextLength,
      })
    } else {
      freshListOfWebSites.splice(index, 1)
    }
    setWebSites(freshListOfWebSites)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }

  const marks = {
    100: {
      style: { left: '0%', display: 'none' },
      label: '100',
    },
    250: {
      style: { left: '20%', display: 'none' },
      label: '250',
    },
    500: {
      style: { left: '40%', display: 'none' },
      label: '500',
    },
    1000: {
      style: { left: '60%', display: 'none' },
      label: '1000',
    },
    2500: {
      style: { left: '80%', display: 'none' },
      label: '2500',
    },
    5000: {
      style: { left: '100%', display: 'none' },
      label: '5000',
    },
  }

  return (
    <div>
      <Helmet title="Order Clicks" />
      <div className="card">
        <div className="card-body my-slider">
          <h5 className="mb-4">
            <strong>Buy Clicks</strong>
          </h5>
          <Form
            {...formItemLayout}
            labelAlign="left"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="numberOfClicks" label="Number of Clicks">
              <Slider
                marks={marks}
                max={5000}
                min={100}
                step={null}
                onAfterChange={e => setAmountToPay(e)}
              />
            </Form.Item>
            {webSites.map((website, index) => (
              <Form.Item
                key="index"
                label={webSites.length === 1 ? 'Website' : 'Website and Clicks'}
                style={{ marginBottom: 0 }}
              >
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  name={website.name}
                  rules={[
                    { required: true, message: 'Please input Website URL' },
                    {
                      type: 'url',
                      message: 'Please enter valid Webssite',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Website"
                    addonBefore={
                      index !== 0 && (
                        <div onClick={() => addOrRemoveWebSites(false, index)} aria-hidden="true">
                          <Tooltip title="Remove Website">
                            <li>
                              <i className="fe fe-minus-circle" />
                            </li>
                          </Tooltip>
                        </div>
                      )
                    }
                    addonAfter={
                      <div onClick={() => addOrRemoveWebSites(true)} aria-hidden="true">
                        <Tooltip title="Add One More Website">
                          <li>
                            <i className="fe fe-plus-circle" />
                          </li>
                        </Tooltip>
                      </div>
                    }
                  />
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                  name={website.clicksRequired}
                  rules={[{ required: true, message: 'Please input number of Clicks' }]}
                >
                  <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Form.Item>
            ))}
            <Form.Item
              name="requiredDate"
              label="Select Date"
              rules={[{ required: true, message: 'Please Select Date' }]}
            >
              <DatePicker className="mb-2" disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item label="Payment Details" name="paymentDetails">
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                rules={[{ required: true, message: 'Please input card number' }]}
                name="paymentDetails_cardNumber"
              >
                <PaymentInputsWrapper {...wrapperProps}>
                  <svg {...getCardImageProps({ images })} />
                  <input {...getCardNumberProps()} name="creditCardNumber" />
                </PaymentInputsWrapper>
              </Form.Item>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(19% - 8px)' }}
                rules={[{ required: true, message: 'Please input expiry' }]}
                name="paymentDetails_cardExpiry"
              >
                <PaymentInputsWrapper {...wrapperProps}>
                  <input {...getExpiryDateProps()} name="creditCardExpiry" />
                </PaymentInputsWrapper>
              </Form.Item>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                rules={[{ required: true, message: 'Please input CVC' }]}
                name="paymentDetails_cardCVV"
              >
                <PaymentInputsWrapper {...wrapperProps}>
                  <input {...getCVCProps()} name="creditCardCVC" />
                </PaymentInputsWrapper>
              </Form.Item>
            </Form.Item>
            {/* <Form.Item
              label="Payment Details"
              rules={[{ required: true, message: 'Please input Amount' }]}
              name="paymentDetails"
            >
              <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />
                <input {...getCardNumberProps()} name="creditCardNumber" />
                <input {...getExpiryDateProps()} name="creditCardExpiry" />
                <input {...getCVCProps()} name="creditCardCVC" />
              </PaymentInputsWrapper>
            </Form.Item> */}
            <Form.Item name="amount" label="Amount">
              {`$ ${amountToPay}`}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="text-center w-100"
              loading={user.loading}
            >
              <strong>Order Now</strong>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(OrderForm)
