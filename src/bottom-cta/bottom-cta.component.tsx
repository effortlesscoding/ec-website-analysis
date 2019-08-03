import * as React from 'react';
import classes from './bottom-cta.module.scss';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Content } from '../content/content.component';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const LuckyCat = require('./lucky-cat.png');

interface IState {
  show: boolean;
}

export class BottomCTA extends React.Component<{}, IState> {
  state: IState = {
    show: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 5000);
  }

  render() {
    const { show } = this.state;
    return (
      <div className={[classes.cta_container, show ? classes.cta_container_shown : ''].join(' ')}>
        <Content>
          <img className={classes.lucky_cat} src={LuckyCat} />
          <div className={classes.cta_container_content}>
            <WarningIcon color="secondary" />
            <Typography variant="body1">FREE: How to Get to Page 1 in Google without ANY Chance of Failure</Typography>
            <WarningIcon color="secondary" />
            <a style={{ textDecoration: 'none' }} href="https://saucegrowth.com/how-to-rank-in-google-1/" target="_blank" rel="noopener noreferrer"><Button variant="contained" color="secondary">DOWNLOAD FREE</Button></a>
          </div>
        </Content>
        {show ? <div className={classes.close_icon} onClick={() => this.setState({ show: false })}><CloseIcon /></div> : null}
      </div>
    );
  }
};
