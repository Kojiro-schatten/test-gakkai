import { google } from 'googleapis'

export async function POST(req: Request) {
  try {
    const { name, email, affiliation, note } = await req.json()

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.SPREADSHEET_ID!

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, affiliation, email, note, new Date().toISOString() ]],
      },
    })

    return new Response(JSON.stringify({ message: 'Success' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Error' }), { status: 500 })
  }
}
