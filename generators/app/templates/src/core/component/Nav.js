//import React from 'react'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Menu, Label } from 'semantic-ui-react'

const linkRenderer = ({ to, className, children }) => (
  <Link to={to} className={className} activeClassName="active" >{children}</Link>
)

const labelRenderer = ({ className, children, width }) => (
  <div className={className}
    style={{
      width:`${width}px`,
			marginRight: '0',
			borderRadius: '0'
    }}
  >
    {children}
  </div>
)

//todo: may need to configrue security to not show links
const Nav = ({ brandWidth }) => (
  <Menu>
    <Label color="grey" width={brandWidth} size ="big" as={labelRenderer}>Power Spark UI</Label>
    <Menu.Item name='Calculation Results' to="/calc-results" as={linkRenderer}/>
    <Menu.Item name='Input Diff Report' to="/input-diffs" as={linkRenderer}/>
    {
    //  <Menu.Item name='Calculation Diff Report' to="/calc-diffs" as={linkRenderer}/>
    }
  </Menu>
)

export default Nav
