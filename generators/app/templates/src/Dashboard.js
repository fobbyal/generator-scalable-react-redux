import React from 'react'
import { BrowserRouter, Match, Miss } from 'react-router'
import Nav from 'core/component/Nav'
import { Container } from 'semantic-ui-react'
import { Input, Menu } from 'semantic-ui-react'


const SideBarContainer = ({ className,children,width }) => (
  <div 
    className={className}
    style={{
			borderTop: 'none',
      top:'43px',
      bottom: '0px',
      width: `${width}px`
    }}
  >
    {children}
  </div>
)

const development = process.env.NODE_ENV===undefined||process.env.NODE_ENV!=='production'
const basename = development ? undefined : '/ui'

const Comp = _ => ( <div>Please create new Componnets</div> )

const Dashboard = () => (
  <BrowserRouter basename={basename}>
    <div>
        <Nav brandWidth="250"/>
        {/* Side bar */}
        <Menu vertical width="251" className="fixed" as={SideBarContainer}>
          <div> empty side bar </div.
        </Menu>
        <div style = {{ marginLeft: '250px', paddingLeft: '1.2em' }} >
          <Match exactly pattern="/test" component={Comp}/>
        </div>
    </div>
  </BrowserRouter>
)

export default Dashboard
