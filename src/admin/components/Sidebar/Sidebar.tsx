import { useContext, useState } from 'react';
import styles from './Sidebar.module.css';
import logo from '../../../assets/image/logo.png'
import { faBars, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {menuItem} from "./SidebarData"
import { ThemeContext } from '../../ThemeContext/ThemeContext';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBar, setIsBar] = useState(true)
  const [isSubNav, setSubNav] = useState('')
  const [active, setActive] = useState('Tổng quan')
  const [isSubItem, setSubItem] = useState('Báo cáo 1')
  const themeContext = useContext(ThemeContext)
  return (
    <div>
      {isBar && (
        <span className={styles.bar} 
            onClick={() => {
              setIsOpen(true)
              setIsBar(false)
            }}>
            <FontAwesomeIcon icon={faBars} />
        </span>
      )
      }
      {(
        <div className={themeContext?.theme ? styles[themeContext?.theme] : styles.Sidebar} style={isOpen ? { left: '0px' } : { left: '-250px' }}> 
          <span className={styles.closeBar} onClick={() => {
            setIsOpen(false) 
            setIsBar(true)}}>
            <FontAwesomeIcon icon={faSquareXmark} />
          </span>
          <div className={styles.heading}>
              <img src={logo} alt="" width={40}/>
              <span>THU NGUYET</span>
          </div>
          <ul className={styles.SidebarUl}>
          {
            menuItem.map((item, index) => {
              return (
                <a className={styles.link} href={item.path}>
                  <li onClick={() => {
                    setSubNav(item.name)
                    setActive(item.name)
                  }}
                    className={item.name === active ? styles.active : styles.sideBarList}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    {isOpen && 
                      <span className={styles.itemName}>
                        {item.name}
                        <span className={styles.dropDown}>
                            {item.name === isSubNav ? item.iconOpened  : item.subNav ? item.iconClosed : null}
                        </span>
                      </span>
                    }
                  </li>

                  <ul className={styles.subNav}>
                    {item.name === isSubNav && item.subNav?.map((subItem,index) => {
                      return (
                        <li key={index}>
                          <a>
                            <span className={styles.subNavIcon}>{subItem.icon}</span>
                           {isOpen &&
                             <span className={styles.subNavItem}>{subItem.name}</span>
                           }
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </a>
              )
            })
          }
          </ul>
        </div>
      )}

      <div className={styles.sideBarClosed}>
      {!isOpen &&
        <div className={themeContext?.theme ? styles[themeContext?.theme] : styles.Sidebar2}>
          <div className={styles.heading2}>
            <img src={logo} alt="" width={40}/>
          </div>
          <ul className={styles.SidebarUl2}>
            {
              menuItem.map((item, index) => {
                return (
                  <a>
                    <li onClick={() => {
                      setSubNav(item.name)
                      setActive(item.name)
                    }}
                      className={item.name === active ? styles.active2 : styles.SidebarList2}
                    >
                      <div className={styles.SidebarItem}>
                          <span className={styles.itemIcon}>{item.icon}</span>
                          <span className={styles.itemName2}>{item.name}</span>
                      </div>
                    </li>
  
                    <ul className={styles.subNav2}>
                      {item.name === isSubNav && item.subNav?.map((subItem,index) => {
                        return (
                          <li key={index} onClick={() => {
                              setSubItem(subItem.name)
                          }} 
                          className={subItem.name === isSubItem ? styles.active : ''}>
                            <a>
                              <span className={styles.subNavIcon2}>{subItem.icon}</span>
                              <span className={styles.subNavName2}>{subItem.name}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </a>
                )
              })
            }
          </ul>
        </div>
        }
      </div>
    </div>
  )
}

export default Sidebar;