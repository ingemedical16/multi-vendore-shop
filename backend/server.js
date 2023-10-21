import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import clearImage from './utils/file.js';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import cors from 'cors';

//import routes
import userRoutes from './routes/userRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import coupounCodeRoutes from './routes/coupounCodeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import productRoutes from './routes/productRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import withdrawRoutes from './routes/withdrawRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import Product from './models/productModel.js'
import storage from './storage/storage.js';

const port = process.env.PORT || 5000;
const API = '/api/v2';

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

const __dirname = path.resolve();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, PATCH, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    return res.status(200).json({});
  }
  next();
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
/* app.use(
  multer({ storage}).single("image"),
); */
app.use('/images', express.static(path.join(__dirname, 'backend/images')));

app.use(cookieParser());

app.use(`${API}/upload`, uploadRoutes);
app.use(`${API}/user`, userRoutes);
app.use(`${API}/conversation`, conversationRoutes);
app.use(`${API}/message`, messageRoutes);
app.use(`${API}/order`, orderRoutes);
app.use(`${API}/shop`, shopRoutes);
app.use(`${API}/product`, productRoutes);
app.use(`${API}/event`, eventRoutes);
app.use(`${API}/coupon`, coupounCodeRoutes);
app.use(`${API}/payment`, paymentRoutes);
app.use(`${API}/withdraw`, withdrawRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', async (req, res) => {
    /* const createdProducts = await Product.insertMany(data.products);
  //await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers }); */
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
