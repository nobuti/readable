import React from 'react'
import { Field, reduxForm } from 'redux-form'

let CommentForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const required = value => (value ? undefined : 'Required');

  return (
    <form className='Form' onSubmit={ handleSubmit }>
      <div className='Form-group'>
        <label className='Form-label'>Body</label>
        <div>
          <Field
            name="body"
            component="textarea"
            placeholder="Write your comment here"
            validate={[required]} />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Author</label>
        <div>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Jane Doe"
            validate={[required]}
          />
        </div>
      </div>

      <div className='Form-group'>
        <button className='Button' type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button className='Button' type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'comment'
})(CommentForm);
