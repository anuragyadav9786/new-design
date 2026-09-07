import { NextResponse } from "next/server";
import {
  isNseEndpoint,
  nseEndpoints,
} from "@/features/market-data/nse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ url: string }> },
) {
  const { url } = await params;

  if (!isNseEndpoint(url)) {
    return NextResponse.json(
      { error: "Invalid NSE endpoint" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(nseEndpoints[url], {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch NSE data" },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json(), {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("NSE proxy error:", error);
    return NextResponse.json(
      { error: "Unable to fetch NSE data" },
      { status: 500 },
    );
  }
}
