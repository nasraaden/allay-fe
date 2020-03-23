import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactGA from 'react-ga'; // for google analytics
import { states } from '../../Reusable/statesData';
// redux
import { connect } from 'react-redux';
// actions
import postReview from '../../../state/actions';
import getCompanies from '../../../state/actions';
import postCompany from '../../../state/actions';
// styles
import BeautyStars from 'beauty-stars';
import {
	FormControl,
	Input,
	Flex,
	Select,
	Textarea,
	Button,
	FormLabel,
	InputGroup,
	InputLeftElement,
	Avatar,
	Progress,
	Link
} from '@chakra-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomSpinner from '../../CustomSpinner';
import { ThinkingDots } from '../../Reusable/ThinkingDots';

const ReviewForm2 = ({
	history,
	loadingCompanies,
	companies,
	getCompanies,
	postReview
}) => {
	//initialize animations
	AOS.init();
	const { register, handleSubmit, formState } = useForm();
	// thinking state
	const [thinking, setThinking] = useState(false);
	const dots = () => {
		setThinking(true);
	};
	// search state
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	// star rating
	const [starState, setStarState] = useState(0);
	//progress bar
	const [progress, setProgress] = useState({
		prec: 99,
		mins: 10,
		prog: 2
	});

	// state for visibility
	const [Tag2, setTag2] = useState(false);
	const [Tag3, setTag3] = useState(false);
	const [Tag4, setTag4] = useState(false);
	const [Tag5, setTag5] = useState(false);
	const [Tag6, setTag6] = useState(false);

	// brings to top on render
	useEffect(() => {
		getCompanies();
		setProgress({
			prec: 95,
			mins: 8,
			prog: 5
		});
		const element = document.getElementById('Tag1');
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	}, [getCompanies]);

	// company search function
	useEffect(() => {
		if (searchTerm.length >= 3) {
			const results = companies.filter(company =>
				company.company_name.toLowerCase().startsWith(searchTerm.toLowerCase())
			);
			console.log(results);
			setSearchResults(results);
		}
	}, [searchTerm, companies]);

	// timers for moves
	let timer = null;
	let dotTimer = null;
	// 2nd tag
	const time1 = () => {
		clearTimeout(timer);
		clearTimeout(dotTimer);
		dotTimer = setTimeout(dots, 500);
		timer = setTimeout(routeTo2, 2000);
	};

	const routeTo2 = () => {
		setTag2(true);
		setProgress({
			prec: 70,
			mins: 8,
			prog: 20
		});
		const element = document.getElementById('Tag2');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setThinking(false);
	};
	// 3rd tag
	const time2 = () => {
		clearTimeout(timer);
		clearTimeout(dotTimer);
		dotTimer = setTimeout(dots, 800);
		timer = setTimeout(routeTo3, 2000);
	};

	const routeTo3 = () => {
		setTag3(true);
		setProgress({
			prec: 65,
			mins: 6,
			prog: 35
		});
		const element = document.getElementById('Tag3');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setThinking(false);
	};
	//4th tag
	const time3 = () => {
		clearTimeout(timer);
		clearTimeout(dotTimer);
		dotTimer = setTimeout(dots, 2000);
		timer = setTimeout(routeTo4, 4000);
	};

	const routeTo4 = () => {
		setTag4(true);
		setProgress({
			prec: 45,
			mins: 4.5,
			prog: 65
		});
		const element = document.getElementById('Tag4');
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setThinking(false);
	};
	// 5th tag
	const time4 = () => {
		clearTimeout(timer);
		clearTimeout(dotTimer);
		dotTimer = setTimeout(dots, 500);
		timer = setTimeout(routeTo5, 2000);
	};

	const routeTo5 = () => {
		setTag5(true);
		setProgress({
			prec: 20,
			mins: 1,
			prog: 80
		});
		const element = document.getElementById('Tag5');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		setThinking(false);
	};
	// 6th tag
	const time5 = () => {
		clearTimeout(timer);
		clearTimeout(dotTimer);
		dotTimer = setTimeout(dots, 500);
		timer = setTimeout(routeTo6, 2000);
	};

	const routeTo6 = () => {
		setTag6(true);
		setProgress({
			prec: 100,
			mins: 0,
			prog: 100
		});
		const element = document.getElementById('Tag6');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		setThinking(false);
	};

	//submit handler
	const submitForm = data => {
		postReview(localStorage.getItem('userId'), {
			...data,
			review_type_id: 1,
			overall_rating: starState
		}).then(() => history.push('/dashboard'));
		ReactGA.event({
			category: 'Review',
			action: `Submit review`
		});
	};

	return (
		// main container
		<Flex w='100%' justify='center'>
			{/* max size */}
			<Flex maxW='1440px' w='100%'>
				{/* progress header */}
				<Flex
					pt='1%'
					px='2%'
					w='70%'
					h='108px'
					background='#344CD0'
					top='0'
					position='fixed'
					overflow='hidden'
					zIndex='999'
					direction='column'
				>
					<Flex w='100%' color='#FFFFFF'>
						Your progress
					</Flex>

					<Flex w='100%' justify='space-between' mb='1%' color='#FFFFFF'>
						{progress.prec === 100 ? (
							<>
								<Flex as='h4'>{progress.prec}% Completed!</Flex>{' '}
							</>
						) : (
							<>
								<Flex as='h4'>{progress.prec}% not completed</Flex>
								<Flex color='#FFFFFF'> {progress.mins} mins</Flex>
							</>
						)}
					</Flex>
					<Progress
						color='white'
						background='#344CD0'
						hasStripe
						isAnimated
						rounded='6px'
						border='1px solid #FFFFFF'
						value={progress.prog}
					/>
				</Flex>
				{thinking ? (
					<>
						<Flex
							bottom='0'
							position='fixed'
							overflow='hidden'
							zIndex='999'
							pt='5%'
							pl='15%'
						>
							<ThinkingDots />
						</Flex>
					</>
				) : null}
				{/* bottom nav bar */}
				<Flex
					w='70%'
					pb='1%'
					justify='flex-end'
					bottom='0'
					position='fixed'
					overflow='hidden'
					zIndex='999'
				>
					<Button>Cancel</Button>
				</Flex>
				{/* form container */}
				<Flex w='100%' bg='white' flexDir='column' px='2%' pt='5%'>
					{/* start of form  */}
					<form onSubmit={handleSubmit(submitForm)}>
						<FormControl isRequired>
							{/* first prompt */}
							<Flex
								id='Tag1'
								align='center'
								h='5%'
								p='1%'
								w='416px'
								mb='8%'
								mt='5%'
								bg='#F2F6FE'
								rounded='20px'
								data-aos='fade-right'
								data-aos-offset='200'
								data-aos-delay='50'
								data-aos-duration='1000'
								data-aos-easing='ease-in-out'
								data-aos-mirror='true'
								data-aos-once='true'
							>
								<p>Tell me some details so we can get started</p>
							</Flex>
							{/* form container  */}
							<Flex w='100%' justify='flex-end'>
								{/* company box */}
								<Flex
									w='459px'
									h='600px'
									mb='8%'
									px='6'
									py='8'
									border='1px solid #BBBDC6'
									rounded='6px'
									flexDir='column'
									data-aos='fade-in'
									data-aos-offset='200'
									data-aos-delay='1000'
									data-aos-duration='1500'
									data-aos-easing='ease-in-out'
									data-aos-mirror='true'
									data-aos-once='true'
								>
									<FormLabel>1. Company name</FormLabel>
									{loadingCompanies ? (
										<>
											<Flex justify='center' w='100%'>
												<CustomSpinner />
											</Flex>
										</>
									) : (
										<>
											{' '}
											<Input
												h='56px'
												variant='filled'
												rounded='6px'
												autoCapitalize='none'
												type='text'
												label='company_name'
												name='company_name'
												list='company_name'
												ref={register}
												onChange={e => setSearchTerm(e.target.value)}
											/>
											<datalist id='company_name'>
												{searchResults.map(company => (
													<option value={company.company_name} key={company.id}>
														{company.company_name}
													</option>
												))}
											</datalist>
											<Link mb='2' color='grey' href='/add-company'>
												Can't find a company?
											</Link>
										</>
									)}
									<FormLabel>2. Status at the company</FormLabel>
									<Select
										h='56px'
										mb='6'
										rounded='6px'
										variant='filled'
										label='work_status_id'
										name='work_status_id'
										placeholder='Select one'
										ref={register}
									>
										<option value={1}>Current Employee</option>
										<option value={2}>Former Employee</option>
										<option value={3}>Full Time</option>
										<option value={4}>Part Time</option>
										<option value={5}>Intern</option>
									</Select>
									<FormLabel>3. Job Title</FormLabel>
									<Input
										h='56px'
										mb='6'
										variant='filled'
										rounded='6px'
										autoCapitalize='none'
										type='text'
										label='job_title'
										name='job_title'
										list='job_title'
										ref={register}
									/>
									<FormLabel>3. Location of company</FormLabel>
									<Flex>
										<Input
											h='56px'
											mb='6'
											mr='1%'
											variant='filled'
											rounded='6px'
											autoCapitalize='none'
											type='text'
											label='city'
											name='city'
											list='city'
											placeholder='ex: Nashville '
											ref={register}
										/>
										<Select
											h='56px'
											rounded='6px'
											variant='filled'
											label='state_id'
											name='state_id'
											placeholder='Select one'
											ref={register}
										>
											{states.map(i => (
												<option value={i.id}>{i.state_name}</option>
											))}
										</Select>
									</Flex>
									<FormLabel>5. Length of position</FormLabel>
									<Flex w='100%' justify='space-between'>
										<Input
											type='number'
											min='1970'
											max='2030'
											h='56px'
											variant='filled'
											rounded='6px'
											w='45%'
											mr='2%'
											label='start_date'
											name='start_date'
											placeholder='YYYY'
											ref={register}
										/>

										<Input
											h='56px'
											variant='filled'
											rounded='6px'
											autoCapitalize='none'
											type='number'
											min='1970'
											max='2030'
											w='45%'
											label='end_date'
											name='end_date'
											placeholder='YYYY'
											onKeyUp={time1}
											ref={register}
										/>
									</Flex>
								</Flex>
								{/* avatar */}
								<Flex
									h='600px'
									align='flex-end'
									ml='1%'
									data-aos='fade-in'
									data-aos-offset='200'
									data-aos-delay='1000'
									data-aos-duration='1500'
									data-aos-easing='ease-in-out'
									data-aos-mirror='true'
									data-aos-once='true'
								>
									<Avatar size='md' src='https://bit.ly/broken-link' />
								</Flex>
							</Flex>
							{/* Second prompt */}
							{Tag2 ? (
								<>
									<Flex
										id='Tag2'
										align='center'
										p='1%'
										mb='2%'
										h='5%'
										w='416px'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='50'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>Thank you for that information</p>
									</Flex>
									<Flex
										id='commentTag'
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='800'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>
											Please write your comment below. Some topics you can
											discuss are company culture, work environment, career
											growth, salary etc.
										</p>
									</Flex>
									<Flex w='100%' justify='flex-end'>
										{/* long hand interview box */}
										<Flex
											w='459px'
											h='242px'
											mb='8%'
											px='6'
											py='8'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='2400'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
											data-aod-anchor='#commentTag'
										>
											<FormLabel>Comments</FormLabel>
											<Textarea
												variant='filled'
												h='144px'
												rowsMax={6}
												type='text'
												name='comment'
												rounded='6px'
												onKeyUp={time2}
												ref={register}
											/>
										</Flex>
										{/* avatar */}
										<Flex
											h='242px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='2400'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{/* 4th prompt */}
							{Tag3 ? (
								<>
									<Flex
										id='Tag3'
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='2%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='50'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>Thank you for sharing that</p>
									</Flex>
									<Flex
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='1500'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>To understand better can you please add some details</p>
									</Flex>
									{/* hours container  */}
									<Flex w='100%' justify='flex-end'>
										{/* hours box */}
										<Flex
											w='459px'
											h='136px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='2800'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>Working hours</FormLabel>
											<Select
												h='56px'
												rounded='6px'
												variant='filled'
												label='typical_hours'
												name='typical_hours'
												placeholder='Select one'
												onChange={time3}
												ref={register}
											>
												<option value={29}>29 hours or less</option>
												<option value={30}>30 hours</option>
												<option value={40}>40 hours</option>
												<option value={50}>50 hours</option>
												<option value={60}>60 hours+</option>
											</Select>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='2800'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{/* 5th prompt */}
							{Tag4 ? (
								<>
									<Flex
										id='Tag4'
										align='center'
										h='5%'
										p='1%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='50'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>
											Posting your salary helps many job-seekers negotiate for
											fair salaries
										</p>
									</Flex>
									{/* salary container  */}
									<Flex w='100%' justify='flex-end'>
										{/* salary box */}
										<Flex
											w='459px'
											h='150px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel>Salary</FormLabel>
											<InputGroup>
												<InputLeftElement
													mb='4'
													py='28px'
													color='gray.300'
													fontSize='1.2em'
													children='$'
												/>
												<Input
													h='56px'
													mb='6'
													variant='filled'
													rounded='6px'
													autoCapitalize='none'
													type='number'
													label='salary'
													name='salary'
													onKeyUp={time4}
													ref={register}
												/>
											</InputGroup>
										</Flex>
										{/* avatar */}
										<Flex
											h='150px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1000'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>{' '}
								</>
							) : null}
							{/* 6th prompt */}
							{Tag5 ? (
								<>
									<Flex
										id='Tag5'
										align='center'
										h='5%'
										w='416px'
										p='1%'
										mb='2%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='50'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>Awesome! Thank you for sharing that.</p>
									</Flex>
									<Flex
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='1000'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
									>
										<p>One last question</p>
									</Flex>
									{/* overall container  */}
									<Flex w='100%' justify='flex-end'>
										{/* overall box */}
										<Flex
											w='459px'
											h='136px'
											mb='8%'
											p='6'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1500'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<FormLabel mb='4'>Rate overall experience</FormLabel>
											<Flex justify='center' w='100%'>
												<BeautyStars
													value={starState}
													activeColor='blue'
													onChange={value => {
														setStarState(value);
														time5();
													}}
												/>
											</Flex>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1500'
											data-aos-duration='1500'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>
								</>
							) : null}
							{Tag6 ? (
								<>
									<Flex
										id='Tag6'
										align='center'
										p='1%'
										h='5%'
										w='416px'
										mb='8%'
										bg='#F2F6FE'
										rounded='20px'
										data-aos='fade-right'
										data-aos-offset='200'
										data-aos-delay='50'
										data-aos-duration='1000'
										data-aos-easing='ease-in-out'
										data-aos-mirror='true'
										data-aos-once='true'
										data-aos-anchor='#ratingTag'
									>
										<p>Thank you! Don’t forget to hit submit </p>
									</Flex>
									{/* submit container  */}
									<Flex w='100%' justify='flex-end'>
										{/* submit box */}
										<Flex
											w='459px'
											h='136px'
											mb='8%'
											p='6'
											justify='center'
											align='center'
											border='1px solid #BBBDC6'
											rounded='6px'
											flexDir='column'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1500'
											data-aos-duration='1000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Button
												bg='#344CD0'
												color='white'
												type='submit'
												isLoading={formState.isSubmitting}
												rounded='6px'
												border='none'
											>
												{' '}
												Submit{' '}
											</Button>
										</Flex>
										{/* avatar */}
										<Flex
											h='136px'
											align='flex-end'
											ml='1%'
											data-aos='fade-in'
											data-aos-offset='200'
											data-aos-delay='1500'
											data-aos-duration='1000'
											data-aos-easing='ease-in-out'
											data-aos-mirror='true'
											data-aos-once='true'
										>
											<Avatar size='md' src='https://bit.ly/broken-link' />
										</Flex>
									</Flex>
								</>
							) : null}
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		loadingCompanies: state.company.isLoading,
		companies: state.company.data
	};
};

export default connect(
	mapStateToProps,
	(postReview, getCompanies, postCompany)
)(ReviewForm2);
