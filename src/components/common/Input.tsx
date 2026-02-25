import { useState, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  touched?: boolean;
}

export function Input({
  label,
  icon,
  error,
  touched,
  type,
  className = '',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`relative w-full mb-4 ${className}`}>
      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 bg-white relative">
        {icon && (
          <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          value={props.value ?? ''}
          type={inputType}
          className="flex-1 p-2 border-none bg-transparent text-base text-gray-700 outline-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:text-gray-900"
        />
        {isPassword && (
          <button
            type="button"
            className="border-none bg-transparent cursor-pointer p-0 flex items-center justify-center shrink-0 opacity-70 transition-opacity hover:opacity-100 disabled:cursor-not-allowed text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            disabled={props.disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {showPassword ? (
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
              ) : (
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm2.31-7.37h-.02a.996.996 0 00-1.09.85l-.73 4.21 4.21.73c.48.08.89-.35.97-.84l.02-.02c1.06-6.49-1.08-5.66-3.36-4.93z" fill="currentColor" />
              )}
            </svg>
          </button>
        )}
      </div>
      <label
        htmlFor={props.id}
        className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-600"
      >
        {label}
      </label>
      <span
        className={`block text-xs text-red-500 mt-1 pl-4 ${
          touched && error ? 'visible' : 'invisible'
        }`}
      >
        {error}!
      </span>
    </div>
  );
}
