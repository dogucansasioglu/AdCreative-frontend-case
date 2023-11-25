import Image from "next/image";

interface Props {
	placeholder?: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput = ({ placeholder, value, setValue }: Props) => {
	return (
		<div className="relative">
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				className="pr-8 pl-2 py-1 w-full"
			/>
			<div className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center pointer-events-none">
				<Image src={"/search.svg"} alt="search icon" width={16} height={16} />
			</div>
		</div>
	);
};
