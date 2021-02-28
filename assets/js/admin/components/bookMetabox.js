import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Form, Formik, Field, FieldArray } from "formik";
import axios from "axios";

function bookMetabox({ postId }) {

    const [defaults, setdefaults] = useState(
        { bookName: __( "Harry Potter", "reactive-core" ),
        bookAuthor: "J.K Rowlong",
        bookISBN: "123456",
        bookColor: "red",
        book_faqs: [],
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
           {( { values, setFieldValue, dirty } ) => {
               return (
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

                    <FieldArray name="book_faqs">
                        { ( BookFAQSHlpr ) => (
                    
                            <div>
                                {values.book_faqs.map( ( faq, index ) => (
                                    <div key={index} >
                                        <label className="book-field-label">
                                            {__("FAQ Title", "reactive-core")}
                                        </label>
                                        <Field
                                            className="book-mbinput"
                                            type="text"
                                            name={`book_faqs.${index}.title`}
                                            placeholder={__(
                                                "FAQ Title", "reactive-core"
                                            )}
                                        />
                                        <label className="book-field-label">
                                            {__("FAQ Description", "reactive-core")}
                                        </label>
                                        <Field
                                            className="book-mbinput"
                                            as="textarea"
                                            name={`book_faqs.${index}.desc`}
                                            placeholder={__(
                                                "FAQ Description", "reactive-core"
                                            )}
                                        />
                                    </div>
                                ) )}

                            <button 
                                type="button"
                                onClick={ () => {
                                    BookFAQSHlpr.push({
                                        title: "",
                                        desc: ""
                                    })
                                } }>
                                { __( "Add FAQ Block", "reactive-core" ) }
                            </button>
                        </div>
                    ) }
                    </FieldArray>


                    <button type="submit">
                        {__("Save Changes", "reactive-core")}
                    </button>
                </Form>
               )
            } }
            </Formik>
        </div>
    )
}

export default bookMetabox
