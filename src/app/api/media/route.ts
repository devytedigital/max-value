import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const querySnapshot = await getDocs(collection(db, "media"));
    const albums: any[] = [];
    querySnapshot.forEach((doc) => {
      albums.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(albums);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read Firestore collection: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      description,
      image,
      images = [],
      date
    } = body;

    // Validation
    if (!title || !image) {
      return NextResponse.json(
        { error: "Missing required fields. Required: title, image." },
        { status: 400 }
      );
    }

    const categoryVal = category || "Gallery";
    const descriptionVal = description || "";

    // Retrieve existing IDs to perform client-side slug de-duplication
    const querySnapshot = await getDocs(collection(db, "media"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    // Create unique ID / slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    // Trim hyphens
    slug = slug.replace(/^-+|-+$/g, "");
    if (!slug) slug = "album";
    
    let id = slug;
    
    // De-duplicate ID
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    // Generate readable date if not provided
    const formattedDate = date || new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newAlbum = {
      id,
      title,
      category: categoryVal,
      description: descriptionVal,
      image,
      images,
      date: formattedDate
    };

    // Save to Firestore
    await setDoc(doc(db, "media", id), newAlbum);

    return NextResponse.json(newAlbum, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save Firestore document: " + error.message }, { status: 500 });
  }
}
