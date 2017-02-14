import React from 'react'
import DemoComponent from '../component/DemoComponent'

const DefaultView = () => (
  <div>
    <h1> Default Container for <%= name %> module</h1>
    <DemoComponent/>
    <p>Explore the following files for details</p> 
    <ul>
       <li> /src/<%= name %>/container/Container.js</li>
       <li> /src/<%= name %>/container/Default.js</li>
       <li> /src/<%= name %>/component/DemoComponent.js</li>
    </ul>
  </div>
)


export default DefaultView

