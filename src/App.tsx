import * as React from 'react';
import { BrowserRouter as BrowserRouter, Route, Switch } from "react-router-dom";
import './app.css';

import { Main } from './components/main/Main'
import { Setup } from './components/setup/setup.component';
import { SideDrawer, HeaderEvents } from './services/ui.service';
import { SettingDB } from './db/setting.db';
import { Common } from './services/common.service';

class Index extends React.Component {

  constructor(props) {
    super(props);
    SettingDB.isSetupComplete((status: boolean) => {
      console.log('callong')
      if(!status) {
        Common.navigateRouter('/setup');
      }
      else  {
        Common.navigateRouter('/app');
      }
    });
    
  }

  public render() {
    return (
      <div>
         <div className="init-loader">Loading...</div>
      </div>
    );
  }

}


class App extends React.Component {

  constructor(props) {
    super(props);
    SettingDB.isSetupComplete((status: boolean) => {
      console.log(status)
    })
  }

  public closeSideDrawer() {
    new SideDrawer().hide();
    new HeaderEvents().liveHideOnTopScroll();
  }
  public render() {
    return (
      <BrowserRouter>
                   <Switch>
                       <Route exact={true}  path="/" component={Index}/>
                       <Route  path="/app" component={Main}/>
                       <Route  path="/setup" component={Setup} />
                   </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
  