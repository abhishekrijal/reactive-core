import { render } from "@wordpress/element";
import BookMetabox from "./components/bookMetabox";

(function () {
    let app = document.getElementById("reactive-core-app");
    
    document.addEventListener("DOMContentLoaded", function () {
        if (null !== app) {
            let postId = app.getAttribute("data-post-id");
            render(<BookMetabox postId={postId} />, app);
        }
    });
})();