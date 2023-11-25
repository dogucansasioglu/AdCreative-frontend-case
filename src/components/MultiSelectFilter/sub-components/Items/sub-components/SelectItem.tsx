import { Item } from "@/components/MultiSelectFilter";

interface Props {
	item: Item;
	itemOnClick: (item: Item) => void;
	isSelected?: boolean;
}

export const SelectItem = ({ item, itemOnClick, isSelected = false }: Props) => {
	return (
		<div className="flex gap-2 cursor-pointer" onClick={() => itemOnClick(item)}>
			<div className="w-6 h-6 bg-white shadow border flex items-center justify-center">
				{isSelected && <div className="w-4 h-4 bg-blue-500"></div>}
			</div>
			<div dangerouslySetInnerHTML={{ __html: item.text }}></div>
		</div>
	);
};
