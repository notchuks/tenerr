import React from 'react';
import "./Add.scss";

const Add = () => {
  return (
    <div className="add">
      <div className="container">
        <h1>Add new Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" placeholder="e.g I will do something i'm really good at" />
            <label htmlFor="category">Category</label>
            <select name="cats" id="cats">
              <option value="design">Design</option>
              <option value="design">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file" name="" id="" />
            <label htmlFor="">Upload Images</label>
            <input type="file" name="" id="" multiple />
            <label htmlFor="">Description</label>
            <textarea name="" id="" cols={30} rows={16} placeholder={"Brief description to introduce your service to your customers"}></textarea>
            <button>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" name="" id="" placeholder="e.g. One-page web design" />
            <label htmlFor="">Short Description</label>
            <textarea name="" id="" cols={30} rows={10} placeholder="A short description of your service"></textarea>
            <label htmlFor="">Delivery Time(e.g. 3 days)</label>
            <input type="number" name="" id="" min={1} />
            <label htmlFor="">Revision Number</label>
            <input type="number" name="" id="" min={1} />
            <label htmlFor="">Add Features</label>
            <input type="text" name="" id="" placeholder="e.g. page design" />
            <input type="text" name="" id="" placeholder="e.g. file upload" />
            <input type="text" name="" id="" placeholder="e.g. setting up a domain" />
            <input type="text" name="" id="" placeholder="e.g. hosting" />
            <label htmlFor="">Price</label>
            <input type="number" name="" id="" min={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add;