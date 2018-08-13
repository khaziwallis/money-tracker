import * as React from 'react';
import './tag-select.component.css';
import Chips from 'react-chips'
// import {
//           MenuItem, Typography, Chip
//        } from '@material-ui/core';




interface IState {
	chips: string[];
}
export class TagSelect extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
      chips: []
     };

    // AccountDB.newTransaction(1333, 1, "4082a11d-7ec6-40a4-97f1-bea9b5852bc6", (res)=> {
    //   console.log("Transaction complte", res);
    // }, (err)=> {
    //   console.log(err);
    // })
  }

  public onChange = chips => {
    this.setState({ chips });
  }

  public renderChip = (value: any, e) => {
    return (<div>{value} - hk</div>)
  }

  public renderSug = (value) => {
    return (<div>{value}</div>)
  }

  public render() {
    return (
      <div className="tag-select">
      	Tag Select
        <Chips
          value={this.state.chips}
          onChange={this.onChange}
          suggestions={["Your", "Data", "Here"]}
          renderSuggestion={this.renderSug}
        />
      </div>
    )
  }
}

 