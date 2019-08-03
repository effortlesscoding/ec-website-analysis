import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './results-container.module.scss';
import { APIWebsiteAnalysisResult } from '../../services/api-website-analysis.service.types';
import { Results } from './results.component';
import Typography from '@material-ui/core/Typography';

interface IProps {
  isLoading: boolean;
  results: APIWebsiteAnalysisResult | null;
}

export const ResultsContainer = (props: IProps) => {
  const { isLoading, results } = props;
  const shouldShowResults = !isLoading && !!results;
  return (
    <Paper className={[styles.container, (isLoading ? styles.loading : '')].join(' ')}>
      {isLoading ? (
        <>
          <CircularProgress /><br/>
          <Typography variant="caption" >Analysing... this might take up to a minute. </Typography>
          <Typography variant="caption" >Don't close the browser.</Typography>
        </>
      ) : null }
      {shouldShowResults ? <Results results={results} /> : null}
    </Paper>
  );
};