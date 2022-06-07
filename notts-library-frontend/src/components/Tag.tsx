import React from "react";

const Tag = (tag: { tag: string | undefined }) => {
	return <div className="tag">{tag.tag}</div>;
};

export default Tag;
