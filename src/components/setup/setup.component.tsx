import * as React from 'react';
import './setup.component.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';  
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ICurrency, IAccountForm } from './../../services/model';
import { strings } from './../../services/strings';
import { Common } from './../../services/common.service';


import { SettingDB } from './../../db/setting.db';
import { AccountDB } from './../../db/accounts.db';


import Select from 'react-select';
import 'react-select/dist/react-select.css';


interface IState {
	view: string;
  steps: string[];
  activeStep: number;
  currencyModel ?: ICurrency;
  completed: {};
  showErrors: boolean;
  currencyOptions : any;
  accountForm : IAccountForm;
  currencyGroup: any;
  formErrors: any;
  accountsModel: IAccountForm[];
  finishingLoader: boolean;
}

export class Setup extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);
    this.state = {
      view: "welcome",
      steps: ["Select Currency", "Add Account"],
      activeStep: 0,
      completed: {},
      showErrors: false,
      currencyOptions: strings.currencyData,
      accountForm: {name: '', balance: 0, group: ''},
      currencyGroup: strings.currencyGroup,
      formErrors: {},
      accountsModel: [],
      finishingLoader: false
    }

    console.log('setup')
    
  }

  public changeView(to: string) {
    console.log(to)
    this.setState({view: to});
  }

  public handleStep = step => () => {
    if(step in this.state.completed) {
      this.setState({
        activeStep: step,
      });
    }
  }; 

  public completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  public totalSteps = () => {
    return this.state.steps.length;
  };

  public isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  public allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }


  public handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.state.steps;
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };


  public handleComplete = () => {
    const valid = this.checkCurrenyStepValid();
    if(!valid) {
      this.setState({showErrors: true});
      return;
    }
    this.setState({showErrors: false});
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };




  public checkCurrenyStepValid() {
    if(this.state.activeStep === 0) {
      if(this.state.currencyModel) return true;
      else return false;
    } else {
      return false;
    }
  }


  public currencyModelChange = (selectedOption) => {
    this.setState({ currencyModel: selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}----`, this.state.currencyModel);
    }
  }

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
      const accountsTemp: IAccountForm[] = this.state.accountsModel;
      accountsTemp.push(this.state.accountForm);
      this.setState({accountsModel: accountsTemp, formErrors: {}, accountForm: {name:'', balance: 0, group: ''}});
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


  public deleteAccount = (index, ev) => {
    console.log(index)
    const array = this.state.accountsModel;
    array.splice(index, 1);
    this.setState({accountsModel: array});
  }

  public finishSetup = () => {
     console.log('finsh')
     const settingObj: any = {};
     settingObj['currency'] = this.state.currencyModel;

     SettingDB.setup(settingObj, (success)=>{
       console.log('SUCCESS', success, this.state.accountForm)
       AccountDB.addAccount(this.state.accountsModel[0], (sucess)=> {
         console.log('acc success')
         Common.navigateRouter('/app');
       }, (err) => {
         console.log('acc errr', err)
       })
     }, (err)=>{
       console.log('ERR', err)
     })

     this.setState({finishingLoader: true})
     setTimeout(()=>{this.setState({finishingLoader: false})}, 3000);
  }


  public render() {
    return (
      <div className="lyt-cnt _setup">
       <div className="_card">
       { (this.state.finishingLoader) ? (
         <div className="_ldr">
           <div className="bg-drop"/>
           <div className='cont'>
             <CircularProgress />
             <div className="ttl">Finishing Setup..</div>
           </div>
         </div>
         ): ('')
       }
         <div className="line"/>
         <div className="title-bar">
           <div className="title">Money Tracker</div>
           <div className="sub-title">Setup</div>
           <Icon className="_icn">settings</Icon>
         </div>
         <div className="_cont">
         {
           this.state.view === 'welcome' ? (
           <div className="welcome">
              <Typography className="_sub-hdr" variant="title">
                Welcome!
              </Typography>
              <Typography className="cptn" variant="subheading">
                Welcome to money tracker application. You can track your money in a systematic way by 
                setting Up the application by clicking below button.
              </Typography>
              <div className="_btn-cont">
                <Button  variant="outlined" color="primary" onClick={this.changeView.bind(this, 'currency')}>
                  Start Setup
                  <Icon className="ic-space-btn">arrow_forward</Icon>
                </Button>
              </div>
           </div>
           ) : (

               <div className="steps">
                 <Stepper nonLinear activeStep={this.state.activeStep} alternativeLabel>
                  {this.state.steps.map((label, index) => {
                    return (
                      <Step key={label}>
                        <StepButton
                          onClick={this.handleStep(index)}
                          completed={this.state.completed[index]}
                          className={this.state.activeStep === index ? 'activeStepButton': ''}
                        >
                          {label}
                        </StepButton>
                      </Step>
                    );
                  })}
                </Stepper>

                {(this.state.activeStep === 0) ? (

                    <div className="currency pageSlideToLeft">
                    <div className="caption">
                         This is your primary currency to be calculated on the tracker app.
                     </div>
                      <div className="_fld">
                        <div className="label">Select Currency : </div>
                        <div className="_frm">
                          <Select
                                className='md'
                                name="form-field-name"
                                value={this.state.currencyModel}
                                onChange={this.currencyModelChange}
                                options={this.state.currencyOptions}
                              />
                          { this.state.currencyModel ? ('') : (
                          (this.state.showErrors ? (
                            <div className="input-error">
                              Select currenecy!
                            </div>
                          ): ('')
                          ))
                          }
                         </div>

                      </div>

                      <div className="_actns">
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleComplete}
                        >
                          Next
                        </Button>
                      </div>
                         
                      
                    </div>

                  ) : (

                    <div className="account pageSlideToRight">
                      <div className="">
                        <Typography variant="title">
                          Add Account
                        </Typography>
                      </div>
                      <div className="caption _mgn">
                         Atleast add one account to complete the setup.
                      </div>
                      { (this.state.accountsModel.length > 0) ? (
                        <div className="_tble">
                           <Typography variant="subheading">
                            Accounts
                          </Typography>
                           <Table className="small-tbl">
                              <TableHead>
                                <TableRow>
                                  <TableCell numeric>Name</TableCell>
                                  <TableCell numeric>Group</TableCell>
                                  <TableCell numeric>Balance</TableCell>
                                  <TableCell numeric>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {this.state.accountsModel.map((n, index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell numeric>{n.name}</TableCell>
                                      <TableCell numeric>{Common.getCurrencyGroupLabel(n.group)}</TableCell>
                                      <TableCell numeric>{n.balance}</TableCell>
                                      <TableCell numeric>
                                        <IconButton onClick={this.deleteAccount.bind(this, index)}>
                                          <Icon>delete</Icon>
                                        </IconButton>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                            <div className="caption _mgn">
                              * You can also add the more accounts later.
                            </div>
                        </div>
                        ) : ('')
                      }
                      { (this.state.accountsModel.length === 0) ? (
                        <div className="_flds">
                          <div className="_itm">
                            <div className="_inpt">
                              <FormControl className="width-100" error={this.state.formErrors['name'] ? true : false}>
                                <InputLabel htmlFor="name-simple">Account Name</InputLabel>
                                <Input id="name-simple" value={this.state.accountForm.name} onChange={this.handleFormChange.bind(this, 'name')} />
                                <FormHelperText id="name-helper-text">{this.state.formErrors['name'] ? this.state.formErrors['name'] : ''}</FormHelperText>
                              </FormControl>
                            </div>
                           </div>
                          <div className="_itm select-inpt">
                            <div className="_inpt">
                              <FormControl className="width-100">
                                <TextField
                                      id="select-currency"
                                      select
                                      label="Account Group"
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
                            </div>
                          </div>
                          <div className="_itm">
                            <div className="_inpt">
                              <FormControl 
                                className="width-100"
                                error={this.state.formErrors['balance'] ? true : false}
                              >
                                <InputLabel htmlFor="name-simple">Account Balance</InputLabel>
                                <Input 
                                  id="name-simple" 
                                  type="number"
                                  value={this.state.accountForm.balance} 
                                  onChange={this.handleFormChange.bind(this, 'balance')} 
                                  startAdornment={<InputAdornment position="start">{this.state.currencyModel ? this.state.currencyModel.value : ''}</InputAdornment>}
                                  />
                                <FormHelperText id="name-helper-text">{this.state.formErrors['balance'] ? this.state.formErrors['balance'] : ' '}</FormHelperText>
                              </FormControl>
                            </div>
                          </div>
                          <div className="_itm">
                            <Button
                              variant="outlined"
                              onClick={this.addAccount}
                            >
                              <Icon className="ic-space-btn-left">add</Icon>
                              Add

                            </Button>
                        </div>
                        </div>
                        ) : ('')
                      } 
                      
                      <div className="_actns">
                      { (this.state.accountsModel.length > 0) ? (
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.finishSetup}
                        >
                          Finish

                        </Button>
                        ) : ('')
                      }
                      </div>
                    </div>

                  ) 
                }
               </div>
           )
         }
         </div>
       </div>
      </div>
    );
  }
}

 