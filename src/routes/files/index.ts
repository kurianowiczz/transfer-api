import { Request, Response, Router } from 'express';
import { authOnly } from '../users/middleware';
import { Container } from 'typedi';
import DocumentService from '../../services/Document.service';
import FileService from '../../services/File.service';

const router = Router();

router.get('/', authOnly,
    async (req: Request, res: Response) => {
        const documentService = Container.get(DocumentService);
        // @ts-ignore
        const files = await documentService.findByUserId(req.user.id.toString());
        res.send({ files });
    });

router.post('/', authOnly,
    async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            console.log(req.user);
            const documentService = Container.get(DocumentService);
            const filesService = Container.get(FileService);
            // @ts-ignore
            const file = req.files.file;
            // @ts-ignore
            const { path, downloadLink } = await filesService.addFile(file.name, file, req.user.id);
            const newFile = await documentService.addDoc({
                ...req.body,
                path,
                    // @ts-ignore
                fileName: file.name,
                downloadLink,
            },
                // @ts-ignore
                req.user.id,
            );
            res.send({ newFile });
        } catch (e) {
            res.status(500).send({ error: e });
        }
    });

export default router;
