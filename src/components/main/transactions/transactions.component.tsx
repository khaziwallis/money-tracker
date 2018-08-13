import * as React from 'react';
import './transactions.component.css';
import {
          Button, Icon
       } from '@material-ui/core';

import { TransactionsListItem } from './transactions-list-item/transactions-list-item.component';
import { NewTransaction } from './new-transaction-modal/new-transaction-modal.component';

// import { AccountDB } from './../../../db/accounts.db';

interface IState {
	newTransactionModal: boolean
}

export class Transactions extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
      newTransactionModal: true
    };

    // AccountDB.newTransaction(1333, 1, "4082a11d-7ec6-40a4-97f1-bea9b5852bc6", (res)=> {
    //   console.log("Transaction complte", res);
    // }, (err)=> {
    //   console.log(err);
    // })
  }


  public openNewTransactionModal = () => {
    this.setState({newTransactionModal: true});
  }

  public onNewTransactionModalClose = () => {
    this.setState({newTransactionModal: false})
  }

  public render() {
    return (
      <div className="lyt-cnt _transactions">
        <div className="_hdr">
          <div className="_ttl"> Transactions </div>
          <div className="_right">
             <Button color="primary" size="small" className="_always" onClick={this.openNewTransactionModal}>
               <Icon className="ic-space-btn-left">add</Icon>
                Transaction
             </Button>
          </div>
        </div>
        <div className="_cont">

            <div className='table-header-bg'>
              <div/>
             </div>
            
            <div className="_list">
            <div className="_tble-header">
              <div/>
              <div className="money text-center">
                <span>
                  <span>Amount</span>
                </span>
              </div>
              <div className="acc">
                <span>
                  <span>Account</span>
                </span>
              </div>
              <div className="desc">
                <span>
                  <span>Desc</span>
                </span>
              </div>
              <div className="tag">
                <span>
                  <span>Tag</span>
                </span>
              </div>
              <div className="timestamp">
                <span>
                  <span>Date</span>
                </span>
              </div>
            </div>
            {[0,1,2,3,4,5,6,7,8,9,11,12,14,15,16,17,18,19,21,22,23].map((index)=>
               <TransactionsListItem key={index}/>
             )}
          </div>

        </div>

        <NewTransaction 
          open={this.state.newTransactionModal}
          onClose={this.onNewTransactionModalClose}  />
      </div>
    )
  }
}

 