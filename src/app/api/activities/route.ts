import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const querySnapshot = await getDocs(collection(db, "activities"));
    let activitiesList: any[] = [];
    querySnapshot.forEach((doc) => {
      activitiesList.push({ id: doc.id, ...doc.data() });
    });

    activitiesList.sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      return timeB - timeA;
    });

    if (category && category !== "All") {
      activitiesList = activitiesList.filter(
        (item: any) => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json(activitiesList);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read Firestore activities collection: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      date,
      location,
      bannerImage,
      summary,
      content,
      organizer,
      participantsCount,
      tags = [],
      isFeatured = false
    } = body;

    if (!title || !category || !date || !bannerImage || !summary) {
      return NextResponse.json(
        { error: "Missing required fields: title, category, date, bannerImage, summary." },
        { status: 400 }
      );
    }

    const querySnapshot = await getDocs(collection(db, "activities"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) slug = "activity-" + Math.random().toString(36).substring(2, 7);

    let id = slug;
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newActivity = {
      id,
      title: title.trim(),
      category: category.trim(),
      date: date.trim(),
      location: location ? location.trim() : "South India",
      bannerImage: bannerImage.trim(),
      summary: summary.trim(),
      content: content ? content.trim() : summary.trim(),
      organizer: organizer ? organizer.trim() : "Max Value Credits",
      participantsCount: participantsCount ? participantsCount.trim() : "",
      tags: Array.isArray(tags) ? tags.map((t: string) => t.trim()).filter(Boolean) : [],
      isFeatured: Boolean(isFeatured),
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, "activities", id), newActivity);

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create Firestore activity document: " + error.message },
      { status: 500 }
    );
  }
}
