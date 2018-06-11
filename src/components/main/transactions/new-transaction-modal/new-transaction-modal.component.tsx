import * as React from 'react';
import './new-transaction-modal.component.css';
import { 
          Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
          Icon, Button, Snackbar, CircularProgress, 
          Grid,
          Input, FormHelperText, FormControl, InputLabel
       } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import Input from '@material-ui/core/Input';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem'
// import TextField from '@material-ui/core/TextField';
import { ISnackBar, ITransactionForm } from './../../../../services/model';

interface IProps {
  open: boolean;
  onClose?: any;
}
interface IState {
	isAdding: boolean;
  snackBar: ISnackBar;
  formErrors: any;
  transactionForm: ITransactionForm;
}  

export class NewTransaction extends React.Component<IProps, IState> {
  public state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAdding: false,
      snackBar: {open: false},
      formErrors: {},
      transactionForm: {
        accountId: "", amount: "", date: "", tags: [], type: "", desc: ''
      }
    }
  }

  public handleSnackBarClose = () => {
    this.setState({snackBar: {open:false}});
  }

  public handleModalClose = () => {
    if(this.props.onClose) this.props.onClose();
  }

  public addTransaction = () => {
    console.log('adding')
  }

  public render() {
    return (
      <div>
         <Dialog 
           open={this.props.open} 
           className="responsive-modal _add-acnt-mdl" 
           disableBackdropClick={true} 
           disableEscapeKeyDown={true}>
          <div className={"inner-loader-layout" + (this.state.isAdding ? ' active' : '') }>
            <div className="back-drop"/>
            <div className="_cont">
              <CircularProgress />
              <div className="_ttl">Loading...</div>
            </div>
          </div>
          <DialogTitle id="simple-dialog-title">
            <IconButton aria-label="Close" className="close only-mobile-inline-flex-strict" onClick={this.handleModalClose}>
              <Icon>close</Icon>
            </IconButton>
            Add Account
          </DialogTitle>
          <DialogContent>


          
            <div className="_fld">
              <Grid container={true}>
                <Grid item={true} xs={12} md={6} >
                  <FormControl  error aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">Name</InputLabel>
                    <Input id="name-error" />
                    <FormHelperText id="name-error-text">Error</FormHelperText>
                  </FormControl>
                </Grid>

                 <Grid item={true} xs={12} md={6} >
                  <FormControl  error aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">Name</InputLabel>
                    <Input id="name-error" />
                    <FormHelperText id="name-error-text">Error</FormHelperText>
                  </FormControl>
                </Grid>


                 <Grid item={true} xs={12} md={6} >
                  <FormControl  error aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">Name</InputLabel>
                    <Input id="name-error" />
                    <FormHelperText id="name-error-text">Error</FormHelperText>
                  </FormControl>
                </Grid>

                 <Grid item={true} xs={12} md={6} >
                  <FormControl  error aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">Name</InputLabel>
                    <Input id="name-error" />
                    <FormHelperText id="name-error-text">Error</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

           </div>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleModalClose}>
                Cancel
              </Button>
              <Button onClick={this.addTransaction} color="primary" autoFocus>
                Add Account
              </Button>
          </DialogActions>

        </Dialog>
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

 