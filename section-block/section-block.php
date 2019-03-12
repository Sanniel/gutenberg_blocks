<?php
/*
Plugin Name:	Gutenberg Section Block
Description: 	Creates a customizable section block in which any content can be inserted 
Version:		1.1.0
Author: 		Susanna Häggblom
Date created:	2019-03-06

@package sh-gutenberg-blocks
*/

if ( ! defined( 'ABSPATH' ) ) die( '-1' );

add_action( 'init', 'gutenberg_custom_blocks' );
function gutenberg_custom_blocks() {
	
	if ( ! function_exists( 'register_block_type' ) ) return;	// Gutenberg is not active.

    wp_register_script(
        'section-block-scripts',
        plugins_url( 'editor-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor-block.js' )
    );
	
	wp_register_style(
		'section-block-styles',
		plugins_url( 'editor-styles.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor-styles.css' )
	);

	wp_register_style(
		'section-frontend-styles',
		plugins_url( 'styles.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'styles.css' )
	);

    register_block_type( 'gutenberg-blocks/section-block', array(
		'style' => 'section-frontend-styles',
        'editor_script' => 'section-block-scripts',
        'editor_style' => 'section-block-styles',
    ) );
}

/**
 * Adds background image styles to any content elements using a `background-image-{$id}` class.
 */
function sh_blocks_background_image_style( $content ) {
	
	if ( ! preg_match_all( '/background-image-(\d+)/', $content, $matches, PREG_PATTERN_ORDER ) ) return $content;

	$styles = array();

	$attachment_ids = array_unique( array_map( 'absint', $matches[1] ) );
	foreach ( $attachment_ids as $attachment_id ) {
		$meta = wp_get_attachment_metadata( $attachment_id );
		if ( ! $meta ) continue;

		$attachment_url = wp_get_attachment_url( $attachment_id );
		$base_url       = str_replace( wp_basename( $attachment_url ), '', $attachment_url );

		if ( empty( $meta['sizes'] ) ) {
			$styles[] = " .background-image-{$attachment_id} { background-image: url('{$attachment_url}'); background-size: cover; }";
			continue;
		}

		$sizes = wp_list_sort( $meta['sizes'], 'width', 'ASC', true );
		if ( ! isset( $sizes['full'] ) ) $sizes['full'] = array( 'url' => $attachment_url, 'width' => $meta['width'] );
		$sizes = array_values( $sizes );

		$style            = array();
		$widths           = array();
		$min_width        = 0;
		$min_width_retina = 0;
		$size_count       = count( $sizes );
		foreach ( $sizes as $index => $size_meta ) {
			if ( $size_meta['width'] < 480 || in_array( $size_meta['width'], $widths, true ) ) continue;

			$widths[] = $size_meta['width'];

			if ( $index === $size_count - 1 ) {
				// Do not specify max-width for the largest available width.
				$max_width        = 0;
				$max_width_retina = 0;
			} else {
				$max_width        = $size_meta['width'];
				$max_width_retina = $size_meta['width'] / 2;
			}

			$media_query        = sh_blocks_get_media_query( $min_width, $max_width );
			$media_query_retina = sh_blocks_get_media_query_retina( $min_width_retina, $max_width_retina );

			$size_url = ! empty( $size_meta['url'] ) ? $size_meta['url'] : $base_url . $size_meta['file'];

			$style[] = "
	@media {$media_query} { .background-image-{$attachment_id} { background-image: url('{$size_url}'); background-size: cover; } }
	@media {$media_query_retina} { .background-image-{$attachment_id} { background-image: url('{$size_url}'); background-size: cover; } }
	";

			$min_width        = $max_width + 1;
			$min_width_retina = $max_width_retina + 1;
		}

		$styles[] = implode( '', $style );
	}

	$content = '<style type="text/css">' . implode( '', $styles ) . '</style>' . $content;

	return $content;
}
add_filter( 'the_content', __NAMESPACE__ . '\\sh_blocks_background_image_style', 100 );

/**
 * Gets a CSS media query string for the given minimum and maximum width.
 */
function sh_blocks_get_media_query( $min_width, $max_width ) {
	if ( $min_width && $max_width ) return "screen and (min-width: {$min_width}px) and (max-width: {$max_width}px)";
	if ( $min_width ) return "screen and (min-width: {$min_width}px)";
	if ( $max_width ) return "screen and (max-width: {$max_width}px)";

	return '';
}

/**
 * Gets a CSS media query string for retina displays for the given minimum and maximum width.
 */
function sh_blocks_get_media_query_retina( $min_width, $max_width ) {
	if ( $min_width && $max_width ) {
		return "screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: {$min_width}px) and (max-width: {$max_width}px),
		screen and (min-resolution: 192dpi) and (min-width: {$min_width}px) and (max-width: {$max_width}px),
		screen and (min-resolution: 2dppx) and (min-width: {$min_width}px) and (max-width: {$max_width}px)";
	}

	if ( $min_width ) {
		return "screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: {$min_width}px),
		screen and (min-resolution: 192dpi) and (min-width: {$min_width}px),
		screen and (min-resolution: 2dppx) and (min-width: {$min_width}px)";
	}

	if ( $max_width ) {
		return "screen and (-webkit-min-device-pixel-ratio: 2) and (max-width: {$max_width}px),
		screen and (min-resolution: 192dpi) and (max-width: {$max_width}px),
		screen and (min-resolution: 2dppx) and (max-width: {$max_width}px)";
	}

	return '';
}