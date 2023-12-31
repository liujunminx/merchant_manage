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
      <div style={{width: "100%", minHeight: "100vh", display: "flex"}}>
        <Sidebar
          style={{ minHeight: "100%"}}
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
        <div style={{width: "calc(100% - 250px)", minHeight: "100%", backgroundColor: "#f2f2f2"}}>
          <div>
            <Home fontSize="small"/>&#62;<span className="text-blue-500">{activeMenu}</span>
          </div>
          <div style={{width: "100%"}}>
            {children}
          </div>
        </div>
      </div>
  )
}
