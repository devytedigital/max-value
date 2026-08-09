import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const querySnapshot = await getDocs(collection(db, "news"));
    let newsList: any[] = [];
    querySnapshot.forEach((doc) => {
      newsList.push({ id: doc.id, ...doc.data() });
    });

    // Sort by createdAt descending, fallback to date parsing
    newsList.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : (a.date ? new Date(a.date).getTime() : 0);
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : (b.date ? new Date(b.date).getTime() : 0);
      if (dateB !== dateA) return dateB - dateA;
      return (a.title || "").localeCompare(b.title || "");
    });

    if (category && category !== "All") {
      newsList = newsList.filter((item: any) => 
        item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (query) {
      const q = query.toLowerCase();
      newsList = newsList.filter((item: any) => 
        item.title?.toLowerCase().includes(q) ||
        item.summary?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(newsList);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read Firestore news collection: " + error.message },
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
      author = "Corporate Desk",
      readTime = "3 min read",
      summary,
      bannerImage,
      content = [],
      supportingImages = []
    } = body;

    // Validation
    if (!title || !category || !summary || !bannerImage) {
      return NextResponse.json(
        { error: "Missing required fields. Required: title, category, summary, bannerImage." },
        { status: 400 }
      );
    }

    // Retrieve existing IDs to perform slug de-duplication
    const querySnapshot = await getDocs(collection(db, "news"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    // Create unique ID / slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) slug = "news-" + Math.random().toString(36).substring(2, 7);

    let id = slug;
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const formattedDate = date || new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newArticle = {
      id,
      title: title.trim(),
      category: category.trim(),
      date: formattedDate,
      author: author.trim() || "Corporate Desk",
      readTime: readTime.trim() || "3 min read",
      summary: summary.trim(),
      bannerImage: bannerImage.trim(),
      content: Array.isArray(content) && content.length > 0 ? content : [
        {
          type: "paragraph",
          text: summary.trim()
        }
      ],
      supportingImages: Array.isArray(supportingImages) ? supportingImages : [],
      createdAt: new Date().toISOString()
    };

    // Save in Firestore document
    await setDoc(doc(db, "news", id), newArticle);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create Firestore news document: " + error.message },
      { status: 500 }
    );
  }
}
