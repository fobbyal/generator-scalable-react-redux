import React from 'react'
import { Menu } from 'semantic-ui-react'

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


const ExampleView = () => (
<div> 
  <Menu
    vertical
    width="251"
    className="fixed"
    as={SideBarContainer}
  >
    <div>empty side bar </div>
  </Menu>

  <div style = {{ fontSize:'1.1em', marginLeft: '250px', paddingLeft: '1.2em', paddingRight:'1.2em' }} >
    {/** following content can be replaced **/}
    <div className="ui huge message page grid">
      <h1 className="ui huge header">Example Route</h1>
      <p>
        This is a template for an Exampe Ruote with the react-router-dom also known as react-router v4.
        This Route features a Side Bar to the left as well as a active Link indicator on the NAV bar.
        Plase explore the following files for details
      </p> 
      <div style={{ width:'100%' }}>
      <ul>
         <li> /src/core/container/ExampleView.js </li>
         <li> /src/core/container/Container.js</li>
      </ul>
      </div>
      <div>
        <a href="https://reacttraining.com/" 
          style={{ marginLeft:'14px' }}
          className="ui blue button">
            Learn more About Routing »
        </a>
      </div>
    </div>
  </div>
</div>
  
)

export default ExampleView
