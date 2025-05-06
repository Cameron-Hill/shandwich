import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FullScreenLoader } from './FullScreenLoader';
import { describe, it, expect } from 'vitest';

describe('FullScreenLoader', () => {
  it('renders loader and loading text when isLoading is true', () => {
    render(<FullScreenLoader isLoading={true} />);
    
    // Check for the loader icon
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('animate-spin');
    
    // Check for the loading text
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toHaveClass('text-lg');
  });
});
