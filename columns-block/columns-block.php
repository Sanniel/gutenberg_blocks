<?php
/*
Plugin Name:	Gutenberg Columns Block
Description: 	Creates a customizable section block containing columns in which any content can be inserted 
Version:		1.0.0
Author: 		Susanna Häggblom
Date created:	2019-03-08

@package sh-gutenberg-blocks
*/

if ( ! defined( 'ABSPATH' ) ) die( '-1' );

add_action( 'init', 'gutenberg_columns_blocks' );
function gutenberg_columns_blocks() {
	
	if ( ! function_exists( 'register_block_type' ) ) return;	// Gutenberg is not active.

    wp_register_script(
        'columns-block-scripts',
        plugins_url( 'editor-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor-block.js' )
    );
	
	wp_register_style(
		'columns-block-styles',
		plugins_url( 'editor-styles.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor-styles.css' )
	);

	wp_register_style(
		'columns-frontend-styles',
		plugins_url( 'styles.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'styles.css' )
	);

    register_block_type( 'gutenberg-blocks/columns-block', array(
		'style' => 'columns-frontend-styles',
        'editor_script' => 'columns-block-scripts',
        'editor_style' => 'columns-block-styles',
    ) );
}
