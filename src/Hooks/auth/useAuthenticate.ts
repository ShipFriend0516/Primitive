import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import app, { db } from '@/src/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useStore from '@/src/store';

const useAuthenticate = () => {
  const { isLoggedIn, login } = useStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [studentYear, setStudentYear] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  // 유효성 검사
  const validateLogin = () => {
    let isValid = true;
    setError('');

    if (!email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.');
      isValid = false;
    }
    if (password.length < 8) {
      setError('비밀번호는 8자리 이상이어야 합니다.');
      isValid = false;
    }
    return isValid;
  };

  const validateSignup = () => {
    let isValid = true;
    setError('');

    if (username.length < 2) {
      setError('유저네임은 2자리 이상이어야 합니다.');
      isValid = false;
    }

    if (!/^\d{2}$/.test(studentYear)) {
      setError('올바르지 않은 학번 형식입니다. (2자리 숫자)');
      isValid = false;
    }

    if (!email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.');
      isValid = false;
    }

    // const pwRegex = /[!@#$%^&*?]/;
    if (password.length < 8) {
      setError('비밀번호는 8자리 이상이어야합니다.');
      isValid = false;
    }

    if (password !== checkPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      isValid = false;
    }

    return isValid;
  };

  // 실제 로직

  const registerUser = async () => {
    try {
      if (validateSignup()) {
        setLoginLoading(true);
        const requestQuery = query(
          collection(db, 'signupRequests'),
          where('email', '==', email),
        );
        const registeredQuery = query(
          collection(db, 'users'),
          where('email', '==', email),
        );

        const registeredSnapshot = await getDocs(registeredQuery);
        if (!registeredSnapshot.empty) {
          // 이미 유저있을때
          setError('이미 등록된 이메일입니다.');
          return;
        }
        const querySnapshot = await getDocs(requestQuery);
        if (querySnapshot.empty) {
          await addDoc(collection(db, 'signupRequests'), {
            email: email,
            password: password,
            username: username,
            studentYear: studentYear,
            status: 'pending',
          });
          setMessage(
            '가입 요청을 성공적으로 기록했습니다. 요청 확인까지 수 일이 소요될 수 있습니다.',
          );
          setIsLogin(!isLogin);
          setEmail('');
          setPassword('');
          setCheckPassword('');
          setStudentYear('');
          setUsername('');
        } else {
          setMessage('이미 신청된 요청입니다.');
        }
      } else {
        console.log('유효성 검사 실패');
      }
    } catch (error) {
      console.error(error);
      setError('회원가입 과정 중 오류가 발생했습니다.');
    } finally {
      setLoginLoading(false);
    }
  };

  const loginUser = async () => {
    try {
      if (validateLogin()) {
        setLoginLoading(true);
        const auth = getAuth(app);
        const result = await signInWithEmailAndPassword(auth, email, password);

        if (result) {
          login(result.user.uid);
          navigate('/');
        } else {
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    isLogin,
    username,
    password,
    studentYear,
    error,
    email,
    loginLoading,
    checkPassword,
    message,
    setCheckPassword,
    setPassword,
    setEmail,
    setUsername,
    setStudentYear,
    setError,
    loginUser,
    registerUser,
    setIsLogin,
    setMessage,
  };
};

export default useAuthenticate;
