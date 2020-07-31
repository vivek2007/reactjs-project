import React, { useState } from 'react'
import { connect } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import { Slider, Calendar, Badge, Table, Dropdown, Button, Menu } from 'antd'
import ChartistGraph from 'react-chartist'
import { Helmet } from 'react-helmet'
import General19 from 'components/kit/widgets/General/19'
import General24 from 'components/kit/widgets/General/24'
import General24v1 from 'components/kit/widgets/General/24v1'
import General14 from 'components/kit/widgets/General/14'
import General20 from 'components/kit/widgets/General/20'
import General20v1 from 'components/kit/widgets/General/20v1'
import General21 from 'components/kit/widgets/General/21'
import General21v1 from 'components/kit/widgets/General/21v1'
import General21v2 from 'components/kit/widgets/General/21v2'
import General21v3 from 'components/kit/widgets/General/21v3'
import General22 from 'components/kit/widgets/General/22'
import {
  rangeSlider,
  calendarData,
  weekChartistData,
  monthCartistData,
  taskTableData,
  tableData,
} from './data.json'

// Slider Range Settings //
const rangeMarks = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  60: '60',
  70: '70',
  80: '80',
  90: '90',
  100: '100',
}

// Calendar Settings //
function getListData(value) {
  const date = value.date()
  const itemName = `date_${date}`
  let listData
  if (calendarData[itemName] !== undefined) {
    listData = calendarData[itemName]
  }
  return listData || []
}

function dateCellRender(value) {
  const listData = getListData(value)
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  )
}

// Week Chartist Settings //
const weekChartistOptions = {
  fullWidth: true,
  showArea: false,
  chartPadding: {
    right: 30,
    left: 0,
  },
  plugins: [
    // tooltip({
    //   seriesName: false,
    // }),
  ],
}

// Month Chartist Settings //
const monthChartistOptions = {
  seriesBarDistance: 10,
}

const mapStateToProps = ({ user }) => ({
  user,
})

const DashboardBeta = ({ user }) => {
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
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
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
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      sorter: (a, b) => a.salary - b.salary,
    },
  ]

  return (
    <div>
      <Helmet title="Dashboard: Beta" />
      <div className="row">
        <div className="col-lg-12 col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Account Information</strong>
              </div>
            </div>
            <div className="card-body">
              <General19 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Referals & Earnings</strong>
              </div>
            </div>
            <div className="card-body">
              <div className="card bg-primary border-0 mb-4">
                <div className="card-body">
                  <General24 successReferals={user.successReferrals} />
                </div>
              </div>
              <div className="card bg-light border-0 mb-0">
                <div className="card-body">
                  <General24v1 />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Task Table</strong>
              </div>
              <div className="text-muted">Block with important Task Table information</div>
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
                <strong>Server Info</strong>
              </div>
              <div className="text-muted">Block with important Server Info information</div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="overflow-hidden rounded card border-0 mb-0">
                    <General20 />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="overflow-hidden rounded card border-0 mb-0">
                    <General20v1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Server Statistics</strong>
              </div>
              <div className="text-muted">Block with important Server Statistics information</div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <General21 />
                  <General21v1 />
                </div>
                <div className="col-lg-6">
                  <General21v2 />
                  <General21v3 />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
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
          </div>
          <div className="card">
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
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Month Site Visits Growth, %</strong>
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
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Chat</strong>
              </div>
              <div className="text-muted">Block with important Chat information</div>
            </div>
            <div className="card-body">
              <General14 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <General22 />
              </div>
              <div className="kit__utils__table">
                <Table columns={tableColumns} dataSource={tableData} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Calendar</strong>
              </div>
              <div className="text-muted">Block with important Calendar information</div>
            </div>
            <div className="card-body">
              <Calendar dateCellRender={dateCellRender} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(DashboardBeta)
