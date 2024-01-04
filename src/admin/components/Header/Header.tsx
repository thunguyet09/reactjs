import React, { useContext } from 'react';
import styles from './Header.module.css';
import avatar from '../../../assets/image/22.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faPalette, faUser } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../ThemeContext/ThemeContext';
function Header() {
  const themeContext = useContext(ThemeContext)
  const changeTheme = (value:string) => {
      themeContext?.setTheme(value)
      console.log(themeContext?.theme)
  }
  return (
    <div className={themeContext?.theme ? styles[themeContext?.theme]: styles.Header} >
        <div className={styles.multiTheme}>
            <div className={styles.palette}>
                <span><FontAwesomeIcon icon={faPalette} /></span>
                <p>Chủ đề</p>
            </div>

            <div className={styles.theme}>
                <p>
                    <button onClick={() => changeTheme('purple')} className={styles.purpleBox}></button>
                    <span onClick={() => changeTheme('green')} className={styles.greenBox}></span>
                    <span onClick={() => changeTheme('blue')} className={styles.blueBox}></span>
                </p>
                <div>
                    <span onClick={() => changeTheme('pink')} className={styles.pinkBox}></span>
                    <span onClick={() => changeTheme('brown')} className={styles.brownBox}></span>
                    <span onClick={() => changeTheme('yellow')} className={styles.yellowBox}></span>
                </div>
            </div>
        </div>

        <div className={styles.avatar}>
            <div>
                <span>Thu Nguyet</span>
                <img src={avatar} alt="" width="40"/>
            </div>
            <ul className={styles.avatarList}>
                <li>
                    <span><FontAwesomeIcon icon={faUser} /></span>
                    <p>Thông tin</p>
                </li>
                <li>
                    <span><FontAwesomeIcon icon={faArrowRightToBracket} /></span>
                    <p>Đăng xuất</p>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default Header;