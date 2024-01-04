import { useRef, useEffect, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle, faLock, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import { useNavigate} from 'react-router-dom';

const LOGIN_URL = '/v1/login/';
function Login() {
    const navigate = useNavigate();
    
    const userRef:any = useRef();
    const errRef:any = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
  
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd]);

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd]);


    const handleSubmit = async (e:any) => {
      e.preventDefault();

        const password = pwd;
      try {
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({email, password}),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );

          const roles = response?.data?.role;
          if(roles === '1'){
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
          }else {
            setTimeout(() => {
                navigate('/home');
            }, 2000);
          }

      } catch (err:any) {
          if (!err.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Incorrect email or password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
      }
    }
  return (
    <section>
        
        <form onSubmit={handleSubmit}>

            <label htmlFor='email'>
                <FontAwesomeIcon icon={faUser} />
                Email:
            </label>
            <br></br>
            <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete='off'
                required
                value={email}
                aria-invalid = {validEmail ? 'false' : 'true'}
                aria-describedby={validEmail ? 'valid-email' : 'email-error'}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}>
            </input>
            <div>
                {email && validEmail &&
                    <p id="valid-email"><FontAwesomeIcon icon={faCheckCircle} className="valid-icon" /></p>
                }
                {validEmail || !email ||
                    <p><FontAwesomeIcon icon={faTimesCircle} className="valid-icon" /></p>
                }
            </div>
            {emailFocus && email && !validEmail && 
                <p id="email-error" className="error-message">
                    <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                    Invalid email format
                </p>
            }

            <label htmlFor='password'>
                <FontAwesomeIcon icon={faLock} />
                Password
            </label>
            <br></br>
            <input
                type="password"
                id="password"
                value={pwd}
                required
                aria-invalid = {validPwd ? 'false' : 'true'}
                aria-describedby={validPwd ? 'valid-pwd' : 'pwd-error'}
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}>
            </input>
            <div>
                {pwd && validPwd &&
                    <p id="valid-pwd"><FontAwesomeIcon icon={faCheckCircle} className="valid-icon" /></p>
                }
                {validPwd || !pwd ||
                    <p><FontAwesomeIcon icon={faTimesCircle} className="valid-icon" /></p>
                }
            </div>
            {pwdFocus && pwd && !validPwd && 
                <p id="pwd-error" className="error-message">
                    <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                    At least 8 characters long. Contains at least one uppercase letter, lowercase letter, special character
                    (<span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>)
                </p>
            }
            <button disabled={!validEmail || !validPwd ? true : false}>Sign In</button>
        </form>

        <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <p>
            You don't have an account?
            <span className="line">
                <a href="/register">Sign Up</a>
            </span>
        </p>
    </section>
  );
}

export default Login;
