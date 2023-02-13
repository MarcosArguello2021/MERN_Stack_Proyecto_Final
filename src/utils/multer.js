import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/imagenes',
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    const fileName = req.body.username + '.' + extension;
    cb(null, fileName)
  }
});

export const upload = multer({storage: storage});