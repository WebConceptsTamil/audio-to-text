import express from "express";
import fs from "fs";
import multer from "multer";
import { config } from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const app = express();
const port = 8800;
app.use(cors());
config();
app.use(express.json());

// open ai config
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// multer middleware
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

// transcribe
app.post("/transcribe",  async (req, res) => {
  try {
    const { conversiontype } = req.body;
    const response = await openai.createTranscription(
      fs.createReadStream(`${req.file.path}`),
      "whisper-1"
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// translate
app.post("/translate", upload.single("audio"), async (req, res) => {
  try {
    const { conversiontype } = req.body;
    const response = await openai.createTranslation(
      fs.createReadStream(`${req.file.path}`),
      "whisper-1"
    );
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
