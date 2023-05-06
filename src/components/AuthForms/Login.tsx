// BootStrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// React Hook Form Utilities
import { useForm } from 'react-hook-form';

// React Router
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useState } from 'react';

// API Functions [Authentication]
import { AuthUserToken } from '../../apis/books/auth';

export const Login = (): JSX.Element => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const navigate = useNavigate();

	const onLogin = (userData: any) => {
		// User Data
		const email = userData.email;
		const password = userData.password;
		let currentUsers = JSON.parse(localStorage.users);
		const loggingUser = currentUsers.find((user: any, i: number): any => {
			if (user.email === email && user.password === password) {
				currentUsers.splice(i, 1);
				user['isLogged'] = true;
				localStorage.userID = i;
				currentUsers.push(user);
				localStorage.setItem('users', JSON.stringify(currentUsers));
				navigate('/');
				navigate(0);
				return user;
			}
			return null;
		});
		AuthUserToken(loggingUser);
	};

	//Validation Flags
	const [registError, setRegistError] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const [emailTouched, setEmailTouched] = useState<boolean>(false);
	const [passTouched, setPassTouched] = useState<boolean>(false);

	return (
		<div>
			<div className='text-center pt-5'>
				<h1 className='pt-5 pb-2'>MyReads App</h1>
			</div>
			<div className='auth-form '>
				<h2 className='fs-3 fw-bold mb-3'>Join Us!</h2>
				<Form onSubmit={handleSubmit(onLogin)} id='signUp'>
					{/*Email Address*/}
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Control
							type='email'
							placeholder='Email address'
							{...register('email', {
								required: true,
								pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
								onChange: (e) => {
									setEmailValue(e.target.value);
									setRegistError('');
									if (e.target.value.trim() === '') {
										setRegistError('');
									} else {
										setEmailTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setEmailTouched(true);
									} else {
										setEmailTouched(false);
									}
								},
							})}
						/>

						<Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
						{emailTouched && emailValue.trim() === '' && errors?.email?.type !== 'required' && (
							<p className='font-weight text-danger mt-1 mb-0'>Email is required</p>
						)}
						{errors?.email?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Email is required</p>}
						{errors?.email?.type === 'pattern' && <p className='font-weight text-danger mt-1 mb-0'>Email enter a valid email</p>}
						{errors?.email?.type !== 'pattern' && registError === 'Firebase: Error (auth/email-already-in-use).' && emailValue.trim() !== '' && (
							<p className='font-weight text-danger mt-1 mb-0'>This email already in EduMates</p>
						)}
					</Form.Group>

					{/*Password*/}
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Control
							type='password'
							placeholder='Password'
							{...register('password', {
								required: true,
								pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
								onChange: (e) => {
									if (e.target.value.trim() !== '') {
										setPassTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setPassTouched(true);
									} else {
										setPassTouched(false);
									}
								},
							})}
						/>
						{passTouched && errors?.password?.type !== 'required' && <p className='font-weight text-danger mt-1 mb-0'>Password is required</p>}
						{errors?.password?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Password is required</p>}
						{errors?.password?.type === 'pattern' && (
							<p className='font-weight text-danger mt-1 mb-0'>
								Password must contains Min. 8 characters <br />
								including [a_zA_Z0_9] and special characters.
							</p>
						)}
					</Form.Group>

					{/*Submit Button*/}
					<Form.Group className='my-3 d-flex flex-column align-items-center'>
						<Button variant='primary' type='submit'>
							Login
						</Button>
					</Form.Group>
				</Form>
			</div>

			<p className='text-center'>
				Son't have account?{'  '}
				<Link to='/signup' className='fw-bolder text-white-50'>
					Signup
				</Link>
			</p>
		</div>
	);
};
