/**
 * Study-library guardrails.
 * Keep user uploads compact, predictable and suited to school revision material.
 */
export const MAX_STUDY_FILE_BYTES = 5 * 1024 * 1024;

export const studyMaterialCategories = ["cbse", "nda", "pyq", "notes", "formula", "other"] as const;

export function safeStudyFileName(fileName: string): string {
  const cleaned = fileName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-\./g, ".")
    .replace(/^-|-$/g, "");
  return cleaned.slice(0, 180) || "study-material";
}

export function isValidStudyFile(fileName: string, mimeType: string): boolean {
  const extension = fileName.toLowerCase().split(".").pop();
  const permittedExtensions = new Set(["pdf", "png", "jpg", "jpeg", "webp", "txt", "doc", "docx"]);
  const permittedMimeTypes = new Set([
    "application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain",
    "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);
  return Boolean(extension && permittedExtensions.has(extension) && permittedMimeTypes.has(mimeType));
}
