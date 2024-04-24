import { registerBlockType } from "@wordpress/blocks"

import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "@wordpress/element"
import { InspectorControls, useBlockProps } from "@wordpress/block-editor"
import { getCSSRules } from "@wordpress/style-engine"

function getBlockStyle(styleObject, styleKey) {
	const foundStyle = getCSSRules(styleObject).find((style) => style.key === styleKey)
	return foundStyle ? foundStyle.value : undefined
}

function edit({ attributes }) {
	const { style } = attributes

	const [blockElementStyle, setBlockElementStyle] = useState({
		outline: "1px dashed red",
	})

	useEffect(() => {
		const newBlockElementStyle = {}

		const paddingTop = getBlockStyle(attributes.style, "paddingTop")
		const paddingBottom = getBlockStyle(attributes.style, "paddingBottom")

		console.log("new padding:", paddingTop, paddingBottom)

		if (paddingTop) newBlockElementStyle.paddingTop = paddingTop
		if (paddingBottom) newBlockElementStyle.paddingBottom = paddingBottom

		setBlockElementStyle({
			...blockElementStyle,
			...newBlockElementStyle,
		})
	}, [style?.spacing?.padding])

	const blockProps = useBlockProps({
		style: blockElementStyle,
	})

	return (
		<>
			<div {...blockProps}>
				<div className="inner-block-wrapper" style={{ outline: "1px dashed blue" }}>
					Red outline is the block boundary, blue outline is the inner block boundary. Padding visualizer is showing padding from previous state.
				</div>
			</div>

			<InspectorControls></InspectorControls>
		</>
	)
}

registerBlockType("padding/test", {
	edit,
	save: () => null,
})
