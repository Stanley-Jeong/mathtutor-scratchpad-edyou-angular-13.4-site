// src/typings.d.ts
import * as jquery from 'jquery';

declare global {
  interface JQuery {
    modal(action?: string): JQuery;
  }
}