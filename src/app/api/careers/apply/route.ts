import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobAppliedFor = formData.get("jobAppliedFor") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const experienceYears = formData.get("experienceYears") as string;
    const industry = formData.get("industry") as string;
    const employer = formData.get("employer") as string;
    const ctc = formData.get("ctc") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!jobAppliedFor || !name || !email || !coverLetter || !state || !city || !experienceYears || !industry || !employer || !ctc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER || "hr1maxvalue@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD || "wmzh exss pslk bxet";

    // Configure Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Create attachments if resume exists
    const attachments: any[] = [];
    if (resumeFile) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
      });
    }

    // Design email body in beautiful HTML format
    const mailOptions = {
      from: `"MaxValue Careers" <${gmailUser}>`,
      to: "hr1maxvalue@gmail.com",
      replyTo: email,
      subject: `New Job Application: ${jobAppliedFor} - ${name}`,
      text: `
NEW JOB APPLICATION - MAXVALUE CAREERS
----------------------------------------
Job Applied For: ${jobAppliedFor}
Name: ${name}
Email: ${email}
Current Location: ${city}, ${state}
Total Work Experience: ${experienceYears} Years
Current Industry: ${industry}
Current Employer: ${employer}
Current Annual CTC: ${ctc}

Message / Cover Letter:
${coverLetter}
----------------------------------------
Sent via MaxValue Careers Portal
`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #fafafa;">
          <h2 style="color: #147FC3; border-bottom: 2px solid #147FC3; padding-bottom: 10px; margin-bottom: 20px;">
            New Job Application - MaxValue Careers
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b; width: 40%;">Job Applied For:</td>
              <td style="padding: 8px 0; color: #18181b; font-weight: bold;">${jobAppliedFor}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Applicant Name:</td>
              <td style="padding: 8px 0; color: #18181b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Email Address:</td>
              <td style="padding: 8px 0; color: #18181b;"><a href="mailto:${email}" style="color: #147FC3; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Location:</td>
              <td style="padding: 8px 0; color: #18181b;">${city}, ${state}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Work Experience:</td>
              <td style="padding: 8px 0; color: #18181b;">${experienceYears} Years</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Current Industry:</td>
              <td style="padding: 8px 0; color: #18181b;">${industry}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Current Employer:</td>
              <td style="padding: 8px 0; color: #18181b;">${employer}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #52525b;">Current Annual CTC:</td>
              <td style="padding: 8px 0; color: #18181b;">${ctc}</td>
            </tr>
          </table>
          
          <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e4e4e7; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 5px;">
              Message / Cover Letter
            </h4>
            <p style="color: #27272a; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 0;">
              ${coverLetter}
            </p>
          </div>
          
          <p style="font-size: 11px; color: #a1a1aa; text-align: center; border-top: 1px solid #f4f4f5; padding-top: 15px; margin-top: 20px;">
            This email was sent automatically from the MaxValue Careers Portal.
          </p>
        </div>
      `,
      attachments,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send email application: " + error.message },
      { status: 500 }
    );
  }
}
