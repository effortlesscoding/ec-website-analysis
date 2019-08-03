import * as React from 'react';
import styles from './explanation.module.scss';
import Typography from '@material-ui/core/Typography';

export const Explanation = (props: {}) => {
  return (
    <>
      <br />
      <br />
      <br />
      <div className={styles.container}>
        <div className={styles.block}>
          <Typography variant="h6">Improve SEO</Typography>
          <Typography variant="body1">
            Page speed affects both conversion rate and SEO. Thus, improving it can help increase both total traffic and the conversion rate for a page.
          </Typography>
          <Typography variant="body1">
            Google has used page speed as one of the primary indicators to detect which pages to show up at the top. First officially <a target="_blank" rel="noopener noreferrer" href="https://webmasters.googleblog.com/2010/04/using-site-speed-in-web-search-ranking.html">stated in 2010</a>.
          </Typography>
        </div>
        <div className={styles.block}>
          <Typography variant="h6">Improve Conversions</Typography>
          <Typography variant="body1">
            A website's conversion rate is the percentage of users who take a desired action, and conversion rate is tied directly to how much revenue a website generates. Page speed has a huge impact on user behavior.
          </Typography>
          <Typography variant="body1">
            How quickly should a webpage load? 47% of customers expect a webpage to load in 2 seconds or less, according to <a target="_blank" rel="noopener noreferrer" href="https://blog.hubspot.com/marketing/page-load-time-conversion-rates">hubspot</a>.
          </Typography>
        </div>
      </div>
    </>
  );
};