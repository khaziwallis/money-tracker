import * as React from 'react';
import './tags.component.css';
import { 
         Button , Icon, Grid, Snackbar, IconButton
       } from '@material-ui/core';

import { TagListItem } from './tag-list-item/tag-list-item.component';
import { AddTag } from './add-tag/add-tag.component';
import { ConfirmDialog } from './../../common/dialogs/confirm/confirm.dialog'
import { ISnackBar, ITagsArray, IItemSelect, IConfirmDialog } from './../../../services/model';
import { TagDB } from './../../../db/tags.db';

interface IState {
	openAddTagsModal: boolean,
  snackBar: ISnackBar,
  tagsData: ITagsArray[],
  selected: IItemSelect,
  confirmDialog: IConfirmDialog;
}

export class Tags extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
      openAddTagsModal: false,
      snackBar: {open: false},
      tagsData: [],
      selected: {index: -1},
      confirmDialog: {open: false}
    };
  }

  public getAllTags = () => {
    TagDB.getAllTags((res)=>{
      this.setState({tagsData: res.rows})
    }, (err)=>{
      console.log(err)
    })
  }

  public componentDidMount() {
    this.getAllTags();
    window.addEventListener('click', this.windowClickListener, true);
  }
  public componentWillUnmount() {
    window.removeEventListener('click', this.windowClickListener, false);
    window.removeEventListener('click', this.windowClickListener, true);
  }

  public openAddTagsModal = () => {
    this.setState({openAddTagsModal: true});
  }

  public onAddTagModalClose = (data) => {
    if(data.status === 1) {
       const tempObj = this.state.tagsData;
       tempObj.push(data.data.tag);
       this.setState({snackBar: {open: true, message: 'Tag added succesfully!'}, tagsData: tempObj})
    }
    this.setState({openAddTagsModal: false});
  }

  public handleSnackBarClose = () => {
    this.setState({snackBar: {open: false}})
  }



  public windowClickListener = (ev) => {
      const paths = ev['path'];
      for(const p of paths) {
        if(p.id === 'ITEM-NO-DESELECT') return;
      }
      const selectedTemp: IItemSelect = this.state.selected;
      selectedTemp.index = -1;
      this.setState({selected: selectedTemp})
  }

  public handleOnSelectItem = (data: IItemSelect) => {
    this.setState({selected: data});
  }

  public handleDeleteTag = () => {
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
      console.log(this.state.selected.item)
      TagDB.removeDoc(
          this.state.selected.item.doc._id, 
          this.state.selected.item.doc._rev, 
          (suc)=>{
            console.log(suc)
            const temp: ITagsArray[] = this.state.tagsData;
            const ix = temp.indexOf(this.state.selected.item);
            console.log(ix)
            temp.splice(ix, 1);
            this.setState({tagsData: temp, snackBar: {open: true, message: 'Tag deleted successfully!'}});
          }, (err)=>{
            console.log(err)
            this.setState({snackBar: {open: true, message: 'ERR:  Error in delete, Try Again!'}});
          })
    }
  }

  public render() {
    return (
      <div className={"lyt-cnt _tags" + (this.state.selected.index !== -1 ? " item-selected" : "")}>
        <div className="_hdr">
          <div className="_ttl"> Tags </div>
          <div className={"_mobile-actions" + (this.state.selected.index === -1 ? " display-none-strict" : "")}>
              <IconButton aria-label="Edit" className="_btn">
                <Icon>arrow_back</Icon>
              </IconButton>
          </div>
          <div className="_right">
            { (this.state.selected.index !== -1) ? (
               <div className='_selctd-actns' id="ITEM-NO-DESELECT"> 
                 <IconButton aria-label="Delete" className="_btn" onClick={this.handleDeleteTag}>
                  <Icon>delete</Icon>
                </IconButton>
                <IconButton aria-label="Edit" className="_btn" disabled>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton aria-label="Info" className="_btn" disabled>
                  <Icon>info</Icon>
                </IconButton>
                <div className="_dvdr"/>
               </div>
               ) : ('')
            }
             <Button color="primary" size="small" className="_always" onClick={this.openAddTagsModal}>
               <Icon className="ic-space-btn-left">add</Icon>
                Tag
             </Button>
          </div>
        </div>
        <div className="_cont">
          <Grid container spacing={24} className="_list">
            {(this.state.tagsData).map((item: ITagsArray, index) =>
              <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={index} className="_itm-outer">
                      <TagListItem
                        item={item}
                        index={index}
                        onSelect={this.handleOnSelectItem}
                      />
                </Grid>
            )}
          </Grid>
        </div>

        <AddTag 
          open={this.state.openAddTagsModal}
          onClose={this.onAddTagModalClose}
        />
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
    )
  }
}

 