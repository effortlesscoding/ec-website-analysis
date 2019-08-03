import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './searchbox.module.scss';
import * as yup from 'yup';

const url = yup.string().url('Not a valid url').required('Please provide website url');

interface IProps {
  disabled: boolean;
  onSubmit: (text: string) => void;
};

interface IState {
  value: string;
  errorMessage: string;
}


function trackUrlSubmission(url: string) {
  const iwindow = window as any;
  if (iwindow.dataLayer) {
    iwindow.dataLayer.push({
      event: 'GAEvent',
      eventCategory: 'sg-webanalysis',
      eventAction: 'submission',
      eventLabel: url, 
      eventValue: undefined,
      eventNI: true 
    });
  } else if (iwindow.ga) {
    iwindow.ga('send', {
      hitType: 'event',
      eventCategory: 'sg-webanalysis',
      eventAction: 'submission',
      eventLabel: url,
    });
  };
}

export class SearchBox extends React.Component<IProps, IState> {
  state: IState = {
    value: '',
    errorMessage: '',
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (this.props.disabled) {
      return;
    }
    const { value } = this.state;
    try {
      e.preventDefault();
      url.validateSync(value);
      this.props.onSubmit(value);
      trackUrlSubmission(value);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ value: e.target.value, errorMessage: '' });
  };

  render() {
    const { disabled } = this.props;
    const { errorMessage, value } = this.state;
    return (
      <div className={styles.container}>
        <Typography variant="h5">Analyse performance of:</Typography>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <TextField
            disabled={disabled}
            classes={{ root: styles.form_input }}
            onChange={this.handleTextChange}
            value={value}
            placeholder="http://yourwebsite.com"
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <div>
            <Button
              classes={{ root: styles.form_submit }}
              variant="contained"
              disabled={disabled}
              type="submit"
              color="secondary"
            >Submit</Button>
          </div>
        </form>
      </div>
    );
  };
}