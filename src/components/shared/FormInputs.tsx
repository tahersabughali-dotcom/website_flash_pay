import { cn } from "@/lib/utils";

const inputClass =
  "w-full min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flash-text outline-none transition focus:border-flash-primary focus:ring-2 focus:ring-flash-primary/20 focus-visible:outline-none";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function TextInput({ className, ...props }: TextInputProps) {
  return <input className={cn(inputClass, className)} {...props} />;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(inputClass, "min-h-[120px] resize-y", className)}
      {...props}
    />
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export function SelectField({
  options,
  placeholder,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <select className={cn(inputClass, className)} {...props}>
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface SearchInputProps extends Omit<TextInputProps, "type"> {
  onValueChange?: (value: string) => void;
}

export function SearchInput({ onValueChange, onChange, className, ...props }: SearchInputProps) {
  return (
    <TextInput
      type="search"
      className={cn("pl-10", className)}
      onChange={(event) => {
        onChange?.(event);
        onValueChange?.(event.target.value);
      }}
      {...props}
    />
  );
}
