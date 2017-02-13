import React from 'react'
import { connect } from 'react-redux'
import { storeApiUrl } from 'core/actions'
import { Redirect } from 'react-router-dom'
import moment from 'moment'


const mapDispatchToProps =  ({
  storeApiUrl,
})


class AppEntry extends React.Component {

  constructor(props) {
    super(props)
    const { params:{ url }, storeApiUrl } = props
    storeApiUrl(atob(url))
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
    
  }
}


export default connect(null,mapDispatchToProps)(AppEntry)
