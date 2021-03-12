import React from 'react'

const CreateForm = ({titleValue, authorValue, urlValue, onSubmit, titleChange, authorChange, urlChange}) => (
    <form onSubmit={onSubmit}>
        <div>
            <h2>create new</h2>
      title:<input value={titleValue} onChange={titleChange} /><br />
      author:<input value={authorValue} onChange={authorChange} /><br />
      url:<input value={urlValue} onChange={urlChange} /><br />
            <button type='submit'>create</button>
        </div>
    </form>
)

export default CreateForm