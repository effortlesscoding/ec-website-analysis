import * as React from 'react';
import { APIWebsiteAnalysisResult } from '../../services/api-website-analysis.service.types';
import { ResultLine } from './result-line/result-line.component';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Typography } from '@material-ui/core';

import styles from './results.module.scss';

interface IProps {
  results: APIWebsiteAnalysisResult | null;
};

export class Results extends React.Component<IProps> {

  // handleLandbotSave = () => {
  //   var myLandbot = new (window as any).LandbotFrameWidget({
  //     container: '#myLandbot',
  //     index: 'https://landbot.io/u/H-228730-O0WN2FV75CIBT48J/index.html',
  //   });
  // }
  render() {
    const { results } = this.props;
    if (!results) {
      return null;
    }
    const audits = results.lighthouseResult.audits;
    const auditEntries = Object.keys(audits).map(key => audits[key]).sort((a1, a2) => {
      if (a1.score === null || undefined) {
        return 1;
      }
      if (a2.score === null || undefined) {
        return -1;
      }
      return a2.score - a1.score;
    });
    const score = (results.lighthouseResult.categories['performance'] && results.lighthouseResult.categories['performance'].score) || 0;
    return (
      <>
        <div className={styles.summary}>
          <CircularProgressbar
            styles={{ root: { width: '10rem'}}}
            value={score * 100}
            text={`${score * 100}%`}
          />
          <div className={styles.summary__entries}>
            <Typography variant="body2" >Website:</Typography>
            <Typography variant="body1">{results.lighthouseResult.finalUrl}</Typography>
            <br />
            <Typography variant="body2" >Date:</Typography>
            <Typography variant="body1">{new Date(results.analysisUTCTimestamp).toString()}</Typography>
          </div>
        </div>
        {auditEntries.map((auditEntry) => {
          return (
            <ResultLine
              key={auditEntry.id}
              auditEntry={auditEntry}
            />
          );
        })}
      </>
    );
  }
};
