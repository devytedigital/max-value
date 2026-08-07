import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const district = searchParams.get("district");
    const query = searchParams.get("q");

    const querySnapshot = await getDocs(collection(db, "branches"));
    let branches: any[] = [];
    querySnapshot.forEach((doc) => {
      branches.push({ id: doc.id, ...doc.data() });
    });

    if (state) {
      branches = branches.filter((b: any) => b.state?.toLowerCase() === state.toLowerCase());
    }

    if (district) {
      branches = branches.filter((b: any) => b.district?.toLowerCase() === district.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      branches = branches.filter(
        (b: any) =>
          b.name?.toLowerCase().includes(q) ||
          b.address?.toLowerCase().includes(q) ||
          b.landmark?.toLowerCase().includes(q) ||
          b.district?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(branches);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read Firestore collection: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      state,
      district,
      address,
      landmark = "",
      pinCode,
      phone = "",
      mobile,
      email = "",
      location = "",
      workingHours = "9:30 AM - 5:30 PM (Mon-Sat)"
    } = body;

    // Validation
    if (!name || !state || !district || !address || !pinCode || !mobile) {
      return NextResponse.json(
        { error: "Missing required fields. Required: name, state, district, address, pinCode, mobile." },
        { status: 400 }
      );
    }

    // Retrieve existing IDs to perform client-side slug de-duplication
    const querySnapshot = await getDocs(collection(db, "branches"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    // Create unique ID / slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let id = `${slug}-${district.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    
    // De-duplicate ID
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newBranch = {
      id,
      name: name.toUpperCase(),
      state,
      district,
      address,
      landmark,
      pinCode,
      phone,
      mobile,
      email,
      location,
      workingHours
    };

    // Save in Firestore document
    await setDoc(doc(db, "branches", id), newBranch);

    return NextResponse.json(newBranch, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create Firestore document: " + error.message }, { status: 500 });
  }
}
