import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import SideBar from './sidebar'

// Mock the Image component from next/image
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => (
    <img alt={alt} {...props} />
  ),
}))

describe('SideBar component', () => {
  it('renders the sidebar container with correct styling', () => {
    render(<SideBar />)
    
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveClass('bg-primary h-screen w-1/5')
  })

  it('renders the logo with correct properties', () => {
    render(<SideBar />)
    
    const logo = screen.getByAltText('Shandwich Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'sandwich-black.svg')
    expect(logo).toHaveAttribute('width', '400')
    expect(logo).toHaveAttribute('height', '400')
    expect(logo).toHaveClass('aspect-auto w-4/5 fill-white invert md:w-50 dark:fill-white dark:invert-0')
  })

  it('renders the navigation component', () => {
    render(<SideBar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
