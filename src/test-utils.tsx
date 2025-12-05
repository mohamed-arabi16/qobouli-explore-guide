import { render } from '@testing-library/react';
import * as rtl from '@testing-library/react';

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Export screen and fireEvent explicitly for backward compatibility
export { screen, fireEvent } from '@testing-library/dom';

// Export render as default
export { render as default };
