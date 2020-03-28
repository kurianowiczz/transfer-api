import { expect } from 'chai';
import 'mocha';
import { Container } from 'typedi';
import loader from '../src/loaders';
import userModel from '../src/models/User.model';
import DocumentService from '../src/services/Document.service';
import {IDocument} from '../src/models/Document';

describe('Document Test', () => {
    before(async () => {
        await loader('test');
        await userModel.db.dropDatabase();
    });

    it('method: addDoc/Document.service; expect: success add document', async () => {
        const documentService = Container.get(DocumentService);
        const document = await documentService.addDoc({
            title: 'Title',
            description: 'Description',
            expire: new Date(),
            path: '',
    } as IDocument);
        expect(document).to.be.an('object');
        expect(document).to.have.property('title', 'Title');
    });

    it('method: findAll/Document.service; expect: success find all users in db', async () => {
        const documentService = Container.get(DocumentService);
        const documents = await documentService.findAll();
        expect(documents).to.be.an('array');
    });

});
