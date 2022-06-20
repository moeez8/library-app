const Tag = ({ tag }: { tag: string | undefined | null }) => {
	return (
		<div className="tag">
			<h1>{tag}</h1>
		</div>
	);
};

export default Tag;
