import * as React from 'react';
import './review.component.css';
// import Button from '@material-ui/core/Button';

interface IState {
	view: string
}

export class Review extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = { view: 'aaa' };
    setTimeout( () => { this.state.view = 'sss'}, 2000);
  }

  public render() {
    return (
      <div className="lyt-cnt">
        <div className="_hdr">
          <div className="_ttl"> Review </div>
          <div className="_right">actions</div>
        </div>
        <div className="_cont">This is content</div>
      </div>
    );
  }
}

 