import React from 'react';
import classNames from 'classnames';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/light.css'; // optional for theme
import { dissolve } from '@turf/turf';

/**
 * Button component with customizable styles and optional tooltip.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Content of the button.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @param {Function} [props.onClick] - Click event handler.
 * @param {string} [props.title] - Tooltip text for the button.
 * @param {string} [props.type='button'] - Button type ('button', 'submit', etc.).
 * @param {boolean} [props.useBaseStyles=true] - Whether to use base styles.
 * @param {string} [props.tooltipPlacement='top'] - Tooltip position.
 * @param {string} [props.tooltipAnimation='shift-away'] - Tooltip animation.
 * @param {string} [props.tooltipTheme='dark'] - Tooltip theme.
 * @param {number[]|number} [props.tooltipDelay=0] - Tooltip delay.
 * @returns {JSX.Element} Rendered button component.
 */

const Button = ({
  children,
  className = '',
  onClick,
  title = '',
  type = 'button',
  useBaseStyles = true,
  tooltipPlacement = 'top',
  tooltipAnimation = 'shift-away',
  tooltipTheme = 'dark',
  tooltipDelay = [100, 100], // delay in ms
  ...props
}) => {
  const baseStyles =
    'w-[110px] h-12 border rounded-md overflow-hidden border-borderColor hover:bg-backgroundTertiary transition duration-200 active:bg-black bg-backgroundSecondary';

  const buttonElement = (
    <button
      type={type}
      className={classNames(useBaseStyles && baseStyles, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  return title ? (
    <Tippy
      content={
        <span className="text-xs inline-block
          items-center justify-center text-white" 
          style={{width
: 'max-content', whiteSpace: 'nowrap' 
          }}>{title}</span>
      }
      placement={tooltipPlacement}
      animation={tooltipAnimation}
      theme={tooltipTheme}
      delay={tooltipDelay}
      appendTo="parent" 
    >
      <span className="z-20 inline-block">{buttonElement}</span>
    </Tippy>
  ) : (
    buttonElement
  );
};

export default Button;
