import * as React from 'react';
import { BrowserRouter as BrowserRouter,  Route} from "react-router-dom";

import { AppHeader } from './../common/app-header/app-header.component';
import { AppNav } from './../common/app-nav/app.nav.component';
import { Home } from './home/home.component';
import { Transactions } from './transactions/transactions.component';
import { Accounts } from './accounts/accounts.component';
import { SideDrawer, HeaderEvents } from './../../services/ui.service';
import { SettingDB } from './../../db/setting.db';
import { IRouterProps } from './../../services/model';

interface IState {
  isSettingComplete: boolean;
}

export class Main extends React.Component<IRouterProps, IState> {
  public state: IState;
  constructor(props) {
    super(props);
    this.state = {
      isSettingComplete: false
    }
    SettingDB.isSetupComplete((status: boolean) => {
      console.log('callong')
      if(!status) {
        this.props.history.push('/setup');
      }
      else  {
        this.setState({isSettingComplete: true});
        // this.props.history.push('/app/home');
      }
    });
    
  }


  public closeSideDrawer() {
    new SideDrawer().hide();
    new HeaderEvents().liveHideOnTopScroll();
  }

  public render() {
    return (
        <BrowserRouter basename="/app">
            <div>
              <div className={this.state.isSettingComplete ? "app" : 'display-none'}>
                <AppHeader/>
                <div className="app-nav-content active">
                   <div className="app-nav-bg-drop" onClick={this.closeSideDrawer}/>
                   <div className="app-nav">
                     <AppNav/>
                   </div>
                   <div className="app-content">
                       
                         <div>
                           <Route  exact={true} path={"/"} component={Home} />
                           <Route  path={"/accounts"} component={Accounts} />
                           <Route  path={"/transactions"} component={Transactions} />
                         </div>
                       
                     
                   </div>
                 </div>
              </div>
              <div className={!this.state.isSettingComplete ? "" : 'display-none'}>
                <div className="init-loader">Loading...</div>
              </div>
              
           </div>
        </BrowserRouter>
    );
  }
}

 