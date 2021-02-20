<?php
/**
 * Plugin Name:     Reactive Core
 * Plugin URI:      https://avee.me
 * Description:     A custom WordPress Plugin using REACT
 * Author:          Abhishek Rijal
 * Author URI:      https://avee.me
 * Text Domain:     reactive-core
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         Reactive_Core
 */

use WP_Reactive\ReactiveCore;

defined( 'ABSPATH' ) || exit;

// Include the autoloader.
require_once __DIR__ . '/vendor/autoload.php';

if ( ! defined( 'REACTIVE_CORE_PLUGIN_FILE' ) ) {
    define( 'REACTIVE_CORE_PLUGIN_FILE', __FILE__ );
}

function Reactive_core() {
    return ReactiveCore::instance();
}

$GLOBALS['Rec_Core'] = Reactive_core();