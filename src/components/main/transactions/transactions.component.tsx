import * as React from 'react';
import './transactions.component.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { TransactionsListItem } from './transactions-list-item/transactions-list-item.component';

interface IState {
	view: string
}

export class Transactions extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = { view: 'aaa' };
    setTimeout( () => { this.state.view = 'sss'}, 2000);
  }

  public render() {
    return (
      <div className="lyt-cnt">
        <div className="_hdr">
          <div className="_ttl"> Transactions </div>
          <div className="_right">
             <Button color="primary" size="small" className="_always">
               <Icon className="ic-space-btn-left">add</Icon>
                Transaction
             </Button>
          </div>
        </div>
        <div className="_cont">
            
            <div className="_list">
            {[0,1,2,3,4,5,6,7,8,9,11,12,14,15,16].map((index)=>
               <TransactionsListItem key={index}/>
             )}
          </div>

        </div>
      </div>
    );
  }
}

 