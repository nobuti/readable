import React from 'react'
import { Field, reduxForm } from 'redux-form'

let PostForm = props => {
  const { handleSubmit, categories, pristine, reset, submitting } = props;

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label>Title</label>
        <div>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
      <div>
        <label>Body</label>
        <div>
          <Field name="body" component="textarea" />
        </div>
      </div>
      <div>
        <label>Category</label>
        <div>
          <Field name="category" component="select">
            {
              categories.map((category, index) => {
                const {name} = category;
                return (
                  <option key={name} value={name}>{name}</option>
                );
              })
            }
          </Field>
        </div>
      </div>
      <div>
        <label>Author</label>
        <div>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'post'
})(PostForm);
