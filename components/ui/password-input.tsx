'use client';

import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, InputProps } from '@/components/ui/input';

interface Props extends InputProps {}

const PasswordInput = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const disabled = props.value === '' || props.value === undefined || props.disabled;
  const toggleInput = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <Input className={className} ref={ref} {...props} type={isVisible ? 'text' : 'password'} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={toggleInput}
        disabled={disabled}
        tabIndex={-1}
        className="absolute top-0.5 right-0"
      >
        {props.type === 'password' && !disabled ? (
          <EyeIcon aria-hidden="true" tabIndex={-1} color="#A4A1AA" size={20} />
        ) : (
          <EyeOffIcon aria-hidden="true" tabIndex={-1} color="#A4A1AA" size={20} />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
