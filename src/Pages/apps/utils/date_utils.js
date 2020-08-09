import React from 'react'
import moment from 'moment'

const DateUtils = {}
export default DateUtils

export const getDifferenceTimeSpan = createdDate => {
  const now = moment()
  const date = moment(new Date(createdDate))
  const seconds = now.diff(date, 'seconds')
  const minutes = now.diff(date, 'minutes')
  const hours = now.diff(date, 'hours')
  const days = now.diff(date, 'days')
  const weeks = now.diff(date, 'weeks')
  const months = now.diff(date, 'months')
  const years = now.diff(date, 'years')
  let stringToreturn = ''
  if (seconds < 60) {
    stringToreturn = `${seconds} second(s) ago.`
  } else if (minutes < 60) {
    stringToreturn = `${minutes} minute(s) ago.`
  } else if (hours < 24) {
    stringToreturn = `${hours} hour(s) ago.`
  } else if (days < 7) {
    stringToreturn = `${days} day(s) ago.`
  } else if (weeks < 4) {
    stringToreturn = `${weeks} week(s) ago.`
  } else if (months < 12) {
    stringToreturn = `${months} month(s) ago.`
  } else {
    stringToreturn = `${years} year(s) ago.`
  }
  return <span>{stringToreturn}</span>
}
