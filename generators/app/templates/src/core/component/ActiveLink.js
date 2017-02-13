import React from 'react'
import { Menu } from 'semantic-ui-react'
import { fromNullable, Just, Nothing } from 'data.maybe'
import { Route, Link } from 'react-router-dom'


const LinkRenderer = ({ match, exact, className, children, ...rest }) =>  {
  const cn = fromNullable(match)
    .map(m => exact? m.isExact : true) 
    .map(m => m ? `${className} active`: className)
    .getOrElse(className)

  return (
    <Link {...rest} className={cn} > 
      {children}
    </Link>
  )
}

const ActiveLink = ({ name, exact, path, ...rest }) => (
  <Route path={path} children={({ match }) => (
    <Menu.Item
      match={match}
      name={name}
      to={path}
      as={LinkRenderer}
      {...rest}
    />
  )}/>
)

export default ActiveLink
