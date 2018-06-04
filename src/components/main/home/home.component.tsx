import * as React from 'react';
import './home.component.css';
// import Button from '@material-ui/core/Button';

interface IState {
	view: string
}

export class Home extends React.Component<{}, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);

    this.state = { view: 'aaa' };
    setTimeout( () => { this.state.view = 'sss'}, 2000);
  }

  public render() {
    return (
      <div className="lyt-cnt _home">
        <div className="_hdr">
          <div className="_ttl"> Home </div>
          <div className="_right">actions</div>
        </div>
        <div className="_cont">This is content</div>
      </div>
    );
  }
}

 