import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

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
  constructor(private cookie: CookieService) { }

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
   */
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
    this.cookie.set(name, value);
  }
}
