import * as React from 'react';
import './add-tag.component.css';
import { 
         Icon, Dialog, CircularProgress, DialogTitle, IconButton, DialogContent,
         Button, DialogActions, Snackbar, FormControl, InputLabel, Input, FormHelperText
       } from '@material-ui/core';
import { SwatchesPicker } from 'react-color';
import { TagDB } from './../../../../db/tags.db';
import { ISnackBar, ITagForm } from './../../../../services/model';
import { Common } from './../../../../services/common.service';
interface IProps {
  open: boolean;
  onClose?: any;
}

interface IState {
	openAddTagsModal: boolean,
  isAdding: boolean;
  snackBar: ISnackBar;
  tagForm: ITagForm;
  formError: any;
}

export class AddTag extends React.Component<IProps, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
      openAddTagsModal: false,
      isAdding: false,
      snackBar: {open: false},
      tagForm: {name: '', color: '#009688'},
      formError: {}
    };
  }


  public openAddTagsModal = () => {
    this.setState({openAddTagsModal: true});
  }

  public handleClose = () => {
    this.callCloseModalEvent(0, {});
  }

  public callCloseModalEvent = (status: number, data: any) => {
    this.props.onClose({status, data});
    this.setState({formError: {}, tagForm: {name: '', color: '#009688'}})
  }

  public handleSnackBarClose = () => {
    this.setState({snackBar: {open: false}});
  }


  public validForm = () => {
    let valid: boolean = true;
    const formErrors: any = {};
    if(!this.state.tagForm.name || this.state.tagForm.name === '') {
      valid = false;
      formErrors['name'] = "Name is required!";
    }

    this.setState({formError: formErrors});

    return valid;
  }

  public addTag = () => {
    if(this.validForm()) {
      console.log('valid')
      TagDB.addTag(this.state.tagForm, (suc)=>{
        console.log(suc)
        const obj:any = {
          res: suc,
          tag: Common.makeTagsArrayItem(suc.finalObj, suc.id, suc.rev)
        }
        this.callCloseModalEvent(1, obj);
      }, (err)=>{
        this.setState({snackBar: {open: true, message: 'ERR: Error in adding a tag, please try again!'}});
      })
    } else {
      console.log('invalid')
    }
  }

  public handleFormInputChange = (field, ev) => {
    const temp: ITagForm = this.state.tagForm;
    temp[field] = ev.target.value;
    this.setState({tagForm: temp, formError: {}});
  }

  public handleColorChange = (color) => {
    const temp: ITagForm = this.state.tagForm;
    temp.color = color.hex;
    console.log(color)
    this.setState({tagForm: temp});
  }

  public render() {
    return (
      <div>
         <Dialog 
           onClose={this.handleClose} 
           open={this.props.open} 
           className="responsive-modal _Tag-add" 
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
            <IconButton aria-label="Close" className="close only-mobile-inline-flex-strict" onClick={this.handleClose}>
              <Icon>close</Icon>
            </IconButton>
            Add Tag
          </DialogTitle>
          <DialogContent>


          
            <div className="_fld">

            <div className="_itm">
              <FormControl  error={(this.state.formError.name ? true : false)} aria-describedby="name-error-text">
                <InputLabel htmlFor="name-error">Name</InputLabel>
                <Input id="name-error" value={this.state.tagForm.name} onChange={this.handleFormInputChange.bind(this, 'name')} />
                <FormHelperText id="name-error-text">{this.state.formError.name ? this.state.formError.name : 'This is the name of the tag'}</FormHelperText>
              </FormControl>
            </div>
           
            <div className="_itm">
              <InputLabel className="_lbl">Select Color: <span className="_slctd-color" style={{backgroundColor: this.state.tagForm.color}}/></InputLabel>
              <SwatchesPicker
                color={this.state.tagForm.color}
                className="_picker"
                onChangeComplete={this.handleColorChange}
              />
            </div>


           </div>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleClose}>
                Cancel
              </Button>
              <Button onClick={this.addTag} color="primary" autoFocus>
                Add Tag
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
    )
  }
}

 