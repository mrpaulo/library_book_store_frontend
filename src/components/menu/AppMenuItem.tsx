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
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles } from '@material-ui/core/styles'
//Local components
import AppMenuItemComponent from './AppMenuItemComponent'
//Translation
import { useTranslation } from "react-i18next";
import "../../services/i18n/i18n";
//Style
import { List, ListItemIcon, ListItemText, Divider, Collapse } from '@material-ui/core'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

// React runtime PropTypes
export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
}

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
  items?: AppMenuItemProps[]
}

const AppMenuItem: React.FC<AppMenuItemProps> = props => {
  const { name, link, Icon, items = [] } = props
  const classes = useStyles()
  const isExpandable = items && items.length > 0
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation();

  function handleClick() {
    setOpen(!open)
  }

  const MenuItemRoot = (
    <AppMenuItemComponent className={classes.menuItem} link={link} onClick={handleClick}>
      {/* Display an icon if any */}
      {!!Icon && (
        <ListItemIcon className={classes.menuItemIcon}>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText primary={t(name)} inset={!Icon} />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </AppMenuItemComponent>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {
      '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',
        '& .MuiListItemIcon-root': {
          color: '#fff',
        },
      },
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenuItem
