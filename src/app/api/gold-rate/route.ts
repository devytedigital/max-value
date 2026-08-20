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

    const docRef = doc(db, "blogs", "gold-rate-settings");
    const docSnap = await getDoc(docRef);
    let historyList: any[] = [];

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      if (Array.isArray(existingData.history)) {
        historyList = existingData.history;
      } else if (existingData.rate && existingData.lastUpdated) {
        historyList = [
          {
            rate: Number(existingData.rate),
            date: existingData.lastUpdated,
            updatedBy: existingData.updatedBy || "Previous Admin",
          },
        ];
      }
    }

    const timestamp = new Date().toISOString();
    let updatedHistory = [...historyList];

    if (historyList.length === 0) {
      updatedHistory = [
        {
          rate: rateNum,
          date: timestamp,
          updatedBy: updatedBy.trim(),
        },
      ];
    } else if (Number(historyList[0].rate) !== rateNum) {
      const newHistoryEntry = {
        rate: rateNum,
        date: timestamp,
        updatedBy: updatedBy.trim(),
      };
      updatedHistory = [newHistoryEntry, ...historyList].slice(0, 10);
    } else {
      // If the rate value is identical to the latest entry, update its timestamp and author to prevent duplicates
      updatedHistory[0] = {
        rate: rateNum,
        date: timestamp,
        updatedBy: updatedBy.trim(),
      };
    }

    const payload = {
      rate: rateNum,
      lastUpdated: timestamp,
      updatedBy: updatedBy.trim(),
      history: updatedHistory,
    };

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
