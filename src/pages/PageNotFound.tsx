// Images
import NotFoundImg from '../assets/images/Not-Found.svg';

export const PageNotFound = (): JSX.Element => {
	return (
		<div className='d-flex align-items-center justify-content-center w-50 h-50 m-auto pt-5'>
			<img src={NotFoundImg} alt='404' />
		</div>
	);
};
