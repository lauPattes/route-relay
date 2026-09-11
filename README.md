# Route Relay

Route Relay is an Android R&D application exploring whether a clean GPX file can
be opened reliably in Garmin Connect without using Garmin Connect Web.

The current milestone is deliberately narrow: the app generates a small,
known-valid GPX Track and asks Android to open it using `ACTION_VIEW`. The test
screen lets us try the common MIME types separately and record which one Garmin
Connect accepts.

## Experiment result

On the initial Android test device, Garmin Connect successfully opened the test
track when Route Relay used:

- `application/gpx+xml`
- `application/xml`
- `text/xml`

Garmin Connect did not open the track when Route Relay used
`application/octet-stream`.

This establishes that the controlled `ACTION_VIEW` handoff works. It does not
yet establish that Route Relay can repair arbitrary exported GPX files.

## Run the first experiment

1. Install the Expo Go app on a physical Android device.
2. Run `npm start` in this directory.
3. Scan the displayed QR code with Expo Go.
4. Select a MIME type and tap **Open test GPX**.
5. Choose Garmin Connect if Android offers it.
6. Record whether Garmin is missing, opens without importing, shows an error, or
   reaches the course-type screen.

Start with `application/gpx+xml`, then try each remaining MIME type.

## Why `ACTION_VIEW`?

Garmin Connect does not appear as a normal share target on the test device, but
it does appear in Android's **Open with** list. Route Relay therefore receives
files using sharing later, but opens its generated file using an Android view
intent.

## Planned milestones

- Prove or disprove the Garmin handoff with the generated fixture.
- Add manual selection of a GPX file from Downloads.
- Parse, validate, and normalize GPX Tracks and Routes.
- Add the Android share target for receiving exported files.
- Add the route-ready and error flows.

No server, account, database, maps, or analytics are planned for the MVP.

## Project status

This repository contains an early learning and interoperability experiment, not
a finished application. It has only been tested on a limited number of Android
devices and Garmin Connect versions.

Route Relay is an independent project and is not affiliated with or endorsed by
Garmin or AllTrails.
