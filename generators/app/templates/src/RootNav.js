//import React from 'react'
import React from 'react'
import { Menu, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import { fromNullable, Just, Nothing } from 'data.maybe'
import R from 'ramda'


const BrandRenderer = ({ className, children, width }) => {
  const Brand = styled.div`
    margin-right: 0;
    width:${width}px;
  `
  return <Brand
    /* needed to override semantic-ui defaults*/
    style={{ borderRadius:'0' }}
    className={className}>
      {children}
    </Brand>
}

const renderNav = Nav => 
  Array.isArray(Nav) ? Nav : <Nav/>


//todo: may need to configrue security to not show links
const Nav = ({ brandWidth, navs= [] }) =>  {

  const Brand = styled.div`
    background-color: #767676;
    width:${brandWidth}px;
    display: flex;
    align-items: center;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    color: white;
    font-size: 1.4em;
    font-weight: Bold;
    padding-left: 1.3em;
    border: 1px solid #767676;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  `
  return ( 
    <Menu>
      <Brand>{'<%= name %>'}</Brand>
      {
        fromNullable(navs)
        .map(R.map(renderNav))
        .getOrElse(null)
      }
    </Menu>
  )
}

export default Nav
