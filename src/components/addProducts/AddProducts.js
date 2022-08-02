import React, { useState } from 'react'

const AddProducts = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  return (
    <div className='mx-4 pt-3 w-100'>
      <div className="add-product">
      <form
        className="d-flex justify-content-start align-items-center"
      >
        <div className="mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form__input"
            id="name"
            aria-describedby="text"
            placeholder="Category Name"
          />
        </div>
        <div className="mb-3 mx-4">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            className="form__input"
            id=""
            placeholder="Description"
          ></textarea>
        </div>
        <div className="mb-3 mx-4">
          
        </div>
        <div className="mb-3">
          <button type="submit" className="btn submit px-5">
            Add
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddProducts