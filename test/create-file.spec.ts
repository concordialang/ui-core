import { fs as memfs, vol } from 'memfs';
import { createFile } from '../src/utils';

describe( 'create-file', () => {

    beforeAll( () => {
        vol.mkdirSync( '.', { recursive: true } );
    } );

    afterAll( () => {
        vol.reset();
    } );

    it( 'creates a file with the given arguments', async () => {
        const fullPath = await createFile( 'foo', '{}', '.json', memfs );
        expect( fullPath ).toEqual( 'foo.json' );
    } ) ;

} );