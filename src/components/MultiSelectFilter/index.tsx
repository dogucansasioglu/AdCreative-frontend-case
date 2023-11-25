"use client";

import { DoneButton } from "@/components/MultiSelectFilter/sub-components/DoneButton";
import { Items } from "@/components/MultiSelectFilter/sub-components/Items";
import { SearchInput } from "@/components/MultiSelectFilter/sub-components/SearchInput";
import { useEffect, useMemo, useState } from "react";

export interface Item {
	text: string;
	value: string;
}

interface Props {
	title: string;
	items: Item[];
	selectedItems: Item[];
	setSelectedItems: (items: Item[]) => void;
	noItemsText: string;
	placeholder?: string;
	isLoading?: boolean;
}

export const MultiSelectFilter = ({
	title,
	placeholder,
	items: allItems,
	selectedItems,
	setSelectedItems,
	noItemsText,
	isLoading = false,
}: Props) => {
	const [searchValue, setSearchValue] = useState("");

	const currentItems = useMemo(() => {
		if (searchValue) {
			return allItems.filter((i) => i.text.toLowerCase().includes(searchValue.toLowerCase()));
		} else {
			return allItems;
		}
	}, [searchValue, allItems]);

	const [tmpSelectedItems, setTmpSelectedItems] = useState(selectedItems);
	useEffect(() => {
		setTmpSelectedItems(selectedItems);
	}, [selectedItems]);

	const DoneButtonOnClickHandler = () => {
		setSelectedItems(tmpSelectedItems);
	};

	return (
		<div
			className={`p-8 bg-gray-100 text-black space-y-4 w-96 ${isLoading ? "animate-pulse pointer-events-none" : ""}`}
		>
			<h4 className="font-medium text-lg">{title}</h4>
			<SearchInput value={searchValue} setValue={setSearchValue} placeholder={placeholder} />
			<Items
				currentItems={currentItems}
				selectedItems={tmpSelectedItems}
				setSelectedItems={setTmpSelectedItems}
				noItemsText={noItemsText}
				isLoading={isLoading}
			/>
			<DoneButton onClick={() => DoneButtonOnClickHandler()} />
		</div>
	);
};
