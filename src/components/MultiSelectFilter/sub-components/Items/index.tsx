import { Item } from "@/components/MultiSelectFilter";
import { SelectItem } from "@/components/MultiSelectFilter/sub-components/Items/sub-components/SelectItem";
import { useMemo } from "react";

interface Props {
	currentItems: Item[];
	selectedItems: Item[];
	setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	noItemsText: string;
	isLoading: boolean;
}

export const Items = ({ currentItems, selectedItems, setSelectedItems, noItemsText, isLoading }: Props) => {
	const itemsWithoutSelectedItems = useMemo(
		() => currentItems.filter((item) => !selectedItems.includes(item)),
		[currentItems, selectedItems]
	);

	const toggleItem = (item: Item) => {
		const index = selectedItems.findIndex((i) => i.text === item.text && i.value === item.value);

		if (index >= 0) {
			const tmp = [...selectedItems];
			tmp.splice(index, 1);
			setSelectedItems(tmp);
		} else
			setSelectedItems((prev) => {
				return [...prev, item];
			});
	};

	return (
		<div className="space-y-4 h-60 overflow-y-scroll">
			{isLoading ? (
				<div className="animate-spin-slow h-12 w-12 border-4 border-dotted rounded-full border-blue-500 mx-auto !duration-[2s]"></div>
			) : currentItems.length > 0 || selectedItems.length > 0 ? (
				<>
					{selectedItems.map((item, index) => (
						<SelectItem
							key={item.value + index.toString()}
							item={item}
							itemOnClick={(item) => toggleItem(item)}
							isSelected={true}
						/>
					))}
					{itemsWithoutSelectedItems.map((item, index) => (
						<SelectItem key={item.value + index.toString()} item={item} itemOnClick={(item) => toggleItem(item)} />
					))}
				</>
			) : (
				<div>{noItemsText}</div>
			)}
		</div>
	);
};
