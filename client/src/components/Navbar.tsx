import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Buttons'
import { Logo } from './ui/Image'

const Navbar: FC = () => {


  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <div className="space-x-4">
          <Link to="trydemo">
            <Button title='Try demo' />
          </Link>
        </div>
      </nav>
    </header>

  )
}

export default Navbar;
