import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import {storage, db } from '../firebase/config';
import { getAuth } from "firebase/auth";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom'; 


// profile menu component

 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {logout} = useAuthentication();
  const [imageAvatar, setImageAvatar] = useState("");
  const {user} = useAuthValue();
  const auth = getAuth();


  useEffect(() => {
    const getUserDocument = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const image = userData.image ? userData.image : "avatar.png";
        setImageInAvatar(image);
      }
    }

    getUserDocument();

  });

  
  const setImageInAvatar = (url) => {
    if(url){
      setImageAvatar(url);
    } else {
      setImageAvatar("avatar.png");
    }
  } 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={imageAvatar}
            />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
            <MenuList>
            <MenuItem
              key="Meu perfil"
              className={`rounded`}
            >
              <Link to="/user" className="flex items-center gap-2">
              {React.createElement(UserCircleIcon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })} 
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >
                Meu perfil
              </Typography>
              </Link>
            </MenuItem>
            <MenuItem
              key="Configurações"
              className={`flex items-center gap-2 rounded`}
            >
              <Link to="http://localhost/travel_vibe_php/">
              <Typography
                as="span"s
                variant="small"
                className="font-normal"
                color="inherit"
              >
                Configurações
              </Typography>
              </Link>
             
            </MenuItem>

            <MenuItem
              key="Sign Out"
              onClick={logout}
              className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
            >
              {React.createElement(PowerIcon, {
                className: `h-4 w-4 text-red-500`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"s
                variant="small"
                className="font-normal"
                color="red"
              >
                Sign Out
              </Typography>
            </MenuItem>
            </MenuList>
    </Menu>
  );
}
 
// nav list menu
const navListMenuItems = [
  {
    title: "Conheça mais sobre o Travel Vibe!",
    description:
      "Conheça um pouco mais da história dessa rede social",
    link: "https://diovanawehner.wixsite.com/travel-vibe",
  },
  {
    title: "A vida pode ser mais doce viajando",
    description:
      "Aproveite os momentos bons da vida, e compartilhe os mesmos!",
  },
  {
    title: "Deixe sua sugestão para nossa rede!",
    description:
      "Nos encaminhe sugestões de melhorias, vamos sempre buscar aprimorar!",
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="https://diovanawehner.wixsite.com/travel-vibe" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> TV{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img src="logosfundo.png" alt="" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Post",
    icon: CubeTransparentIcon,
},
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="/post"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const {user} = useAuthValue();

 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <>    
    {user && (
      <>
      <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Travel Vibe
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
    </>
    )}
  </>
  );
}

export default ComplexNavbar
