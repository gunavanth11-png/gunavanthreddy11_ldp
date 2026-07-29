type CheckboxProps = {
  checked: boolean;
  disabled: boolean;
  onChange?: () => void;
};

const Checkbox = ({
  checked,
  disabled,
  onChange,
}: CheckboxProps) => (
  <input
    type="checkbox"
    checked={checked}
    disabled={disabled}
    onChange={onChange}
  />
);

export default Checkbox;