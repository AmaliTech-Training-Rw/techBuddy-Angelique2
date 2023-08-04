import cloudinary from './utils/cloudinary.js';
import express from 'express';
import cors from 'cors';
const app = express();


app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// app.get('/api/images', async (req, res) => {
//     const {resources} = await cloudinary.search.expression('folder: Home').sort_by('public_id','desc').max_results(30).execute();
//     const publicIds = resources.map((file) => file.public_id);
//     res.send(publicIds);
// });
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: 'Home', });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
