
const { Toolbar, RangeControl, G, SVG, Path } = wp.components;
// More components and functions already loaded in section block plugin 

const getColumnsTemplate = function ( columns ) {
	if (columns < 1 || columns > 12) return [];
	var result = Array();
	for (var n = 0; n < columns; n++) result.push([ 'core/column' ]);
	return result;
};

registerBlockType( 'gutenberg-blocks/columns-block', {
	title: 'Editable Columns',
	description: 'Add a section with editable columns, and put any other block into it.',
	icon: 'ellipsis',
	category: 'layout',
	supports: { align: [ 'wide', 'full' ], anchor: true, },
	attributes: {
		contentWidth: { type: 'string', default: 'full' },
		paddingTop: { type: 'number' },
		paddingBottom: { type: 'number' },
		backgroundColor: { type: 'string', default: '' },
		columnGap: { type: 'number', default: 0 },
		columnQty: { type: 'number', default: 2 },
		columnClass: { type: 'string', default: '1_1' },
	},
	edit: props => {
		const { attributes, setAttributes } = props;
		const { columnQty, columnClass, columnGap, paddingTop, paddingBottom, backgroundColor, contentWidth, attachmentId, attachmentUrl } = attributes;
				
		const getIconButton = function ( cQty, cClass, cIcon ) {
			return ce(
				IconButton, 
				{
					icon: ce('svg', { width: 28, height: 14 }, ce('path', { d: cIcon, "stroke": "#808080" } ) ),
					style: columnClass == cClass ? { 'box-shadow': 'inset 0 0 0 1px #6c7781, inset 0 0 0 2px #fff', 'outline': '2px solid transparent', 'outline-offset': '-2px' } : { },
					onClick: function(value) { setAttributes( { columnQty: cQty, columnClass: cClass } ) }
				}
			);
		};

		var pa = props.attributes, ce = wp.element.createElement;
		
		return ce(
			Fragment,
			{},
			ce(
				InspectorControls,
				{ key: 'inspector' },
				ce(
					PanelBody, 
					{ title: "Columns settings" },
					ce(
						BaseControl, 
						{ label: 'Column Layout' },
						ce(
							Toolbar, 
							{},
							getIconButton( 2, '1_1', "M 0 1 L 12 1 L 0 1 z M 14 1 L 26 1 L 14 1 z M 0 5 L 12 5 L 0 5 z M 14 5 L 26 5 L 14 5 z M 0 9 L 12 9 L 0 9 z M 14 9 L 26 9 L 14 9 z M 0 13 L 12 13 L 0 13 z M 14 13 L 26 13 L 14 13 z " ),
							getIconButton( 3, '1_1_1', "M 0 1 L 7 1 L 0 1 z M 9 1 L 16 1 L 9 1 z M 18 1 L 25 1 L 18 1 z M 0 5 L 7 5 L 0 5 z M 9 5 L 16 5 L 9 5 z M 18 5 L 25 5 L 18 5 z M 0 9 L 7 9 L 0 9 z M 9 9 L 16 9 L 9 9 z M 18 9 L 25 9 L 18 9 z M 0 13 L 7 13 L 0 13 z M 9 13 L 16 13 L 9 13 z M 18 13 L 25 13 L 18 13 z " ),
							getIconButton( 4, '1_1_1_1', "M 0 1 L 5 1 L 0 1 z M 7 1 L 12 1 L 7 1 z M 14 1 L 19 1 L 14 1 z M 21 1 L 26 1 L 21 1 z M 0 5 L 5 5 L 0 5 z M 7 5 L 12 5 L 7 5 z M 14 5 L 19 5 L 14 5 z M 21 5 L 26 5 L 21 5 z M 0 9 L 5 9 L 0 9 z M 7 9 L 12 9 L 7 9 z M 14 9 L 19 9 L 14 9 z M 21 9 L 26 9 L 21 9 z M 0 13 L 5 13 L 0 13 z M 7 13 L 12 13 L 7 13 z M 14 13 L 19 13 L 14 13 z M 21 13 L 26 13 L 21 13 z " ),
							getIconButton( 6, '1_1_1_1_1_1', "M 0 1 L 3 1 L 0 1 z M 5 1 L 8 1 L 5 1 z M 10 1 L 13 1 L 10 1 z M 15 1 L 18 1 L 15 1 z M 20 1 L 23 1 L 20 1 z M 25 1 L 28 1 L 25 1 z M 0 5 L 3 5 L 0 5 z M 5 5 L 8 5 L 5 5 z M 10 5 L 13 5 L 10 5 z M 15 5 L 18 5 L 15 5 z M 20 5 L 23 5 L 20 5 z M 25 5 L 28 5 L 25 5 z M 0 9 L 3 9 L 0 9 z M 5 9 L 8 9 L 5 9 z M 10 9 L 13 9 L 10 9 z M 15 9 L 18 9 L 15 9 z M 20 9 L 23 9 L 20 9 z M 25 9 L 28 9 L 25 9 z M 0 13 L 3 13 L 0 13 z M 5 13 L 8 13 L 5 13 z M 10 13 L 13 13 L 10 13 z M 15 13 L 18 13 L 15 13 z M 20 13 L 23 13 L 20 13 z M 25 13 L 28 13 L 25 13 z " ),
						),
						ce(
							Toolbar, 
							{},
							getIconButton( 2, '2_1', "M 0 1 L 16 1 L 0 1 z M 18 1 L 25 1 L 18 1 z M 0 5 L 16 5 L 0 5 z M 18 5 L 25 5 L 18 5 z M 0 9 L 16 9 L 0 9 z M 18 9 L 25 9 L 18 9 z M 0 13 L 16 13 L 0 13 z M 18 13 L 25 13 L 18 13 z " ),
							getIconButton( 2, '1_2', "M 0 1 L 7 1 L 0 1 z M 9 1 L 25 1 L 9 1 z M 0 5 L 7 5 L 0 5 z M 9 5 L 25 5 L 9 5 z M 0 9 L 7 9 L 0 9 z M 9 9 L 25 9 L 9 9 z M 0 13 L 7 13 L 0 13 z M 9 13 L 25 13 L 9 13 z " ),
							getIconButton( 2, '3_1', "M 0 1 L 19 1 L 0 1 z M 21 1 L 26 1 L 21 1 z M 0 5 L 19 5 L 0 5 z M 21 5 L 26 5 L 21 5 z M 0 9 L 19 9 L 0 9 z M 21 9 L 26 9 L 21 9 z M 0 13 L 19 13 L 0 13 z M 21 13 L 26 13 L 21 13 z " ),
							getIconButton( 2, '1_3', "M 0 1 L 5 1 L 0 1 z M 7 1 L 26 1 L 7 1 z M 0 5 L 5 5 L 0 5 z M 7 5 L 26 5 L 7 5 z M 0 9 L 5 9 L 0 9 z M 7 9 L 26 9 L 7 9 z M 0 13 L 5 13 L 0 13 z M 7 13 L 26 13 L 7 13 z " ),
							getIconButton( 2, '5_1', "M 0 1 L 23 1 L 0 1 z M 25 1 L 28 1 L 25 1 z M 0 5 L 23 5 L 0 5 z M 25 5 L 28 5 L 25 5 z M 0 9 L 23 9 L 0 9 z M 25 9 L 28 9 L 25 9 z M 0 13 L 23 13 L 0 13 z M 25 13 L 28 13 L 25 13 z " ),
						)
					),
					ce(
						RangeControl, 
						{
							label: 'Column gap',
							value: columnGap,
							min: 0,
							max: 50,
							step: 10,
							props: { step: 10 },
							onChange: function(gap) { setAttributes( { columnGap: gap } ) }
						}
					),
					ce(
						TextControl, 
						{
							label: 'Padding Top',
							type: 'number',
							value: paddingTop ? paddingTop : '',
							style: { width: '60px' },
							onChange: function(value) { setAttributes( { paddingTop: ( '' !== value ) ? value : '' } ) }
						}
					),
					ce(
						TextControl, 
						{
							label: 'Padding Bottom',
							type: 'number',
							value: paddingBottom ? paddingBottom : '',
							style: { width: '60px' },
							onChange: function(value) { setAttributes( { paddingBottom: ( '' !== value ) ? value : '' } ) }
						}
					),
					ce(
						SelectControl, 
						{
							label: 'Content Width',
							value: contentWidth ? contentWidth : 'full',
							onChange: function(value) { setAttributes( { contentWidth: ( 'full' !== value ) ? value : 'full' } ) },
							options: [
								{ value: 'site', label: 'Site Width' },
								{ value: 'full', label: 'Full Width' },
							]
						}
					),
					ce(
						BaseControl, 
						{ label: 'Background Color' },
						ce(
							ColorPalette, 
							{
								color: backgroundColor ? backgroundColor : undefined,
								onChange: function(value) { setAttributes({ backgroundColor: value }); }
							}
						)
					)
				)
			),
			ce(
				"Section",
				{
					contentWidth: contentWidth,
					style: { backgroundColor: backgroundColor ? backgroundColor : 'none' }
				},
				ce(
					"div",
					{
						className: `wp-block-columns has-${ columnQty }-columns has-column-class-${ columnClass } sh-columns-block`
					},
					ce(
						InnerBlocks, 
						{
							template: getColumnsTemplate( columnQty ),
							templateLock: "all",
							allowedBlocks: 'core/column'
						}
					)
				)
			)
		);
	},
	save: function save(props) {
		const { attributes, setAttributes } = props;
		const { columnQty, columnClass, columnGap, contentWidth, paddingTop, paddingBottom, backgroundColor } = attributes;
		var pa = props.attributes, ce = wp.element.createElement;
		return ce(
			"Section",
			{
				contentWidth: contentWidth,
				style: { "background-color": backgroundColor ? backgroundColor : 'none' }
			},
			ce(
				"div",
				{
					className: `wp-block-columns sh-columns-block has-${ columnQty }-columns has-column-class-${ columnClass } has-column-gap-${ columnGap }` + ( contentWidth == 'site' ? ' container' : '' ),
					style: { 
						"padding-top": paddingTop ? paddingTop + 'px' : 'none', 
						"padding-bottom": paddingBottom ? paddingBottom + 'px' : 'none'
					}
				},
				ce(InnerBlocks.Content, {})
			)
		);
	}
} );
