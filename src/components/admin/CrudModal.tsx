"use client";

import React, { useEffect } from "react";
import { X, AlertTriangle, CheckCircle2, Save, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "date";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mode: "add" | "edit" | "delete";
  fields?: FormField[];
  formData?: Record<string, any>;
  setFormData?: (data: any) => void;
  onSave?: () => void;
  onConfirmDelete?: () => void;
  deleteItemName?: string;
}

export default function CrudModal({
  isOpen,
  onClose,
  title,
  mode,
  fields = [],
  formData = {},
  setFormData,
  onSave,
  onConfirmDelete,
  deleteItemName = "item",
}: CrudModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    if (setFormData) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
              {mode === "delete" ? (
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              ) : mode === "edit" ? (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              )}
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
            {mode === "delete" ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                  <Trash2 className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  Are you sure you want to delete <span className="font-bold text-rose-600">"{deleteItemName}"</span>?
                </p>
                <p className="text-xs text-slate-500">
                  This action will remove the item from the local demonstration dataset immediately.
                </p>
              </div>
            ) : (
              fields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
                    />
                  ) : field.type === "select" ? (
                    <select
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
                    >
                      <option value="">Select option...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(formData[field.name])}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                        className="rounded border-slate-300 text-[#147FC3] focus:ring-[#147FC3]"
                      />
                      <span className="text-xs text-slate-700 font-medium">
                        {field.placeholder || "Enable"}
                      </span>
                    </label>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#147FC3] focus:ring-1 focus:ring-[#147FC3] transition-all"
                    />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {mode === "delete" ? (
              <button
                type="button"
                onClick={onConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Confirm Delete
              </button>
            ) : (
              <button
                type="button"
                onClick={onSave}
                className="px-4 py-2 bg-[#147FC3] hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> {mode === "add" ? "Save Record" : "Update Record"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
