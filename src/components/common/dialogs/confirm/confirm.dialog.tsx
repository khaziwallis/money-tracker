import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';


export class ConfirmDialog extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public handleClose = (status, ev) => {
  	this.props.onClose(status);
  }

  public render() {
    return (
		     <div>
		     	 <Dialog
		          open={this.props.open}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		          transitionDuration={{
		          	enter: 0.2,
		          	exit: 0
		          }}
		        >
		          <DialogTitle id="alert-dialog-title">{this.props.title ? this.props.title : "Alert"}</DialogTitle>
		          {(this.props.desc) ? (
		          	<DialogContent>
			            <DialogContentText id="alert-dialog-description">
			              {this.props.desc ? this.props.desc : ''}
			            </DialogContentText>
			        </DialogContent>
			        ) : ('')}
		          <DialogActions>
			            <Button onClick={this.handleClose.bind(this, 0)}  autoFocus={true}>
			              {this.props.cancelText ? this.props.cancelText : 'Cancel'}
			            </Button>
			            <Button onClick={this.handleClose.bind(this, 1)} color="primary">
			              {this.props.okText ? this.props.okText : 'OK'}
			            </Button>
		          </DialogActions>
		        </Dialog>
		     </div>
    );
  }
}

 