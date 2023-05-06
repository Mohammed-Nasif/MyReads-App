// BootStrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// React Hook Form Utilities
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// React Router
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useState } from 'react';

// Utilities
import { v4 as uuid } from 'uuid';

// Types and Interfaces
import { User } from '../../@types/interfaces';

export const Signup = (): JSX.Element => {
    
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	//Validation Flags
	const [nameTouched, setNameTouched] = useState<boolean>(false);
	const [registError, setRegistError] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const [emailTouched, setEmailTouched] = useState<boolean>(false);
	const [passTouched, setPassTouched] = useState<boolean>(false);
	const [confPassTouched, setConfPassTouched] = useState<boolean>(false);

	const navigate = useNavigate();

	const onSignup: SubmitHandler<FieldValues> = (userData) => {
		const userToken: string = uuid();
		const createdUser: User = { userName: userData.name.toLowerCase(), email: userData.email, password: userData.password, userToken, isLogged: true };

		let currentUsers = JSON.parse(localStorage.users);

		currentUsers.push(createdUser);
		localStorage.setItem('users', JSON.stringify(currentUsers));

		navigate('/home');
	};

	return (
		<div>
			<div className='text-center pt-5'>
				<h1 className='pt-5 pb-2'>MyReads App</h1>
			</div>
			<div className='auth-form '>
				<h2 className='fs-3 fw-bold mb-3'>Join Us!</h2>
				<Form onSubmit={handleSubmit(onSignup)} id='signUp'>
					{/*Full Name*/}
					<Form.Group className='mb-3' controlId='formBasicName'>
						<Form.Control
							placeholder='Full Name'
							type='text'
							{...register('name', {
								required: true,
								maxLength: 20,
								onChange: (e) => {
									if (e.target.value.trim() !== '') {
										setNameTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setNameTouched(true);
									} else {
										setNameTouched(false);
									}
								},
							})}
						/>
						{nameTouched && errors?.name?.type !== 'required' && <p className='font-weight text-danger mt-1 mb-0'>Name is required</p>}
						{errors?.name?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Name is required</p>}
						{errors?.name?.type === 'maxLength' && <p className='font-weight text-danger mt-1 mb-0'>Name must contain maximum 20 letters</p>}
					</Form.Group>

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

					{/*Confirm Password*/}
					<Form.Group className='mb-3' controlId='formBasicConfPassword'>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							{...register('confirmPassword', {
								required: true,
								validate: (value) => value === watch('password'),
								onChange: (e) => {
									if (e.target.value.trim() !== '') {
										setConfPassTouched(false);
									}
								},
								onBlur: (e) => {
									if (e.target.value.trim() === '') {
										setConfPassTouched(true);
									} else {
										setConfPassTouched(false);
									}
								},
							})}
						/>
						{confPassTouched && errors?.confirmPassword?.type !== 'required' && (
							<p className='font-weight text-danger mt-1 mb-0'>Confirm Password is required</p>
						)}
						{errors?.confirmPassword?.type === 'required' && <p className='font-weight text-danger mt-1 mb-0'>Confirm Password is required</p>}
						{errors?.confirmPassword?.type === 'validate' && <p className='font-weight text-danger mt-1 mb-0'>Password Not Matched !</p>}
					</Form.Group>

					{/*Agree To Terms And Conditions CheckBox*/}
					<Form.Group className='my-3 d-flex flex-column align-items-center' controlId='formBasicCheckbox'>
						<Form.Check
							type='checkbox'
							label='Agree To Terms And Conditions'
							{...register('agreeTerms', {
								required: true,
							})}
						/>

						{errors?.agreeTerms?.type === 'required' && <p className='font-weight text-danger mt-2'>You must agree on our Terms and Conditions</p>}
					</Form.Group>

					{/*Submit Button*/}
					<Form.Group className='my-3 d-flex flex-column align-items-center'>
						<Button variant='primary' type='submit'>
							Sign Up
						</Button>
					</Form.Group>
				</Form>
			</div>

			<p className='text-center'>
				Already have account?{'  '}
				<Link to='/' className='fw-bolder text-white-50'>
					Login
				</Link>
			</p>
		</div>
	);
};
