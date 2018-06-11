import * as React from 'react';
import './tags.component.css';
import { 
         Button , Icon, Grid, Snackbar, IconButton
       } from '@material-ui/core';

import { TagListItem } from './tag-list-item/tag-list-item.component';
import { AddTag } from './add-tag/add-tag.component';
import { ISnackBar, ITagsArray, IItemSelect } from './../../../services/model';
import { TagDB } from './../../../db/tags.db';

interface IState {
	openAddTagsModal: boolean,
  snackBar: ISnackBar,
  tagsData: ITagsArray[],
  selected: IItemSelect
}

export class Tags extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
      openAddTagsModal: false,
      snackBar: {open: false},
      tagsData: [],
      selected: {index: -1}
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
      this.setState({selected: {index: -1}})
  }

  public handleOnSelectItem = (data: IItemSelect) => {
    this.setState({selected: data});
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

 