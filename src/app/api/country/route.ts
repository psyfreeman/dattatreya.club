import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en';

  const countries = {
    en: [
      { code: 'IN', name: 'India' },
      { code: 'US', name: 'United States' },
      { code: 'UK', name: 'United Kingdom' },
      // Add more countries as needed
    ],
    ru: [
      { code: 'IN', name: 'Индия' },
      { code: 'US', name: 'Соединенные Штаты' },
      { code: 'UK', name: 'Великобритания' },
      // Add more countries as needed
    ]
  };

  return NextResponse.json({
    success: true,
    data: countries[lang as keyof typeof countries] || countries.en
  });
}