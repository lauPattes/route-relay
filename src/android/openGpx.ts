import { File, Paths } from 'expo-file-system';
import { getContentUriAsync } from 'expo-file-system/legacy';
import * as IntentLauncher from 'expo-intent-launcher';

import { testRouteGpx } from '../gpx/sample';

const ACTION_VIEW = 'android.intent.action.VIEW';
const FLAG_GRANT_READ_URI_PERMISSION = 1;
const TEST_FILE_NAME = 'route-relay-test.gpx';

export const supportedMimeTypes = [
  'application/gpx+xml',
  'application/xml',
  'text/xml',
  'application/octet-stream',
] as const;

export type SupportedMimeType = (typeof supportedMimeTypes)[number];

export async function openTestRoute(
  mimeType: SupportedMimeType,
): Promise<void> {
  const file = new File(Paths.cache, TEST_FILE_NAME);

  file.create({ overwrite: true });
  file.write(testRouteGpx);

  const contentUri = await getContentUriAsync(file.uri);

  await IntentLauncher.startActivityAsync(ACTION_VIEW, {
    data: contentUri,
    flags: FLAG_GRANT_READ_URI_PERMISSION,
    type: mimeType,
  });
}
