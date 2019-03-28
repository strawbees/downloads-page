# Downloads page

This is a temporary solution for a self contained, dynamically populated download page that works on Internet Explorer 11+ and two latest versions of "modern" browsers.

## Self contained

This page will likely to be included into a legacy WordPress setup and it should not require relative path loading or linking.

## Dinamically populated

This page should have the least need for maintenance, therefore it will fetch all its content online. It should always fallback to the last value fetched or display error message.

## Build

Minimal build is required. The steps should be restricted to concatenate and compress files.
