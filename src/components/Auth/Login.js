import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import login from '../../state/actions/index';
// styles
import {
	Button,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Flex,
	Spinner,
	Text
} from '@chakra-ui/core';

const Login = ({ login, isLoading, history }) => {
	const { handleSubmit, errors, register, formState } = useForm();

	function validateUsername(value) {
		console.log('validate', value);
		let error;
		if (!value) {
			error = 'Username is required';
		} else if (value.length < 8) {
			error = 'Username must be at least 8 characters';
		}
		return error || true;
	}

	function validatePassword(value) {
		let error;
		if (!value) {
			error = 'Password is required';
		} else if (value.length < 8) {
			error = 'Password must be at least 8 characters';
		}
		return error || true;
	}

	const submitForm = creds => {
		// action function here
		login(creds).then(() => history.push('/dashboard'));
	};

	if (isLoading) {
		return (
			<Flex justify='center' align='center' w='100vh' h='100vh'>
				<Flex>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex background='#E5E5E5' w='100%' minH='100vh' justify='center'>
			<Flex w='1440px'>
				<Flex w='40%' justify='center' align='center'>
					<Text fontSize='64px' fontWeight='600' lineHeight='92px'>
						Allay - <br />
						Together, we are <br />
						stronger.
					</Text>
				</Flex>
				<Flex w='60%' justify='center' align='center'>
					<form onSubmit={handleSubmit(submitForm)}>
						<Flex
							w='490px'
							h='40%'
							p='5'
							flexDir='column'
							background='#FFFFFF'
							rounded='6px'
							justify='center'
						>
							<FormControl isInvalid={errors.username}>
								<Flex as='h2' mx='5%' my='2%'>
									Login
								</Flex>
								<Flex mx='5%' my='2%' flexDir='column'>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										variant='filled'
										label='Username'
										name='username'
										ref={register({ validate: validateUsername })}
									/>
									<FormErrorMessage>
										{errors.username && errors.username.message}
									</FormErrorMessage>
								</Flex>
							</FormControl>
							<FormControl isInvalid={errors.password}>
								<Flex mx='5%' my='2%' flexDir='column'>
									<FormLabel>Password</FormLabel>
									<Input
										type='password'
										variant='filled'
										label='Password'
										name='password'
										ref={register({ validate: validatePassword })}
									/>
									<FormErrorMessage>
										{errors.password && errors.password.message}
									</FormErrorMessage>
								</Flex>
							</FormControl>

							<Flex mx='5%' my='2%'>
								<Button
									px='50%'
									border='none'
									rounded='6px'
									variantColor='teal'
									fontSize='22px'
									isLoading={formState.isSubmitting}
									type='submit'
								>
									Login
								</Button>
							</Flex>
							<Flex m='15px' justify='center' fontWeight='light'>
								<Link to='/signup'>Don't have an account?</Link>
							</Flex>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading
	};
};

export default connect(mapStateToProps, login)(Login);
