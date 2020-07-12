import { InputProps } from "./input";

export interface TextInputProps extends InputProps {
  autoComplete?: string;
  caps?: "on" | "off";
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
  inputMode?: string;
  inputClasses?: string;
  isPlaceholderHidden?: boolean;
  isValidationHidden?: boolean;
  labelText: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent) => void;
  pattern?: string;
  placeholder?: string;
  placeHolderText?: string;
  testAutomationId?: string;
  transparent?: boolean;
  errorColor?: "primary" | "secondary";
}
