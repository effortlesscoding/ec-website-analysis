import * as React from 'react';
import classes from './application.module.scss';
import { SearchBox } from './content/searchbox/searchbox.component';
import { Content } from './content/content.component';
import { apiWebsiteAnalysis } from './services/api-website-analysis.service';
import { APIWebsiteAnalysisResult } from './services/api-website-analysis.service.types';
import { ResultsContainer } from './content/results-container/results-container.component';
import { Explanation } from './explanation/explanation.component';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'react-circular-progressbar/dist/styles.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import WarningIcon from '@material-ui/icons/Warning';
import { BottomCTA } from './bottom-cta/bottom-cta.component';

interface IState {
  isLoading: boolean;
  analysisResult: APIWebsiteAnalysisResult | null;
  error: Error | null;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7a9eec',
      main: '#5070b6',
      dark: '#2f4679',
      contrastText: 'white',
    },
    secondary: {
      light: 'rgb(242, 162, 59)',
      main: 'rgb(241, 151, 55)',
      dark: 'rgb(232, 118, 47)',
      contrastText: 'white',
    },
    error: {
      light: 'rgb(242, 162, 59)',
      main: 'rgb(241, 151, 55)',
      dark: 'rgb(232, 118, 47)',
      contrastText: 'white',
    }
  }
});

export class Application extends React.Component<{}, IState> {
  state: IState = {
    isLoading: false,
    analysisResult: null,
    error: null,
  };

  handleSubmit = (websiteUrl: string) => {
    this.setState({ isLoading: true, analysisResult: null, error: null, });
    apiWebsiteAnalysis.analyse(websiteUrl).then(analysisResult => {
      this.setState({ isLoading: false, analysisResult, }, () => {
        const scrollArea = document.getElementById('scroll-offset');
        if (!scrollArea) {
          return;
        }
        window.scrollTo({ top: scrollArea.offsetTop });
      });
    }).catch((error) => {
      this.setState({ isLoading: false, error, });
    });
  };

  shouldShowResults() {
    const { isLoading, analysisResult } = this.state;
    return !!analysisResult || isLoading;
  };

  render() {
    const { isLoading, analysisResult, error } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.application}>
          <AppBar position="static" color="default" >
            <Toolbar>
              <img style={{ height: '1rem' }} src="https://cdn-wp.saucegrowth.com/wp-content/uploads/2019/06/30050808/sauce_growth_logo_blue.png" />
              <Typography variant="h6" color="inherit">
                FREE Tool - Are Your Pages Fast Enough for SEO?
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.searchbox_container}>
            <Content>
              <SearchBox disabled={isLoading} onSubmit={this.handleSubmit} />
            </Content>
          </div>
          <Content className={classes.content}>
            <label id="scroll-offset" />
            {this.shouldShowResults() ? <ResultsContainer results={analysisResult} isLoading={isLoading} /> : null}
            {error ? <div className={classes.error_message}><WarningIcon /><Typography>{error.message}</Typography></div> : null}
            <Explanation />
          </Content>
          <div className={classes.footer}>
            <ul>
              <li><a target="_blank" rel="noopener noreferrer" href="https://saucegrowth.com/legal/gdpr-privacy-policy/">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <BottomCTA />
      </MuiThemeProvider>
    );
  }
}
