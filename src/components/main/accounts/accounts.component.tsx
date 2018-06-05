import * as React from 'react';
import './accounts.component.css';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';


import { AddAcountModal } from './add-account-modal/add-account-modal.component';

interface IState {
	selectedAccountIndex: number;
	addAccountModalOpen: boolean;
}

export class Accounts extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
    				selectedAccountIndex: -1,
    				addAccountModalOpen: true
    			 };
   	this.clearSelectOnLayoutClick();
  }


  public selectAccount = (index, ev) => {
  	this.setState({selectedAccountIndex: index});
  }

  public clearSelectOnLayoutClick = () => {
  	window.addEventListener('click', (ev: MouseEvent)=> {
  		console.log(ev['path']);
  		const paths = ev['path'];
  		for(const p of paths) {
  			if(p.id === 'ITEM-NO-DESELECT') return;
  		}
  		this.setState({selectedAccountIndex: -1})
  	});
  }

  public handleAddAccountModelOnClose = (data) => {
  	console.log('on close data', data)
  	this.setState({addAccountModalOpen: false});
  }

  public openAddAccountModal = () => {
  	this.setState({addAccountModalOpen: true});
  }

  public render() {
    return (
      <div className={"lyt-cnt _accounts" + (this.state.selectedAccountIndex !== -1 ? " item-selected" : "")}>
        <div className="_hdr">
          <div className="_ttl"> Accounts </div>
          <div className={"_mobile-actions" + (this.state.selectedAccountIndex === -1 ? " display-none-strict" : "")}>
          		<IconButton aria-label="Edit" className="_btn">
			    	<Icon>arrow_back</Icon>
			    </IconButton>
          </div>
          <div className="_right">
          { (this.state.selectedAccountIndex !== -1) ? (
          	 <div className='_selctd-actns' id="ITEM-NO-DESELECT"> 
          	 	<IconButton aria-label="Delete" className="_btn">
			    	<Icon>delete</Icon>
			    </IconButton>
			    <IconButton aria-label="Edit" className="_btn">
			    	<Icon>edit</Icon>
			    </IconButton>
			    <IconButton aria-label="Info" className="_btn">
			    	<Icon>info</Icon>
			    </IconButton>
			    <div className="_dvdr"/>
          	 </div>
          	 ) : ('')
          }
          	 <Button color="primary" size="small" className="_always" onClick={this.openAddAccountModal}>
          	 	<Icon className="ic-space-btn-left">add</Icon>
		        Account
		     </Button>
          </div>
        </div>
        <div className="_cont accounts-tab">

			<Grid container spacing={24} className="_list">
			  {[0,1,2,3,4,5,6].map((nav: any, index) =>
			  	<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} className="_itm-outer">
		          <a href="javascript:void(0);" id="ITEM-NO-DESELECT"  className={(this.state.selectedAccountIndex === index) ? "_itm focus" : "_itm"} onFocus={this.selectAccount.bind(this, index)} onClick={this.selectAccount.bind(this, index)}>
		          	<div className="avtr">
		          		<Icon className="ic-space-btn-left _icn">account_balance</Icon>
		          	</div>
		          	<div className="_dtls">
		          		<div className="_name">
		          			<Icon className="ic-space-btn-left _icn">account_balance_wallet</Icon>
		          			<div className="_lbl">HDFC Bank</div>
		          		</div>
		          		<div className="_grp">
		          			Group: Deposite
		          		</div>
		          		<div className="_blnce">
		          			<Icon className="_icn">attach_money</Icon>
		          			<div className='_lbl'>89712.00</div>
		          		</div>
		          	</div>
		          </a>
		        </Grid>
			  )}
			</Grid>	


        </div>
        <AddAcountModal name={'vinay'} open={this.state.addAccountModalOpen} onClose={this.handleAddAccountModelOnClose}/>
      </div>
    );
  }
}

 