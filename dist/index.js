"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class SQLservice {
    constructor(databaseName) {
        this.databaseName = databaseName;
    }
    req(sqlString) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = process.env.API_KEY;
            const databaseName = this.databaseName;
            if (!key) {
                throw new Error("API_KEY is not set in environment variables.");
            }
            try {
                const response = yield fetch(`https://sql.aoristos.net/${databaseName}.php`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({ query: sqlString, key }).toString()
                });
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                const json = yield response.json();
                return json;
            }
            catch (error) {
                console.error("SQL Request Error:", error);
                return { error: "Failed to fetch SQL data" };
            }
        });
    }
}
exports.default = SQLservice;
//# sourceMappingURL=index.js.map