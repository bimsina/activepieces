import { OAuth2PropertyValue, PieceAuth, createPiece } from '@activepieces/pieces-framework';
import { dropboxCreateNewFolder } from './lib/actions/create-new-folder';
import { dropboxCreateNewTextFile } from './lib/actions/create-new-text-file';
import { dropboxUploadFile } from './lib/actions/upload-file';
import { dropboxGetFileLink } from './lib/actions/get-file-link';
import { dropboxDeleteFile } from './lib/actions/delete-file';
import { dropboxMoveFile } from './lib/actions/move-file';
import { dropboxCopyFile } from './lib/actions/copy-file';
import { dropboxDeleteFolder } from './lib/actions/delete-folder';
import { dropboxMoveFolder } from './lib/actions/move-folder';
import { dropboxCopyFolder } from './lib/actions/copy-folder';
import { dropboxListAFolder } from './lib/actions/list-a-folder';
import { dropboxSearch } from './lib/actions/search';
import { createCustomApiCallAction } from '@activepieces/pieces-common';

export const dropboxAuth = PieceAuth.OAuth2({
  description: '',
  authUrl: 'https://www.dropbox.com/oauth2/authorize',
  tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
  required: true,
  scope: [
    'files.metadata.write',
    'files.metadata.read',
    'files.content.write',
    'files.content.read',
  ],
});

export const dropbox = createPiece({
  minimumSupportedRelease: '0.5.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/dropbox.png',
  actions: [
    dropboxSearch,
    dropboxCreateNewTextFile,
    dropboxUploadFile,
    dropboxGetFileLink,
    dropboxDeleteFile,
    dropboxMoveFile,
    dropboxCopyFile,
    dropboxCreateNewFolder,
    dropboxDeleteFolder,
    dropboxMoveFolder,
    dropboxCopyFolder,
    dropboxListAFolder,
    createCustomApiCallAction({
        baseUrl: () => 'https://api.dropboxapi.com/2',
        auth: dropboxAuth,
        authMapping: (auth) => ({
            'Authorization': `Bearer ${(auth as OAuth2PropertyValue).access_token}`
        })
    })
    
  ],
  displayName: 'Dropbox',
  authors: ['kanarelo', 'BastienMe'],
  triggers: [],
  auth: dropboxAuth,
});