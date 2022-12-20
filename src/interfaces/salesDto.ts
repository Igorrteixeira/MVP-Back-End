export interface CreateSalesDTO {
  token: string;
  timestamp: string;
  amount: number;
  latLong: string;
}

export interface GetSalesDTO {
  token: string;
  sellerName?: string;
  unitName?: string;
  directoryName?: string;
  order?: string;
  initialDate?:string,
  finalDate?:string
}

export interface UpdateSalesDTO {
  token: string;
  id: string;
  timestamp?: string;
  amount?: number;
  roaming?: boolean;
  latLong?: string;
  userUnitId?: number;
  directoryId?: number;
}

export interface DeleteSalesDTO {
  token: string;
  salesId: string;
}

export interface SalesDetailsDTO {
  token: string;
  id: string;
}

export interface OutputSalesDB {
  id: string;
  name: string;
  sellerId: string;
  unitName: string;
  timestamp:string;
  amount: number;
  roaming: boolean;
  latLong: string;
  userUnitId: number;
  directoryId: number;
  directoryName: string;
}
