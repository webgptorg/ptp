import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { preparePersona } from './preparePersona';

describe('how preparePersona works', () => {
    it('should work with simple persona description', () =>
        expect(preparePersona({ personaDescription: `Copywriter` })).resolves.toBe({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: !!!! Allow to specify more model names
        }));

    it('should work with foo', () =>
        expect(
            preparePersona({
                personaDescription: spaceTrim(`
                    Foo

                    Bar

                    Baz
                `),
            }),
        ).resolves.toBe({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: !!!! Allow to specify more model names
        }));

    /*
    Note: Probbably no failure cases needed
        > it('should NOT work with bar', () =>
        >     expect(
        >         preparePersona({...}),
        >     ).rejects.toThrowError(/---/));
    */
});