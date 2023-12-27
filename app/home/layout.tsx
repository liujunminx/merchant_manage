"use client"
import React, {useState} from "react";
import {Menu, menuClasses, MenuItem, Sidebar, sidebarClasses} from "react-pro-sidebar";
import Link from "next/link";
import {Category, Home, HomeMini, ProductionQuantityLimits} from "@mui/icons-material";

export default function Layout({children}: {children: React.ReactNode}) {

  const [activeMenu, setActiveMenu] = useState("")


  const links = [
    {
      name: "Category",
      href: "/home/category",
      icon: <Category />
    },
    {
      name: "Product",
      href: "/home/product",
      icon: <ProductionQuantityLimits />
    }
  ]

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveMenu(event.currentTarget.id)
  }

  return (
      <div className="flex h-screen">
        <Sidebar
          className="w-auto h-full"
          onChange={(e) => console.log("sidebar changed: ", e)}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              background: "#252529"
            },
          }}>
          <Menu
            menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#ffffff" : "#ffffff",
                  backgroundColor: active ? "#007AFF" : undefined,
                  "&:hover": {
                    backgroundColor: "#000000 !important",
                    color: "white !important",
                  },
                  margin: "5px 20px"
                };
            },
          }}>
            {links.map((item:any, index: number) =>
              <MenuItem
                  key={index}
                  id={item.name}
                  active={item.name===activeMenu}
                  icon={item.icon}
                  onClick={handleItemClick}
                  style={{borderRadius: "15px"}}
                  component={<Link href={item.href} />}>
                {item.name}
              </MenuItem>
            )}
          </Menu>
        </Sidebar>
        <div className="flex flex-col">
          <div>
            <Home fontSize="small"/>&#62;<span className="text-blue-500">{activeMenu}</span>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
  )
}
