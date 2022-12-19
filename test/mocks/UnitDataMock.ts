import { DataBase } from "../../src/dataBase/DataBase";

interface OutputUnitsDB {
  id: number;
  unitName: string;
  latLong: string;
  directoryId: number;
}
interface GetUnitDto {
  id: number;
  directoryId: number;
}

export class UnitsDBMock extends DataBase {
  // constructor(parameters) {}
  public static TABLE_UNITS = "MVP_UNITS";

  getUnitDb = async (input: GetUnitDto): Promise<OutputUnitsDB> => {
    const [response]: OutputUnitsDB[] = [
      {
        id: 3526,
        unitName: "florianopolis",
        latLong: "latLong",
        directoryId: 20400,
      },
    ];
    return response;
  };

  getUnitByLatLongDb = async (latLong: string): Promise<OutputUnitsDB> => {
    const [response]: OutputUnitsDB[] = [
      {
        id: 3526,
        unitName: "florianopolis",
        latLong: "latLong",
        directoryId: 20400,
      },
    ];
    return response;
  };

  getAllUnitsDb = async (): Promise<OutputUnitsDB[]> => {
    const response: OutputUnitsDB[] = [
      {
        id: 3526,
        unitName: "florianopolis",
        latLong: "latLong",
        directoryId: 20400,
      },
    ];
    return response;
  };
}
