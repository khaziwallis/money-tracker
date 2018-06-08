import * as React from 'react';
import './transactions-list-item.component.css';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

interface IProps {	
	index?: number;
	onSelect?: any;
	onFocus?: any;
	data?: any;
}

export class TransactionsListItem extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
                <a className="_Itm-Trans"
                	 href="javascript:void(0);">
                  	<div className="_icnOuter">
	                  	<div className="_icn down">
	                  		<Icon className="_icon">arrow_right_alt</Icon>
	                  	</div>
                  	</div>
                  	<div className="_moneyOuter">
                  		<div className='_money'>2200 /-</div>
                  	</div>
                  	<div className="_accOuter shadow-right">
		              	<div className='_acc'>
		              	  HDFC Bank sasA As 
		              	</div>
                  	</div>
                  	
                  	<div className="_descOuter shadow-right _strong-shadow">
                  		<div className='_desc'>Gave for break - fast</div>
                  	</div>
                  	<div className="_tagOuter">
                  		<div className='_tag'>BreakFast</div>
                  	</div>
                  	<div className="_timestapOuter">
                  		<div className='_timestap'>Jan 2017</div>
                  	</div>
                  	<div className="_actnsOuter">
                  		<div className='_actns'>
                  			  
						      <IconButton aria-label="Delete" color="primary">
						        <Icon>edit</Icon>
						      </IconButton>
						      <IconButton aria-label="Delete" color="secondary">
						        <Icon>delete</Icon>
						      </IconButton>
                  		</div>
                  	</div>
                </a>
    	  );
  }
}

 