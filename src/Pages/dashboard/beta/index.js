/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { DownOutlined } from '@ant-design/icons'
import {
  Calendar,
  // Badge,
  Table,
  Dropdown,
  Button,
  Menu,
  Input,
  Slider,
  Form,
  DatePicker,
  InputNumber,
  Tooltip,
  notification,
} from 'antd'
import ChartistGraph from 'react-chartist'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import moment from 'moment'
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs'
import images from 'react-payment-inputs/images'
import { isEmpty } from 'lodash'
import * as qs from 'querystring'
import axios from 'axios'

// import { css } from 'styled-components';

import {
  // rangeSlider
  // calendarData,
  // weekChartistData,
  monthCartistData,
  taskTableData,
  tableData,
} from './data.json'

import style from './style.module.scss'

// Calendar Settings //

// Week Chartist Settings //
// const weekChartistOptions = {
//   fullWidth: true,
//   showArea: false,
//   chartPadding: {
//     right: 30,
//     left: 0,
//   },
//   plugins: [
//     // tooltip({
//     //   seriesName: false,
//     // }),
//   ],
// }

// Month Chartist Settings //
const monthChartistOptions = {
  seriesBarDistance: 10,
}

const mapStateToProps = ({ user, dispatch, newCampaign = {} }) => ({
  user,
  dispatch,
  newCampaign,
})

const DashboardBeta = ({ user, dispatch, newCampaign }) => {
  const payloadData = {
    userID: user.userId,
    min: 0,
    max: 31,
    sortBy: 'launchDate',
    month: 8,
    year: 2020,
  }

  const prevProps = useRef()
  console.log('prevProps', prevProps)
  console.log('isEmpty(newCampaign)', isEmpty(newCampaign.newCampaign))
  // useEffect(async () => {
  //   // code to run on component mount
  //   console.log('USE EFFECT CALLED')
  //   // if (isEmpty(newCampaign.newCampaign)) {
  //     console.log('INSIDE YOUR CONDITION')
  //     await dispatch({
  //       type: 'newCampaign/GET_CALENDER_DATA',
  //       payload: payloadData,
  //     })
  //   // }
  // })

  function getListData(value) {
    const date = value.date()
    console.log(newCampaign.newCampaign.orderDetails)
    const orderArray = newCampaign.newCampaign.orderDetails
    const def = []
    orderArray.forEach(element => {
      const str = element.launchDate
      const parts = str.slice(0, -1).split('T')
      const dateComponent = parts[0]
      const comp = parseInt(dateComponent.slice(8, 10), 10)

      if (comp === date) {
        console.log('MATCH FOUND')
        def.push(element)
      }
      return null
    })

    return def || []

    // const itemName = `date_${date}`
    // let listData
    // if (calendarData[itemName] !== undefined) {
    //   console.log("calendarData[itemName]",calendarData[itemName])
    //   listData = calendarData[itemName]
    // }
    // return listData || []
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current < moment().subtract(1, 'day')
  }

  function dateCellRender(value) {
    const listData = getListData(value)
    // console.log('listData', listData)
    return (
      <div className="events">
        {listData.map(item =>
          item.websites.map(subitem => (
            <div key={subitem.launchDate}>
              * website: <b>{subitem.website} </b>
              <br />
              <i>* clicks:</i> <b>{subitem.clicks}</b>
            </div>
          )),
        )}
      </div>
    )
  }

  function getMonthData(value) {
    const month = value.month() + 1

    const orderArray = newCampaign.newCampaign.orderDetails
    const def = []
    orderArray.forEach(element => {
      const str = element.launchDate
      const parts = str.slice(0, -1).split('T')
      const dateComponent = parts[0]
      const comp = parseInt(dateComponent.slice(5, 7), 10)
      if (comp === month) {
        def.push(element)
      }
      return null
    })

    return def || []
  }

  function monthCellRender(value) {
    const listData = getMonthData(value)

    return listData ? (
      <div className="notes-month">
        {listData.map(item =>
          item.websites.map(subitem => (
            <div key={subitem.launchDate}>
              * website: <b>{subitem.website} </b>
              <br />
              <i>* clicks:</i> <b>{subitem.clicks}</b>
            </div>
          )),
        )}
      </div>
    ) : null
  }

  // function handleDateChange(value) {
  //   console.log('month changed', value.month() + 1)
  //   console.log('year changed', value.year())

  //   const changedPayloadData = {
  //     userID: user.userId,
  //     min: 0,
  //     max: 100000,
  //     sortBy: 'launchDate',
  //     month: value.month() + 1,
  //     year: value.year(),
  //   }

  //   dispatch({
  //     type: 'newCampaign/GET_CALENDER_DATA',
  //     payload: changedPayloadData,
  //   })
  // }

  function handlePannelChange(value, mode) {
    if (mode === 'month') {
      const changedPayloadData = {
        userID: user.userId,
        min: 0,
        max: 100000,
        sortBy: 'launchDate',
        month: value.month() + 1,
        year: value.year(),
      }

      dispatch({
        type: 'newCampaign/GET_CALENDER_DATA',
        payload: changedPayloadData,
      })
    } else if (mode === 'year') {
      const changedPayloadData = {
        userID: user.userId,
        min: 0,
        max: 100000,
        sortBy: 'launchDate',
        // month: value.month() + 1,
        year: value.year(),
      }

      dispatch({
        type: 'newCampaign/GET_CALENDER_DATA',
        payload: changedPayloadData,
      })
    }
  }

  const [taskTableSelectedRowKeys, setTaskTableSelectedRowKeys] = useState([])

  const onSelectChange = keys => {
    setTaskTableSelectedRowKeys(keys)
  }

  const taskTableRowSelection = {
    taskTableSelectedRowKeys,
    onChange: onSelectChange,
  }

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1">Send a Message</Menu.Item>
      <Menu.Item key="2">View Profile</Menu.Item>
      <Menu.Item key="3">Share Earnings Report</Menu.Item>
    </Menu>
  )

  const taskTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: () => (
        <div className="pull-right">
          <Dropdown overlay={dropdownMenu}>
            <Button style={{ marginLeft: 8 }} size="small">
              Action <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ]

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
      title: 'Amount',
      dataIndex: 'salary',
      key: 'salary',
      sorter: (a, b) => a.salary - b.salary,
    },
  ]

  const OrderForm = () => {
    const {
      getCardNumberProps,
      getExpiryDateProps,
      getCVCProps,
      wrapperProps,
      getCardImageProps,
      meta,
    } = usePaymentInputs()

    // console.log('Props Update:.. ', order.orderSuccess)
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
      dispatch({
        type: 'order/PLACE_ORDER',
        payload: dataToSend,
      })
    }

    const onFinish = values => {
      let totalClicks = 0
      const websites = []
      webSites.forEach(website => {
        totalClicks = values[website.clicksRequired] + totalClicks
        websites.push({
          website: values[website.name],
          clicks: values[website.clicksRequired],
        })
      })
      if (totalClicks !== amountToPay) {
        notification.error({
          key: 'clicksIssue',
          message: 'Clicks not Matched',
          description: 'Number Clicks should equal to Splitting Clicks',
          placement: 'topLeft',
          duration: 5,
        })
      } else {
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
    }
    const [webSites, setWebSites] = useState([
      {
        name: 'websiteURL_0',
        clicksRequired: 'clicksRequired_0',
        nextLength: 1,
      },
    ])

    const [amountToPay, setAmountToPay] = useState(100)

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
        xs: { span: 28 },
        sm: { span: 8 },
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
        style: { left: '50%', display: 'none' },
        label: '1000',
      },
      2500: {
        style: { left: '60%', display: 'none' },
        label: '2500',
      },
      5000: {
        style: { left: '70%', display: 'none' },
        label: '5000',
      },
      10000: {
        style: { left: '80%', display: 'none' },
        label: '10000',
      },
      25000: {
        style: { left: '100%', display: 'none' },
        label: '25000',
      },
    }

    return (
      <div className="card-body">
        <Helmet title="Dashboard: New Campaign" />
        <div className="">
          <div className="">
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
                  max={25000}
                  min={100}
                  step={null}
                  onAfterChange={e => setAmountToPay(e)}
                />
              </Form.Item>
              {webSites.map((website, index) => (
                <Form.Item
                  label={webSites.length === 1 ? 'Website' : 'Website and Clicks'}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
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
                    style={{ display: 'inline-block', width: 'calc(50% - 9px)', margin: '0 9px' }}
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
                label="Select Campaign Start Date"
                rules={[{ required: true, message: 'Please Select Date' }]}
              >
                <DatePicker className="ml-2" disabledDate={disabledDate} />
              </Form.Item>
              <Form.Item label="Payment Details" name="paymentDetails" className="inputMerge">
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
                  rules={[{ required: true, message: 'Please input card number' }]}
                  name="paymentDetails_cardNumber"
                >
                  <PaymentInputsWrapper {...wrapperProps}>
                    <svg {...getCardImageProps({ images })} />
                    <input
                      {...getCardNumberProps()}
                      name="creditCardNumber"
                      style={{ width: '6em' }}
                    />
                  </PaymentInputsWrapper>
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(25% - 6px)' }}
                  rules={[{ required: true, message: 'Please input expiry' }]}
                  name="paymentDetails_cardExpiry"
                >
                  <PaymentInputsWrapper {...wrapperProps}>
                    <input {...getExpiryDateProps()} name="creditCardExpiry" />
                  </PaymentInputsWrapper>
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(20% - 6px)' }}
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
                {`$ ${amountToPay}.00`}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="text-center w-100"
                loading={user.loading}
              >
                <strong>SUBMIT ORDER</strong>
              </Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }

  const General24 = ({ successReferals = [] }) => {
    return (
      <div className="text-white font-weight-bold">
        <div className="font-size-21 mb-2">Successfully Referred</div>
        <div className="d-flex align-items-end flex-wrap">
          <div className="pr-3 mr-auto">{/* <i className="fe fe-server font-size-48" /> */}</div>
          <div className="font-size-36 mb-n2">{successReferals.length}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Helmet title="Dashboard: Beta" />
      <div className="row">
        <div className="col-lg-12 col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>MOST RECENT NEWS</strong>
              </div>
              <div className="text-muted">
                Be sure top keep an eye out for email notification on the most recent news.
              </div>
            </div>
            <div className="card-body">
              <div>
                <div className="rounded overflow-hidden position-relative">
                  <img
                    className="img-fluid"
                    src="resources/images/content/photos/6.jpeg"
                    alt="Lion"
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row">
                  <div className={`${style.user} text-center pl-4 pr-5 flex-shrink-0`}>
                    <div className="kit__utils__avatar kit__utils__avatar--rounded kit__utils__avatar--size84 border border-5 border-white d-inline-block">
                      <img src="resources/images/avatars/2.jpg" alt="Mary Stanform" />
                    </div>
                    <div className="font-size-14 font-weight-bold">Helen Maggie</div>
                    <a href="#" className="font-size-14 text-gray-5">
                      @hellen_m
                    </a>
                  </div>

                  <p className="pt-3 mb-0">
                    {/* <div className="cui__utils__heading mb-0">
                      <strong>DISPLAY POST TITLE HERE</strong>
                    </div> */}
                    <div className="text-muted">
                      {' '}
                      Clicks delivers the best traffic across the internet marketers looking to make
                      money online and enterprise companies with a sought after compensation plan
                      using a downline infrastructure. Earn up to 100% commissions across all
                      revenue generated through our systems from the members you refer.
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>NUMBER OF REFERRALS</strong>
              </div>
            </div>
            <div className="card-body">
              <div className="card bg-primary border-0 mb-4">
                <div className="card-body">
                  <General24 successReferals={user.successReferrals} />
                </div>
              </div>
              <div className="card bg-light border-0 mb-0">
                {/* <div className="card-body">
                  <General24v1 />
                </div> */}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>LATEST REFERRALS</strong>
              </div>
              <div className="text-muted">
                Manage teams with built-in communication tools and resources.
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="kit__utils__table">
                    <Table
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      rowSelection={taskTableRowSelection}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>ORDER FORM</strong>
              </div>
              <div className="text-muted">
                The industry leading traffic source at press of a button
              </div>
            </div>
            <div className="card-body">
              <div className="">
                <OrderForm />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Earnings Statistics</strong>
              </div>
              <div className="text-muted">Keep track of referrals and commissions earned</div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card border-0 bg-success text-white">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center">
                        {/* <i className="fe fe-server font-size-50 mr-3" /> */}
                        <div>
                          <div className="font-size-21 font-weight-bold">Today</div>
                          <div className="font-size-15">$1,590.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border-0 bg-primary text-white">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center">
                        {/* <i className="fe fe-server font-size-50 mr-3" /> */}
                        <div>
                          <div className="font-size-21 font-weight-bold">This Week</div>
                          <div className="font-size-15">$30,400.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center">
                        {/* <i className="fe fe-server font-size-50 mr-3 text-gray-5" /> */}
                        <div className="text-dark">
                          <div className="font-size-21 font-weight-bold"> Yesterday </div>
                          <div className="font-size-15">$5,000.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border-0 bg-danger text-white">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center">
                        {/* <i className="fe fe-server font-size-50 mr-3" /> */}
                        <div>
                          <div className="font-size-21 font-weight-bold">All Time</div>
                          <div className="font-size-15">$1,400,250.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Server Configuration</strong>
              </div>
              <div className="text-muted">
                Block with important Server Configuration information
              </div>
            </div>
            <div className="card-body">
              <div className="mb-5">
                <Slider marks={rangeMarks} defaultValue={rangeSlider.first} />
              </div>
              <div className="mb-4">
                <Slider range marks={rangeMarks} defaultValue={rangeSlider.second} />
              </div>
            </div>
          </div> */}
          {/* <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Week Revenue Statistics, Billions</strong>
              </div>
              <span className="mr-2">
                <span className="kit__utils__donut kit__utils__donut--primary" />
                Nuts
              </span>
              <span className="mr-2">
                <span className="kit__utils__donut kit__utils__donut--success" />
                Apples
              </span>
              <span className="mr-2">
                <span className="kit__utils__donut kit__utils__donut--yellow" />
                Peaches
              </span>
            </div>
            <div className="card-body">
              <ChartistGraph
                data={weekChartistData}
                options={weekChartistOptions}
                type="Line"
                className="chart-area height-300 mt-4 chartist"
              />
            </div>
          </div> */}
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>MONTH SITE VISITS GROWTH, %</strong>
              </div>
              <span className="mr-2">
                <span className="kit__utils__donut kit__utils__donut--primary" />
                Income
              </span>
              <span className="mr-2">
                <span className="kit__utils__donut kit__utils__donut--success" />
                Outcome
              </span>
            </div>
            <div className="card-body">
              <ChartistGraph
                data={monthCartistData}
                options={monthChartistOptions}
                type="Bar"
                className="chart-area height-300 mt-4 chartist"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <div className="row">
                  <div className="col-lg-3">
                    <div className={`${style.item} mb-xl-0 mb-3`}>
                      <span className={style.icon1}>
                        <i className="fe fe-home" />
                      </span>
                      <div className={style.desc}>
                        <span className={style.title}>Most Recent Commissions</span>
                        <p className={style.p}>
                          There may be a short dealy on reporting updates depending server capacity.
                        </p>
                      </div>
                      <div className={`${style.line} bg-success`} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className={`${style.item} mb-xl-0 mb-3`}>
                      <span className={style.icon1}>
                        <i className="fe fe-command" />
                      </span>
                      <div className={style.desc}>
                        <span className={style.title}>Order Information</span>
                        <p className={style.p}>Get paid to 100% on user referrals for life time.</p>
                      </div>
                      <div className={`${style.line} bg-primary`} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className={`${style.item} mb-xl-0 mb-3`}>
                      <span className={style.icon1}>
                        <i className="fe fe-star" />
                      </span>
                      <div className={style.desc}>
                        <span className={style.title}>Other Details</span>
                        <p className={style.p}>Date when order was placed and user information.</p>
                      </div>
                      <div className={`${style.line} bg-warning`} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className={`${style.item} mb-xl-0 mb-3`}>
                      <span className={style.icon1}>
                        <i className="fe fe-database" />
                      </span>
                      <div className={style.desc}>
                        <span className={style.title}>Commission Amounts</span>
                        <p className={style.p}>
                          Here are your earnings for the most recent orders placed by referrals.
                        </p>
                      </div>
                      <div className={`${style.line} bg-gray-5`} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="kit__utils__table">
                <Table columns={tableColumns} dataSource={tableData} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>ORDER SCHEDULING</strong>
              </div>
              <div className="text-muted">
                View upcoming orders and place a newnew order by selecting an upcoming calender
                date.
              </div>
            </div>
            <div className="card-body">
              <Calendar
              // dateCellRender={dateCellRender}
              // monthCellRender={monthCellRender}
              // onChange={handleDateChange}
              // onPanelChange={handlePannelChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(DashboardBeta)
