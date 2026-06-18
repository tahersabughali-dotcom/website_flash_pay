interface FormFeedbackProps {
  error?: string | null;
  success?: string | null;
}

export function FormFeedback({ error, success }: FormFeedbackProps) {
  return (
    <>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {success}
        </p>
      )}
    </>
  );
}
