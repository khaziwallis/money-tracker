import * as React from 'react';
import './transactions-list-item.component.css';

import Icon from '@material-ui/core/Icon';


export class TransactionsListItem extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
                <a className="_itm-out"
                	 href="javascript:void(0);">
                  <div className="_itm"
                  	 
                   >
                  	<div>
	                  	<div className="_icn down">
	                  		<Icon className="_icon">arrow_right_alt</Icon>
	                  	</div>
                  	</div>
                  	<div className="_moneyOuter">
                  		<div className='_money'>2200 /-</div>
                  	</div>
                  	<div className="_accOuter">
		              	<div className='_acc'>
		              	  HDFC Bank
		              	</div>
                  	</div>
                  	
                  	<div className="_descOuter">
                  		<div className='_desc'>Gave for break - fast</div>
                  	</div>
                  	<div className="_tagOuter">
                  		<div className='_tag'>BreakFast</div>
                  	</div>
                  	<div>
                  		<div className='_timestap'>Jan 2017</div>
                  	</div>
                  </div>
                </a>
    	  );
  }
}

 