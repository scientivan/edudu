const categories = ["Label1", "Label2", "Chem", "Physic", "History"];
interface CategorySelectorProps{
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, setSelected }) => {
    const toggleCategory = (category:string) => {
        if (selected.includes(category)) {
            setSelected(selected.filter((item) => item !== category));
        } else {
            setSelected([...selected, category]);
        }
    };

    return (
        <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
                <button 
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-1 rounded-4xl border ${
                        selected.includes(category) ? "bg-blue-950 text-white" : "bg-none text-black"
                    } cursor-pointer`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;
