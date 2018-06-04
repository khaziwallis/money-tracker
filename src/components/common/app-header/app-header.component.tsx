import * as React from 'react';
import './app-header.component.css';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { SideDrawer } from './../../../services/ui.service';

import { ENV } from './../../../env';


export class AppHeader extends React.Component {

  public toggleDrawer() {
  	new SideDrawer().toggle();
  }
  
  public render() {
    return (
      <header className="app-header">
      	<IconButton className="menu" aria-label="Delete" onClick={this.toggleDrawer}>
        	<Icon>menu</Icon>
        </IconButton>
      	<div className="logo">{ENV.APP_NAME}</div>
        <div className="right">
          <IconButton className="menu" aria-label="Delete" onClick={this.toggleDrawer}>
            <Icon>settings</Icon>
          </IconButton>
        </div>
      </header>
    );
  }
}

 