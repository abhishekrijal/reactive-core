<?php
/**
 * Main Plugin class.
 * 
 * @package REACTIVE_CORE
 */

namespace WP_Reactive;

defined( 'ABSPATH' ) || exit;

/**
 * Main Class for plugin.
 */
final class ReactiveCore {

    /**
     * Version
     */

    public $version =  '1.0.0';

    protected static $_instance = null;

    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        $this->init_hooks();
    }

    public function init_hooks() {

        // register post type.
		add_action( 'init', array( $this, 'register_post_types' ) );

        // Add meta box.
		add_action( 'add_meta_boxes', array( $this, 'add_new_mb' ) );

        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		add_action( 'wp_ajax_reactive_core_save_mb', array( $this, 'save_mb_data' ) );

		/**
		 * Add Blocks Category.
		*/
		add_filter( 'block_categories', function ( $categories, $post ) {
			return array_merge(
				$categories,
				array(
					array(
						'slug'  => 'blossom-studio',
						'title' => __( 'Blossom Studio', 'plantura-gutenberg' ),
					),
				)
			);
		}, 10, 2 );

		add_action( 'enqueue_block_editor_assets', function () {
			$blocks_deps = include_once plugin_dir_path( REACTIVE_CORE_PLUGIN_FILE ) . '/assets/js/admin/build/blocks.asset.php';
			
			wp_enqueue_script(
				'blossomstd-gb-block-js',
				plugin_dir_url( REACTIVE_CORE_PLUGIN_FILE ) . '/assets/js/admin/build/blocks.js',
				$blocks_deps['dependencies'], 
				$blocks_deps['version'],
				true
			);
		});

    }


    public function register_post_types() {

        // Post Type labels.
		$labels = array(
			'name'               => _x( 'Books', 'post type general name', 'reactive-core' ),
			'singular_name'      => _x( 'Book', 'post type singular name', 'reactive-core' ),
			'menu_name'          => _x( 'Books', 'admin menu', 'reactive-core' ),
			'name_admin_bar'     => _x( 'Book', 'add new on admin bar', 'reactive-core' ),
			'add_new'            => _x( 'Add New', 'Book', 'reactive-core' ),
			'add_new_item'       => __( 'Add New Book', 'reactive-core' ),
			'new_item'           => __( 'New Book', 'reactive-core' ),
			'edit_item'          => __( 'Edit Book', 'reactive-core' ),
			'view_item'          => __( 'View Book', 'reactive-core' ),
			'all_items'          => __( 'All Books', 'reactive-core' ),
			'search_items'       => __( 'Search Books', 'reactive-core' ),
			'parent_item_colon'  => __( 'Parent Books:', 'reactive-core' ),
			'not_found'          => __( 'No Books found.', 'reactive-core' ),
			'not_found_in_trash' => __( 'No Books found in Trash.', 'reactive-core' ),
		);

		$args = array(
			'labels'             => $labels,
			'description'        => __( 'Description.', 'delicious-recipes' ),
			'public'             => true,
			'menu_icon'          => 'dashicons-arrow-down-alt2',
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_rest'       => true,
			'query_var'          => true,
			'rewrite'            => array(
				'slug'       => 'book',
				'with_front' => true,
			),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 30,
			'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
		);

		register_post_type( 'book', $args );

    }

    public function add_new_mb() {
        add_meta_box(
			'reactive_core_book_mb',
			__( 'Book Settings', 'delicious-recipes' ),
			array( $this, 'mb_callback' ),
			'book',
			'normal',
			'high'
		);
    }

    /**
	 * Metabox Callback.
	 *
	 * @return void
	 */
	public function mb_callback( $post ) {
		?>
			<div id="reactive-core-app" data-rest-nonce="<?php echo wp_create_nonce( 'wp_rest' ); ?>" data-post-id="<?php echo esc_attr( $post->ID ); ?>"></div>
		<?php
	}

    public function enqueue_scripts() {
        $asset_deps = include_once plugin_dir_path( REACTIVE_CORE_PLUGIN_FILE ) . '/assets/js/admin/build/book.asset.php';
        wp_enqueue_script( 'reactive-core', plugin_dir_url( REACTIVE_CORE_PLUGIN_FILE ) . '/assets/js/admin/build/book.js',  $asset_deps['dependencies'], $asset_deps['version'], true );
    }

	public function save_mb_data() {

		$data = $_POST;

		update_post_meta( absint( $data['post_id'] ), 'book_metas_data', stripslashes_deep( $data ) );

		wp_send_json_success( ['success' => 'Saved'] );

	}

}