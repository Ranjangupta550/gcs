import React from 'react';
import classNames from 'classnames'; // Optional utility to merge classes

const Button = ({
  children,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'w-[110px] h-12 border rounded-md overflow-hidden border-borderColor hover:bg-backgroundTertiary transition duration-200 active:bg-black bg-backgroundSecondary';

  return (
    <button
      type={type}
      className={classNames(baseStyles, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
