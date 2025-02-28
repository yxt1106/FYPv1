// const express = require("express");
// import express from 'express';
// const { google } = require('googleapis');
import { google, } from 'googleapis';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from 'google-auth-library';
import fs from 'fs';
// data.js
let fetchedData = null; // 这个变量用来存储获取到的数据

// 定义一个异步函数来获取数据
export async function fetchData() {
  try {
    const response = await fetch("https://api.sheetbest.com/sheets/5b0a2a97-34fb-4f27-8940-7c2ec84704c3");
    const data = await response.json();
    fetchedData = data; // 将数据存储到变量中
  } catch (error) {
    console.error("获取数据时出错:", error);
  }
}
// 导出变量，供其他模块使用
export function getFetchedData() {
  return fetchedData;
}
fetchData().then(() => {
  const data = getFetchedData(); // 获取存储的数据
  console.log(data);
});
  // console.log(Arr);
// const app = express();
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.post("/", async (req, res) => {
//   const { PaperName, Link } = req.body;
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
//   });

//   // Create client instance for auth
//   const client = await auth.getClient();

//   // Instance of Google Sheets API
//   const googleSheets = google.sheets({ version: "v4", auth: client });

//   const spreadsheetId = "18FtQvb2S6VbbYPyVnkjpoIGaxIzA5dEPk02WYFebSCQ";

//   // Get metadata about spreadsheet
//   const metaData = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId,
//   });

//   // Read rows from spreadsheet
//   const getRows = await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId,
//     range: "Sheet1",
//   });
//   res.send(getRows.data);
//   console.log(getRows.data);
// })
// const auth = new google.auth.GoogleAuth({
//   keyFile: './credentials.json',
//   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
// })
// async function readSheet() {
//   const sheets = google.sheets({ version: 'v4', auth });
//   const spreadsheetId = '18FtQvb2S6VbbYPyVnkjpoIGaxIzA5dEPk02WYFebSCQ';
//   const range = 'Sheet1!A4:B4';
  
//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range,
//     });
//     const rows = response.data.values;
//     return rows;
//   }catch (error) {
//     console.error('error:',error);
//   }
// }

// (async () => {
//   const data = await readSheet();
//   console.log(data);
// })
// const getRow = async (email) => {
  
//   // await doc.useServiceAccountAuth({
//   //   client_email: credentials.client_email,
//   //   private_key: credentials.private_key
//   // });

//   await doc.loadInfo();

//   let sheet = doc.sheetsByIndex[0];
//   let rows = await sheet.getRows();

//   for(let i = 0; i < rows.length; i++) {
//     console.log(rows[i])
//   }

//   console.log(rows);
//   return rows
// }

// getRow('WaveRider: Immersive Visualization of Indoor Signal Propagation');
// const app = express();
// console.log(express);
// app.get('/', async (req, res) => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: './credentials.json',
//     scopes: ['https://www.googleapis.com/auth/spreadsheets']
//   })
//   const client = await auth.getClient();

//   const googleSheets = google.sheets({ version: 'v4', auth: client });

//   const spreadsheetId = '18FtQvb2S6VbbYPyVnkjpoIGaxIzA5dEPk02WYFebSCQ'

//   const metadata = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId,
    
//   })
//   res.send(metadata);
//   console.log(metadata);
// })


// export const API_KEY = 'AIzaSyB4yGLvW_GSWgdaX-7FPmFjmRkoZ1q62EU'; // 替换为你的Google API密钥
// export const SPREADSHEET_ID = '18FtQvb2S6VbbYPyVnkjpoIGaxIzA5dEPk02WYFebSCQ/edit?gid=0#gid=0';//替换成你的表格的ID

// // 异步函数，用于获取表格名称
// async function fetchSheetNames() {
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       const errorDetails = await response.json();
//       throw new Error(`HTTP错误！状态：${response.status}, 信息：${errorDetails.error.message}`);
//     }
//     const data = await response.json();
//     if (data.error) {
//       throw new Error(`API错误！信息：${data.error.message}`);
//     }
//     return data.sheets.map(sheet => sheet.properties.title);
//   } catch (error) {
//     console.error('获取表格名称时出错：', error);
//   }
// }

// // 异步函数，用于获取表格数据
// export async function fetchSheetData(sheetName) {
//   const range = `${sheetName}!A1:Z100000`; // 根据你的表格调整范围
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       const errorDetails = await response.json();
//       throw new Error(`HTTP错误！状态：${response.status}, 信息：${errorDetails.error.message}`);
//     }
//     const data = await response.json();
//     if (data.error) {
//       throw new Error(`API错误！信息：${data.error.message}`);
//     }
//     return data.values;
//   } catch (error) {
//     console.error('获取数据时出错：', error);
//   }
// }