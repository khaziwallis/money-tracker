import * as React from 'react';
import './accounts.component.css';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

interface IState {
	selectedAccountIndex: number;
}

export class Accounts extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
    				selectedAccountIndex: -1
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
  			if(p.id === 'ITEM') return;
  		}
  		this.setState({selectedAccountIndex: -1})
  	});
  }

  public render() {
    return (
      <div className="lyt-cnt _home">
        <div className="_hdr">
          <div className="_ttl"> Accounts </div>
          <div className="_right">
          	 <Button color="primary" size="small">
          	 	<Icon className="ic-space-btn-left">add</Icon>
		        Account
		     </Button>
          </div>
        </div>
        <div className="_cont accounts-tab">

			<Grid container spacing={24} className="_list">
			  {[0,1,2,3,4,5,6].map((nav: any, index) =>
			  	<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} className="_itm-outer">
		          <div id="ITEM"  className={(this.state.selectedAccountIndex === index) ? "_itm focus" : "_itm"} onClick={this.selectAccount.bind(this, index)}>
		          	<div className="avtr">
		          		<Icon className="ic-space-btn-left _icn">account_balance</Icon>
		          	</div>
		          	<div className="_dtls">
		          		<div className="_name">
		          			<Icon className="ic-space-btn-left _icn">account_balance_wallet</Icon>
		          			<div className="_lbl">HDFC Bank</div>
		          		</div>
		          	</div>
		          </div>
		        </Grid>
			  )}
			</Grid>	


        </div>
      </div>
    );
  }
}

 