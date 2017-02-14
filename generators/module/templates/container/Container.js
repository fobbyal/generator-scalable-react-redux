import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { ActiveLink } from 'core'
import DefaultContainer from './Default'

const CoreConatiner = () => (
<div> 
  <Route exact path="/<%= name %>" component={DefaultContainer}/>
</div>
)
export default CoreConatiner 

export const navs = [
  (<ActiveLink exact path="/<%= name %>" name="<%= name %>"/>),
]
