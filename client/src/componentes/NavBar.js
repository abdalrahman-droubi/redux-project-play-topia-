import React, { useEffect, useContext,useState } from "react";
import {
  Avatar,
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";


 
import { Link } from "react-router-dom";
import {
  LifebuoyIcon,
  PowerIcon,
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function NavbarA() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
 
  const profileMenuItems = [
    {
      label: "Profile",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];


  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="lgall"
        color="blue-gray"
        className="p-1 font-normal "
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="lgall"
        color="blue-gray"
        className="p-1 font-normal"
      >
       <Link to="/Blog" className="flex items-center">
          Blogs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="lgall"
        color="blue-gray"
        className="p-1 font-normal"
      >
       <Link to="/About" className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="lgall"
        color="blue-gray"
        className="p-1 font-normal"
      >
       <Link to="/Contact" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
      
    </ul>
  );


  function ProfileMenu() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = (label) => {
      setIsMenuOpen(false);

      if (label == "Sign Out") {

        localStorage.removeItem("auth");

        window.location.href = "http://localhost:3000/";

      } else if (label == "Profile") {
        window.location.href = "http://localhost:3000/Profile";
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
          >
            <svg
              xmlns="https://source.unsplash.com/MP0IUfwrn0A"
              className="h-7 w-7 text-amber-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {" "}
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform text-black ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  closeMenu(label);
                }}
                className={`flex items-center gap-2 rounded  ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }


 
  return (
    <Navbar className="py-2 lg:py-4 bg-[#10143d]
       ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
      <Link to="/"> <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium text-3xl"
        >
          Playtopia
        </Typography>
        </Link> 
        <div className="hidden lg:block">{navList}</div>
      
      {
      
      localStorage.auth == null ?    
      
      <Link to="/LogIn">
      <Button variant="gradient" size="lg" className="hidden lg:inline-block">
        <span>LogIn</span>
      </Button>
      </Link> 

      :   
   
<ProfileMenu />
      // <Link to="/Profile">
      // <Button variant="gradient" size="lg" className="hidden lg:inline-block">
      //   <span>Profile</span>
      // </Button>
      // </Link> 

  
      }
      
 
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      {openNav && (
        <div className="container mx-auto">
          {navList}
       <Link to="/SignIn">
       
         <Button variant="gradient" size="lg" fullWidth className="mb-2">
            <span>Log In</span>
          </Button>

          </Link>
        </div>
      )}
    </Navbar>
  );
}