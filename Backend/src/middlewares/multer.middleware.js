import multer from "multer";
import path from "path"


const fullPath = path.join(process.cwd(), "public", "temp");   // Builds an absolute path to 'public/temp' from the project root, safe for all OS


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,fullPath)
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})


export const Upload = multer({
    storage:storage,
})


/* import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', 'temp'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false);
  }
};

const Upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export { Upload }; */