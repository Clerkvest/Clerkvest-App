import { async } from '@angular/core/testing';
import {LocalService} from './local.service';

describe('LocalService', () => {
  let service;

  const cookie: any = {
    get(name: string): string { return ''; },
    getAsInteger(name: string): number { return NaN; },
    getAsFloat(name: string): number { return NaN; },
    getAsBoolean(name): boolean { return false; },
    set(name: string, value: string): void { }
  };

  beforeEach(() => {
    service = new LocalService(cookie);
  });

  it('should run #get()', async () => {
    const result = service.get(name);
    expect(result).toBe('');
  });

  it('should run #getAsInteger()', async () => {
    const result = service.getAsInteger(name);
    expect(result).toBeNaN();
  });

  it('should run #getAsFloat()', async () => {
    const result = service.getAsFloat(name);
    expect(result).toBeNaN();
  });

  it('should run #getAsBoolean()', async () => {
    const result = service.getAsBoolean(name);
    expect(result).toBeFalsy();
  });

  it('should run #set()', async () => {
    service.set(name, '-1');
  });
});
