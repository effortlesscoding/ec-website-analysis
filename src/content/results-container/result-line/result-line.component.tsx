import * as React from 'react';
import styles from './result-line.module.scss';
import { APIAuditEntry } from '../../../services/api-website-analysis.service.types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { replaceLinks } from './helper';

interface IProps {
  auditEntry: APIAuditEntry;
};

const Score = ({ auditEntry }: IProps) => {
  if (auditEntry.score === undefined || auditEntry.score === null) {
    return <span className={styles.score__undefined} />;
  }
  if (auditEntry.score >= .9) {
    return <span className={styles.score__good} />;
  } else if (auditEntry.score >= .5) {
    return <span className={styles.score__medium} />;
  } else {
    return <span className={styles.score__bad} />;
  }
};

export const ResultLine = ({ auditEntry }: IProps) => {
  const renderScore = () => {
    if (auditEntry.scoreDisplayMode === 'numeric') {
      return <>
        <Typography variant="body1"><strong>Score:</strong> {auditEntry.score * 100}</Typography>
        <Typography variant="body1">{auditEntry.displayValue}</Typography>
        <br />
      </>;
    }
    return null;
  }
  const renderExtraContent = () => {
    if (!auditEntry.details) {
      return null;
    }
    switch (auditEntry.details.type) {
      case 'screenshot':
        return <img alt="" className={styles.audit_screenshot} src={auditEntry.details.data} />;
      case 'filmstrip':
        return (
          <div className={styles.audit_filmstrips}>
            {auditEntry.details.items.map(item => (
              <img alt="" key={item.timing} className={styles.audit_filmstrip} src={item.data} />
            ))}
          </div>
        )
      default:
        return null;
    }
  }
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Score auditEntry={auditEntry} />
        <Typography>{auditEntry.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          {renderScore()}
          <Typography variant="body2">{replaceLinks(auditEntry.description)}</Typography>
          {renderExtraContent()}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};