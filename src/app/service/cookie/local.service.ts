import { Injectable, Inject } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Danny Becker
 * 
 * Bunch of methods to handle local storage and cookies
 * 
 * @since 1.0
 * @version 1.0
 */
export class LocalService {

  /**
   * Creates an object of LocalService
   * @param {CookieService} cookie CookieService
   */
  constructor(private cookie: CookieService, @Inject(DOCUMENT) private document: Document) { }

  /**
   * Reads a cookie out of the local storage
   * @param name Name of the cookie
   * @return Value of the cookie
   */
  get(name: string): string {
    return this.cookie.get(name);
  }

  /**
   * Reads a cookie out of the local storage
   * @param name Name of the cookie
   * @return Value of the cookie as a integer
   */
  getAsInteger(name: string): number {
    return Number.parseInt(this.cookie.get(name));
  }

  /**
   * Reads a cookie out of the local storage
   * @param name Name of the cookie
   * @return value of the cookie as a float
   */
  getAsFloat(name: string): number {
    return Number.parseFloat(this.cookie.get(name))
  }

  /**
   * Reads a cookie out of the local storage
   * @param name Name of the cookie
   * @return value of the cookie as a boolean
   */y
  getAsBoolean(name): boolean {
    const cookie = this.cookie.get(name);
    return cookie === 'true' || cookie === 'True' || cookie === '1';
  }

  /**
   * Writes a cookie into the local storage
   * @param name Name of the cookie
   * @param value Value to set
   */
  set(name: string, value: string): void {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    this.document.cookie = name + '=' + value + ';' + expires + ';path=/';
    console.log(this.document.cookie);
    // this.cookie.set(name, value, 7, '/', undefined, true, 'Strict');
  }

  /**
   * Deletes a cookie with the given name
   * @param name Name of the cookie
   */
  delete(name: string) {
    this.cookie.delete(name, '/', undefined);
  }
}
