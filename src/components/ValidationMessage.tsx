import { ValidationMessageProps } from './ValidationMessage.types';

const ValidationMessage = ({ message }: ValidationMessageProps) => {
  return (
    <p
      className={`text-red-500 text-xs italic ${
        message ? 'visible' : 'invisible'
      }`}
    >
      {message || 'Placeholder'}
    </p>
  );
};

export default ValidationMessage;
