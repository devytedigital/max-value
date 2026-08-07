import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const querySnapshot = await getDocs(collection(db, "documents"));
    const docList: any[] = [];
    querySnapshot.forEach((doc) => {
      docList.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(docList);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read Firestore documents collection: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, href, type = "PDF Document", size = "Drive Link" } = body;

    // Validation
    if (!name || !href) {
      return NextResponse.json(
        { error: "Missing required fields. Required: name, href." },
        { status: 400 }
      );
    }

    // Retrieve existing IDs to perform slug de-duplication
    const querySnapshot = await getDocs(collection(db, "documents"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    // Create unique ID / slug
    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    if (!slug) slug = "doc";
    
    let id = slug;
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newDoc = {
      id,
      name,
      href,
      type,
      size,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    };

    // Save to Firestore
    await setDoc(doc(db, "documents", id), newDoc);

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save Firestore document: " + error.message }, { status: 500 });
  }
}
