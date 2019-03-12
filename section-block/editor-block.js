
const { Fragment } = wp.element;
const { PanelBody, SelectControl, BaseControl, TextControl, IconButton, ColorPalette } = wp.components;
const { BlockControls, AlignmentToolbar, InspectorControls, MediaUpload, InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'gutenberg-blocks/section-block', {
	title: 'Section',
	description: 'Add a customizable section and put any other block into it.',
	icon: 'screenoptions',
	category: 'layout',
	supports: { align: [ 'wide', 'full' ], anchor: true, },
	attributes: {
		contentAlign: { type: 'string', default: 'left' },
		contentWidth: { type: 'string', default: 'site' },
		paddingTop: { type: 'number' },
		paddingBottom: { type: 'number' },
		backgroundColor: { type: 'string', default: '' },
		attachmentId: { type: 'number' },
		attachmentUrl: { type: 'string' },
	},
	edit: props => {
		const { attributes, setAttributes } = props;
		const { contentAlign, paddingTop, paddingBottom, backgroundColor, contentWidth, attachmentId, attachmentUrl } = attributes;
		
		var pa = props.attributes, ce = wp.element.createElement;
		
		return ce(
			Fragment,
			{},
			ce(
				BlockControls,
				null,
				ce(
					AlignmentToolbar,
					{
						value: contentAlign,
						onChange: function(value) { setAttributes( { contentAlign: value } ) }
					}
				)
			),
			ce(
				InspectorControls,
				{ key: 'inspector' },
				ce(
					PanelBody, 
					{ title: "Section settings" },
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
							value: contentWidth ? contentWidth : 'site',
							onChange: function(value) { setAttributes( { contentWidth: ( 'site' !== value ) ? value : 'site' } ) },
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
					),
					ce(
						BaseControl, 
						{ label: 'Background Image' },
						ce(
							MediaUpload, 
							{
								type: 'Image',
								value: attachmentId,
								onSelect: function( media ) { return setAttributes({ attachmentId: media.id, attachmentUrl: media.url }) },
								render: function( obj ) {
									return ce( IconButton, {
											className: attachmentId ? 'image-button' : 'button button-large',
											onClick: obj.open
										},
										! attachmentId ? 'Select Image' : ce( 'img', { src: attachmentUrl } )
									);
								}
							}
						)
					),
					ce(
						IconButton, 
						{
							className: 'button button-large',
							style: { display: attachmentId ? 'block' : 'none' },
							onClick: function( media ) { return setAttributes({ attachmentId: undefined, attachmentUrl: undefined }) },
						},
						'Remove Image'
					)
				)
			),
			ce(
				"Section",
				{
					contentWidth: contentWidth,
					className: attachmentId ? `background-image-${ attachmentId }` : '',
					style: 
					{ 
						backgroundImage: attachmentUrl ? 'url(${ attachmentUrl })' : 'none',
						backgroundColor: backgroundColor ? backgroundColor : 'none'
					}
				},
				ce(
					"div",
					{ className: 'container' },
					ce(InnerBlocks, {})
				)
			)
		);
	},
	save: function save(props) {
		const { attributes, setAttributes } = props;
		const { contentAlign, paddingTop, paddingBottom, backgroundColor, contentWidth, attachmentId, attachmentUrl } = attributes;
		var pa = props.attributes, ce = wp.element.createElement;
		return ce(
			"Section",
			{
				contentWidth: contentWidth,
				className: attachmentId ? `background-image-${ pa.attachmentId }` : '',
				style: 
				{ 
					"background-color": backgroundColor ? backgroundColor : 'none',
					textAlign: contentAlign 
				}
			},
			ce(
				"div",
				{ 
					className: contentWidth == 'site' ? 'container' : '',
					style: 
					{ 
						"padding-top": paddingTop ? paddingTop + 'px' : 'unset', 
						"padding-bottom": paddingBottom ? paddingBottom + 'px' : 'unset',
						
					}
				},
				ce(InnerBlocks.Content, {})
			)
		);
	}
} );
