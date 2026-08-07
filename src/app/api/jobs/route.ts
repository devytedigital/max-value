import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const location = searchParams.get("location");
    const type = searchParams.get("type");

    const querySnapshot = await getDocs(collection(db, "jobs"));
    let jobs: any[] = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    // Sort by createdAt descending, fallback to title
    jobs.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (dateB !== dateA) return dateB - dateA;
      return a.title.localeCompare(b.title);
    });

    if (department) {
      jobs = jobs.filter((j: any) => j.department?.toLowerCase() === department.toLowerCase());
    }

    if (location) {
      jobs = jobs.filter((j: any) => j.location?.toLowerCase().includes(location.toLowerCase()));
    }

    if (type) {
      jobs = jobs.filter((j: any) => j.type?.toLowerCase() === type.toLowerCase());
    }

    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read Firestore jobs collection: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements = []
    } = body;

    // Validation
    if (!title || !department || !location || !type || !experience || !description) {
      return NextResponse.json(
        { error: "Missing required fields. Required: title, department, location, type, experience, description." },
        { status: 400 }
      );
    }

    // Retrieve existing IDs to perform slug de-duplication
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    // Create unique ID / slug
    let id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (id.startsWith("-")) id = id.substring(1);
    if (id.endsWith("-")) id = id.substring(0, id.length - 1);
    
    // Fallback if empty slug
    if (!id) {
      id = "job-" + Math.random().toString(36).substring(2, 7);
    }

    // De-duplicate ID
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newJob = {
      id,
      title: title.toUpperCase(),
      department,
      location,
      type,
      experience,
      description,
      requirements,
      createdAt: new Date().toISOString()
    };

    // Save in Firestore document
    await setDoc(doc(db, "jobs", id), newJob);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create Firestore job document: " + error.message }, { status: 500 });
  }
}
