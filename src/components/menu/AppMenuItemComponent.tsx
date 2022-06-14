/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React, { forwardRef } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
//Style
import ListItem from '@material-ui/core/ListItem'

export interface AppMenuItemComponentProps {
  className?: string
  link?: string | null // because the InferProps props allows alows null value
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const AppMenuItemComponent: React.FC<AppMenuItemComponentProps> = props => {
  const { className, onClick, link, children } = props

  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }

  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />)}
      to={link}
    />
  )
}

export default AppMenuItemComponent