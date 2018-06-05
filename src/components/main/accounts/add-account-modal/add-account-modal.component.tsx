import * as React from 'react';
import './add-account-component.css'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField';


// import { Common } from './../../../../services/common.service';
import { strings } from './../../../../services/strings';
import { IAccountForm } from './../../../../services/model';

interface IState {
	accountForm : IAccountForm;
  formErrors: any;
  currencyGroup: any;
}

export class AddAcountModal extends React.Component<any, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
                    accountForm: {name: '', group: '', balance: ''},
                    formErrors: {},
                    currencyGroup: strings.currencyGroup,
                 }  
  }


  public handleClose = () => {
    this.props.onClose({a: this.props.selectedValue, s: 'dasdas'});
  };


  public handleFormChange = (name, ev) => {
    console.log(ev, this.state.accountForm)
    const obj: IAccountForm = this.state.accountForm;
    obj[name] = ev.target.value;
    console.log(obj)
    this.setState({accountForm: obj, formErrors: {}});

  }


  public addAccount = () => {
    console.log('dd')  
    if(this.isAddAccountFormValid()) {
      console.log('valid')
      this.setState({formErrors: {}, accountForm: {name:'', balance: '', group: ''}});
    }
    else {
      console.log('invalid')
    }
  }

  public isAddAccountFormValid = () => {
    const formErrorss = {};
    let formValid: boolean = true;
    console.log('name:', this.state.accountForm.name)
    if(!this.state.accountForm.name || this.state.accountForm.name === '') {
      formErrorss['name'] = "Name is required!";
      formValid = false;
    }
    if(!this.state.accountForm.group || this.state.accountForm.group === '') {
      formErrorss['group'] = "Select group!";
      formValid = false;
    }
    if(!this.state.accountForm.balance) {
      formErrorss['balance'] = "Enter Balance!";
      formValid = false;
    }
    this.setState({formErrors: formErrorss});
    return formValid;
  }


  public render() {

    return (
       <Dialog onClose={this.handleClose} open={this.props.open} className="responsive-modal _add-acnt-mdl" disableBackdropClick={true} disableEscapeKeyDown={true}>
        <DialogTitle id="simple-dialog-title">
          <IconButton aria-label="Close" className="close only-mobile-inline-flex-strict" onClick={this.handleClose}>
            <Icon>close</Icon>
          </IconButton>
          Add Account
        </DialogTitle>
        <DialogContent>
        
          <div className="_fld">

           <Grid container className="_itm">
               <Grid xs={5} className="_lbl">
                 <div>
                   Account Name
                 </div>
               </Grid>
               <Grid xs={7} className="_inpt-cont">
                 <FormControl className="_inpt" error={this.state.formErrors['name'] ? true : false}>
                  <Input autoFocus={true} id="name-simple" placeholder="Name" value={this.state.accountForm.name} onChange={this.handleFormChange.bind(this, 'name')} />
                  <FormHelperText id="name-helper-text">{this.state.formErrors['name'] ? this.state.formErrors['name'] : ''}</FormHelperText>
                </FormControl>
               </Grid>
           </Grid>

           <Grid container className="_itm">
               <Grid xs={5} className="_lbl">
                 <div>
                   Balance
                 </div>
               </Grid>
               <Grid xs={7} className="_inpt-cont">
                 <FormControl className="_inpt" error={this.state.formErrors['balance'] ? true : false}>
                  <Input id="name-simple" type="number" placeholder="Enter Amount" value={this.state.accountForm.balance} onChange={this.handleFormChange.bind(this, 'balance')} />
                  <FormHelperText id="name-helper-text">{this.state.formErrors['balance'] ? this.state.formErrors['balance'] : ' '}</FormHelperText>
                </FormControl>
               </Grid>
           </Grid>


           <Grid container className="_itm">
               <Grid xs={5} className="_lbl">
                 <div>
                   Group
                 </div>
               </Grid>
               <Grid xs={7} className="_inpt-cont">
                 <FormControl className="_inpt _selct">
                    <TextField
                          id="select-currency"
                          select
                          placeholder="Account Group"
                          value={this.state.accountForm.group}
                          onChange={this.handleFormChange.bind(this, 'group')}
                          SelectProps={{
                            MenuProps: {
                              className: 'menu',
                            },
                          }}
                          helperText={this.state.formErrors['group'] ? this.state.formErrors['group'] : ''}
                          margin="normal"
                          error={this.state.formErrors['group'] ? true : false}
                        >
                          {this.state.currencyGroup.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                    
                    
                  </FormControl>
               </Grid>
           </Grid>


         </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.addAccount} color="primary" autoFocus>
              Add Account
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


 