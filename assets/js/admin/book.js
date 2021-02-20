import { render } from "@wordpress/element";
import BookMetabox from "./components/bookMetabox";

(function () {
    let app = document.getElementById("reactive-core-app");
    let postId = app.getAttribute("data-post-id");

    document.addEventListener("DOMContentLoaded", function () {
        if (null !== app) {
            render(<BookMetabox postId={postId} />, app);
        }
    });
})();