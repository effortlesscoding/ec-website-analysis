import axios from 'axios';
import { APIWebsiteAnalysisResult } from './api-website-analysis.service.types';
import moment from 'moment';

const key = '<<ENTER_YOUR_GOOGLE_API_KEY>>';

const Keys = {
  API_LAST_CALLED: 'api-last-called',
  API_CALL_COUNT: 'api-count',
};

export class APIWebsiteAnalysis {
  analyse = (url: string): Promise<APIWebsiteAnalysisResult> => {
    const apiCount = localStorage.getItem(Keys.API_CALL_COUNT);
    const apiLastCalled = localStorage.getItem(Keys.API_LAST_CALLED);
    const apiCountNumber = Number.isNaN(Number(apiCount)) ? 0 : Number(apiCount);
    if (apiCountNumber < 3) {
      localStorage.setItem(Keys.API_CALL_COUNT, `${apiCountNumber + 1}`);
      localStorage.setItem(Keys.API_LAST_CALLED, new Date().toString());
    } else {
      if (apiLastCalled) {
        const apiLastCalledDate = Date.parse(apiLastCalled);
        if (moment().diff(apiLastCalledDate, 'day') >= 1) {
          localStorage.setItem(Keys.API_CALL_COUNT, '0');
          localStorage.setItem(Keys.API_LAST_CALLED, new Date().toString());
        } else {
          return Promise.reject(new Error('You have reached the maximum amount of requests today'));
        }
      }
      localStorage.setItem(Keys.API_CALL_COUNT, '0');
      localStorage.setItem(Keys.API_LAST_CALLED, new Date().toString());
    }
    return axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`).then(r => r.data);
  }
}

export const apiWebsiteAnalysis = new APIWebsiteAnalysis();
