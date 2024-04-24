<?php

/**
 * Plugin Name: Padding Test Block
 * Description: Padding visualizer testing
 * Version: 1.0
 * Author: Contributor
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function padding_test_register_block() {
	register_block_type(__DIR__ . '/build/blocks/test');
}
add_action('init', 'padding_test_register_block');
