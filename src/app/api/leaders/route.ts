import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const querySnapshot = await getDocs(collection(db, "leaders"));
    let leadersList: any[] = [];
    querySnapshot.forEach((doc) => {
      leadersList.push({ id: doc.id, ...doc.data() });
    });

    // Sort by order ascending, fallback to createdAt or name
    leadersList.sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : 999;
      const orderB = typeof b.order === "number" ? b.order : 999;
      if (orderA !== orderB) return orderA - orderB;
      
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (timeA !== timeB) return timeA - timeB;

      return (a.name || "").localeCompare(b.name || "");
    });

    if (category && category !== "All") {
      leadersList = leadersList.filter((item: any) => 
        item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json(leadersList);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read Firestore leaders collection: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      role,
      category,
      image,
      bio,
      highlights = [],
      order = 999
    } = body;

    // Validation
    if (!name || !role || !category || !image || !bio) {
      return NextResponse.json(
        { error: "Missing required fields. Required: name, role, category, image, bio." },
        { status: 400 }
      );
    }

    // Retrieve existing IDs to perform slug de-duplication
    const querySnapshot = await getDocs(collection(db, "leaders"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) slug = "leader-" + Math.random().toString(36).substring(2, 7);

    let id = slug;
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newLeader = {
      id,
      name: name.trim(),
      role: role.trim(),
      category: category.trim(),
      image: image.trim(),
      bio: bio.trim(),
      highlights: Array.isArray(highlights) ? highlights.map((h: string) => h.trim()).filter(Boolean) : [],
      order: typeof order === "number" ? order : 999,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, "leaders", id), newLeader);

    return NextResponse.json(newLeader, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create Firestore leader document: " + error.message },
      { status: 500 }
    );
  }
}
