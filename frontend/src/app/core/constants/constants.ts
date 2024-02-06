import { HttpHeaders } from "@angular/common/http";

export const API_URL = 'http://localhost:5000/';
export const FRONT_URL = 'http://localhost:4200/';
export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': FRONT_URL,
        'Access-Control-Allow-Methods': "PUT, POST, DELETE, GET, OPTIONS",
        'Access-Control-Allow-Headers': "Accept, Authorization, Content-Type",
        'Access-Control-Allow-Credentials': "true"
    })
};
export const NOVO = "novo";
export const TODO = "todo";
export const DOING = "doing";
export const DONE = "done";