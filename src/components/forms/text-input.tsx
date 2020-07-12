import { Field } from "formik";
import React from "react";
import { TextInputProps } from "./types/text-input";

export const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const {
    caps,
    helpHtml,
    id,
    isDisabled,
    isPlaceholderHidden,
    labelText,
    name,
    onChange,
    onPaste,
    placeHolderText,
    type,
  } = props;

  return (
    <div className="cell">
      <label htmlFor={id}>
        <span className="vms-label">{labelText}</span>
        <Field
          autoComplete="off"
          className="vms-text-input"
          id={id}
          name={name}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(onChange && { onChange })}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(onPaste && { onPaste })}
          placeholder={
            placeHolderText || (isPlaceholderHidden ? "" : labelText)
          }
          disabled={isDisabled}
          type={`${type || "text"}`}
          autoCapitalize={caps || "on"}
        />
      </label>
      {helpHtml}
    </div>
  );
};
