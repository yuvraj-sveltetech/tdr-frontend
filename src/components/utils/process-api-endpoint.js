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
    {
      name: "Conference Call",
      endpoint: "conference-call",
    },
  ],
  ipdr: [
    {
      name: "Target Numbers Exists/Not Exists on Locations",
      endpoint: "search-numbers-ipdr",
    },
    {
      name: "VOIP",
      endpoint: "voip-ipdr",
    },
    {
      name: "Communication Apps",
      endpoint: "communication-apps-ipdr",
    },
    {
      name: "All Apps",
      endpoint: "non-communication-apps-ipdr",
    },
    {
      name: "TOR/VPN",
      endpoint: "get-tor-vpn",
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

export const ipdrOptions = {
  type: "non-communication-apps-ipdr",
  options: [
    {
      name: "All",
      value: "all",
    },
    {
      name: "Banking App",
      value: "banking_app_name",
    },
    {
      name: "Food App",
      value: "food_app_name",
    },
    {
      name: "Transport App",
      value: "transport_app_name",
    },
    {
      name: "E-Commerce App",
      value: "ecommerce_app_name",
    },
    {
      name: "Betting App",
      value: "betting_app_name",
    },
    {
      name: "Streaming App",
      value: "streaming_app_name",
    },
    {
      name: "Payment Gateway",
      value: "payment_gateway_name",
    },
    {
      name: "Crypto Currency",
      value: "crypto_currency_name",
    },
  ],
};
