import { expect } from 'chai';
import 'mocha';
import { Container } from 'typedi';
import loader from '../src/loaders';
import HashService from '../src/services/Hash.service';
import IHash from '../src/interfaces/IHash';

describe('Document Test', () => {
    let hash: IHash;
    before(async () => {
        await loader('test');
    });

    it('method: generateHash/hash.service; expect: success hash generation', async () => {
        const hashService = Container.get(HashService);
        const result = await hashService.generateHash('str');
        expect(result).to.be.an('object');
        hash = result;
    });

    it('method: verifyHash/hash.service; expect: success hash verification', async () => {
        const hashService = Container.get(HashService);
        const result = await hashService.verifyHash(hash, 'str');
        expect(result).to.be.true;
    });

    it('method: verifyHash/hash.service; expect: fail hash verification', async () => {
        const hashService = Container.get(HashService);
        const result = await hashService.verifyHash(hash, 'str1');
        expect(result).to.be.false;
    });
});
