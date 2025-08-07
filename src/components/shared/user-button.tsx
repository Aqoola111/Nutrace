import {User} from "lucide-react";

export const UserButton = () => {
	const image = null
	return (
		<div className='rounded-full p-1 border'>
			{!image && <User/>}
		</div>
	)
};