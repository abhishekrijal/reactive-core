const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow } = wp.components;

const { __ } = wp.i18n;
function BlockInspector() {
    return (
        <InspectorControls key="inspector">
            <PanelBody
                initialOpen={true}
                title={__("Latest Posts Settings", "plantura-gutenberg")}
                className="plantura-gutenberg-settings"
           >
                <PanelRow>
                    <Fragment>
                       <input type="number" value="" step="1"/>
                    </Fragment>
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    )
}

export default BlockInspector
