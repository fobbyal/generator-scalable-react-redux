import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from './RootNav'
import { Menu } from 'semantic-ui-react'
import { Container as CoreConatiner, navs as coreNavs } from 'core'

const development = process.env.NODE_ENV===undefined||process.env.NODE_ENV!=='production'
const basename = development ? undefined : '/ui'

/** add more views and navs here as modules grow **/
const Containers = [CoreConatiner]
const navs = [coreNavs]


const Dashboard = () => (
  <BrowserRouter basename={basename}>
    <div>
      <Nav navs={navs} brandWidth="250"/>
      { Containers.map((Container,i) => <Container key={i}/>)}

    </div>
  </BrowserRouter>
)

export default Dashboard
