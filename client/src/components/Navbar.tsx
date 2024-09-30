import { FC, useState } from 'react'
import { SimpleList } from './ui/List'
import { Button } from './ui/Buttons'
import { BurgerToggle } from './ui/Toggle'
import { Logo } from './ui/Image'

const Navbar: FC = () => {

  const [state, setState] = useState(false)

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Customers" },
    { title: "Careers" },
    { title: "Guides" },
    { title: "Partners" }
  ]

  return (
    <nav className="w-full border-b md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="#">
            <Logo />
          </a>
          <div className="md:hidden">
            <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <BurgerToggle state={state} />
            </button>
          </div>
        </div>
        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <SimpleList items={navigation} />
          </ul>
        </div>
        <div className="hidden md:inline-block">
          <a href="#">
            <Button title="LOGIN" />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
