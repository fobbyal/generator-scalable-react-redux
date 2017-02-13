import React from 'react'
import {
    connect
} from 'react-redux'
import {
    Button,
    Container
} from 'semantic-ui-react'
import R from 'ramda'

import {
    retrieveDummyData
} from '../actions'

import {
    getDummyData
} from '../selectors'

import {
    fromNullable,
    Just,
    Nothing
} from 'data.maybe'
import styled from 'styled-components'


const Msg =  styled.p`
  font-size: 1.4em
  font-weight: bold;
  color: #555;
`

const RetrieveExample = ({
    data,
    retrieveDummyData
}) => (
    <Container >
    <h2 className="ui huge header"> Retrieve data using redux + fetch </h2>
    <Msg>This page demostarts how to retrieve and display data from a json restful webservcie api</Msg> 
    <div> 
      <Button onClick={() => retrieveDummyData()} primary >
        Click to Retrieve from server
      </Button>
    </div>
    {
      fromNullable(data)
        .chain(d => R.isEmpty(d) ? Nothing() : Just(d))
        .map(d => (
          <pre><code> {JSON.stringify(data)} </code></pre>
        )).getOrElse(<div>Data not yet retrieved </div>)
    }
  </Container>
)

const mapStateToProps = state => ({
    data: getDummyData(state)
})

const mapDispatchToProps = ({
    retrieveDummyData
})

export default connect(mapStateToProps, mapDispatchToProps)(RetrieveExample)
