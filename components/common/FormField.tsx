/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { Input } from "../ui/input";
import {
  EyeIcon,
  EyeSlashIcon,
  UploadSimpleIcon,
  XIcon,
  ImageIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

// ── Toast ─────────────────────────────────────────────────────────────────────

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

const ErrorToast = ({ message, onDismiss }: ToastProps) => {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      role="alert"
      className={[
        "flex items-start gap-3 rounded-xl px-4 py-3 shadow-lg",
        "bg-white dark:bg-zinc-900",
        "border border-red-200 dark:border-red-800",
        "text-sm",
      ].join(" ")}
    >
      <WarningCircleIcon
        size={18}
        weight="fill"
        className="mt-0.5 shrink-0 text-red-500"
      />
      <p className="flex-1 text-zinc-700 dark:text-zinc-300">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
      >
        <XIcon size={14} weight="bold" />
      </button>
    </div>
  );
};

// ── Image Dropzone ────────────────────────────────────────────────────────────

const ACCEPTED_MIME = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
];

interface ImageDropzoneFieldProps {
  files: File[];
  onChange: (files: File[]) => void;
  onBlur: () => void;
  multiple?: boolean;
  isInvalid?: boolean;
  fieldName: string;
}

const ImageDropzoneField = ({
  files: rawFiles,
  onChange,
  onBlur,
  multiple = false,
  isInvalid = false,
  fieldName,
}: ImageDropzoneFieldProps) => {
  const files = useMemo(
    () => (Array.isArray(rawFiles) ? rawFiles : []),
    [rawFiles],
  );
  const [toast, setToast] = useState<string | null>(null);
  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  const onDrop = useCallback(
    (accepted: File[], rejected: { file: File }[]) => {
      if (rejected.length > 0) {
        const names = rejected.map((r) => r.file.name).join(", ");
        setToast(`Only image files are allowed. Rejected: ${names}`);
        return;
      }

      const invalid = accepted.filter((f) => !ACCEPTED_MIME.includes(f.type));
      if (invalid.length > 0) {
        setToast(`Invalid file type: ${invalid.map((f) => f.name).join(", ")}`);
        return;
      }

      onChange(multiple ? [...files, ...accepted] : [accepted[0]]);
    },
    [files, multiple, onChange],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"],
      },
      multiple,
      onFileDialogCancel: onBlur,
    });

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const hasSinglePreview = !multiple && files.length === 1;

  return (
    <div className="space-y-3 max-w-96">
      {toast && <ErrorToast message={toast} onDismiss={() => setToast(null)} />}

      <div
        {...getRootProps({
          id: fieldName,
          onBlur,
          "aria-invalid": isInvalid,
        })}
        className={[
          "relative flex h-96 w-full flex-col items-center justify-center gap-2.5",
          "rounded-2xl cursor-pointer select-none overflow-hidden",
          "border-2 border-dashed transition-all duration-200",
          isDragReject || isInvalid
            ? "border-red-400 bg-red-50/60 dark:bg-red-950/20"
            : isDragActive
              ? "border-sky-400 bg-sky-50/60 dark:bg-sky-950/30 scale-[1.01]"
              : hasSinglePreview
                ? "border-zinc-300 dark:border-zinc-600"
                : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-900/60 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60",
        ].join(" ")}
      >
        <input {...getInputProps()} />

        {hasSinglePreview ? (
          <>
            <Image
              src={previews[0]}
              alt={files[0].name}
              width={200}
              height={200}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/0 hover:bg-black/50 transition-colors duration-200 group">
              <UploadSimpleIcon
                size={22}
                weight="bold"
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                Replace image
              </span>
            </div>
            <button
              type="button"
              aria-label="Remove image"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(0);
              }}
              className={[
                "absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full",
                "bg-black/60 text-white hover:bg-black/80 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
              ].join(" ")}
            >
              <XIcon size={12} weight="bold" />
            </button>
          </>
        ) : (
          <>
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200",
                isDragReject || isInvalid
                  ? "bg-red-100 dark:bg-red-900/40"
                  : isDragActive
                    ? "bg-sky-100 dark:bg-sky-900/40"
                    : "bg-zinc-200/80 dark:bg-zinc-800",
              ].join(" ")}
            >
              {isDragReject || isInvalid ? (
                <WarningCircleIcon
                  size={20}
                  weight="fill"
                  className="text-red-500"
                />
              ) : (
                <ImageIcon
                  size={20}
                  weight="duotone"
                  className={
                    isDragActive
                      ? "text-sky-500"
                      : "text-zinc-500 dark:text-zinc-400"
                  }
                />
              )}
            </div>

            <div className="text-center px-4">
              <p
                className={[
                  "text-sm font-semibold tracking-tight",
                  isDragReject || isInvalid
                    ? "text-red-600 dark:text-red-400"
                    : isDragActive
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-zinc-700 dark:text-zinc-200",
                ].join(" ")}
              >
                {isDragReject
                  ? "Images only, please"
                  : isDragActive
                    ? "Drop to upload"
                    : files.length > 0
                      ? "Add more images"
                      : "Drop your image here"}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                or{" "}
                <span className="text-sky-500 underline underline-offset-2 decoration-dotted">
                  browse
                </span>
                {" · PNG, JPG, GIF, WEBP, SVG, AVIF"}
              </p>
            </div>
          </>
        )}
      </div>

      {multiple && files.length > 0 && (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
            >
              <Image
                src={previews[index]}
                alt={file.name}
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(index)}
                className={[
                  "absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full",
                  "bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80",
                  "transition-all duration-150",
                  "focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                ].join(" ")}
              >
                <XIcon size={10} weight="bold" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ── FormField ─────────────────────────────────────────────────────────────────

interface FormFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  rows?: number;
  maxLength?: number;
  multiple?: boolean;
}

export const FormField = ({
  form,
  name,
  label,
  placeholder,
  description,
  type = "text",
  rows,
  maxLength,
  multiple = false,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form.Field name={name}>
      {(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        const isTextArea = type === "textarea";
        const isPassword = type === "password";
        const isDropzone = type === "dropzone";
        const files: File[] = Array.isArray(field.state.value)
          ? field.state.value
          : [];

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

            {isDropzone ? (
              <ImageDropzoneField
                files={files}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                multiple={multiple}
                isInvalid={isInvalid}
                fieldName={field.name}
              />
            ) : isTextArea ? (
              <InputGroup>
                <InputGroupTextarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  rows={rows || 4}
                  className="min-h-24 resize-none"
                  aria-invalid={isInvalid}
                />
                {maxLength && (
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/{maxLength} characters
                    </InputGroupText>
                  </InputGroupAddon>
                )}
              </InputGroup>
            ) : isPassword ? (
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 rounded-r"
                >
                  {showPassword ? (
                    <EyeSlashIcon size={32} weight="fill" className="w-4 h-4" />
                  ) : (
                    <EyeIcon size={32} weight="fill" className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={type}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={placeholder}
                aria-invalid={isInvalid}
                autoComplete="off"
              />
            )}

            {description && <FieldDescription>{description}</FieldDescription>}

            <div>
              {isInvalid && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors
                    .map((e: any) =>
                      typeof e === "string" ? e : (e?.message ?? String(e)),
                    )
                    .join(", ")}
                </p>
              )}
            </div>
          </Field>
        );
      }}
    </form.Field>
  );
};
