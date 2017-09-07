import React from 'react'
import { Field, reduxForm } from 'redux-form'

let PostForm = props => {
  const { handleSubmit, categories, pristine, reset, submitting } = props;
  const required = value => (value ? undefined : 'Required');

  return (
    <form className='Form' onSubmit={ handleSubmit }>
      <div className='Form-group'>
        <label className='Form-label'>Title</label>
        <div>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Title"
            validate={[required]}
          />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Body</label>
        <div>
          <Field
            name="body"
            component="textarea"
            validate={[required]} />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Category</label>
        <div>
          <Field
            name="category"
            component="select"
            validate={[required]}>
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

      <div className='Form-group'>
        <label className='Form-label'>Author</label>
        <div>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
            validate={[required]}
          />
        </div>
      </div>

      <div className='Form-group'>
        <button  className='Button' type="submit" disabled={pristine || submitting}>
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
  form: 'post'
})(PostForm);
