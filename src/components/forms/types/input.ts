export interface InputProps {
  name: string;
  ariaDescribeId?: string;
  ariaErrorId?: string;
  ariaLabelledById?: string;
  cellSizeClasses?: string;
  children?: object;
  helpHtml?: object;
  hideLabel?: boolean;
  id?: string;
  isDisabled?: boolean;
  isValid?: boolean;
  validationHtml?: object;
  value?: string;
  type?: string;
  tabIndex?: number;
  setAutoFocus?: boolean;
}
