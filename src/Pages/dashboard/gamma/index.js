/* eslint-disable */
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
// import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import { Table, Progress } from 'antd'
// import Chart12 from 'components/kit/widgets/Charts/12'
// import Chart12v1 from 'components/kit/widgets/Charts/12v1'
// import General5v1 from 'components/kit/widgets/General/5v1'
// import General2 from 'components/kit/widgets/General/2'
// import General2v1 from 'components/kit/widgets/General/2v1'
// import General2v2 from 'components/kit/widgets/General/2v2'
// import General13v1 from 'components/kit/widgets/General/13v1'
// import List10 from 'components/kit/widgets/Lists/10'
// import List11 from 'components/kit/widgets/Lists/11'

// import {
//   inboundBandwidthData,
//   outboundBandwidthData,
//   supportCasesTableData,
//   supportCasesPieData,
// } from './data.json'

import styles from './style.module.scss'

const boundChartistOptions = {
  showPoint: true,
  showLine: true,
  showArea: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  chartPadding: 0,
  low: 0,
  plugins: [
    ChartistTooltip({
      anchorToPoint: false,
      appendToBody: true,
      seriesName: false,
    }),
  ],
}

const supportCasesPieOptions = {
  donut: true,
  donutWidth: 35,
  showLabel: false,
  plugins: [
    ChartistTooltip({
      anchorToPoint: false,
      appendToBody: true,
      seriesName: false,
    }),
  ],
}

const supportCasesTableColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
    render: amount => {
      if (amount === 'Negative') {
        return <span className="text-danger font-weight-bold">{amount}</span>
      }
      return <span className="text-primary font-weight-bold">{amount}</span>
    },
  },
]

const mapStateToProps = ({ dispatch, membershipLevel = {} }) => {
  const data = {
    membership: membershipLevel.membershipLevelData,
    dispatch,
  }
  return data
}

const DashboardGamma = ({ dispatch, membership }) => {
  useEffect(() => {
    // code to run on component mount
    console.log('MEMBERSHIP LEVEL PAGE DID MOUNT')
    dispatch({
      type: 'membership-levels/GET_DATA',
    })
  }, [])

  function checkNextLevel() {
    for (var i = 0; i < membership.membershipLevels.length; i++) {
      if (membership.membershipLevels[i].clicksLeft > 0) {
        var currentClicks = membership.membershipLevels[i].clicks
        break
      }
    }
    let currentData = {
      clicks: currentClicks,
      clicksLeft: membership.totalClicksPurchased,
    }
    return currentData
  }

  var ProgressBarData = checkNextLevel()

  return (
    <div>
      <Helmet title="Dashboard Gamma" />

      <div className="kit__utils__heading">
        <h5>Membership Levels</h5>
      </div>

      <div className="card text-white bg-dark">
        <div className={`${styles.container} pt-3`}>
          <div className={`${styles.status} bg-success`} />
          <div className="mr-auto pb-3">
            <div className="text-uppercase font-weight-bold font-size-24 text-center">
              {membership.message}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Progress
          type="line"
          percent={((ProgressBarData.clicksLeft / ProgressBarData.clicks) * 100).toFixed()}
          // showInfo={true}
          strokeWidth={50}
          strokeColor="#0275d8"
          status="active"
          trailColor="#e9ecef"
        />
      </div>

      <div className="row">
        {membership.membershipLevels.map((value, index) => {
          index = index + 1
          return (
            <div className="col" key={index}>
              <div
                className={`card ${
                  index === 2 || index === 3
                    ? 'bg-light'
                    : index === 4 || index === 5
                    ? 'bg-primary'
                    : null
                }`}
              >
                <div className="card-body">
                  <div className="pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1">
                    <i
                      className={`fe font-size-80 mb-3 d-block ${
                        index === 4 || index === 5 ? 'fe-cpu text-white' : 'fe-inbox'
                      }`}
                    />
                    <div
                      className={`font-weight-bold font-size-36 ${
                        index === 4 || index === 5 ? 'text-light' : 'text-dark '
                      }`}
                    >
                      Level {value.level}
                    </div>
                    <div className="text-dark font-weight-bold font-size-28 mb-3">
                      <mark className="rounded" style={{ padding: '1px 10px 1px 10px' }}>
                        {value.clicks} Clicks
                      </mark>
                    </div>
                    <p className={`${index === 4 || index === 5 ? 'text-light' : 'text-dark '}`}>
                      {value.description}
                    </p>
                    <a
                      className={`btn width-130 mt-2 btn-lg rounded ${
                        index === 4 || index === 5 ? 'btn-white' : 'btn-primary'
                      }`}
                      href="#/order/order-form"
                    >
                      Order now
                    </a>
                    <div className="text-dark font-weight-bold font-size-30 mb-3 pt-3">
                      <span className="badge badge-danger rounded">
                        {value.clicksLeft} clicks left
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <Chart12 />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <Chart12v1 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <General13v1 />
          </div>
          <div className="card">
            <div className="card-body">
              <General5v1 />
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <div className="cui__utils__heading mb-0">
                <strong>RECENT INVITES</strong>
              </div>
            </div>
            <div className="card-body">
              <List10 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <General2 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <General2v1 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <General2v2 />
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="cui__utils__heading mb-0">
                    <strong>Inbound Bandwidth</strong>
                  </div>
                </div>
                <div className="card-body">
                  <strong className="font-size-36 text-dark">246Gb</strong>
                </div>
                <ChartistGraph
                  data={inboundBandwidthData}
                  options={boundChartistOptions}
                  type="Line"
                  className="height-250"
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className="graphCard card">
                <div className="card-header border-0 pb-0">
                  <div className="cui__utils__heading mb-0">
                    <strong>Outbound Bandwidth</strong>
                  </div>
                </div>
                <div className="card-body">
                  <strong className="font-size-36 text-dark">52Gb</strong>
                </div>
                <div className="utils__chartist utils__chartist--success">
                  <ChartistGraph
                    data={outboundBandwidthData}
                    options={boundChartistOptions}
                    type="Line"
                    className="height-250"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row"> 
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <div className="cui__utils__heading mb-0">
                <strong className="text-uppercase font-size-16">Support cases</strong>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6">
                  <div className="mb-3">
                    <Table
                      dataSource={supportCasesTableData}
                      columns={supportCasesTableColumns}
                      pagination={false}
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div
                    className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPieExample}`}
                  >
                    <div className="mb-4">
                      <ChartistGraph
                        data={supportCasesPieData}
                        type="Pie"
                        options={supportCasesPieOptions}
                      />
                    </div>
                    <div className="text-center mb-4">
                      <span className="mr-2">
                        <span className="kit__utils__donut kit__utils__donut--success" />
                        Ready
                      </span>
                      <span className="mr-2">
                        <span className="kit__utils__donut kit__utils__donut--primary" />
                        In Progress
                      </span>
                      <span className="mr-2">
                        <span className="kit__utils__donut kit__utils__donut--danger" />
                        Defected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <div className="cui__utils__heading mb-0">
                <strong className="text-uppercase font-size-16">Finance Stats</strong>
              </div>
            </div>
            <div className="card-body">
              <List11 />
            </div>
          </div>
        </div>
        </div>
        */}
    </div>
  )
}

export default connect(mapStateToProps)(DashboardGamma)
