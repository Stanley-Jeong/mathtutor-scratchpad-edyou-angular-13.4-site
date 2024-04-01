// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://1i4zp3969d.execute-api.us-west-2.amazonaws.com/Development",
  Avatar:"Hannah",
  ssoStateParameter : '7cff7f8a-0014-4221-b08b-272919e69980/saml2',
  logger: {
    level: 'TRACE',
  },
  APIKeySM:"eyJzb3VsSWQiOiJkZG5hLWVkeW91LXRlY2hub2xvZ2llcy0tZWR5b3UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9jZjcwZmU4OS1mNzcyLTRmYTUtYjgxYi1hMzRlMmE3OTYwYjAifQ=="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
