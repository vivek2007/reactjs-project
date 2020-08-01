import React from 'react'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import { Input, Slider, Form, DatePicker, InputNumber, Button } from 'antd'
// import { css } from 'styled-components';
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs'
import images from 'react-payment-inputs/images'

function disabledDate(current) {
  // Can not select days before today and today
  return current < moment().subtract(1, 'day')
}

const AdvancedFormExamples = () => {
  // const [cardInfo, setCardInfo] = useState({});

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    getCardImageProps,
  } = usePaymentInputs()

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
      <Helmet title="Advanced / Form Examples" />
      <div className="card">
        <div className="card-body my-slider">
          <h5 className="mb-4">
            <strong>Buy Clicks</strong>
          </h5>
          <Form {...formItemLayout} labelAlign="left">
            <Form.Item name="amount" label="Number of Clicks">
              <Slider marks={marks} max={5000} min={100} step={null} dots />
            </Form.Item>
            <Form.Item
              name="websiteURL"
              label="Website"
              rules={[
                { required: true, message: 'Please input Website URL' },
                {
                  type: 'url',
                  message: 'Please enter valid Webssite',
                },
              ]}
            >
              <Input placeholder="Enter Website" />
            </Form.Item>
            <Form.Item
              name="requiredDate"
              label="Select Date"
              rules={[{ required: true, message: 'Please Select Date' }]}
            >
              <DatePicker className="mb-2" disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item
              name="websiteURL"
              label="Website"
              rules={[
                { required: true, message: 'Please input Website URL' },
                {
                  type: 'url',
                  message: 'Please enter valid Webssite',
                },
              ]}
            >
              <Input placeholder="Enter Website" />
            </Form.Item>
            <Form.Item
              label="Payment Details"
              rules={[{ required: true, message: 'Please input Amount' }]}
            >
              <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />
                <input {...getCardNumberProps()} />
                <input {...getExpiryDateProps()} />
                <input {...getCVCProps()} />
              </PaymentInputsWrapper>
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please input Amount URL' }]}
            >
              <InputNumber
                defaultValue={1000}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                readOnly
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="text-center w-100">
              <strong>Order Now</strong>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AdvancedFormExamples
