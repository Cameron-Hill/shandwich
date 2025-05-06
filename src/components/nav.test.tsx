import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Nav from './nav'
import { links } from './nav'

describe('Nav component', () => {
  it('renders all navigation links', () => {
    render(<Nav />)
    
    // Check that all links are rendered
    links.forEach(link => {
      screen.getByText(link.name)
    })
  })

  it('renders links with correct href attributes', () => {
    render(<Nav />)
    
    // Check that each link has the correct href
    links.forEach(link => {
      const linkElement = screen.getByText(link.name)
      expect(linkElement).toHaveAttribute('href', link.path)
    })
  })

  it('renders links with correct styling classes', () => {
    render(<Nav />)
    
    // Check that links have the correct base classes
    links.forEach(link => {
      const linkElement = screen.getByText(link.name)
      expect(linkElement).toHaveClass('flex')
      expect(linkElement).toHaveClass('items-center')
      expect(linkElement).toHaveClass('gap-2')
      expect(linkElement).toHaveClass('p-2')
      expect(linkElement).toHaveClass('text-white')
      expect(linkElement).toHaveClass('hover:bg-gray-400')
    })
  })

  it('renders links with correct dark mode classes', () => {
    // Simulate dark mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })

    render(<Nav />)
    
    // Check that links have the correct dark mode classes
    links.forEach(link => {
      const linkElement = screen.getByText(link.name)
      expect(linkElement).toHaveClass('dark:text-black')
      expect(linkElement).toHaveClass('dark:hover:bg-gray-700')
    })
  })
})
