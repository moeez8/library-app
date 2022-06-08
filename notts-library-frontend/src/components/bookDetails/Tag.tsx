const Tag = (tag: { tag: string | undefined }) => {
	return (
		<div className="tag">
			<h1>{tag.tag}</h1>
		</div>
	);
};

export default Tag;
