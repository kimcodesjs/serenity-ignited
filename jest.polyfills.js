const { Blob } = require('node:buffer');
const { TextEncoder, TextDecoder, ReadableStream } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
});

const { fetch, Request, Response, Headers, FormData } = require('undici');

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
