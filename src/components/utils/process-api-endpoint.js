export const options = {
  cdr: [
    { name: "All International Numbers", endpoint: "export-ist-numbers" },
    {
      name: "Other State Numbers (Currently not Available)",
      endpoint: "get-other-state-numbers",
    },
    { name: "Call Type Counts", endpoint: "get-call-type-counts" },
    {
      name: "Target Numbers Exists/Not Exists on Locations",
      endpoint: "search-numbers",
    },
    {
      name: "Calls more than 30 Minutes",
      endpoint: "get-call-duration-numbers",
    },
    { name: "Common IMEI Analysis", endpoint: "get-common-imei-numbers" },
    {
      name: "Multiple IMEI Analysis",
      endpoint: "get-common-number-on-imeis",
    },
  ],
  ipdr: [
    {
      name: "Target Numbers Exists/Not Exists on Locations",
      endpoint: "search-numbers-ipdr",
    },
    {
      name: "Voice over internet protocol",
      endpoint: "voip-ipdr",
    },
  ],
  gprs: [
    {
      name: "All International Numbers",
      endpoint: "export-ist-numbers-gprs",
    },
    {
      name: "Other State Numbers (Currently not Available)",
      endpoint: "get-other-state-numbers-gprs",
    },
    {
      name: "Target Numbers Exists/Not Exists on Locations",
      endpoint: "search-numbers-gprs",
    },
    {
      name: "Calls more than 30 Minutes",
      endpoint: "get-call-duration-numbers-gprs",
    },
    {
      name: "Common IMEI Analysis",
      endpoint: "get-common-imei-numbers-gprs",
    },
    {
      name: "Multiple IMEI Analysis",
      endpoint: "get-common-number-on-imeis-gprs",
    },
  ],
};
