# aoristos-sql-db

### install and setup
```
npm install aoristos-sql-db
touch .env
echo "API_KEY=YOUR_API_TOKEN" > .env
```

### example
```
import SQLservice from "aoristos-sql-db";

const service = new SQLservice("DATABASE_NAME");

const json = await service.req("SQL_STRING");

```