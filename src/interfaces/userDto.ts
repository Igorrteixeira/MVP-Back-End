export interface CreateDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  unitId?: number;
  directoryId?: number;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface OutputSerDb {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  unitId: number;
  directoryId: number;
}

export interface OutputSallerDb {
  name: string;
  unitId: number;
  directoryId: number;
}
