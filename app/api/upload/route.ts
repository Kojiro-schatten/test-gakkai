import { google } from "googleapis";
import { Readable } from "stream";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return new Response("ファイルがありません", { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

    const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive"],
    });

  const drive = google.drive({ version: "v3", auth });
    const info = await drive.about.get({
    fields: "storageQuota,user",
  });
const folderInfo = await drive.files.get({
  fileId: process.env.GOOGLE_DRIVE_FOLDER_ID!,
  fields: 'id, name, permissions',
});
console.log(folderInfo.data);
  console.log("Drive user:", info.data.user);
  console.log("Storage quota:", info.data.storageQuota);
//   console.log('req', drive.files, 'filefilefile', file)

  const res = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    },
    media: {
      mimeType: file.type || "application/octet-stream",
      body: bufferToStream(buffer),
    },
    fields: "id, webViewLink",
  });

  return new Response(JSON.stringify(res.data), { status: 200 });
}

function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}