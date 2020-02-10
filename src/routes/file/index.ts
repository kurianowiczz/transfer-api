app.post('/upload', async (req: Request, res: Response) => {
    if (req.files.filename) {
        const sampleFile = req.files.filename as UploadedFile;
        let uploadPath = 'files/' + Date.now() + sampleFile.name;
        const exitedDoc = await DocumentService.findDocByPath(uploadPath);
        if (exitedDoc) {
            uploadPath = 'files/copy_' + Date.now() + sampleFile.name;
        }
        await sampleFile.mv(__dirname + '/' + uploadPath);
        const expire = moment(
            `${req.body.expire} ${req.body.time}`,
            'YYYY-MM-DD HH:mm'
        );
        const savedDoc = await DocumentService.addDoc({
            ...req.body,
            expire: expire.toDate(),
            path: uploadPath
        } as IDocument);
        return res.status(200).send(savedDoc);
    } else {
        return res.status(400).send({ error: 'No file to upload' });
    }
});
