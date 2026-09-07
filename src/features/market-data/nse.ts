export const nseEndpoints = {
  allIndices: "https://www.nseindia.com/api/allIndices",
  getMarqueData:
    "https://www.nseindia.com/api/NextApi/apiClient?functionName=getMarqueData",
} as const;

export type NseEndpoint = keyof typeof nseEndpoints;

export function isNseEndpoint(value: string): value is NseEndpoint {
  return value in nseEndpoints;
}
