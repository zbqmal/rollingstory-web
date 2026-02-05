import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('renders platform description', () => {
    render(<Footer />);
    expect(screen.getByText(/Collaborative storytelling platform/i)).toBeInTheDocument();
  });
});
