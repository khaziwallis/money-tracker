import * as React from 'react';
import './tag-list-item.component.css';
import { 
         Icon
       } from '@material-ui/core';

import { ITagsArray, IItemSelect } from './../../../../services/model';
// import { Common } from './../../../../services/common.service';

interface IProps {
	item: ITagsArray,
  index: number,
  onSelect?: any;
}

interface IState {
	openAddTagsModal: boolean
}

export class TagListItem extends React.Component<IProps, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = {
      openAddTagsModal: false
    };
  }


  public openAddTagsModal = () => {
    this.setState({openAddTagsModal: true});
  }

  public onSelect = () => {
    if(this.props.onSelect) {
      const data: IItemSelect = {
        index: this.props.index,
        item: this.props.item
      }
      this.props.onSelect(data);
    }
    else { 
      return;
    }
  }

  public render() {
    return (
      <a className="_Tag-itm" 
         href="javascript:void(0);"
         onClick={this.onSelect}
         onFocus={this.onSelect}
         style={{borderLeftColor: this.props.item.doc.color}}>
        <div className='_lft' style={{color: this.props.item.doc.color}}>
          <Icon style={{color: this.props.item.doc.color}}>label</Icon>
        </div>
        <div className='_rght'>
          <div className='_lbl'>{this.props.item.doc.name}</div>
        </div>
      </a>
    )
  }
}

 