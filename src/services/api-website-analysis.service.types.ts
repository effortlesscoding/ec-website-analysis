
export type APILighthouseResult = {};

export type APIStackPack = {
  id: 'wordpress' | string,
  title: "WordPress" | string,
  iconDataURL: string;
  descriptions: {
    [key: string]: string;
  }
};

export type APIAuditDetails = APIFilmstripDetails |
  APIAuditOpportunityDetails |
  APIAuditTableDetails |
  APIAuditScreenshotDetails |
  APIAuditCriticalChainDetails;

export type APIFilmstripDetails = {
  type: 'filmstrip',
  items: Array<{
    timing: number;
    timestamp: number;
    data: string; // data:image/jpeg...
  }>;
  scale: 3000
}

export type APIAuditScreenshotDetails = {
  type: 'screenshot';
  timing: number;
  timestamp: number;
  data: string;
};

export type APIAuditCriticalChainDetails = {
  chains: {
      [key: string]: {
        children: {
          [key: string]: {
            request: {
              startTime: number,
              transferSize: number,
              url: string,
              responseReceivedTime: number,
              endTime: number,
            }
          }
        },
        request: {
          url: string;
          responseReceivedTime: number;
          endTime: number;
          startTime: number;
          transferSize: number;
        }
      };
  };
  longestChain: {
    transferSize: number,
    duration: number,
    length: number,
  };
  type: "criticalrequestchain";
};

export type APIAuditDebugDetails = {
  type: 'debugdata',
  items: [
    {
      totalByteWeight: 404813,
      numTasks: 527,
      numTasksOver10ms: 10,
      rtt: 0.0005773047537693426,
      numFonts: 4,
      maxRtt: 0.0005773047537693426,
      numTasksOver500ms: 0,
      numScripts: 11,
      maxServerLatency: null,
      numStylesheets: 3,
      throughput: 32381394435.027287,
      numTasksOver100ms: 0,
      numTasksOver25ms: 4,
      numTasksOver50ms: 1,
      numRequests: 40,
      totalTaskTime: 450.8539999999998,
      mainDocumentTransferSize: 7433
    }
  ]
};

export type APIAuditOpportunityDetails = {
  overallSavingsMs: number,
  headings: Array<{
    valueType: 'url' | 'bytes' | 'thumbnail',// string,
    label?: string,
    key: string;
  }>,
  type: 'opportunity',
  items: Array<{
    [key: string]: (number | string)
  }>;
  overallSavingsBytes: number,
};

export type APIAuditTableDetails = {
  summary: {
    wastedMs: number;
  },
  headings: Array<{
    key: string;
    itemType: 'text' | 'code' | 'bytes' | 'numeric' | 'ms' | 'url';
    text: string;
    granularity: number;
  }>;
  type: 'table',
  items: Array<{
    [key: string]: string | number;
    // scriptParseCompile: number,
    // url: string,
    // total: number,
    // scripting: number,
  }>
};

//

export type APICategories = {
  [key: string]: {
    id: string;
    title: string;
    score: number;
    auditRefs: Array<{
      id: string;
      weight: number,
      group: 'metrics' | string;
    }>;
  }
};

export type APICategoryGroups = {
  [key: string]: {
    title: string;
    description: string;
  };
};

//

export type APIAuditEntry = {
  id: string; // "unminified-css",
  title: string; // "Minify CSS",
  description: string; // "Minifying CSS files can reduce network payload sizes. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/minify-css).",
  score: 1,
  scoreDisplayMode: 'numeric' | 'informative' | 'notApplicable' | 'binary',
  displayValue?: string;
  warnings?: string[];
  details?: APIAuditDetails;
};
//

export type APIWebsiteAnalysisResult = {
  captchaResult: string;
  kind: string;
  id: string; // website's URL
  loadingExperience: { initial_url: string; };
  lighthouseResult: {
    requestedUrl: string;
    finalUrl: string;
    lighthouseVersion: string;
    userAgent: string;
    fetchTime: string;
    environment: {
      networkUserAgent: string;
      hostUserAgent: string;
      benchmarkIndex: number;
    },
    runWarnings: [],
    configSettings: {
      emulatedFormFactor: 'desktop' | string;
      locale: string;
      onlyCategories: string[];
    },
    audits: {
      // Keys defined in categories
      [key: string] : APIAuditEntry;
    };
    categories: APICategories;
    categoryGroups: APICategoryGroups;
    timing: { total: number; };
    stackPacks: APIStackPack[]
  };
  analysisUTCTimestamp: string;
};
