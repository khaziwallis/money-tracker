import * as React from 'react';
import './account-list-item.component.css';
// import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { IAccountsArray } from './../../../../services/model';
import { Common } from './../../../../services/common.service';

interface IProps {
  item: IAccountsArray;
  index?: number;
  onFocus?: any;
  onClick?: any;
  selected?: boolean;
  loading?: boolean;
}

export class AccountListItem extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public selectItem = () => {
    if(this.props.onClick) {
      this.props.onClick(this.props.index, this.props.item)
    }
  }

  public render() {
    return (
      <a href="javascript:void(0);" 
         id="ITEM-NO-DESELECT"  
         className={"_Account_Item" + (this.props.selected ? " focus" : "") + (this.props.loading ? ' _loading reading-loader' : '')} 
         onFocus={this.selectItem} 
         onClick={this.selectItem}>
       <div className="avtr">
          <Icon className="ic-space-btn-left _icn">account_balance</Icon>
        </div>
        <div className="_dtls">
          <div className="_name">
            <Icon className="ic-space-btn-left _icn">account_balance_wallet</Icon>
            <div className="_lbl">{this.props.item.doc.name}</div>
          </div>
          <div className="_grp">
            Group: {Common.getCurrencyGroupLabel(this.props.item.doc.group)}
          </div>
          <div className="_blnce">
            <Icon className="_icn">attach_money</Icon>
            <div className='_lbl'>{this.props.item.doc.balance}</div>
          </div>
        </div>
      </a>
    );
  }
}

 