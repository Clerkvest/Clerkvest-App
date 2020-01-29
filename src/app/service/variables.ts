import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('http://127.0.0.1:8080/tit-rest/api');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
