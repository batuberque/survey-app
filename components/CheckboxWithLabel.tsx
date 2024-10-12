import { MaterialIcons } from '@expo/vector-icons';
import { useId } from 'react';
import { Checkbox, CheckboxProps, Label, XStack } from 'tamagui';

export function CheckboxWithLabel({
  size,
  label = 'Accept terms and conditions',
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  const id = useId();

  return (
    <XStack width={300} alignItems="center" gap="$4">
      <Checkbox id={id} size={size} {...checkboxProps}>
        <Checkbox.Indicator>
          <MaterialIcons name="check" size={16} color="black" />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size} htmlFor={id}>
        {label}
      </Label>
    </XStack>
  );
}
