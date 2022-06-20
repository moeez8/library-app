const FormBookTag = ({ tag, removeTagFunc }: { tag: string; removeTagFunc: any }) => {
	const handleCallback = () => {
		removeTagFunc(tag);
	};

	return (
		<span className="tag">
			{" "}
			{tag}{" "}
			<span className=" w-5 h-5 border-red-100 bg-red-400 inline-flex items-center justify-center text-white rounded-full transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={handleCallback}>
				{" "}
				x{" "}
			</span>
		</span>
	);
};
export default FormBookTag;
