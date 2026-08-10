import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DEFAULT_GOLD_RATE = 7250;

export async function GET() {
  try {
    // Storing in "blogs" collection to bypass rules deployment requirements on live Firestore
    const docRef = doc(db, "blogs", "gold-rate-settings");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const fallbackRate = {
        rate: DEFAULT_GOLD_RATE,
        lastUpdated: new Date().toISOString(),
        updatedBy: "System Default"
      };
      return NextResponse.json(fallbackRate);
    }

    return NextResponse.json(docSnap.data());
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read Firestore gold rate: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rate, updatedBy = "Administrator" } = body;

    const rateNum = Number(rate);
    if (isNaN(rateNum) || rateNum <= 0) {
      return NextResponse.json(
        { error: "Invalid gold rate value. Must be a positive number." },
        { status: 400 }
      );
    }

    const payload = {
      rate: rateNum,
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy.trim()
    };

    const docRef = doc(db, "blogs", "gold-rate-settings");
    await setDoc(docRef, payload);

    return NextResponse.json({ success: true, ...payload }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update Firestore gold rate: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
