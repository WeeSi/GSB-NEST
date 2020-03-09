import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
    
    // tslint:disable-next-line: variable-name
    private _apiBasePath = '';

    // tslint:disable-next-line: variable-name
    private _apiHostName = '';

    // tslint:disable-next-line: variable-name
    private _apiProtocol = '';

    // tslint:disable-next-line: variable-name
    private _dbHost = '';

    // tslint:disable-next-line: variable-name
    private _dbName = '';

    // tslint:disable-next-line: variable-name
    private _dbUserName = 'root';

    // tslint:disable-next-line: variable-name
    private _dbPassword = 'test';

    // tslint:disable-next-line: variable-name
    private _dbPort = 3306;

    // tslint:disable-next-line: variable-name
    private _swaggerHostName = '';
    
    // tslint:disable-next-line: variable-name
    private _swaggerProtocol: 'http' | 'https' = 'http';
    
    // tslint:disable-next-line: variable-name
    private _webHostName = '';
    
    // tslint:disable-next-line: variable-name
    private _webProtocol = '';
   
    // tslint:disable-next-line: variable-name
    private _nodeEnv = 'dev';

    // tslint:disable-next-line: variable-name
    private _isProd = false;

    constructor() {
        if (process.env.NODE_ENV === 'dev') {
            dotenv.config();
            dotenv.config({ path: `${__dirname}/../../env/dev.env` });
        }
       
        this.apiBasePath = process.env.API_BASE_PATH;
        this.apiHostName = process.env.API_HOST_NAME;
        this.apiProtocol = process.env.API_PROTOCOL;
        this.dbHost = process.env.DB_HOST;
        this.dbName = process.env.DB_NAME;
        this.dbUserName = process.env.DB_USERNAME;
        this.dbPassword = process.env.DB_PASSWORD;
        this.dbPort = +process.env.DB_PORT;
        this.swaggerHostName = process.env.SWAGGER_HOST_NAME;
        this.swaggerProtocol = process.env.SWAGGER_PROTOCOL as 'http'|'https';
        this.webHostName = process.env.WEB_HOST_NAME;
        this.webProtocol = process.env.WEB_PROTOCOL;
        this.nodeEnv = process.env.NODE_ENV;
        this.isProd = this.nodeEnv === 'prod';
    }

    public get apiBasePath() {
        return this._apiBasePath;
    }
    public set apiBasePath(value) {
        this._apiBasePath = value;
    }
    public get apiHostName() {
        return this._apiHostName;
    }
    public set apiHostName(value) {
        this._apiHostName = value;
    }
    public get apiProtocol() {
        return this._apiProtocol;
    }
    public set apiProtocol(value) {
        this._apiProtocol = value;
    }
    public get dbHost() {
        return this._dbHost;
    }
    public set dbHost(value) {
        this._dbHost = value;
    }
    public get dbName() {
        return this._dbName;
    }
    public set dbName(value) {
        this._dbName = value;
    }
    public get dbUserName() {
        return this._dbUserName;
    }
    public set dbUserName(value) {
        this._dbUserName = value;
    }
    public get dbPassword() {
        return this._dbPassword;
    }
    public set dbPassword(value) {
        this._dbPassword = value;
    }
    public get dbPort() {
        return this._dbPort;
    }
    public set dbPort(value) {
        this._dbPort = value;
    }
    public get swaggerHostName() {
        return this._swaggerHostName;
    }
    public set swaggerHostName(value) {
        this._swaggerHostName = value;
    }
    public get swaggerProtocol() {
        return this._swaggerProtocol;
    }
    public set swaggerProtocol(value) {
        this._swaggerProtocol = value;
    }
    public get webHostName() {
        return this._webHostName;
    }
    public set webHostName(value) {
        this._webHostName = value;
    }
    public get webProtocol() {
        return this._webProtocol;
    }
    public set webProtocol(value) {
        this._webProtocol = value;
    }
    public get nodeEnv() {
        return this._nodeEnv;
    }
    public set nodeEnv(value) {
        this._nodeEnv = value;
    }
    public get isProd() {
        return this._isProd;
    }
    public set isProd(value) {
        this._isProd = value;
    }

}