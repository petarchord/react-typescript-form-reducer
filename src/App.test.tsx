import { render } from '@testing-library/react'
import App from './App'

test('renders the child component', () => {
  const { getByText } = render(<App />)
  expect(getByText(/Submit a Session!/)).toBeInTheDocument()
})
