import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import WelcomeTemplate from './WelcomeTemplate'
import SideBarExample from './SideBarExample'
import RetrieveExample from './RetrieveExample'
import ActiveLink from '../component/ActiveLink.js'

const CoreConatiner = () => (
<div> 
  <Route exact path="/side-bar-example" component={SideBarExample}/>
  <Route exact path="/retrieve-example" component={RetrieveExample}/>
  <Route exact path="/" component={WelcomeTemplate}/>
  {/* more Ruotes can be added here */}
</div>
)
export default CoreConatiner 

export const navs = [
  (<ActiveLink exact path="/side-bar-example" name="Route Example"/>),
  (<ActiveLink exact path="/retrieve-example" name="Retrieve Data Example"/>)
]
