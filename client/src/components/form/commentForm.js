import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderText, renderTextarea} from './util';

const validate = values => {
  const errors = {}
  if (!values.body) {
    errors.body = 'Required'
  } else if (values.body.length < 20) {
    errors.body = "Don't be shy! White at least 20 characters.";
  }

  if (!values.author) {
    errors.author = 'Required'
  } else if (values.author.length < 2) {
    errors.author = 'Must be at least 2 characters.'
  }

  return errors
}

const CommentForm = (props) => {
  const {handleSubmit, pristine, reset, submitting} = props;

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div className='Form-group'>
        <label className='Form-label'>Body</label>
        <div>
          <Field
            name="body"
            component={renderTextarea}
            placeholder="Write your comment here"
          />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Author</label>
        <div>
          <Field
            name="author"
            component={renderText}
            type="text"
            placeholder="Jane Doe"
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
  form: 'comment',
  validate,
})(CommentForm);
