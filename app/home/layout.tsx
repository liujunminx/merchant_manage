'use client'
import React, {useState} from "react";
import {Menu, menuClasses, MenuItem, Sidebar, sidebarClasses} from "react-pro-sidebar";
import Link from "next/link";
import {HomeIcon} from "@heroicons/react/24/outline";
import {ArchiveBoxIcon} from "@heroicons/react/20/solid";
import {Category, ProductionQuantityLimits} from "@mui/icons-material";

export default function Layout({children}: {children: React.ReactNode}) {

  const [activeMenu, setActiveMenu] = useState(0)

  const links = [
    {
      name: 'Category',
      href: '/home/category',
      icon: <Category />
    },
    {
      name: 'Product',
      href: '/home/product',
      icon: <ProductionQuantityLimits />
    }
  ]

  return (
      <div className='flex h-screen'>
        <Sidebar
          className='w-auto h-full'
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              background: '#252529'
            },
          }}>
          <Menu
            menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? '#ffffff' : '#ffffff',
                  backgroundColor: active ? '#007AFF' : undefined,
                  "&:hover": {
                    backgroundColor: "#000000 !important",
                    color: "white !important",
                  },
                  margin: '5px 20px'
                };
            },
          }}>
            {links.map((item:any, index: number) =>
              <MenuItem
                  key={index}
                  active={index===activeMenu}
                  icon={item.icon}
                  onClick={() => setActiveMenu(index)}
                  style={{borderRadius: '15px'}}
                  component={<Link href={item.href} />}>
                {item.name}
              </MenuItem>
            )}
          </Menu>
        </Sidebar>
        <div>{children}</div>
      </div>
  )
}
