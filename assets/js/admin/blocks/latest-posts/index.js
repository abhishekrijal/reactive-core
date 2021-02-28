/**
 * BLOCK: featured
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

/* External dependencies */
import { __ } from "@wordpress/i18n";
import BlockInspector from "./BlockInspectorPosts";

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: Details Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("blossom-studio/latest-posts", {
  title: __("latest posts", "plantura-gutenberg"),
  description: __("latest posts Block for Plantura App.", "plantura-gutenberg"),
  icon: "format-aside",
  category: "blossom-studio",
  supports: {
    multiple: true,
  },
  keywords: [
      __( "blossom" )
  ],
  attributes: {
      postNumb: {
          type: "number"
      }
  },
  example: {
    attributes: {
        postNumb: 2
    },
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  edit: ({ attributes, setAttributes, className }) => {

    return (
        <>
       Hello World from blcok.
       <BlockInspector/>
        </>
    )
    
  },

  save: ({ attributes }) => {
    return (
        <>
        Hello World from blcok.
        </>
    )
  },
}); // END Register GBSS Boxes Block
