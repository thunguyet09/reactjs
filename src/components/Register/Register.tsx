import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser, faLock, faCheckCircle, faTimesCircle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import './Register.css';
import { useNavigate} from 'react-router-dom';
import axios from '../../api/axios';
const REGISTER_URL = '/v1/register/';

function Register() {
    const navigate = useNavigate();

    const userRef:any = useRef();
    const errRef:any = useRef();

    const [fname, setFname] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
  
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
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd, matchPwd]);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
     
        const role:number = 0;
        const username = fname;
        const password = pwd;
        
        axios.get('/v1/user/alluser')
            .then(async (res) => {
                const users = res.data;

    
                await Promise.all(users.map(async (item: any) => {
                    if (item.email !== email) {
                        try {
                            const response: any = await axios.post( 
                                REGISTER_URL, 
                                JSON.stringify({ username, email, password, role }),
                                {   
                                    headers: { 'Content-Type': 'application/json' },
                                    withCredentials: true,
                                }
                            );
                            navigate('/login');

                        } catch (error) {
                            setErrMsg('This email already exists');
                        }
                    }
                }));
            })
            .catch((error) => {
                console.error('Error in GET request:', error);
            });

    }
  return (
    <section>
        
        <form onSubmit={handleSubmit}>
            <label htmlFor='fname'>
                <FontAwesomeIcon icon={faUser} />
                Full name:
            </label>
            <br></br>
            <input
                type="text"
                id="fname"
                value = {fname}
                autoComplete='off'
                required
                onChange={(e) => setFname(e.target.value)}
            >
            </input>

            {fname &&
                <p id="valid-match"><FontAwesomeIcon icon={faCheckCircle} className="valid-icon" /></p>
            }
            <br></br>
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
                    <span>! @ # $ %</span> 
                </p>
            }

            <label htmlFor='confirm-password'>
                <FontAwesomeIcon icon={faLock} />
                Confirm Password
            </label>
            <br></br>
            <input
                type="password"
                id="confirm-password"
                value={matchPwd}
                required
                aria-invalid = {validMatch ? 'false' : 'true'}
                aria-describedby={validMatch? 'valid-match' : 'pwd-error'}
                onChange={(e) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}>
            </input>
            <div>
                {matchPwd && validMatch &&
                    <p id="valid-match"><FontAwesomeIcon icon={faCheckCircle} className="valid-icon" /></p>
                }
                {validMatch || !pwd ||
                    <p><FontAwesomeIcon icon={faTimesCircle} className="valid-icon" /></p>
                }
            </div>
            {matchFocus && matchPwd && !validMatch && 
                <p id="pwd-error" className="error-message">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
            }

            <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
        </form>

        <p ref={errRef} className="errMsg" aria-live="assertive">{errMsg}</p>

        <p>
            Already registered?
            <span className="line">
                <a href="/login">Sign In</a>
            </span>
        </p>
        
    </section>
  );
}

export default Register;
