import * as React from 'react';
import './accounts.component.css';
import { 
          Icon, Button, IconButton, Grid, Snackbar
       } from '@material-ui/core';


import { AccountDB } from './../../../db/accounts.db';
import { Common } from './../../../services/common.service';

import { AddAcountModal } from './add-account-modal/add-account-modal.component';
import { ConfirmDialog } from './../../common/dialogs/confirm/confirm.dialog'
import { AccountListItem } from './account-list-item/account-list-item.component';

import { ISnackBar, IAccountsArray, IConfirmDialog } from './../../../services/model';
import { CommonUiEvents } from './../../../services/ui.service';

interface IState {
	selectedAccountIndex: number;
  selectedAccountDoc?: IAccountsArray | any;
  isDetailsRightTab: boolean;
	addAccountModalOpen: boolean;
  snackBar: ISnackBar;
  accountsData: IAccountsArray[];
  accountLoaderData: IAccountsArray[];
  confirmDialog: IConfirmDialog;
  accountDataLoading: boolean;
}

export class Accounts extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
    				selectedAccountIndex: -1,
    				addAccountModalOpen: false,
            snackBar: {open: false},
            accountsData: [],
            confirmDialog: {open: false},
            accountDataLoading: false,
            accountLoaderData: Common.getEmptyAccountsArrayData(4),
            isDetailsRightTab: false,
            selectedAccountDoc: Common.getEmptyAccountsArrayData(1)[0]
    			 };
   	this.listenClearSelectOnLayoutClick();
  }

  public getAllAccounts = () => {
    this.setState({accountDataLoading: true});
    AccountDB.getAllAccounts((res)=>{
      console.log(res)
      this.setState({accountsData: res.rows, accountDataLoading: false});
    }, (err)=>{
      console.log(err)
    });
  }


  public selectAccount = (index, doc) => {
  	this.setState({selectedAccountIndex: index, selectedAccountDoc: doc});
  }

  public listenClearSelectOnLayoutClick = () => {
  	window.addEventListener('click', this.windowClickListener, true);
  }

  public windowClickListener = (ev) => {
      const paths = ev['path'];
      for(const p of paths) {
        if(p.id === 'ITEM-NO-DESELECT') return;
      }
      this.setState({selectedAccountIndex: -1, isDetailsRightTab: false})
  }

  public handleAddAccountModelOnClose = (data: any) => {
  	if(data.status === 1) {
      const tempObj = this.state.accountsData;
      tempObj.push(data.data.account);
      this.setState({snackBar: {open: true, message: 'Account added successfully!'}, accountsData: tempObj});
    }
  	this.setState({addAccountModalOpen: false});
  }

  public openAddAccountModal = () => {
  	this.setState({addAccountModalOpen: true});
  }

  public componentDidMount() {
       this.getAllAccounts();
       CommonUiEvents.scrollToTop();
    }

  public componentWillUnmount() {
    window.removeEventListener('click', this.windowClickListener, false);
    window.removeEventListener('click', this.windowClickListener, true);
  }

  public handleSnackBarClose = () => {
    this.setState({snackBar: {open: false}})
  }

  public deleteAccount = () => {
    this.setState({confirmDialog:{
                      open: true, 
                      title: "Confirm Delete", 
                      okText: "Delete", 
                      onClose: this.onDeleteConfirmDialogClose,
                      desc: 'No longer available after you delete!'
                    }});
  }

  public onDeleteConfirmDialogClose = (status) => {
    this.setState({confirmDialog:{open: false}});
    if(status === 1) {
      console.log(this.state.selectedAccountDoc)
      AccountDB.removeDoc(
          this.state.selectedAccountDoc.doc._id, 
          this.state.selectedAccountDoc.doc._rev, 
          (suc)=>{
            console.log(suc)
            const temp: IAccountsArray[] = this.state.accountsData;
            const ix = temp.indexOf(this.state.selectedAccountDoc);
            console.log(ix)
            temp.splice(ix, 1);
            this.setState({accountsData: temp, snackBar: {open: true, message: 'Account deleted successfully!'}});
          }, (err)=>{
            console.log(err)
            this.setState({snackBar: {open: true, message: 'ERR:  Error in delete, Try Again!'}});
          })
    }
  }

  public onDoubleClickItem = () => {
    this.toggleDetailsTab(true);
  }

  public toggleDetailsTab = (forceShow?: boolean) => {
    if(!this.state.isDetailsRightTab || forceShow) {
      this.setState({isDetailsRightTab: true});
    } else {
      this.setState({isDetailsRightTab: false});
    }
  }

  public getUIGridsDimensionsForItem = (dim, ev) => {
    let dime: number = 12;
    if(dim === 'xs') {
      dime = 12;
    }
    return dime;
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
          	 	<IconButton aria-label="Delete" className="_btn" onClick={this.deleteAccount}>
    			    	<Icon>delete</Icon>
    			    </IconButton>
    			    <IconButton aria-label="Edit" className="_btn" disabled>
    			    	<Icon>edit</Icon>
    			    </IconButton>
    			    <IconButton aria-label="Info" 
                  className={"_btn" + (this.state.isDetailsRightTab ? ' btn-hovered' : '')} 
                  onClick={this.toggleDetailsTab.bind(this, false)} 
                  color={(this.state.isDetailsRightTab ? 'primary' : 'default')} >
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
        <div className={"_cont accounts-tab" + (this.state.isDetailsRightTab ? " active-right-tab" : "")}>
          <div className="_main">
      			<Grid container spacing={24} className="_list">
      			  {(this.state.accountsData).map((item: IAccountsArray, index) =>
      			  	<Grid item 
                      xs={12} 
                      sm={this.state.isDetailsRightTab ? 6 : 6} 
                      md={this.state.isDetailsRightTab ? 6 : 4} 
                      lg={this.state.isDetailsRightTab ? 4 : 3} 
                      xl={this.state.isDetailsRightTab ? 3 : 2} 
                      key={index} className="_itm-outer">
      		          	  <AccountListItem
                          item={item}
                          onClick={this.selectAccount}
                          onFocus={this.selectAccount}
                          onDoubleClick={this.onDoubleClickItem}
                        />
      		        </Grid>
      			  )}

              {(this.state.accountDataLoading) ? (
                  (this.state.accountLoaderData).map((item: IAccountsArray, index) =>
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} className="_itm-outer">
                              <AccountListItem
                                item={item}
                                loading={true}
                              />
                        </Grid>
                  )
                ) : ('')}
      			</Grid>	

          </div>
          <div className="_right-tab scrolling-sub-header" id="ITEM-NO-DESELECT">
            <div className="_tab-content">
              <div className="_ttl-bar">
                <div className="icon_">
                  <IconButton aria-label="Delete" className="_btn" onClick={this.toggleDetailsTab.bind(this, false)}>
                    <Icon>close</Icon>
                  </IconButton>
                </div>
                <div className="_label">{this.state.selectedAccountDoc.doc.name}</div>
              </div>
              <div className="container_">
                <div className='_avtr'>
                  <Icon className="ic-space-btn-left _ic">account_balance</Icon>
                </div>
                <div className="_lst">
                  <div className="_itm_">
                    <div className="_nme">Name</div>
                    <div className="_vle">{this.state.selectedAccountDoc.doc.name}</div>
                  </div>
                  <div className="_itm_">
                    <div className="_nme">Balance</div>
                    <div className="_vle">${this.state.selectedAccountDoc.doc.balance}/-</div>
                  </div>
                  <div className="_itm_">
                    <div className="_nme">Group</div>
                    <div className="_vle">{Common.getCurrencyGroupLabel(this.state.selectedAccountDoc.doc.group)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddAcountModal name={'vinay'} open={this.state.addAccountModalOpen} onClose={this.handleAddAccountModelOnClose}/>
        <ConfirmDialog 
          open={this.state.confirmDialog.open} 
          title={this.state.confirmDialog.title} 
          okText={this.state.confirmDialog.okText} 
          cancelText={this.state.confirmDialog.cancelText} 
          onClose={this.state.confirmDialog.onClose}
          desc={this.state.confirmDialog.desc}
         />
        <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={this.state.snackBar.open}
                  autoHideDuration={4000}
                  onClose={this.handleSnackBarClose}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.snackBar.message}</span>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={this.handleSnackBarClose}
                    >
                      <Icon>close</Icon>
                    </IconButton>,
                  ]}
                />
      </div>
    );
  }
}

 