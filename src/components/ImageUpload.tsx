import React, { useState, useRef } from "react";
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  allowUrl?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  required = false,
  placeholder = "Upload or paste image URL...",
  allowUrl = true
}: ImageUploadProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type (images only)
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Server upload failed");
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    setError("");
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase text-zinc-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          {allowUrl && (
            <button
              type="button"
              onClick={() => setMode(mode === "upload" ? "url" : "upload")}
              className="text-[10px] font-bold text-[#147FC3] hover:text-[#FCA038] hover:underline cursor-pointer flex items-center gap-1 transition-colors"
            >
              {mode === "upload" ? (
                <>
                  <LinkIcon className="w-2.5 h-2.5" /> Paste URL Instead
                </>
              ) : (
                <>
                  <Upload className="w-2.5 h-2.5" /> Upload File Instead
                </>
              )}
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="text-[10px] font-bold text-rose-600 mb-2 leading-relaxed">
          ⚠️ {error}
        </p>
      )}

      {mode === "upload" ? (
        <div className="flex items-center gap-4">
          {/* Preview Thumb */}
          <div className="w-20 h-20 rounded-xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden shrink-0 relative group">
            {value ? (
              <>
                <img
                  src={value}
                  alt="Upload Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-150 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <ImageIcon className="w-6 h-6 text-zinc-350" />
            )}
          </div>

          {/* Action trigger */}
          <div className="flex-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {value ? (
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-zinc-450 break-all select-all pr-4">
                  {value}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={triggerSelectFile}
                    disabled={uploading}
                    className="px-3 py-1.5 border border-zinc-250 hover:bg-zinc-50 text-[10px] font-bold rounded-lg text-zinc-650 cursor-pointer transition-colors"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-3 py-1.5 border border-zinc-250 hover:bg-rose-50 text-[10px] font-bold rounded-lg text-rose-650 cursor-pointer transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={triggerSelectFile}
                disabled={uploading}
                className="w-full max-w-xs py-5 border-2 border-dashed border-zinc-200 hover:border-[#147FC3]/55 hover:bg-[#147FC3]/5 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-zinc-500 hover:text-[#147FC3] cursor-pointer transition-all disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#147FC3]" />
                    <span className="text-[10px] font-bold">Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-zinc-400" />
                    <span className="text-[10px] font-black uppercase tracking-wide">Choose Image File</span>
                    <span className="text-[9px] text-zinc-400 font-semibold">PNG, JPG, WEBP up to 5MB</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 placeholder-zinc-400 outline-none focus:border-[#147FC3] focus:bg-white transition-colors"
          />
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3.5 top-3 text-zinc-450 hover:text-zinc-650 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
