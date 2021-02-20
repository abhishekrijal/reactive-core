import React from 'react';
import { __ } from "@wordpress/i18n";
import { Form, Formik, Field } from "formik";
import axios from "axios";

function bookMetabox({ postId }) {

    const [defaults, setdefaults] = React.useState(
        { bookName: __( "Harry Potter", "reactive-core" ),
        bookAuthor: "J.K Rowlong",
        bookISBN: "123456",
        bookColor: "red"
    }
    );

    const handleFormSave = async (formdata) => {
        const FormDataVals = new FormData();

        for (let index in formdata) {
            FormDataVals.append(index, formdata[index]);
        }

        FormDataVals.append( 'post_id', postId );

        let res = axios({
            method: "post",
            url: `/wp-admin/admin-ajax.php?action=reactive_core_save_mb`,
            data: FormDataVals,

        }).then((response) => {
            console.log(response.data.data);
        });
        };

    return (
        <div style={{backgroundColor: "#f1f1f1"}}>
            <Formik
                enableReinitialize
                initialValues={defaults}
                onSubmit={async (values) => {
                    console.log(values);
                    handleFormSave( values );
                }}
            >
                <Form>
                    <label className="book-field-label">
                        {__("Book Name", "reactive-core")}
                    </label>
                    <Field
                        className="book-mbinput"
                        type="text"
                        name="bookName"
                        placeholder={__(
                            "Enter text for Book Name", "reactive-core"
                        )}
                    />
                    <label className="book-field-label">
                        {__("Book Author", "reactive-core")}
                    </label>
                    <Field
                        className="book-mbinput"
                        type="text"
                        name="bookAuthor"
                        placeholder={__(
                            "Book Author Name", "reactive-core"
                        )}
                    />
                    <label className="book-field-label">
                        {__("Book ISBN", "reactive-core")}
                    </label>
                    <Field
                        className="book-mbinput"
                        type="number"
                        step="1"
                        name="bookISBN"
                        placeholder={__(
                            "Book ISBN", "reactive-core"
                        )}
                    />
                    <label className="book-field-label">
                        {__("Book Cover Color", "reactive-core")}
                    </label>
                    <Field name="bookColor" as="select">
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                    </Field>
                    <button type="submit">
                        {__("Save Changes", "reactive-core")}
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default bookMetabox
