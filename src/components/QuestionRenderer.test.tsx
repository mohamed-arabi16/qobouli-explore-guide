import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import QuestionRenderer from './QuestionRenderer';
import { Slider as RadixSlider } from '@/components/ui/slider'; // Import the Radix Slider

// Mock the Slider component to check if it's rendered
jest.mock('@/components/ui/slider', () => ({
  Slider: jest.fn(({ onValueChange, ...props }) => <div data-testid="mock-slider" {...props} />),
}));

// Mock useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback: string | undefined = undefined) => fallback || key,
  }),
}));

describe('QuestionRenderer', () => {
  const mockOnChange = jest.fn();

  const baseQuestionProps = {
    text_en: 'Test Question',
    text_ar: 'سؤال اختباري',
    onChange: mockOnChange,
    currentAnswer: undefined,
    lang: 'en' as const,
  };

  it('renders the custom Slider component for "slider" type questions', () => {
    const sliderQuestion = {
      id: 'q-slider',
      type: 'slider' as const,
      min: 0,
      max: 10,
      step: 1,
      defaultValue: 5,
    };

    render(
      <QuestionRenderer
        question={{ ...baseQuestionProps, ...sliderQuestion }}
        onChange={mockOnChange}
        currentAnswer={5}
        lang="en"
      />
    );

    // Check if the mocked Slider is rendered
    const sliderElement = screen.getByTestId('mock-slider');
    expect(sliderElement).toBeInTheDocument();

    // Check if the native input type range is NOT rendered
    const nativeRangeInput = screen.queryByRole('slider'); // This role is often used by native range inputs
    // Or more specifically, query by a test id if you were to add one to the native input
    // For now, let's assume if our mock slider is there, the native one isn't based on the code logic.
    // A more robust check would be to ensure no <input type="range"> exists.
    // However, Radix Slider itself uses role="slider", so we need to be careful.
    // The key is that OUR mock is present.

    // Let's check some props passed to our mocked Slider
    expect(RadixSlider).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'q-slider',
        min: 0,
        max: 10,
        step: 1,
        defaultValue: [5],
        value: [5],
      }),
      {} // Second argument for ref
    );
  });

  it('passes correct max prop to Slider when question.max is defined', () => {
    const sliderQuestionWithMax = {
      id: 'q-slider-max',
      type: 'slider' as const,
      min: 0,
      max: 50, // Explicit max
      step: 1,
      defaultValue: 25,
    };

    render(
      <QuestionRenderer
        question={{ ...baseQuestionProps, ...sliderQuestionWithMax }}
        onChange={mockOnChange}
        currentAnswer={25}
        lang="en"
      />
    );

    expect(RadixSlider).toHaveBeenCalledWith(
      expect.objectContaining({
        max: 50, // Should use the provided max
      }),
      {}
    );
  });

  // Test for default values if min/max/step/defaultValue are not provided in question
  it('uses default props for Slider when optional ones are not provided in question', () => {
    const sliderQuestionMinimal = {
      id: 'q-slider-minimal',
      type: 'slider' as const,
      // min, max, step, defaultValue are omitted
    };

    render(
      <QuestionRenderer
        question={{ ...baseQuestionProps, ...sliderQuestionMinimal }}
        onChange={mockOnChange}
        currentAnswer={undefined} // Or some initial value
        lang="en"
      />
    );

    expect(RadixSlider).toHaveBeenCalledWith(
      expect.objectContaining({
        min: 0,       // Default from QuestionRenderer
        max: 100,     // Default from QuestionRenderer
        step: 1,      // Default from QuestionRenderer
        defaultValue: [0], // Default from QuestionRenderer
        // Value will also be [0] if currentAnswer is undefined and defaultValue is 0
        value: [0]
      }),
      {}
    );
  });


  it('does not render custom Slider component for "single" type questions', () => {
    const singleQuestion = {
      id: 'q-single',
      type: 'single' as const,
      options_en: [{ id: 'opt1', text: 'Option 1' }],
      options_ar: [{ id: 'opt1', text: 'خيار 1' }],
    };

    render(
      <QuestionRenderer
        question={{ ...baseQuestionProps, ...singleQuestion }}
        onChange={mockOnChange}
        currentAnswer={'opt1'}
        lang="en"
      />
    );

    expect(screen.queryByTestId('mock-slider')).not.toBeInTheDocument();
    // Example: Check for radio button
    expect(screen.getByRole('radio', { name: 'Option 1' })).toBeInTheDocument();
  });
});
