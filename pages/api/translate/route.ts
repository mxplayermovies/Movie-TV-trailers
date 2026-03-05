// // app/api/translate/route.ts
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { text, targetLang, sourceLang = 'auto' } = await req.json();

//     if (!text || !targetLang) {
//       return NextResponse.json(
//         { error: 'Missing text or targetLang' },
//         { status: 400 }
//       );
//     }

//     const url = 'https://translate.googleapis.com/translate_a/single';
//     const params = new URLSearchParams({
//       client: 'gtx',
//       sl: sourceLang,
//       tl: targetLang,
//       dt: 't',
//       q: text,
//     });

//     const response = await fetch(`${url}?${params}`);
//     if (!response.ok) {
//       throw new Error(`Google Translate API error: ${response.status}`);
//     }

//     const data = await response.json();
//     const translatedText = data[0]?.map((item: any[]) => item[0]).join('') || text;

//     return NextResponse.json({ translatedText });
//   } catch (error) {
//     console.error('Translation API error:', error);
//     return NextResponse.json(
//       { error: 'Translation failed', translatedText: Text },
//       { status: 500 }
//     );
//   }
// }




// app/api/translate/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let text: string | undefined;
  let targetLang: string | undefined;
  let sourceLang: string = 'auto';

  try {
    const body = await req.json();
    text = body.text;
    targetLang = body.targetLang;
    sourceLang = body.sourceLang ?? 'auto';

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Missing text or targetLang' },
        { status: 400 }
      );
    }

    const url = 'https://translate.googleapis.com/translate_a/single';
    const params = new URLSearchParams({
      client: 'gtx',
      sl: sourceLang,
      tl: targetLang,
      dt: 't',
      q: text,
    });

    const response = await fetch(`${url}?${params}`);
    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data[0]?.map((item: any[]) => item[0]).join('') || text;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed', translatedText: text ?? '' },
      { status: 500 }
    );
  }
}