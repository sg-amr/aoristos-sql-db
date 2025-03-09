import dotenv from "dotenv";

dotenv.config();

class SQLservice {
    databaseName: string;

    constructor(databaseName: string) {
        this.databaseName = databaseName;
    }

    async req(sqlString: string) {
        const key = process.env.API_KEY;
        const databaseName = this.databaseName;

        if (!key) {
            throw new Error("API_KEY is not set in environment variables.");
        }

        try {
            const response = await fetch(`https://sql.aoristos.net/${databaseName}.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({ query: sqlString, key }).toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            return json;
        } catch (error) {
            console.error("SQL Request Error:", error);
            return { error: "Failed to fetch SQL data" };
        }
    }
}

export default SQLservice;