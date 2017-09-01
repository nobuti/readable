import React from 'react'
import { Field, reduxForm } from 'redux-form'

let CommentForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label>Body</label>
        <div>
          <Field name="body" component="textarea" />
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
  form: 'comment'
})(CommentForm);
