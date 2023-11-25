"use client";

import { Item, MultiSelectFilter } from "@/components/MultiSelectFilter";
import { useEffect, useState } from "react";

interface JsonResponse {
	data: string[];
}

export default function Home() {
	const [selectedItems, setSelectedItems] = useState<Item[]>([]);
	const [items, setItems] = useState<Item[]>([]);
	const [isLoading, setLoading] = useState(true);

	const setSelectedItemsHandler = (i: Item[]) => {
		setSelectedItems(i);
		localStorage.setItem("selectedItems", JSON.stringify(i));
		console.log("items are saved.");
	};

	useEffect(() => {
		fetch("/items.json")
			.then((res) => res.json())
			.then((res: JsonResponse) => {
				const data: Item[] = res.data.map((text) => ({
					text,
					value: text,
				}));

				setItems(data);
				setLoading(false);
			})
			.catch((error) => {
				console.log("Bir hata oluştu.", error);
			});

		const lsSelectedItems = localStorage.getItem("selectedItems");
		lsSelectedItems && setSelectedItems(JSON.parse(lsSelectedItems));
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<MultiSelectFilter
				title="Kategoriler"
				placeholder="kategori ara..."
				items={items}
				selectedItems={selectedItems}
				setSelectedItems={(i) => setSelectedItemsHandler(i)}
				noItemsText="Gösterilecek kateogori yok."
				isLoading={isLoading}
			/>
		</main>
	);
}
