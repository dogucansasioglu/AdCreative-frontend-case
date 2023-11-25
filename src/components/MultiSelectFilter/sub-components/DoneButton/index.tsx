interface Props {
	onClick: () => void;
}

export const DoneButton = ({ onClick }: Props) => {
	return (
		<div
			className="bg-blue-500 px-6 py-3 cursor-pointer text-white text-center font-medium text-lg"
			onClick={() => onClick()}
		>
			Ara
		</div>
	);
};
