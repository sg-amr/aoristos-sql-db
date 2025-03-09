declare class SQLservice {
    databaseName: string;
    constructor(databaseName: string);
    req(sqlString: string): Promise<any>;
}
export default SQLservice;
