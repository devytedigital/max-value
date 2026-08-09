import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const querySnapshot = await getDocs(collection(db, "admins"));
    let adminList: any[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      adminList.push({
        id: docSnap.id,
        name: data.name || "Administrator",
        email: data.email || "",
        role: data.role || "Admin",
        status: data.status || "Active",
        createdAt: data.createdAt || new Date().toISOString(),
        lastLogin: data.lastLogin || null,
      });
    });

    // If no admins exist yet in database, seed default primary admin account
    if (adminList.length === 0) {
      const defaultAdmin = {
        id: "super-admin",
        name: "Super Administrator",
        email: "admin@gmail.com",
        password: "12345678",
        role: "Super Admin",
        status: "Active",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await setDoc(doc(db, "admins", "super-admin"), defaultAdmin);
      adminList.push({
        id: defaultAdmin.id,
        name: defaultAdmin.name,
        email: defaultAdmin.email,
        role: defaultAdmin.role,
        status: defaultAdmin.status,
        createdAt: defaultAdmin.createdAt,
        lastLogin: defaultAdmin.lastLogin,
      });
    }

    // Sort by role (Super Admin first), then by createdAt descending
    adminList.sort((a, b) => {
      if (a.role === "Super Admin" && b.role !== "Super Admin") return -1;
      if (b.role === "Super Admin" && a.role !== "Super Admin") return 1;
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json(adminList);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read admins database: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role = "Branch Admin", status = "Active" } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email, and Password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for duplicate email
    const querySnapshot = await getDocs(collection(db, "admins"));
    let emailExists = false;
    const existingIds: string[] = [];

    querySnapshot.forEach((docSnap) => {
      existingIds.push(docSnap.id);
      const data = docSnap.data();
      if (data.email && data.email.toLowerCase() === normalizedEmail) {
        emailExists = true;
      }
    });

    if (emailExists) {
      return NextResponse.json(
        { error: "An admin account with this email already exists." },
        { status: 400 }
      );
    }

    // Generate unique slug ID
    let slug = normalizedEmail.split("@")[0].replace(/[^a-z0-9]+/g, "-");
    if (!slug) slug = "admin";
    
    let id = `admin-${slug}`;
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newAdmin = {
      id,
      name: name.trim(),
      email: normalizedEmail,
      password: password.trim(),
      role: role || "Branch Admin",
      status: status || "Active",
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    // Save in Firestore
    await setDoc(doc(db, "admins", id), newAdmin);

    // Return created admin without exposing password
    return NextResponse.json(
      {
        id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        status: newAdmin.status,
        createdAt: newAdmin.createdAt,
        lastLogin: newAdmin.lastLogin,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create admin user in Firestore: " + error.message },
      { status: 500 }
    );
  }
}
