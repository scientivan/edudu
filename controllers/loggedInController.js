const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const {uploadFile} = require('../config/upload-to-drive')
const { tokenModel } = require("../models/dbModel");
const { verifyToken } = require("../utils/jwt");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { contentModel } = require('../models/content');
const { decode } = require('punycode');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const query = async (prompt) => {
    // ini keluar
    // console.log(prompt)
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to generate image: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer()
        // ini keluar
        // console.log(arrayBuffer)
        const buffer = Buffer.from(arrayBuffer)
        return buffer; // Mengambil gambar sebagai blob
    }
    
    catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image");
    }
}
function convertDriveLink(url) {
    const match = url.match(/\/d\/(.+?)\/view/);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url; // fallback kalau pattern tidak cocok
}

exports.geminiGenerateImage = async (req,res) => {
    const {prompt} = req.body
    const imageBuffer = await query(prompt)
    let imageUrl = await uploadFile(imageBuffer, `${uuidv4()}.png`);
    imageUrl = convertDriveLink(imageUrl)
    res.status(200).json({imageUrl})
}

exports.geminiGenerateText = async (req,res) => {
    try{
        const {prompt} = req.body
        console.log(prompt)
        if(!prompt){
            return res.status(400).json({error : "Content field is empty"})
        }

        const result = await geminiModel.generateContent(prompt);
        // console.log(result.response.text());
        res.status(200).json(result.response.text())
    }
    catch(err){
        console.log(err)
    }
}

exports.addCreatedContentToDatabase = async (req,res) => {
    try{
        const {title, desc, imagesLink,captions} = req.body
        console.log("di addcreatedcontenttodatabase", imagesLink.imageUrl)
        // const isExist = await contentModel.findOne({ title });

        // if (isExist) {
        //     return res.status(409).json({ error: "Duplicate content" });
        // }
        const contentData = {
            title,
            desc,
            imagesLink : imagesLink.imageUrl,
            captions
        };
        const content = await contentModel.insertMany(contentData)
        console.log(content)
        res.status(200).json({content})
    }
    catch(err){
        console.log(err)
    }
}

exports.changingCreatedContentStatus = async (req,res) => {
    try{
        const { title, desc} = req.body;
        console.log(title)
        console.log(desc)
        const con = await contentModel.findOne({title,desc})
        con.isPaid = true;
        await con.save(); // simpan perubahan
        res.status(200).json('content has been paid');
    }
    catch(err){
        console.log(err)
    }
}




