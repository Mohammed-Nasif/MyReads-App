// BootStrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// React Hook Form Utilities
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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

	//Validation Flags
	const [emailValue, setEmailValue] = useState<string>('');
	const [emailTouched, setEmailTouched] = useState<boolean>(false);
	const [passTouched, setPassTouched] = useState<boolean>(false);

	const navigate = useNavigate();

	const onLogin: SubmitHandler<FieldValues> = (userLoginData: any) => {
		const email = userLoginData.email;
		const password = userLoginData.password;

		// We Here Should be Connecting With Backend and DB [It's Just Mocking]
		const usersCollection = JSON.parse(localStorage.users);

		// Get The User From DB [Aka LocalStorage]
		const loggingUser = usersCollection.find((user: any, i: number): any => {
			if (user.email === email && user.password === password) {
				// Cut the user from LocalStorage To Update it [We can't update Directly as DataBase]
				usersCollection.splice(i, 1);

				user['isLogged'] = true; // Update his isLogged Status
				localStorage.userID = i; // Save Index [ID] of user in DB

				// Push the user again to the collection after update
				usersCollection.push(user);

				// Set the UsersCollection again in LocalStorage after Update
				localStorage.setItem('users', JSON.stringify(usersCollection));

				// Navigate To Home Page After Login
				navigate('/');
				navigate(0); // Reload To Re-render after Token Update in LocalStorage
				return user;
			}
			return null;
		});
		// Call Auth Fn to Send User to Set Token and Headers For API Calls
		AuthUserToken(loggingUser);
	};

	return (
		<div>
			<div className='text-center pt-5'>
				<h1 className='pt-5 pb-2'>MyReads App</h1>
			</div>
			<div className='auth-form '>
				<h2 className='fs-3 fw-bold mb-3'>Welcome Back!</h2>
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
									if (e.target.value.trim() !== '') {
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
				Don't have account?{'  '}
				<Link to='/signup' className='fw-bolder text-white-50'>
					Signup
				</Link>
			</p>
		</div>
	);
};
