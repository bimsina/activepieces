import {
  createPiece,
  OAuth2PropertyValue,
  PieceAuth,
} from '@activepieces/pieces-framework';

import { newResponse } from './lib/triggers/new-response';
import { createCustomApiCallAction } from '@activepieces/pieces-common';

export const smAuth = PieceAuth.OAuth2({
  authUrl: 'https://api.surveymonkey.com/oauth/authorize',
  tokenUrl: 'https://api.surveymonkey.com/oauth/token',
  required: true,
  scope: [
    'responses_read',
    'responses_read_detail',
    'webhooks_read',
    'webhooks_write',
    'surveys_read',
  ],
});

export const surveymonkey = createPiece({
  displayName: 'SurveyMonkey',
  auth: smAuth,
  minimumSupportedRelease: '0.5.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/surveymonkey.png',
  authors: ['MoShizzle'],
  actions: [
    createCustomApiCallAction({
      baseUrl: () => 'https://api.surveymonkey.com/v3',
      auth: smAuth,
      authMapping: (auth) => ({
        Authorization: `Bearer ${(auth as OAuth2PropertyValue).access_token}`,
      }),
    }),
  ],
  triggers: [newResponse],
});