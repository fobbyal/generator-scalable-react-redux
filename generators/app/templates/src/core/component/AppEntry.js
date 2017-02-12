import React from 'react'
import { connect } from 'react-redux'
import { storeSparkApiTarget } from 'core/actions'
import { Redirect } from 'react-router'
import { setCalcDate } from 'calc-result/actions'
import moment from 'moment'


const mapDispatchToProps =  ({
  storeSparkApiTarget,
  setCalcDate,
})


class AppEntry extends React.Component {
  constructor(props) {
    super(props)
    const { params:{ url,date },storeSparkApiTarget,setCalcDate } = props
    storeSparkApiTarget(atob(url))
    setCalcDate(moment(date))
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/calc-results'
      }}/>
    )
    
  }
}


export default connect(null,mapDispatchToProps)(AppEntry)
